# The Crown Of Console — Owner Website Blueprint

> **Document purpose:** Owner-review master plan for the complete customer-facing website. This document defines the reusable website template, page responsibilities, content rules, interactions, future expansion model and approval checklist. It is intended to be reviewed with the business owner before the site is treated as final.
>
> **Status:** Owner review draft · Version 1.0 · 8 November 2026  
> **Current implementation baseline:** React 18 + Vite 6 · GitHub Pages  
> **Live preview:** https://mahin98250.github.io/CrownofConsole/

---

## 1. Project vision

The Crown Of Console website should make the business immediately recognisable as a **PlayStation gaming café in Ahmedabad**. It should feel like a premium gaming destination: immersive and energetic, but still clear, welcoming and easy to use.

The website has two jobs:

1. **Help a new visitor understand the experience.** They should know what the business is, where it is, what they can enquire about and how to contact the team.
2. **Turn interest into a useful enquiry.** Visitors should be able to ask about games, rates, sessions and visits without the website pretending that an unconfirmed reservation has been made.

### Brand direction

- **Positioning:** Premium PlayStation gaming café with a cinematic gaming atmosphere.
- **Brand line:** PLAY. CONNECT. COMPETE.
- **Homepage headline direction:** Custom copy, currently proposed as “PRESS START. FIND YOUR PEOPLE.”
- **Personality:** Confident, energetic, contemporary, welcoming and clear.
- **Visual character:** Deep charcoal, graphite, electric blue, controlled purple accents, high-contrast typography and intentional lighting.
- **Experience:** A multi-page website with natural vertical scrolling, carefully chosen interactions and distinct page layouts.

### Design principles

1. Gaming café first: the first screen must communicate PlayStation gaming, not abstract creative-studio imagery.
2. Clarity before cleverness: section titles and calls to action must tell visitors what they will find.
3. Realism before spectacle: no fake controller cut-outs, misleading venue images or artificial claims.
4. Purposeful motion: transitions support the experience; they never make the website hard to read or use.
5. Mobile-first: the mobile website is a first-class layout, not a compressed desktop page.
6. Reusable by design: new games, campaigns and event pages should use established templates rather than require a full redesign.
7. Honest content: only business-approved facts may appear as confirmed facts.

---

## 2. Scope of this master template

### Included in the core website

- Home
- Gaming Space
- Games
- Experiences
- Visit & Pricing
- Contact
- Shared navigation, footer and enquiry actions
- Responsive mobile and desktop layouts
- Reusable content sections and page templates
- Basic search/social sharing metadata
- Enquiry hand-off to WhatsApp and telephone
- Location and directions
- A future-ready structure for campaign and event landing pages

### Designed for later activation, not automatically published now

- Diwali and other festival pages
- Special event pages
- Gaming tournaments and competitions
- Limited-time offers and seasonal campaigns
- Birthday, group and private-event packages
- Membership or loyalty pages
- Gift cards
- News, announcements and event archive
- Online reservation, payment or customer accounts
- Owner content-management dashboard

These are expansion modules. They should be activated only when the owner confirms the business details, event information, operational process and any required integrations.

### Explicitly not promised by the current website

The current enquiry journey is not an online booking engine. A WhatsApp message is an enquiry until a member of the business confirms it. The current project has no customer database, online payment processing, account system or owner administration portal.

---

## 3. Information architecture and navigation

### Core public navigation

| Order | Page | Route | Visitor question answered |
|---|---|---|---|
| 1 | Home | `#/home` | What is The Crown Of Console and why should I explore it? |
| 2 | Gaming Space | `#/space` | What is the gaming environment like? |
| 3 | Games | `#/games` | What can I ask to play? |
| 4 | Experiences | `#/experiences` | What kind of session can I plan? |
| 5 | Visit & Pricing | `#/visit` | How do I enquire about a visit and rates? |
| 6 | Contact | `#/contact` | Where is the café and how do I reach the team? |

