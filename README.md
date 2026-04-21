# ReliefLink AI

ReliefLink AI is an intelligent volunteer and resource coordination platform for NGOs and community organizations. This codebase uses `Next.js`, `Tailwind CSS`, `Firebase`, `Google Maps`, `Google Gemini`, and `Twilio`.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example`

3. Start the development server:

```bash
npm run dev
```

## Planned Modules

- Project setup
- Firebase integration
- Authentication system
- Need posting module
- Volunteer system
- AI urgency scoring
- Matching algorithm
- Maps integration
- SMS alerts
- Impact analytics dashboard
- Multi-language support

## Firebase Integration Notes

- Client SDK is used in the browser for auth and app-facing Firestore access.
- Admin SDK is used on the server for privileged Firestore and auth operations.
- Add both public Firebase config values and service account values to `.env.local`.

## Gemini Integration Notes

- Gemini urgency scoring runs through a server-side Next.js API route.
- Keep `GEMINI_API_KEY` only in server environment variables.
- `GEMINI_MODEL` defaults to `gemini-2.5-flash`.

## Google Maps Integration Notes

- Client-side maps use `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
- Restrict the browser key by allowed referrers in Google Cloud Console.
- The map module visualizes needs, volunteers, and top match relationships.

## Twilio Integration Notes

- SMS sending runs server-side through a Next.js API route.
- Keep `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER` server-only.
- Use E.164 sender and recipient numbers such as `+14155552671`.
