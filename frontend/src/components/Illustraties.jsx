// Eenvoudige schematische tekeningen bij de klachtenpagina's.
// Het zijn vereenvoudigde schema's, geen anatomisch exacte tekeningen.

const GROEN = '#0e4b4c';
const LICHT = '#e2f3ea';
const GEEL = '#ffcc4f';

const Teen = ({ cx, cy, w, h, hoek = 0, draai }) => (
  <rect
    x={cx - w / 2}
    y={cy - h / 2}
    width={w}
    height={h}
    rx={w / 2}
    fill={LICHT}
    stroke={GROEN}
    strokeWidth="2.5"
    transform={`rotate(${hoek} ${draai ? draai[0] : cx} ${draai ? draai[1] : cy + h / 2})`}
  />
);

const Voet = ({ scheef }) => (
  <g>
    {/* kleine tenen */}
    <Teen cx={scheef ? 70 : 67} cy={44} w={18} h={42} hoek={scheef ? 10 : 4} />
    <Teen cx={86} cy={54} w={16} h={36} hoek={9} />
    <Teen cx={100} cy={66} w={15} h={30} hoek={13} />
    <Teen cx={111} cy={80} w={14} h={24} hoek={17} />
    {/* grote teen */}
    {scheef ? (
      <Teen cx={36} cy={50} w={30} h={58} hoek={27} draai={[34, 86]} />
    ) : (
      <Teen cx={40} cy={44} w={30} h={58} hoek={3} />
    )}
    {/* voet zelf */}
    <path
      d={
        scheef
          ? 'M60 258 C35 258 28 235 32 205 C35 178 27 150 15 124 C5 104 10 82 30 74 L50 68 L102 86 C116 94 117 116 113 140 C107 180 101 205 97 228 C93 250 80 258 60 258 Z'
          : 'M60 258 C35 258 28 235 32 205 C35 175 26 140 24 108 C23 88 30 72 46 67 L102 86 C116 94 117 116 113 140 C107 180 101 205 97 228 C93 250 80 258 60 258 Z'
      }
      fill={LICHT}
      stroke={GROEN}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* stand van de grote teen */}
    {scheef ? (
      <>
        <circle cx={17} cy={100} r={17} fill={GEEL} fillOpacity="0.55" stroke={GEEL} strokeWidth="2" />
        <polyline
          points="46,190 26,100 58,34"
          fill="none"
          stroke={GROEN}
          strokeWidth="2.5"
          strokeDasharray="6 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <line
        x1={44}
        y1={190}
        x2={39}
        y2={30}
        stroke={GROEN}
        strokeWidth="2.5"
        strokeDasharray="6 5"
        strokeLinecap="round"
      />
    )}
  </g>
);

export const VoetenHalluxValgus = () => (
  <figure className="my-6">
    <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
      <div className="text-center">
        <svg viewBox="-10 5 140 265" className="mx-auto h-56 w-auto" role="img" aria-label="Voet van bovenaf met een rechte grote teen">
          <Voet />
        </svg>
        <p className="mt-2 text-sm font-semibold text-gray-900">Rechte stand</p>
      </div>
      <div className="text-center">
        <svg viewBox="-10 5 140 265" className="mx-auto h-56 w-auto" role="img" aria-label="Voet van bovenaf met een scheve grote teen en een knobbel aan de binnenkant">
          <Voet scheef />
        </svg>
        <p className="mt-2 text-sm font-semibold text-gray-900">Hallux valgus</p>
      </div>
    </div>
    <figcaption className="mt-2 text-sm text-gray-500">
      Vereenvoudigde tekening van een rechtervoet, van bovenaf gezien. Geel: de knobbel ter hoogte van het gewricht.
    </figcaption>
  </figure>
);

// Plaats van de genummerde punten op de schoen
const PUNTEN = {
  voorvoet: [322, 141],
  ruimte: [292, 132],
  bovenmateriaal: [262, 130],
  sluiting: [205, 110],
  binnenzool: [150, 147],
  hielkap: [66, 122],
  hak: [92, 176],
  demping: [92, 177],
  zool: [222, 176],
  ronding: [334, 174],
};

export const SchoenTekening = ({ punten = [], afwikkelzool = false }) => (
  <figure className="my-6">
    <div className="rounded-xl bg-gray-50 p-4">
      <svg viewBox="20 55 370 150" className="mx-auto w-full max-w-lg" role="img" aria-label="Schoen van opzij met genummerde aandachtspunten">
        {/* grond */}
        <line x1="24" y1={afwikkelzool ? 191 : 187} x2="386" y2={afwikkelzool ? 191 : 187} stroke="#cbd5d1" strokeWidth="2" strokeLinecap="round" />
        {/* zool */}
        <path
          d={
            afwikkelzool
              ? 'M40 160 H368 C368 172 345 184 290 190 H90 C60 190 42 180 40 160 Z'
              : 'M40 160 H366 Q372 184 350 186 H250 Q200 176 150 180 V186 H46 Q38 186 40 160 Z'
          }
          fill={GROEN}
          stroke={GROEN}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* schoen */}
        <path
          d="M48 160 C40 130 44 95 64 76 Q108 106 150 74 C190 88 235 108 280 118 C320 124 352 136 362 160 Z"
          fill={LICHT}
          stroke={GROEN}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* hielkap */}
        <path d="M48 160 C40 130 44 95 64 76 Q76 86 90 90 C84 112 86 138 96 160 Z" fill={GROEN} fillOpacity="0.18" />
        {/* sluiting: twee klittenbanden */}
        <path d="M165 80 L187 88 L177 117 L155 109 Z" fill="#fff" stroke={GROEN} strokeWidth="2" strokeLinejoin="round" />
        <path d="M199 92 L221 100 L211 129 L189 121 Z" fill="#fff" stroke={GROEN} strokeWidth="2" strokeLinejoin="round" />
        {/* uitneembare binnenzool */}
        <path d="M60 153 H340" stroke={GROEN} strokeWidth="2.5" strokeDasharray="7 5" strokeLinecap="round" />
        {/* genummerde punten */}
        {punten.map((naam, i) => {
          const p = PUNTEN[naam];
          if (!p) return null;
          return (
            <g key={naam}>
              <circle cx={p[0]} cy={p[1]} r="11" fill={GEEL} stroke="#fff" strokeWidth="2" />
              <text x={p[0]} y={p[1] + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={GROEN}>
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
    <figcaption className="mt-2 text-sm text-gray-500">
      Vereenvoudigde tekening. De cijfers verwijzen naar de punten hieronder.
    </figcaption>
  </figure>
);
