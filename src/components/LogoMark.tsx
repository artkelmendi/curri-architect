import { LOGO_PIECE_TOP, LOGO_PIECE_BOTTOM, LOGO_VIEWBOX, CURRI_LETTERS, ARCHITECT_LETTERS, WORDMARK_VIEWBOX, LOCKUP_VIEWBOX, FULL_LOGO_PATHS } from "./logo-artwork";
export { LOGO_PIECE_TOP, LOGO_PIECE_BOTTOM, LOGO_VIEWBOX, CURRI_LETTERS, ARCHITECT_LETTERS, WORDMARK_VIEWBOX, LOCKUP_VIEWBOX } from "./logo-artwork";

/** Exact outlined artwork from the supplied Curri Architects logo kit. */
export default function LogoMark({ className }: { className?: string }) {
  return <svg viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" fillRule="evenodd">
    <path d={LOGO_PIECE_TOP} /><path d={LOGO_PIECE_BOTTOM} />
  </svg>;
}
export function LogoWordmark({ className }: { className?: string }) {
  return <svg viewBox={WORDMARK_VIEWBOX} className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" fillRule="evenodd" data-brand="curri-architects">
    {[...CURRI_LETTERS, ...ARCHITECT_LETTERS].map((d, i) => <path key={i} d={d} />)}
  </svg>;
}
export function LogoFull({ className }: { className?: string }) {
  return <svg viewBox={LOCKUP_VIEWBOX} className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" data-brand="curri-architects">
    {FULL_LOGO_PATHS.map((d, i) => <path key={i} d={d} fill={i < 2 ? "#ff6600" : "currentColor"} />)}
  </svg>;
}
