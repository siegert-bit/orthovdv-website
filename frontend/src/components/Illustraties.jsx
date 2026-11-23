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
