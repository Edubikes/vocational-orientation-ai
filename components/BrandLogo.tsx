import Link from 'next/link';

/** Logo en texto puro: [ DESCIFRA ]. Enlaza al inicio. */
export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Descifra Tu Futuro — inicio"
      className={`inline-flex min-h-11 items-center whitespace-nowrap font-sans text-[15px] font-black uppercase tracking-widest text-tinta sm:text-[17px] ${className}`}
    >
      [ DESCIFRA ]
    </Link>
  );
}
