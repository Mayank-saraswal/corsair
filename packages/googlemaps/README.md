# `@corsair-dev/googlemaps`

Google Maps Platform plugin for Corsair — **22 operations**, dual auth (**API Key** + **OAuth 2.0**).

OSS claim: [corsair.dev/oss/google_maps](https://corsair.dev/oss/google_maps) · Issue: #504

## Auth

| Mode | Usage |
| --- | --- |
| **API Key** | `authType: 'api_key'`, key from Google Cloud Console (Maps Platform) |
| **OAuth 2.0** | `authType: 'oauth_2'`, access token with Maps scopes |

Legacy/embed endpoints are **API-key oriented** (`legacyKeyQuery` / embed key param). Modern Places, Routes, and Geocoding v4 support OAuth via `Authorization: Bearer`.

Enable the relevant APIs in Google Cloud:

- Places API (New)
- Routes API
- Geocoding API
- Geolocation API
- Map Tiles API
- Aerial View API
- Maps Embed API (for embed URLs)

## Operations (22)

### Places

- `places.textSearch` — free-text place search  
- `places.nearbySearch` — circular nearby search  
- `places.autocomplete` — as-you-type predictions  
- `places.get` — place details  
- `places.getPhoto` — photo media (binary or URI)

### Geocoding

- `geocoding.geocode` — v4 (exactly one of address / latlng / placeId)  
- `geocoding.addressQuery` — address query  
- `geocoding.reverse` — reverse geocode  
- `geocoding.place` — by place id  
- `geocoding.destinations` — destination lookup  
- `geocoding.addressLegacy` — **deprecated** `/geocode/json`

### Routes / directions / matrix

- `routes.computeRoutes` — modern Get Route  
- `routes.computeRouteMatrix` — matrix (≤625 elements; chunk larger sets)  
- `directions.get` — **deprecated** hybrid (Routes if OAuth, else legacy Directions)  
- `distanceMatrix.legacy` — **deprecated** API-key Distance Matrix (≤100 elements)

### Tiles / location / aerial / embed

- `tiles.createSession` — session token (~2 weeks; **cache and reuse**)  
- `tiles.get2d` — 2D tile image  
- `tiles.get3dRoot` — 3D tileset root  
- `geolocation.geolocate` — WiFi/cell location  
- `aerial.renderVideo` / `aerial.lookupVideo` — aerial view  
- `maps.embed` — embed URL + iframe HTML (no remote JSON call)

## Quirks

- Route matrix results may be **out of order** — use `originIndex` / `destinationIndex`.  
- Prefer elements with `condition=ROUTE_EXISTS`.  
- Text Search: throttle ~1 req/s; backoff on HTTP 429 / `OVER_QUERY_LIMIT`.  
- Tile sessions are billable — do not create a session per tile.  
- Aerial video is async (render then poll lookup).

## Local test

```bash
pnpm --filter @corsair-dev/googlemaps test
# optional live smoke:
# GOOGLE_MAPS_API_KEY=... pnpm --filter @corsair-dev/googlemaps test
```

## Demo

<!-- Loom URL added when recording is ready — required for PR R4 -->