The navigation should use these understandable labels. Avoid cryptic names such as “The Lineup”, “The Lab” or “The Portal” as the only page labels.

### Shared site frame

Every core page uses the same recognisable frame:

- Utility strip: business identity, Ahmedabad and tap-to-call number.
- Main header: approved logo or temporary text placeholder, six primary links and a visible visit/enquiry action.
- Mobile header: compact brand mark and accessible menu.
- Page content: page-specific layout, not the same card grid repeated everywhere.
- Footer: business name, address area, phone, core page links and visit CTA.
- Mobile enquiry action: WhatsApp shortcut that remains easy to reach without covering important content.
- Scroll-to-top control: appears only when useful.
- Skip-to-content link and visible keyboard focus states.

### Route rules

- The six public routes above are active core pages.
- Unknown routes show a helpful not-found page with a route back home.
- Event pages will use a future route pattern such as `#/events/<event-slug>`.
- Event routes are not part of the main navigation by default. A live campaign can be linked from the home page, a temporary announcement strip, a relevant page or a direct share link.
- Expired event pages should be unpublished, archived or replaced with an owner-approved recap. They must not continue showing expired booking prompts.

---

## 4. Page blueprints

## 4.1 Home — the first impression

**Primary purpose:** Make a first-time visitor understand the business within a few seconds and guide them to explore or enquire.

### Section order

1. **Cinematic gaming hero**
   - Custom, owner-approved headline.
   - Plain-language subheading: PlayStation gaming, friendly competition and time with friends.
   - Primary CTA: Explore the Gaming Space.
   - Secondary CTA: Plan Your Visit.
   - Strong visual of the gaming experience.
   - Venue photography must be real and approved, or the visual must be explicitly labelled as a reference.

2. **What the café offers**
   - A short, direct introduction to The Crown Of Console.
   - Avoid invented differentiators, facilities or promises.

3. **Gaming Space feature**
   - A strong image or short approved video.
   - Link to the Gaming Space page.
   - A clear note where temporary reference imagery is used.

4. **Ways to play**
   - Solo play.
   - Versus / head-to-head play.
   - Play with friends / group play.
   - These are enquiry categories, not promises about player capacity or specific equipment.

5. **Featured games or game discovery**
   - Only show named titles once the owner confirms the available catalogue and any artwork permissions.
   - Before confirmation, use an enquiry-led introduction rather than fictional game cards.

6. **Controller / PlayStation visual moment**
   - Compare actual controller photography and a professional 3D render.
   - Choose one primary direction after reviewing both side by side.
   - The final image must have believable perspective, materials, light and contact shadow.
   - A 3D render must never be described as a real venue photograph.

7. **Explore the website**
   - Gaming Space, Games, Experiences and Visit & Pricing.
   - Each link has an explanatory label.

8. **Location and final CTA**
   - Confirmed address.
   - Call and WhatsApp actions.
   - Directions link.

### Home page success test

A visitor should be able to answer: “This is a PlayStation gaming café in Ahmedabad, and I can explore the space or contact the team.”

---

## 4.2 Gaming Space — show the environment

**Primary purpose:** Help visitors understand the physical gaming environment and build confidence before visiting.

### Section order

1. Page introduction: clear heading and short explanation.
2. Venue overview: a concise description approved by the owner.
3. Gaming setup: console model(s), display setup and peripherals only after confirmation.
4. Gaming areas: separate zones or station types only if they actually exist.
5. Comfort and facilities: seating, air-conditioning, refreshments, parking, accessibility or other facilities only when verified.
6. Venue photo gallery: real photographs supplied or approved by the owner.
7. Optional short venue video or walkthrough.
8. CTA: ask about the setup or plan a visit.

### Photo requirements

- Actual images of the real venue should replace temporary Unsplash/reference photography.
- Do not use stock photos in a way that implies they depict the actual café.
- Obtain the owner's approval for every published venue photograph.
- Use consistent image crops and compress images for mobile performance.
- Provide descriptive alt text.

