# Product Requirements Document - Orthopedie Van de Voorde Landing Page

## Originele Probleemstelling
Bouw een professionele landing page voor orthopedisch schoentechnoloog praktijk in België met focus op exclusieve service aan huis voor OSA/OSB orthopedische schoenen.

## Gebruikerspersona's
- **Primair**: Mensen met voetproblemen die orthopedische schoenen nodig hebben (OSA/OSB)
- **Secundair**: Familie/verzorgers die hulp zoeken voor personen met mobiliteitsproblemen
- **Locatie**: Door heel België, geen afstandsbeperking

## Core Requirements
### Functionele Vereisten
1. Landing page met professionele medische uitstraling
2. Kleurenschema: Diep blauw/teal (#0A4D68, #1E6F8C) en wit
3. SEO geoptimaliseerd voor:
   - "orthopedische schoenen aan huis België"
   - "maatwerk schoenen op locatie"
   - "orthopedisch schoentechnoloog aan huis"

### Sectievereisten
- Hero sectie met USP (Service aan huis door heel België)
- Over Mij sectie met profielfoto en credentials
- Diensten sectie (focus OSA/OSB)
- Service aan Huis (USP) sectie
- Werkwijze sectie (3 stappen)
- Contact sectie met formulier en directe contactopties

### Contact Functionaliteit
- WhatsApp integratie (+32472917918)
- Bel-mij knop (telefoon)
- E-mail knop (siegert@orthovdv.be)
- Contactformulier (frontend-only met mock data)

## Wat Is Geïmplementeerd (December 2025)

### ✅ Frontend (Volledig Geïmplementeerd)
**Datum**: December 2025

**Technologie Stack**:
- React 19 met React Router
- Tailwind CSS voor styling
- Shadcn/UI componenten
- Inter font (Google Fonts)
- Lucide React icons

**Bestanden Aangemaakt**:
1. `/app/frontend/src/pages/Home.jsx` - Hoofd landing page component
2. `/app/frontend/src/data/mock.js` - Mock data en form handler
3. `/app/frontend/src/App.js` - Bijgewerkt voor nieuwe routing
4. `/app/frontend/src/index.css` - Inter font toegevoegd
5. `/app/frontend/src/App.css` - Custom animaties en transities

**Secties Geïmplementeerd**:
1. ✅ **Header**: Sticky navigatie met logo, menu links, WhatsApp en Bel-knop
2. ✅ **Hero**: Teal gradient achtergrond, hoofdboodschap, 2 CTAs, trust indicators
3. ✅ **Over Mij**: Profielfoto met teal accent, tekst, RIZIV/adres credentials
4. ✅ **Diensten**: 3 service cards (OSA, OSB, Voetanalyse) met icons
5. ✅ **Service aan Huis (USP)**: Afbeelding + 3 USP punten met icons
6. ✅ **Werkwijze**: 3 genummerde stappen, 2 proces afbeeldingen
7. ✅ **Contact**: Formulier + directe contact cards + praktijkadres
8. ✅ **Footer**: Logo, contactinfo, professionele gegevens, copyright

**Functionaliteiten**:
- ✅ Smooth scroll navigatie
- ✅ WhatsApp integratie (opent WhatsApp met vooraf ingesteld nummer)
- ✅ Click-to-call telefoon functionaliteit
- ✅ Click-to-email functionaliteit
- ✅ Contact formulier met validatie (mock submission)
- ✅ Toast notificaties (Sonner)
- ✅ Responsive design (desktop + mobiel getest)
- ✅ Hover effecten en micro-animaties

**Assets Gebruikt**:
- Van de Voorde logo (geüpload)
- Profielfoto Siegert (geüpload)
- Unsplash afbeeldingen voor orthopedische schoenen, home healthcare, voetmetingen

**Contact Details Geïntegreerd**:
- Naam: Siegert Van de Voorde
- Email: siegert@orthovdv.be
- Telefoon: +32472917918
- RIZIV: 101546-46 001
- BTW: BE 1021.586.776
- Adres: Antwerpsesteenweg 29 bus 7, 2500 Lier

## Geprioriteerde Backlog

### P0 - Volgende Fase
- [ ] Backend API ontwikkeling voor contactformulier
- [ ] Email service integratie voor formulier submissions
- [ ] Database opslag voor contactaanvragen

### P1 - Verbeteringen
- [ ] Google Analytics integratie
- [ ] Google Maps integratie voor praktijklocatie
- [ ] Testimonials/reviews sectie
- [ ] FAQ sectie (veelgestelde vragen)
- [ ] Blog/nieuws sectie voor SEO

### P2 - Toekomstige Features
- [ ] Meertaligheid (Nederlands + Frans)
- [ ] Online afspraak booking systeem
- [ ] Photo gallery van maatwerk schoenen
- [ ] Voor/na foto's (met privacy consent)
- [ ] Terugbetaling RIZIV calculator

## Technische Notities

### Design Guidelines Gevolgd
- ✅ Teal/wit kleurenschema (geen purple/pink gradients)
- ✅ Inter font (geen system-ui)
- ✅ Lucide React icons (geen emoji icons)
- ✅ Shadcn UI components gebruikt
- ✅ Professionele medische uitstraling
- ✅ Micro-animaties en hover states
- ✅ Generous whitespace
- ✅ Responsive design

### SEO Overwegingen (Nog Te Implementeren)
- [ ] Meta tags optimalisatie
- [ ] Structured data (Schema.org)
- [ ] Sitemap generatie
- [ ] Robots.txt configuratie
- [ ] Open Graph tags voor social sharing

## Volgende Taken
1. Gebruiker testen laten de frontend bekijken en feedback verzamelen
2. Bij goedkeuring: backend ontwikkeling starten
3. Email service configureren (SendGrid/Mailgun)
4. Database schema ontwerpen voor contact requests
5. Admin dashboard voor aanvragen beheer (optioneel)

## Business Enhancement Suggestie
**Conversie Optimalisatie**: Overweeg een "Gratis voetanalyse bij eerste huisbezoek" actie toe te voegen aan de hero sectie om meer leads te genereren en de drempel voor eerste contact te verlagen.
