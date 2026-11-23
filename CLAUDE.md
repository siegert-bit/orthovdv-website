# Website orthovdv.be

Lees dit eerst. Dit zijn de afspraken voor iedereen (ook elke Claude-sessie) die aan deze website werkt.

## Over de eigenaar
- Siegert Van de Voorde, orthopedisch schoentechnoloog, zaak **Ortho VdV BV**.
- Geen programmeur. Leg alles eenvoudig uit, in het Nederlands, zonder vakjargon.
- Deze opslagplaats is **openbaar**. Zet er nooit wachtwoorden, sleutels of gegevens van patiënten in.

## Zo werk je
1. **Haal eerst de laatste versie op** (`git pull`) voordat je iets wijzigt. Er wordt zowel op de pc als via de gsm (cloud) gewerkt.
2. **Alles wat op `main` komt, staat ongeveer twee minuten later online** op orthovdv.be. De website en de server halen wijzigingen automatisch op.
3. Stuur daarom **niets naar `main` zonder dat Siegert het uitdrukkelijk vraagt**. Werk op een aparte tak, vertel wat er veranderd is en wacht op zijn ja.
4. Controleer voor het versturen dat de site nog bouwt (`yarn build` in `frontend`).
5. Zeg eerlijk wat je niet hebt kunnen testen.

## Opbouw
- `frontend/` – de website (React, Tailwind, craco). Eén pagina: `src/pages/Home.jsx`. Privacyverklaring: `src/pages/Privacy.jsx`.
- `frontend/src/data/klachten.js` – de teksten over klachten (blok "Voor wie?" op de startpagina en de pagina's `/klachten/...`, opgebouwd door `src/pages/Klacht.jsx`). Een klacht toevoegen = daar een blok bijzetten. Medische uitleg altijd door Siegert laten nalezen; geen diagnoses of beloftes.
- `frontend/src/data/mock.js` – naam, adres, e-mail, telefoon, btw-nummer, RIZIV-nummer en de teksten van diensten en werkwijze. **Pas contactgegevens hier aan**, niet op tien plaatsen.
- `frontend/public/images/` – foto's en logo's.
- `backend/` – kleine Python-server (FastAPI) op Render. Doet één ding: het contactformulier per e-mail doorsturen (via Resend). Er is **geen database**; dat is bewust.
- Instellingen en sleutels staan in `.env`-bestanden die niet in deze opslagplaats zitten, en bij Render onder Environment.

Lokaal bekijken: in `frontend` eerst `yarn install`, dan `yarn start` (opent op localhost:3000).

## Inhoudelijke afspraken (niet ongevraagd wijzigen)
- **Geen winkel of praktijk.** Siegert komt altijd aan huis. Nooit "praktijk" of "praktijkadres" schrijven; het adres is de maatschappelijke zetel.
- **Orthopedische schoenen:** aan huis in heel België.
- **Steunzolen:** aan huis, enkel in de regio Lier, Nijlen, Berlaar, Putte, Heist-op-den-Berg en Herenthout.
- **Tarieven:** bij schoenen het remgeld per categorie; bij steunzolen enkel de terugbetaling van de mutualiteit. **De eigen prijs van steunzolen niet vermelden.**
- **Geen wachttijden of levertermijnen** op de website.
- **Voorschrijvers:** de lijst specialisten komt uit artikel 29/1 van de RIZIV-nomenclatuur (versie 01/07/2025). Enkel aanpassen op basis van de officiële tekst.
- Bedragen en nummers nooit uit het hoofd invullen: navragen of opzoeken in een officiële bron.
- "Al jarenlang" bij Over mij klopt (ervaring van vóór de eigen zaak).
- Emergent (het platform waarmee de site ooit gestart is) is verwijderd. Niets ervan terugzetten.

## Privacy en veiligheid
- Het formulier kan gezondheidsgegevens bevatten. Niets daarvan bewaren, loggen of in testbestanden zetten.
- Geen volgscripts, analysetools of cookies toevoegen zonder dat Siegert het vraagt; de privacyverklaring zegt dat er geen zijn.
- `.env`-bestanden nooit meesturen. Sleutels nooit tonen of in een gesprek plakken.
- Geen adres maken waarop ingestuurde aanvragen op te vragen zijn.

## Nog te doen
- Echte foto's in plaats van de twee logo-vakken onder "Hoe het werkt".
- Bevestigingsmail naar de bezoeker werkt nog niet (vermoedelijk het domein bij Resend verifiëren).
- Eventueel een bescheiden link naar comfortschoenendelelie.be (Siegerts andere zaak).
- Profielfoto verkleinen (nu 1,5 MB).
