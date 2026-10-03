'use client';

import { Lock } from 'lucide-react';
import type { AnalysisResult } from '@/lib/engine';
import { careers } from '@/lib/careers';

/** Texto de relleno para el desenfoque: no son carreras reales del catálogo. */
const PLACEHOLDERS = [
  'Licenciatura reservada',
  'Ruta profesional oculta',
  'Carrera de tu top 8',
  'Ingeniería o licenciatura',
  'Ruta afín a tu perfil',
  'Opción con universidades',
  'Carrera por desbloquear',
  'Ruta con plan de estudios',
];

/**
 * Teaser v4 — gratis el arquetipo completo. Las 8 rutas van bloqueadas:
 * el DOM solo lleva texto de relleno desenfocado y los % reales de afinidad,
 * nunca nombres, universidades ni sueldos de las carreras.
 */

export default function ResultTeaser({ analysis, nombre }: { analysis: AnalysisResult; nombre?: string }) {
  const { archetype, styles, matches, metrics } = analysis;
  const dominant = styles[0];
  const residual = styles[styles.length - 1];
  const saturadas = matches.filter((m) => !!m.career.saturation).length;

  return (
    <div className="space-y-10">
      {/* R1 · Revelación gratis */}
      <section>
        <p className="text-[14px] font-medium text-gris">{nombre ? `${nombre}, tu arquetipo es` : 'Tu arquetipo es'}</p>
        <h1 className="mt-1 font-serif text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl">{archetype.name}</h1>
        {archetype.powerWord && <p className="mt-2 font-serif text-xl italic text-rojo">{archetype.powerWord}</p>}
        <p className="mt-4 text-[17px] leading-relaxed text-tinta/85">{archetype.description}</p>
        {archetype.tradeoff && (
          <div className="mt-5 border-l-2 border-rojo pl-4">
            <p className="text-[14px] font-medium text-gris">Tu punto ciego</p>
            <p className="mt-1 text-[16px] leading-relaxed">{archetype.tradeoff}</p>
          </div>
        )}
        <dl className="mt-6 grid grid-cols-2 border-y border-linea">
          <div className="border-r border-linea py-3 pr-3">
            <dt className="text-[13px] text-gris">Tu dimensión más fuerte</dt>
            <dd className="mt-0.5 text-[17px] font-semibold">
              {dominant?.style} <span className="font-normal tabular-nums text-gris">{dominant?.intensity}%</span>
            </dd>
          </div>
          <div className="py-3 pl-3">
            <dt className="text-[13px] text-gris">La que más te cuesta</dt>
            <dd className="mt-0.5 text-[17px] font-semibold">
              {residual?.style} <span className="font-normal tabular-nums text-gris">{residual?.intensity}%</span>
            </dd>
          </div>
        </dl>
      </section>

      {/* R2 · Rutas bloqueadas: placeholders borrosos, NUNCA los nombres reales en el DOM */}
      <section>
        <p className="text-[14px] font-medium text-gris">Tus rutas, de {careers.length} analizadas</p>
        <h2 className="mt-1 font-serif text-[1.75rem] font-semibold leading-[1.12]">
          Tu ruta #1 ya está calculada. La #2 está a {metrics.separacionTop} {metrics.separacionTop === 1 ? 'punto' : 'puntos'}.
        </h2>
        {saturadas > 0 && (
          <p className="mt-2 text-[15px] leading-relaxed text-tinta/85">
            {saturadas === 1 ? '1 de tus rutas está' : `${saturadas} de tus ${matches.length} rutas están`} entre las carreras
            con más egresados en México (IMCO). El reporte evalúa viabilidad, riesgo y resistencia en esos mercados.
          </p>
        )}

        <div className="relative mt-5">
          <ol className="divide-y divide-linea border-y border-linea" aria-label="Rutas bloqueadas hasta el pago">
            {matches.map((m, i) => (
              <li key={i} className="flex min-h-14 items-center justify-between gap-3 py-2.5">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="w-7 shrink-0 text-[14px] tabular-nums text-gris">#{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block select-none truncate text-[16px] font-semibold blur-[7px]" aria-hidden="true">
                      {PLACEHOLDERS[i % PLACEHOLDERS.length]}
                    </span>
                    <span className="mt-0.5 block select-none truncate text-[12px] text-gris blur-[5px]" aria-hidden="true">
                      Universidades · plan de estudios · rango de referencia
                    </span>
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-[15px] tabular-nums">
                  {m.affinity}%<Lock className="h-3.5 w-3.5 text-gris-2" aria-hidden="true" />
                </span>
              </li>
            ))}
          </ol>
          {/* Cartel sobre la ruta #1 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[7.5rem] items-start justify-center pt-2">
            <a
              href="#pagar"
              className="pointer-events-auto flex items-center gap-2 border border-tinta bg-papel px-4 py-2.5 text-[15px] font-semibold shadow-[0_6px_18px_-8px_rgba(22,20,15,0.45)]"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              Tu ruta #1 está aquí · Desbloquear
            </a>
          </div>
        </div>
        <p className="mt-2 text-[13px] text-gris">
          Afinidad relativa a tu mejor ruta (la #1 vale 100). Los nombres, universidades y rangos se ven en tu reporte.
        </p>
      </section>
    </div>
  );
}