### If venue photos are not ready

The page may use a clearly labelled visual concept or a neutral design section. It must not be presented as a factual gallery of the café.

---

## 4.3 Games — discover and enquire

**Primary purpose:** Help visitors ask about the game they want without publishing an inaccurate catalogue.

### Target catalogue experience

When the owner supplies and approves the actual list, each game entry can contain:

- Game title
- Approved artwork or thumbnail
- Genre
- Platform / console
- Local availability status
- Player mode or player count, if verified
- Short description
- Optional search tags

### Visitor interactions

- Search by game title.
- Filter by approved categories or genres.
- Open a game detail panel or card.
- Ask the team about the selected title.
- Clear empty state if no results match.
- Clear availability disclaimer.

### Data rule

A game is not “available now” unless the owner or authorised staff have confirmed it. A suggested game, a game requested by a customer and a game available at the café are three different states.

### Launch state while the catalogue is unconfirmed

Keep an enquiry-led experience: visitors can type a title or ask for the currently available list. Do not invent a catalogue to fill visual space.

---

## 4.4 Experiences — help visitors choose a session

**Primary purpose:** Translate different visitor intentions into a useful enquiry.

### Core experience types

1. **Solo session** — for someone visiting to play independently.
2. **Versus session** — for a friendly head-to-head challenge.
3. **Group session** — for friends planning to play together.

Each experience should have:

- Clear name and plain-language explanation.
- Distinct visual or editorial treatment.
- “Ask about this session” action.
- Pre-filled WhatsApp enquiry that asks for current options.

### Optional experiences to activate after owner approval

- Birthday celebrations.
- Private group sessions.
- Community meetups.
- Tournaments.
- Corporate or team events.
- Special event packages.

Do not claim that these services are offered until the owner confirms that they can be delivered.

---

## 4.5 Visit & Pricing — turn interest into an enquiry

**Primary purpose:** Explain how to ask about a visit and display rates accurately when the owner supplies them.

### Recommended section order

1. Page intro and a short explanation of the visit process.
2. Pricing area.
3. Session or package comparison.
4. Visit enquiry form.
5. What happens after an enquiry.
6. FAQs and final contact CTA.

### Pricing content model

A rate card should support, where applicable:

- Session name
- Duration
- Price
- What is included
- Applicable days or time bands
- Player or group eligibility
- Validity dates
- Terms and conditions

Only owner-confirmed prices should be published. If prices change frequently, the page should be structured so that the rate data can be updated independently of the layout.

### Visit enquiry fields

- Name (optional unless the owner requires it)
- Preferred date
- Preferred time or time window
- Number of visitors
- Requested game or session (optional)
- Additional message (optional)

### Enquiry behaviour

- Validate required fields.
- Build a readable WhatsApp message.
- Open WhatsApp with the message pre-filled.
- Explain that the visitor still needs to send the message.
- Explain that the visit is not confirmed until the team replies.
- Do not collect payment or claim a reservation in this version.

### Future booking upgrade

If the owner later requests real-time slot selection, payment, confirmation, cancellation or refunds, treat that as a separate booking-system project with its own provider, database, security, privacy and operational review.

---

## 4.6 Contact — remove friction

**Primary purpose:** Make it easy to call, message, find and verify the business.

### Section order

1. Clear contact introduction.
2. Full address in readable form.
3. Tap-to-call phone number.
4. WhatsApp contact action.
5. Map and external directions link.
6. Owner-approved opening hours.
7. Approved social links, if supplied.
8. FAQs covering common practical questions.

### Contact rules

- Map pin and address must be checked by the owner.
- Opening hours must not be guessed.
- Social links must point to official profiles supplied or approved by the business.
- Keep phone and WhatsApp actions functional on mobile.

---

## 5. Reusable page and content system

The site must be a template, not a collection of unrelated one-off designs.

### Shared components

