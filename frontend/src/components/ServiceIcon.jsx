import { TbShoe } from 'react-icons/tb';
import { GiFootprint, GiMagnifyingGlass } from 'react-icons/gi';

/** `name` = `service.icon` in mock.js: shoe | layers | footprints */
export function ServiceIcon({ name, className }) {
  const cn = className ?? 'h-7 w-7 text-[#0e4b4c] transition-colors group-hover:text-white';

  switch (name) {
    case 'shoe':
      return <TbShoe className={cn} aria-hidden />;
    case 'layers':
      return <GiFootprint className={cn} aria-hidden />;
    case 'footprints':
      return <GiMagnifyingGlass className={cn} aria-hidden />;
    default:
      return null;
  }
}
