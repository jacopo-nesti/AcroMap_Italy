const rateLimitSecret = Deno.env.get("RATE_LIMIT_HASH_SECRET")
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://acrofinder.it",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

import { createClient } from "npm:@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL")!

const secretKeys = JSON.parse(
  Deno.env.get("SUPABASE_SECRET_KEYS")!
)

const supabaseAdmin = createClient(
  supabaseUrl,
  secretKeys["default"]
)

const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY")

async function createRateLimitKey(ip: string) {
  const encoder = new TextEncoder()

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(rateLimitSecret!),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  )

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(ip),
  )

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

Deno.serve(async (req) => {

    if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    })
  }

  if (!turnstileSecret) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Configurazione Turnstile mancante",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    )
  }

  const { contact_id, turnstile_token } = await req.json()

  if (!contact_id) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "contact_id mancante",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    )
  }

  if (!turnstile_token) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "turnstile_token mancante",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    )
  }

  // ----------------------------------------------------------
  // 1. Verifica Turnstile con Cloudflare
  // ----------------------------------------------------------

  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstile_token,
      }),
    },
  )

  const turnstileResult = await turnstileResponse.json()

  if (!turnstileResult.success) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Verifica Turnstile fallita",
        error_codes: turnstileResult["error-codes"] ?? [],
      }),
      {
        status: 403,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    )
  }

  if (turnstileResult.hostname !== "acrofinder.it") {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Hostname Turnstile non valido",
    }),
    {
      status: 403,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  )
}

  if (!rateLimitSecret) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Configurazione rate limit mancante",
    }),
    {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  )
}

const clientIp =
  req.headers.get("cf-connecting-ip") ??
  req.headers.get("x-real-ip")

if (!clientIp) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Impossibile identificare il client",
    }),
    {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  )
}

const keyHash = await createRateLimitKey(clientIp)

const {
  data: rateLimitData,
  error: rateLimitError,
} = await supabaseAdmin.rpc(
  "check_contact_reveal_rate_limit",
  {
    p_key_hash: keyHash,
  },
)

if (rateLimitError) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Errore controllo rate limit",
    }),
    {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  )
}

const rateLimit = rateLimitData?.[0]

if (!rateLimit?.allowed) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Troppe richieste. Riprova più tardi.",
      retry_after_seconds:
        rateLimit?.retry_after_seconds ?? 600,
    }),
    {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(
          rateLimit?.retry_after_seconds ?? 600
        ),
      },
    },
  )
}

  // ----------------------------------------------------------
  // 2. Solo dopo Turnstile leggiamo il contatto
  // ----------------------------------------------------------

  const { data, error } = await supabaseAdmin
    .from("contacts")
    .select("id, type, label, value, is_protected, status")
    .eq("id", contact_id)
    .eq("is_protected", true)
    .eq("status", "active")
    .maybeSingle()

  if (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    )
  }

  if (!data) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Contatto protetto non trovato",
      }),
      {
        status: 404,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    )
  }

  return new Response(
    JSON.stringify({
      ok: true,
      contact: data,
    }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  )
})