| Component | Purpose | Reuse |
|---|---|---|
| Utility bar | Phone, location and business identity | All core pages |
| Header / mobile menu | Main navigation | All pages |
| Page hero | Page title, explanation and CTA | Inner pages |
| Section label | Context and hierarchy | Reusable |
| CTA block | Enquiry or next action | Reusable |
| Image feature | Approved venue or campaign visual | Reusable |
| Gallery / lightbox | View approved photos | Space and future campaign pages |
| Game card | Display approved game data | Games and featured sections |
| Experience card | Explain a visit type | Experiences and home |
| Price card | Display approved rates | Visit and future packages |
| FAQ accordion | Answer common questions | Contact, Visit and event pages |
| Enquiry form | Collect structured visit interest | Games, Visit and Contact |
| WhatsApp handoff | Prepare a message for staff | Relevant pages |
| Footer | Address, phone, links and CTA | All pages |

### Content separation

The preferred implementation direction is to keep changeable business content in clearly named data/configuration files, separate from the components that control layout and styling.

That lets the owner request a change to a price, headline, game title, event date or contact detail without requiring a redesign of the entire site.

Content that should be data-driven:

- Brand copy and page headings
- Contact details and opening hours
- Game catalogue
- Experience descriptions
- Pricing and packages
- FAQs
- Campaign and event information
- Gallery images and captions
- SEO titles and descriptions

---

## 6. Future Events and Campaign Page Template

**This is a planned extension, not an active page in the current public navigation.**

A seasonal event such as Diwali should be a standalone landing page created from a reusable template. The page should be added when the owner confirms the event, not permanently occupy a main navigation slot.

### Future route pattern

`#/events/<event-slug>`

Example route shape only: `#/events/diwali-special`. This is not an announcement that a Diwali event is currently scheduled.

### Event page sections

1. Event hero: event name, approved key visual and dates.
2. Short event introduction.
3. What visitors can expect.
4. Activities, tournament formats or experiences.
5. Schedule / session timings, if confirmed.
6. Prices, offers or inclusions, if confirmed.
7. Eligibility, age guidance or team size, if applicable.
8. Registration / enquiry CTA.
9. Terms, cancellation or participation rules, if applicable.
10. Location and contact details.
11. Event-specific FAQs.
12. Expiry or event-ended state after the event.

### Event data fields

| Field | Purpose |
|---|---|
| Event title | Public name |
| Slug | Shareable route |
| Campaign type | Festival, tournament, offer, community event, etc. |
| Status | Draft, review, scheduled, live, ended, archived |
| Start and end date | Event validity |
| Time zone | Asia/Kolkata unless the owner specifies otherwise |
| Hero image | Owner-approved campaign creative |
| Summary | Short event explanation |
| Programme | Confirmed activities and schedule |
| Price / offer | Confirmed commercial terms |
| Eligibility | Confirmed participation conditions |
| CTA label and destination | Registration or enquiry action |
| Terms | Owner-approved conditions |
| SEO title and description | Search and sharing |
| Owner approver | Person who signed off the event details |

### Event publishing workflow

1. Create an event draft from the reusable template.
2. Add owner-provided copy, dates, artwork and terms.
3. Confirm operational capacity, pricing and staff process.
4. Preview the page on mobile and desktop.
5. Obtain written owner approval.
6. Publish and link to the event from relevant pages.
7. Monitor enquiries through the agreed channel.
8. Mark the event ended on the approved end date.
9. Archive or replace the page with an approved recap.

### Future campaign types

The same template can support:

- Diwali / festival celebrations
- New Year or seasonal campaigns
- Gaming tournaments
- Match nights / watch parties, if offered
- Limited-time offers
- Launch announcements
- Birthday or group-event packages
- Community events

No campaign should be published without confirmed details.

---

## 7. Future expansion modules

These may be added after the core site is approved. They are not required to make the initial website template complete.

