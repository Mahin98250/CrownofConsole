# The Crown Of Console

A custom React website for The Crown Of Console gaming cafe in Ahmedabad.

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

- Browse the cafe introduction and location.
- Read practical notes about checking current rates, games and timings.
- Submit a visit enquiry with preferred date, time of day and group size.
- Review the pre-filled WhatsApp message and send it to the cafe.
- Open directions or call the listed phone number.

The enquiry form is a WhatsApp hand-off, not an online reservation system. There is no database or server-side booking service in this version.

## Business details currently published

- Address: FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad
- Phone: +91 8799508567

## Content that still needs confirmation from the business

Do not publish guessed details. Confirm these with the cafe team before adding them:

- Actual opening hours and weekly closing day
- Current hourly rates, packages and membership terms
- Available PCs, consoles, peripherals and specifications
- Games and platforms currently installed
- Group capacity and booking / cancellation policy
- Original photographs of the actual venue
- Official social media profiles

## Quality checklist before launch

- [ ] Replace temporary stock photography with approved venue photographs.
- [ ] Verify address, phone number and map pin with the business.
- [ ] Confirm current prices, hours, games and hardware before publishing.
- [ ] Test WhatsApp enquiry on Android, iOS and desktop.
- [ ] Test navigation, form fields and layout at mobile and desktop widths.
- [ ] Confirm GitHub Actions build and Pages deployment are green.
- [ ] Add a custom domain only after the business approves the domain name.
