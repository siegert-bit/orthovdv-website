import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contactInfo } from '../data/mock';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
  </section>
);

export const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacyverklaring | Orthopedie Van de Voorde';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0e4b4c] text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-semibold">Orthopedie Van de Voorde</span>
          <Link to="/" className="text-sm underline hover:text-[#ffcc4f]">Terug naar de website</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacyverklaring</h1>
          <p className="text-sm text-gray-500 mb-10">Laatst bijgewerkt: november 2026</p>

          <Section title="Wie is verantwoordelijk voor uw gegevens?">
            <p>
              {contactInfo.company}, {contactInfo.address}<br />
              Ondernemingsnummer: {contactInfo.btw}<br />
              E-mail: <a className="underline" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a><br />
              Telefoon: {contactInfo.phone}
            </p>
          </Section>

          <Section title="Welke gegevens verzamel ik?">
            <p>
              Als u het aanvraagformulier invult, ontvang ik uw naam, e-mailadres, telefoonnummer,
              woonplaats en het bericht dat u zelf schrijft. Neemt u contact op via telefoon, WhatsApp
              of e-mail, dan ontvang ik de gegevens die u mij op die manier bezorgt.
            </p>
            <p>
              In uw bericht kunt u iets vertellen over uw voeten of uw gezondheid. Dat zijn gevoelige
              gegevens. U beslist zelf wat u deelt; een korte omschrijving volstaat.
            </p>
          </Section>

          <Section title="Waarvoor gebruik ik ze?">
            <p>
              Enkel om uw vraag te beantwoorden, een afspraak te maken en u daarna verder te helpen.
              Ik gebruik uw gegevens niet voor reclame en ik verkoop of verhuur ze nooit.
            </p>
            <p>
              Ik verwerk uw gegevens omdat u mij zelf een vraag stelt (stappen vóór een overeenkomst)
              en, voor wat u over uw gezondheid deelt, op basis van uw toestemming. Die toestemming
              kunt u altijd intrekken.
            </p>
          </Section>

          <Section title="Wie krijgt uw gegevens te zien?">
            <p>
              Alleen ikzelf. Om de website en het formulier te laten werken, gebruik ik technische
              dienstverleners die uw gegevens in mijn opdracht verwerken: een hostingbedrijf voor de
              website en de server en een dienst die de e-mails verstuurt. Uw aanvraag komt bij mij
              toe als e-mail en wordt niet in een aparte databank bewaard. Sommige van die bedrijven zijn gevestigd buiten de Europese Unie; zij
              bieden daarvoor de wettelijk vereiste waarborgen.
            </p>
          </Section>

          <Section title="Hoe lang bewaar ik ze?">
            <p>
              Aanvragen die niet tot een behandeling leiden, verwijder ik uiterlijk één jaar na ons
              laatste contact. Wordt u patiënt, dan bewaar ik uw dossier zolang de wet dat voorschrijft.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Deze website gebruikt geen cookies om u te volgen en geen advertenties. De lettertypes
              worden geladen via Google Fonts; daarbij wordt uw IP-adres technisch doorgegeven aan Google.
            </p>
          </Section>

          <Section title="Uw rechten">
            <p>
              U mag uw gegevens inkijken, laten verbeteren of laten verwijderen, en u mag uw
              toestemming intrekken. Stuur daarvoor een e-mail naar{' '}
              <a className="underline" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
              Ik antwoord binnen de maand.
            </p>
            <p>
              Bent u niet tevreden over hoe ik met uw gegevens omga, dan kunt u een klacht indienen bij
              de Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel
              (www.gegevensbeschermingsautoriteit.be).
            </p>
          </Section>

          <Link to="/" className="inline-block mt-2 text-[#0e4b4c] font-semibold underline">
            Terug naar de website
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