| Module | What it would add | Owner input required |
|---|---|---|
| Events archive | Past and upcoming campaign listings | Event history and publishing rules |
| Tournaments | Tournament details, brackets, sign-up and results | Formats, rules, capacity and staff process |
| Membership | Member benefits, validity and pricing | Approved plans and fulfilment process |
| Offers | Time-limited promotional landing pages | Validity, terms and offer conditions |
| Birthdays / group events | Dedicated package and enquiry page | Packages, capacity and inclusions |
| Gift cards | Purchase and redemption information | Values, payment and redemption rules |
| Reviews | Approved customer feedback | Consent and source verification |
| Gallery updates | New venue photos and videos | Approved media |
| Blog / news | Updates and announcements | Editorial owner and cadence |
| Owner CMS | Update content without code changes | Roles, access, hosting and workflow |
| Online booking | Real-time slots and booking confirmation | Availability system and operating process |
| Online payments | Digital payments and receipts | Provider, fees, refund policy and security |
| Customer accounts | Saved visits or membership profile | Data policy, authentication and support |

---

## 8. Visual design system

### Core palette

| Token | Intended use | Current direction |
|---|---|---|
| Deep charcoal | Main dark surfaces | `#0B0E14` |
| Graphite | Panels and cards | `#151B26` |
| Electric blue | Primary actions and selected accents | `#287DFF` |
| Soft blue | Highlights and hover states | `#80B2FF` |
| Off-white | Light page surfaces | `#F4F5F7` |
| Muted slate | Secondary text | `#697386` |
| Controlled purple | Occasional accent only | Owner/design review |

The palette can be adjusted after owner feedback, but it should remain consistent across the core site and event templates.

### Typography

- Display type: bold, distinctive and highly readable.
- Body type: clean sans-serif with comfortable line length.
- Navigation and labels: compact, high-contrast and legible.
- Avoid using all-caps for long paragraphs.
- Avoid oversized headlines that do not explain the section.

### Image direction

- Hero photography: real approved venue photography whenever available.
- Controller imagery: compare actual product photography and professional 3D render.
- Event artwork: campaign-specific creative with consistent brand framing.
- Game artwork: only use permitted assets and approved catalogue entries.
- All images: responsive crops, optimised sizes and descriptive alt text.

### Layout direction

- Distinct page layouts with a shared design system.
- Natural vertical scrolling.
- Horizontal carousels only when they genuinely improve browsing.
- No forced scroll hijacking.
- No repetitive grid-card layout on every page.
- No decoration that hides important text or controls.

---

## 9. Interaction and accessibility specification

### Expected interactions

- Main navigation changes pages and shows the active page.
- Mobile menu opens, closes and works with keyboard controls.
- Every visible link and button performs its stated action.
- Game search and filters update the displayed results when a confirmed catalogue exists.
- Gallery supports open, close, next and previous.
- Enquiry forms validate required fields and provide clear feedback.
- WhatsApp opens with a readable message.
- Phone links use the `tel:` scheme.
- Map links open external directions.
- Event pages show the correct draft/live/ended state.

### Accessibility and comfort

- Keyboard-accessible controls and visible focus.
- Meaningful headings in logical order.
- Labels for form fields.
- Helpful validation messages.
- Sufficient colour contrast.
- Alternative text for meaningful imagery.
- Reduced-motion preference respected.
- Avoid flashing, aggressive parallax and motion that blocks reading.
- Touch targets large enough for phones.
- No important information communicated by colour alone.

---

## 10. Responsive behaviour

### Mobile

- Compact sticky or fixed header that does not occupy excessive height.
- Easy-to-tap navigation and WhatsApp action.
- Single-column reading order where appropriate.
- Forms use mobile-friendly input types.
- Images crop around the meaningful subject.
- No horizontal overflow.
- No tiny labels, clipped buttons or overlapping headings.

### Tablet

- Balanced two-column layouts where space permits.
- Touch-friendly controls.
- Avoid desktop-only hover information.

### Desktop

