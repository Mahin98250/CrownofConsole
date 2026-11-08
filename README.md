# The Crown Of Console

A custom React website for The Crown Of Console gaming cafe in Ahmedabad.

## Owner review

The complete page structure, content requirements, customer journeys, design system, event-page template, future modules, approval checklist and change-request register are documented in:

**[Owner Website Blueprint](OWNER_WEBSITE_BLUEPRINT.md)**

Share this document with the business owner before final content sign-off. Capture requested changes in its change-request register, update the blueprint, and only then implement approved changes.

## Stack

- React 18
- Vite 6
- Plain CSS with responsive layouts and reduced-motion support
- Lucide React icons
- GitHub Pages deployment through GitHub Actions

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

The repository is configured for GitHub Pages at:

https://mahin98250.github.io/CrownofConsole/

The Vite base path is set to `/CrownofConsole/`. The GitHub Pages publishing source must be set to **GitHub Actions** in the repository's Settings → Pages.

## Current customer journey

- Browse the café introduction and location.
- Read practical notes about checking current rates, games and timings.
- Submit a visit enquiry with preferred date, time of day and group size.
- Review the pre-filled WhatsApp message and send it to the café.
- Open directions or call the listed phone number.

The enquiry form is a WhatsApp hand-off, not an online reservation system. There is no database or server-side booking service in this version.

## Business details currently published

- Address: FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad
- Phone: +91 87995 08567

## Content awaiting business confirmation

Do not publish guessed details. Confirm these with the café team before adding them:

- Official logo
- Actual venue photographs
- Exact PlayStation model(s), equipment and station quantity
- Available games and platforms
- Opening hours and weekly closing day
- Current hourly rates, packages and membership terms
- Group capacity and booking / cancellation policy
- Facilities and amenities
- Official social media profiles

## Quality checklist before final launch

- [ ] Owner approves the page structure and visual direction.
- [ ] Replace temporary reference imagery with approved venue photographs.
- [ ] Verify address, phone number and map pin with the business.
- [ ] Confirm current prices, hours, games and hardware before publishing.
- [ ] Test WhatsApp enquiry on Android, iOS and desktop.
- [ ] Test navigation, forms and layouts at mobile and desktop widths.
- [ ] Confirm GitHub Actions build and Pages deployment are green.
- [ ] Add a custom domain only after the business approves the domain name.
