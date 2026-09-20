import { supabase } from "../lib/supabase"

export async function getProtectedContactMetadata() {
    const { data, error } = await supabase.rpc(  // chiamo la funzione PostgreSQL creata
    "get_protected_contact_metadata"
  )

  if (error) {
    throw new Error(
      `Errore caricamento metadata contatti protetti: ${error.message}`
    )
  }

  return data
}
export async function revealProtectedContact(contactId, token) {
  const { data, error } = await supabase.functions.invoke("reveal-protected-contact", {
    body: { contact_id: contactId, turnstile_token: token },
  })
  if (error) throw error
  if (data?.ok !== true || String(data.contact?.id) !== String(contactId)
    || data.contact?.is_protected !== true || data.contact?.status !== "active") {
    throw new Error("Contact unavailable")
  }
  return data.contact
}