- Immersive hero and editorial compositions.
- Wider gallery and feature layouts.
- Clear whitespace and readable content widths.
- Hover details are enhancements, never the only way to access information.

---

## 11. Technical foundation

### Current stack

- React 18
- Vite 6
- Plain CSS design system
- Lucide React icons
- GitHub Pages
- GitHub Actions build and deployment

### Technical direction

- Retain the lightweight React + Vite foundation for the current website.
- Keep core pages separate and shared elements reusable.
- Move frequently changed content into data/configuration modules.
- Keep route handling predictable and page titles/descriptions route-aware.
- Optimise images and lazy-load below-the-fold media.
- Avoid heavy 3D engines unless a measured need justifies their cost.
- Preserve the existing GitHub Pages deployment path.
- Keep dependencies minimal and review new dependencies before adding them.

### Current deployment

- Repository: `Mahin98250/CrownofConsole`
- Live preview: https://mahin98250.github.io/CrownofConsole/
- Project path: `/CrownofConsole/`
- Build/deploy workflow: GitHub Actions

### Performance expectations

- Prioritise fast first content on mobile networks.
- Compress and size images for the actual display.
- Lazy-load non-critical images and embeds.
- Avoid autoplay video with sound.
- Keep animation work lightweight.
- Prevent layout shifts from images and fonts.
- Check the production build before every release.

---

## 12. Privacy, security and analytics

### Current enquiry model

- Enquiry details are converted into a WhatsApp message.
- The website does not currently store enquiries in a database.
- Visitors must send the prepared WhatsApp message themselves.
- Staff confirm rates, timings and availability manually.
- The website must not imply that an enquiry is a confirmed booking.

### Analytics

- Analytics should remain disabled unless the business supplies and configures a measurement ID.
- Consent should be collected before optional analytics runs.
- Do not add tracking pixels or marketing tools without owner approval.
- Review which events are useful before enabling tracking.

### Future data collection

If online accounts, bookings, payments, memberships or forms that store personal data are introduced, the owner must approve the data fields, access controls, retention, privacy notice and operational process before launch.

---

## 13. Search and sharing

Every core page should have:

- A unique page title.
- A clear meta description.
- A sensible heading structure.
- Descriptive link labels.
- Social sharing title, description and image.
- Accurate business name and location references.
- No duplicate or misleading metadata.

Future event pages should have event-specific sharing metadata and should not continue showing expired offers.

A custom domain and business email can be considered after the owner approves the domain and account ownership.

---

## 14. Owner-supplied information and approval checklist

The following information must be confirmed by the owner. The template should remain useful while these items are pending, but unknown details must not be made up.

### Business identity

- [ ] Official logo and approved logo files
- [ ] Final brand colours, if already defined
- [ ] Approved tagline and homepage headline
- [ ] Official business name styling

### Gaming setup

- [x] PlayStation is the intended gaming platform direction
- [ ] Exact console model(s) and quantity
- [ ] Number of gaming stations
- [ ] Display / TV details, if the owner wants them published
- [ ] Controller and accessory details
- [ ] Actual game catalogue
- [ ] Multiplayer capability and supported player counts

### Venue and facilities

- [ ] Original venue photographs
- [ ] Permission to publish all photographs
- [ ] Approved venue description
- [ ] Seating and comfort details
- [ ] Facilities and amenities
- [ ] Accessibility information
- [ ] Parking or transport guidance, if available

### Commercial information

- [ ] Opening hours and weekly closing day
- [ ] Session rates
- [ ] Packages / bundles
- [ ] Membership or loyalty details, if offered
- [ ] Group or birthday packages, if offered
- [ ] Taxes, deposits and payment methods, if relevant
- [ ] Cancellation, late arrival and refund rules, if relevant

### Contact and operations

- [ ] Verify public address and map pin
- [ ] Verify phone and WhatsApp number
- [ ] Official social media links
- [ ] Who receives and responds to enquiries
- [ ] Expected response process
- [ ] Whether advance booking is required or optional

