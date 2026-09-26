# Motherland Auto Parts Frontend

Production-oriented Next.js App Router frontend for the Motherland Auto Parts salvage/used foreign-parts backend.

## Contract-first implementation

The supplied backend ZIP is the integration source of truth. The frontend does not invent endpoints, condition/stock search filters, quote status values, or customer authentication.

## Included

- Industrial responsive public storefront
- Vehicle lookup using `/vehicles/years`, `/vehicles/makes`, `/vehicles/models`
- Inventory search using the backend-supported query fields
- VIN decoder
- Public part detail and backend-provided media URLs
- Multipart quote request with attachments
- WhatsApp dispatch that does not create a backend lead
- Contact form
- Admin login with same-origin Next.js BFF and HttpOnly JWT cookie
- Protected admin inventory and quote views
- Inventory creation/edit/archive
- Inventory image upload/delete/primary/reorder
- Quote status management
- No customer accounts, checkout, payments, or fake API data

## Environment

Copy `.env.example` to `.env.local`:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, point `NEXT_PUBLIC_API_URL` at the deployed backend API.

## Run

```bash
npm install
npm run dev
```

## Verification note

The environment used to assemble this artifact did not successfully complete `npm install` because package installation timed out, so a real Next.js production build could not be executed here. Static source inspection and delimiter checks were completed. Run `npm install`, `npm run typecheck`, and `npm run build` in an environment with package registry access before deployment.
