import Link from 'next/link';
import { SOURCES_LIST } from '@/lib/sources';

export default function SiteFooter({ showSources = true }: { showSources?: boolean }) {
  return (
    <footer className="border-t border-linea bg-papel px-5 pb-10 pt-8 text-sm text-gris md:px-10">
      <div className="mx-auto max-w-5xl">
        {showSources && (
          <details className="group border-b border-linea pb-5">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-medium text-tinta">
              Fuentes de los datos de esta página
              <span className="text-gris-2 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <ol className="mt-3 space-y-2 text-[13px] leading-relaxed">
              {SOURCES_LIST.map((f, i) => (
                <li key={f.text}>
                  <span className="mr-1 text-gris-2">{i + 1}.</span> {f.text}.{' '}
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline decoration-linea underline-offset-2 hover:text-tinta">
                    {f.source}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-lg text-tinta">Descifra Tu Futuro</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/aviso-de-privacidad" className="underline decoration-linea underline-offset-4 hover:text-tinta">
              Aviso de privacidad
            </Link>
            <Link href="/test" className="underline decoration-linea underline-offset-4 hover:text-tinta">
              Hacer el test
            </Link>
          </nav>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-gris-2">
          Herramienta de orientación basada en un modelo propio de preferencias de pensamiento. No es un diagnóstico
          ni sustituye la asesoría de un orientador. Las fotografías son ilustrativas. © {new Date().getFullYear()} Descifra Tu Futuro.
        </p>
      </div>
    </footer>
  );
}