### Future events

- [ ] Which event types the business wants to run
- [ ] Who approves event copy and artwork
- [ ] Registration or enquiry process
- [ ] Event capacity and participation rules
- [ ] Event pricing and cancellation terms
- [ ] How ended events should be archived

---

## 15. Owner review and change-request register

Use this section during the owner meeting. Record each requested change before implementation.

| ID | Page / module | Owner feedback | Decision | Priority | Status |
|---|---|---|---|---|---|
| CCR-001 | Brand / Home | Pending owner review | Pending | High | Open |
| CCR-002 | Gaming Space | Pending owner review | Pending | High | Open |
| CCR-003 | Games | Pending owner review | Pending | High | Open |
| CCR-004 | Experiences | Pending owner review | Pending | Medium | Open |
| CCR-005 | Visit & Pricing | Pending owner review | Pending | High | Open |
| CCR-006 | Contact | Pending owner review | Pending | High | Open |
| CCR-007 | Future Events | Pending owner review | Pending | Later | Planned |

### Change workflow

1. Capture the owner's exact feedback.
2. Identify the page, section or reusable component affected.
3. Classify it as content, design, interaction, technical or new feature.
4. Check whether it changes other pages or shared components.
5. Update this blueprint first.
6. Get owner confirmation for the revised direction.
7. Implement the approved change.
8. Check desktop, tablet and mobile.
9. Test the affected routes and enquiry flows.
10. Record completion and the deployment commit.

### Decision log

| Version | Date | Decision / change | Approved by |
|---|---|---|---|
| 1.0 | 8 Nov 2026 | Initial owner-review website template | Pending owner review |

---

## 16. Definition of complete

The website template is ready for owner sign-off when:

- [ ] The six core pages have a clear purpose and a complete agreed section structure.
- [ ] The site reads as a PlayStation gaming café immediately.
- [ ] Navigation labels are clear and consistent.
- [ ] Each page has its own layout and appropriate content hierarchy.
- [ ] Every visible button and link has a defined action.
- [ ] Mobile, tablet and desktop layouts are reviewed.
- [ ] Controller image direction is compared and selected.
- [ ] Temporary imagery is clearly labelled and scheduled for replacement.
- [ ] No invented pricing, opening hours, game availability, facilities or reviews appear.
- [ ] Address, telephone and map pin are checked with the owner.
- [ ] The enquiry journey is explained as an enquiry, not an instant booking.
- [ ] Future event pages can be added without restructuring the six core pages.
- [ ] Accessibility, reduced-motion and performance checks pass.
- [ ] Production build and GitHub Pages deployment pass.
- [ ] Owner changes are recorded in the change-request register.

### Final sign-off

- Owner name: ______________________________
- Review date: ______________________________
- Approved page structure: Yes / No
- Approved visual direction: Yes / No
- Approved customer enquiry flow: Yes / No
- Outstanding changes: ______________________
- Final approval: ____________________________

---

## 17. Confirmed business facts currently used by the site

These are the currently supplied business details. The owner should verify them before final publication.

- **Business name:** The Crown Of Console
- **Address:** FF/1, Shakti Arcade, Above Kutchi King, Near ICICI Bank, Science City Road, Ahmedabad
- **Phone / WhatsApp:** +91 87995 08567
- **Gaming direction:** PlayStation

**Not yet confirmed:** official logo, actual venue photos, exact PlayStation model and station count, available games, rates, hours, facilities, capacity, booking policies, reviews and social profiles.

---

## Owner meeting summary

The proposal is a six-page premium PlayStation gaming café website with a clear customer journey, enquiry-first visit flow and a reusable design system. It is intentionally prepared to support seasonal pages and future business features without rebuilding the core website. The owner meeting should focus on validating the page structure and visual direction, then supplying the factual business information needed to replace the remaining placeholders.

**The blueprint is the review baseline. Owner feedback should be recorded here before corresponding website changes are implemented.**
