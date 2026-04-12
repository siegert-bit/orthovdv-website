import { GiRunningShoe } from 'react-icons/gi';
import { BsLayersHalf } from 'react-icons/bs';
import { MdDirectionsWalk } from 'react-icons/md';

/**
 * Dienst-iconen via react-icons (bredere set dan Lucide voor schoen/zool/loop).
 * `name` komt overeen met `service.icon` in mock.js.
 */
export function ServiceIcon({ name, className }) {
  const cn = className ?? 'h-7 w-7 text-[#0e4b4c] transition-colors group-hover:text-white';

  switch (name) {
    case 'shoe':
      return <GiRunningShoe className={cn} aria-hidden />;
    case 'layers':
      return <BsLayersHalf className={cn} aria-hidden />;
    case 'footprints':
      return <MdDirectionsWalk className={cn} aria-hidden />;
    default:
      return null;
  }
}
