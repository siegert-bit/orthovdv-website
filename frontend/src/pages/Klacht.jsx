import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { WhatsAppLogo } from '../components/WhatsAppLogo';
import { contactInfo } from '../data/mock';
import { klachten, getKlacht } from '../data/klachten';
import { VoetenHalluxValgus, SchoenTekening } from '../components/Illustraties';

const DEFAULT_TITLE = 'Orthopedie Van de Voorde | Maatwerk Schoenen aan Huis | orthovdv';

export const Klacht = () => {
  const { slug } = useParams();
  const klacht = getKlacht(slug);

  // Titel en omschrijving voor het tabblad en voor zoekmachines
  useEffect(() => {
    if (!klacht) return undefined;
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${klacht.title} | Orthopedie Van de Voorde`;
    const meta = document.querySelector('meta[name="description"]');
    const previous = meta ? meta.getAttribute('content') : null;
    if (meta) meta.setAttribute('content', klacht.summary);
    return () => {
      document.title = DEFAULT_TITLE;
      if (meta && previous !== null) meta.setAttribute('content', previous);
    };
  }, [klacht]);

  if (!klacht) return <Navigate to="/" replace />;

  const andere = klachten.filter((k) => k.slug !== klacht.slug);
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0e4b4c] text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="font-semibold hover:text-[#ffcc4f]">Orthopedie Van de Voorde</Link>
          <Link to="/#voor-wie" className="flex items-center gap-1 text-sm underline hover:text-[#ffcc4f]">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Terug naar de website
          </Link>
        </div>
        <div className="container mx-auto px-4 pb-12 pt-6 md:pb-16 md:pt-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              {klacht.subtitle}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{klacht.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto space-y-8">
          <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-10">
            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Wat is het?</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed text-lg">
                {klacht.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {klacht.illustratie === 'hallux-valgus' && <VoetenHalluxValgus />}
            </section>

            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{klacht.symptomsTitle}</h2>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                {klacht.symptoms.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#3bae75]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                Wat kan een schoen of steunzool doen?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">{klacht.helpIntro}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {klacht.help.map((h) => (
                  <div key={h.title} className="rounded-xl border-2 border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">{h.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{h.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-gray-700 leading-relaxed">
                Wat voor u de beste oplossing is, bekijk ik samen met u tijdens een voetanalyse bij u thuis.
              </p>
            </section>

            {klacht.shoeAdvice && klacht.shoeAdvice.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  Schoenadvies: waar let u op?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ook bij het kopen van gewone schoenen kunt u al veel doen. Let op deze punten:
                </p>
                <SchoenTekening
                  punten={klacht.shoeAdvice.map((a) => a.punt)}
                  afwikkelzool={klacht.afwikkelzool}
                />
                <ol className="space-y-3 text-gray-700 leading-relaxed">
                  {klacht.shoeAdvice.map((a, i) => (
                    <li key={a.punt} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ffcc4f] text-sm font-bold text-[#0e4b4c]">
                        {i + 1}
                      </span>
                      <span>{a.text}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="mb-10">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Eerst langs de arts</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Hebt u pijn of vindt u geen schoenen meer die passen? Bespreek het met uw arts. Die stelt
                  de diagnose en beslist welke behandeling voor u aangewezen is.
                </p>
                <p>
                  Voor de terugbetaling van orthopedische schoenen of steunzolen hebt u een voorschrift van
                  een arts-specialist nodig. Of u in aanmerking komt, hangt af van dat voorschrift en van de
                  goedkeuring door uw mutualiteit.{' '}
                  <Link to="/#tarieven" className="font-semibold text-[#0e4b4c] underline">
                    Bekijk tarieven en wie mag voorschrijven
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Ik kom bij u thuis</h2>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#3bae75]" />
                  <span><strong>Orthopedische schoenen:</strong> aan huis in heel België.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#3bae75]" />
                  <span>
                    <strong>Steunzolen:</strong> aan huis in de regio Lier, Nijlen, Berlaar, Putte,
                    Heist-op-den-Berg en Herenthout.
                  </span>
                </li>
              </ul>
            </section>
          </article>

          <section className="rounded-xl bg-[#0e4b4c] p-6 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Herkent u deze klachten?</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Neem vrijblijvend contact op. Ik bekijk graag samen met u wat mogelijk is.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/#contact"
                className="w-full sm:w-auto rounded-md bg-[#ffcc4f] px-6 py-3 font-semibold text-[#0e4b4c] hover:bg-[#fdcc55]"
              >
                Maak een afspraak
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex w-full sm:w-auto items-center justify-center rounded-md border-2 border-white px-6 py-3 font-semibold hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" aria-hidden />
                Bel mij
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full sm:w-auto items-center justify-center rounded-md border-2 border-white px-6 py-3 font-semibold hover:bg-white/10"
              >
                <WhatsAppLogo className="mr-2 h-5 w-5 shrink-0" aria-hidden />
                WhatsApp
              </a>
            </div>
          </section>

          {andere.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Lees ook</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {andere.map((k) => (
                  <Link
                    key={k.slug}
                    to={`/klachten/${k.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border-2 border-gray-200 bg-white p-5 hover:border-[#3bae75]"
                  >
                    <span>
                      <span className="block font-semibold text-gray-900">{k.title}</span>
                      <span className="block text-sm text-gray-600">{k.subtitle}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#0e4b4c]" aria-hidden />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="text-sm text-gray-500 leading-relaxed">
            Deze informatie is algemeen en vervangt het advies van uw arts niet.
          </p>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>{contactInfo.company} · RIZIV: {contactInfo.riziv} · {contactInfo.phone}</p>
          <p className="mt-2">
            <Link to="/" className="underline hover:text-white">Startpagina</Link>
            {' · '}
            <Link to="/privacy" className="underline hover:text-white">Privacyverklaring</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Klacht;
