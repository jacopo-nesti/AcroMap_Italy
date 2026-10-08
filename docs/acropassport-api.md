# AcroFinder → AcroPassport Communities API

**API version:** `1.0`

This API provides AcroPassport with a read-only feed of public AcroFinder community data.

It is intended for **server-to-server usage only**.

---

## Table of Contents

- [AcroFinder → AcroPassport Communities API](#acrofinder--acropassport-communities-api)
  - [Table of Contents](#table-of-contents)
  - [Endpoint](#endpoint)
  - [Authentication](#authentication)
    - [Token Security](#token-security)
  - [Successful Response](#successful-response)
    - [Top-Level Fields](#top-level-fields)
  - [Data Model](#data-model)
    - [Community Object](#community-object)
      - [Community Fields](#community-fields)
    - [Locations](#locations)
      - [Location Fields](#location-fields)
      - [Single-City Communities](#single-city-communities)
      - [Multi-City Communities](#multi-city-communities)
    - [Course Object](#course-object)
      - [Course Fields](#course-fields)
      - [Course Contact](#course-contact)
    - [Jam Object](#jam-object)
      - [Jam Fields](#jam-fields)
      - [Variable Jams](#variable-jams)
    - [Seasons](#seasons)
  - [Public Contact Policy](#public-contact-policy)
  - [Data Protection and Publication Rules](#data-protection-and-publication-rules)
    - [Data That Is NOT Exported](#data-that-is-not-exported)
    - [Public Free-Text Protection](#public-free-text-protection)
    - [Publication Rules](#publication-rules)
  - [API Behavior](#api-behavior)
    - [Read-Only API](#read-only-api)
    - [Full-Feed Behavior](#full-feed-behavior)
  - [Synchronization and Identifiers](#synchronization-and-identifiers)
    - [Synchronization](#synchronization)
    - [Record Identifiers](#record-identifiers)
    - [Source of Truth](#source-of-truth)
  - [HTTP Status Codes](#http-status-codes)
    - [`200` — OK](#200--ok)
    - [`401` — Unauthorized](#401--unauthorized)
    - [`405` — Method Not Allowed](#405--method-not-allowed)
    - [`500` — Internal Server Error](#500--internal-server-error)
    - [`503` — Service Unavailable](#503--service-unavailable)
  - [Error Response Format](#error-response-format)
  - [Response Caching](#response-caching)
  - [Integration Architecture](#integration-architecture)
  - [Recommended Integration Flow](#recommended-integration-flow)
    - [Minimal Server-Side Request Example](#minimal-server-side-request-example)
  - [API Versioning](#api-versioning)
  - [Current v1 Limitations](#current-v1-limitations)
  - [Security Summary](#security-summary)
  - [Contact](#contact)

---

## Endpoint

```http
GET https://prdneulzaarcnkvtibfa.supabase.co/functions/v1/acropassport-communities
```

API v1 does not define any query parameters.

Clients should call the endpoint directly using `GET`.

---

## Authentication

Every request must include the private AcroPassport API token using the HTTP Bearer authentication scheme:

```http
Authorization: Bearer <ACROPASSPORT_API_TOKEN>
```

Example:

```bash
curl \
  -H "Authorization: Bearer <ACROPASSPORT_API_TOKEN>" \
  https://prdneulzaarcnkvtibfa.supabase.co/functions/v1/acropassport-communities
```

### Token Security

The token must:

- be stored server-side only;
- never be included in frontend JavaScript;
- never be committed to a public or private repository;
- never be sent to the browser;
- never be included in application logs;
- never be exposed to end users.

The token will be shared separately from this documentation.

---

## Successful Response

A successful request returns:

```http
200 OK
```

Example:

```json
{
  "version": "1.0",
  "generated_at": "2026-10-08T08:10:28.492Z",
  "communities": []
}
```

### Top-Level Fields

| Field | Type | Description |
|---|---|---|
| `version` | string | API response format version |
| `generated_at` | ISO 8601 string | Timestamp when the feed was generated |
| `communities` | array | Public AcroFinder communities |

The response is generated dynamically when the endpoint is called.

---

## Data Model

### Community Object

Example:

```json
{
  "id": 123,
  "name": "Example Acroyoga Community",
  "description": "Local acroyoga community.",
  "city": "Example City",
  "region": "Example Region",
  "coordinates": {
    "lat": 43.0,
    "lng": 11.0
  },
  "locations": [
    {
      "city": "Example City",
      "region": "Example Region",
      "coordinates": {
        "lat": 43.0,
        "lng": 11.0
      }
    }
  ],
  "website": "https://example.org",
  "instagram": "https://instagram.com/example",
  "facebook": null,
  "updated_at": "2026-10-01T10:00:00Z",
  "courses": [],
  "jams": []
}
```

#### Community Fields

| Field | Type | Description |
|---|---|---|
| `id` | integer | AcroFinder group identifier |
| `name` | string/null | Community name |
| `description` | string/null | Public community description |
| `city` | string/null | City when the community has exactly one location |
| `region` | string/null | Region when it can be represented unambiguously |
| `coordinates` | object/null | Coordinates when the community has exactly one location |
| `locations` | array | All locations associated with the community |
| `website` | string/null | Public website URL |
| `instagram` | string/null | Public Instagram URL |
| `facebook` | string/null | Public Facebook URL |
| `updated_at` | string/null | Last update timestamp |
| `courses` | array | Public active courses associated with the community |
| `jams` | array | Public active jams associated with the community |

---

### Locations

Each community contains a `locations` array.

Example:

```json
{
  "city": "Example City",
  "region": "Example Region",
  "coordinates": {
    "lat": 43.0,
    "lng": 11.0
  }
}
```

#### Location Fields

| Field | Type |
|---|---|
| `city` | string |
| `region` | string/null |
| `coordinates` | object/null |

When coordinates are available:

```json
{
  "lat": 43.0,
  "lng": 11.0
}
```

#### Single-City Communities

When a community is linked to exactly one city:

- `city` is populated;
- `region` is populated when available;
- `coordinates` is populated when available;
- the same location is also included in `locations`.

Example:

```json
{
  "city": "Example City",
  "region": "Example Region",
  "coordinates": {
    "lat": 43.0,
    "lng": 11.0
  },
  "locations": [
    {
      "city": "Example City",
      "region": "Example Region",
      "coordinates": {
        "lat": 43.0,
        "lng": 11.0
      }
    }
  ]
}
```

#### Multi-City Communities

A community may operate in more than one city.

In this case the community is returned only once.

Example:

```json
{
  "id": 123,
  "name": "Example Multi-city Community",
  "city": null,
  "region": "Example Region",
  "coordinates": null,
  "locations": [
    {
      "city": "City A",
      "region": "Example Region",
      "coordinates": null
    },
    {
      "city": "City B",
      "region": "Example Region",
      "coordinates": null
    }
  ]
}
```

For multi-city communities:

- `city` is `null`;
- `coordinates` is `null`;
- `locations` contains all associated cities;
- `region` may still be populated if all locations belong unambiguously to the same region;
- if the locations belong to different regions, the top-level `region` is also `null`.

Consumers should use the `locations` array as the complete representation of the community's geographic coverage.

---

### Course Object

Example:

```json
{
  "id": 456,
  "name": "Beginner Acroyoga",
  "teachers": [
    "Teacher Name"
  ],
  "day": "monday",
  "start_time": "20:00",
  "end_time": "21:30",
  "location": "Example Venue",
  "maps_url": "https://maps.example.com/example",
  "level": "beginner",
  "season": "winter",
  "season_notes": null,
  "notes": null,
  "contact": {
    "type": "instagram",
    "label": "Instagram",
    "url": "https://instagram.com/example"
  },
  "updated_at": "2026-10-01T10:00:00Z"
}
```

#### Course Fields

| Field | Type | Description |
|---|---|---|
| `id` | integer | AcroFinder course identifier |
| `name` | string/null | Course name |
| `teachers` | array | Public teacher names |
| `day` | string/null | Day of the course |
| `start_time` | string/null | Start time in `HH:MM` format |
| `end_time` | string/null | End time in `HH:MM` format |
| `location` | string/null | Public venue/location |
| `maps_url` | string/null | Public map URL |
| `level` | string/null | Course level |
| `season` | string/null | Course season |
| `season_notes` | string/null | Additional seasonal information |
| `notes` | string/null | Public notes |
| `contact` | object/null | Public course contact |
| `updated_at` | string/null | Last update timestamp |

#### Course Contact

When available, a course may contain:

```json
{
  "type": "instagram",
  "label": "Instagram",
  "url": "https://instagram.com/example"
}
```

Only explicitly public contact types can be exported.

---

### Jam Object

Example:

```json
{
  "id": 789,
  "type": "regular",
  "day": "friday",
  "start_time": "20:00",
  "end_time": "23:00",
  "location": "Example Venue",
  "maps_url": "https://maps.example.com/example",
  "season": "all-year",
  "season_notes": null,
  "notes": null,
  "updates_method": null,
  "updates_url": null,
  "updated_at": "2026-10-01T10:00:00Z"
}
```

#### Jam Fields

| Field | Type | Description |
|---|---|---|
| `id` | integer | AcroFinder jam identifier |
| `type` | string/null | Jam type |
| `day` | string/null | Day |
| `start_time` | string/null | Start time |
| `end_time` | string/null | End time |
| `location` | string/null | Public venue/location |
| `maps_url` | string/null | Public map URL |
| `season` | string/null | Jam season |
| `season_notes` | string/null | Additional seasonal information |
| `notes` | string/null | Public notes |
| `updates_method` | string/null | Public channel used for jam updates |
| `updates_url` | string/null | Public update URL |
| `updated_at` | string/null | Last update timestamp |

#### Variable Jams

AcroFinder also supports jams whose schedule or location may change.

For a jam with type:

```text
variable
```

the following fields may intentionally be returned as `null`:

```text
day
start_time
end_time
location
maps_url
```

When an allowed public update channel exists, the API can instead expose:

```json
{
  "updates_method": "instagram",
  "updates_url": "https://instagram.com/example"
}
```

This allows AcroPassport to direct users to the public channel where current jam information is published.

---

### Seasons

Where applicable, the API may return the following normalized season values:

```text
summer
winter
all-year
```

Otherwise the field is `null`.

---

## Public Contact Policy

The API only exports explicitly public contact types:

```text
website
instagram
facebook
```

Contacts must also satisfy the AcroFinder public-data rules before they can be included in the feed.

---

## Data Protection and Publication Rules

### Data That Is NOT Exported

The API does not expose protected or internal information.

In particular, it does not export:

```text
phone numbers
WhatsApp contacts
email addresses
Signal contacts
protected contacts
contributor/internal email addresses
user profiles
manager invitations
group-user administration
moderation data
administrative data
rate-limit data
authentication data
private technical identifiers
API secrets
Supabase secrets
```

Protected contacts are not available through this API.

### Public Free-Text Protection

Public text fields such as descriptions and notes are filtered conservatively.

If recognizable direct contact information is detected inside a public free-text field, the affected field may be omitted from the API response instead of exposing that information.

This is an additional safety mechanism and does not replace AcroFinder's database access controls.

### Publication Rules

API v1 exports only records considered public by AcroFinder.

Current publication rules include:

```text
groups
status = active

courses
status = active

jams
status = active

group ↔ jam relationships
status = accepted

contacts
status = active
AND is_protected = false
AND type is one of:
  website
  instagram
  facebook
```

The API also applies an explicit output whitelist during serialization.

Fields that are not part of the public API contract are not included in the response.

---

## API Behavior

### Read-Only API

This API is strictly read-only.

AcroPassport cannot use this endpoint to:

- create communities;
- modify communities;
- delete communities;
- create or update courses;
- create or update jams;
- modify contacts;
- access administrative data.

There are no write operations in API v1.

### Full-Feed Behavior

API v1 returns the complete available public feed in one successful request.

There is currently:

- no public pagination;
- no `updated_since` parameter;
- no incremental sync endpoint;
- no webhook;
- no write endpoint.

AcroPassport should therefore retrieve the feed from its backend and reconcile it with previously imported records.

---

## Synchronization and Identifiers

### Synchronization

AcroPassport may cache the API response internally.

For the current integration, a periodic backend synchronization is appropriate.

For example:

```text
Scheduled backend job
        ↓
GET AcroFinder API
        ↓
Compare AcroFinder IDs
        ↓
Create/update AcroPassport records
```

A weekly synchronization is suitable for the current expected update frequency, although AcroPassport may choose another interval if needed.

### Record Identifiers

The following identifiers should be retained by AcroPassport when importing records:

```text
community.id
course.id
jam.id
```

These IDs should be used as reconciliation keys when processing later API responses.

For example, if AcroPassport already has an imported community with:

```json
{
  "id": 123
}
```

a later API response containing the same AcroFinder ID should normally update the existing imported record rather than create another one.

### Source of Truth

AcroFinder remains the source of truth for the Italian community data provided through this integration.

The API represents the current public AcroFinder dataset at the time specified by:

```json
{
  "generated_at": "..."
}
```

AcroPassport should treat the integration as a read-only upstream data source.

---

## HTTP Status Codes

### `200` — OK

The request was authenticated and the feed was generated successfully.

```http
200 OK
```

### `401` — Unauthorized

Returned when the Bearer token is:

- missing;
- malformed;
- incorrect.

Example:

```json
{
  "error": "unauthorized"
}
```

### `405` — Method Not Allowed

Returned when a method other than `GET` is used.

Example:

```json
{
  "error": "method_not_allowed"
}
```

The response also indicates:

```http
Allow: GET
```

### `500` — Internal Server Error

Returned when the API is authenticated correctly but the public feed cannot be generated safely.

Example:

```json
{
  "error": "feed_unavailable"
}
```

The API does not expose database errors, credentials, query details, stack traces or partial feed data to the client.

### `503` — Service Unavailable

Returned when required server configuration is unavailable.

Example:

```json
{
  "error": "service_unavailable"
}
```

---

## Error Response Format

Errors use a minimal JSON response:

```json
{
  "error": "error_code"
}
```

AcroPassport should primarily use the HTTP status code to determine the failure category.

---

## Response Caching

API responses currently include:

```http
Cache-Control: no-store
```

AcroPassport may still store the successfully retrieved data inside its own backend/database as part of the synchronization process.

The API response itself should not be treated as a permanent cached HTTP resource.

---

## Integration Architecture

```text
AcroPassport backend
        │
        │  GET
        │  Authorization: Bearer <private token>
        ▼
AcroFinder Edge Function
        │
        ▼
AcroFinder public-data access rules
        │
        ▼
API output whitelist
        │
        ▼
JSON API v1
        │
        ▼
AcroPassport backend/database
        │
        ▼
AcroPassport frontend
```

The private API token must never reach the final frontend step.

---

## Recommended Integration Flow

1. Store the AcroFinder API token as a server-side secret in AcroPassport.
2. Call the endpoint from the AcroPassport backend.
3. Check for HTTP 200.
4. Validate `version`.
5. Iterate over `communities`.
6. Use AcroFinder IDs as reconciliation keys.
7. Update or create corresponding AcroPassport records.
8. Store only the public fields required by AcroPassport.
9. Repeat the synchronization periodically.
10. Never expose the AcroFinder API token to frontend clients.

### Minimal Server-Side Request Example

Example JavaScript / TypeScript:

```ts
const response = await fetch(
  "https://prdneulzaarcnkvtibfa.supabase.co/functions/v1/acropassport-communities",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.ACROFINDER_API_TOKEN}`,
    },
  }
)

if (!response.ok) {
  throw new Error(`AcroFinder API returned ${response.status}`)
}

const feed = await response.json()

console.log(feed.version)
console.log(feed.communities.length)
```

The actual token should be stored using AcroPassport's server-side secret/environment-variable system.

---

## API Versioning

The current API contract version is:

```text
1.0
```

It is returned inside every successful response:

```json
{
  "version": "1.0"
}
```

AcroPassport should not rely on undocumented fields.

If the API contract requires a breaking change in the future, AcroFinder and AcroPassport should coordinate the change before deployment.

---

## Current v1 Limitations

API v1 intentionally keeps the integration simple.

It currently does not provide:

- client-side access;
- write operations;
- pagination parameters;
- incremental synchronization parameters;
- webhooks;
- real-time push updates;
- protected contact access;
- administrative endpoints.

These features are not required for the current AcroFinder → AcroPassport integration.

---

## Security Summary

The integration is designed around multiple layers:

```text
Private Bearer token
        ↓
Server-to-server Edge Function
        ↓
AcroFinder public database rules
        ↓
Explicit allowed fields
        ↓
Explicit allowed contact types
        ↓
Public JSON feed
```

AcroPassport must keep the Bearer token private and use the endpoint only from trusted server-side code.

---

## Contact

For:

- schema questions;
- integration problems;
- new fields;
- breaking changes;
- synchronization issues;

contact the AcroFinder maintainer before relying on behavior that is not documented in this API contract.