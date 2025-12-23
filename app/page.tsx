'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, User, UserCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-hidden">

      {/* Navbar placeholder */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl text-[var(--primary)]">
          <UserCircle className="w-8 h-8" />
          <span>Vocational.co</span>
        </div>
        <button className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-full font-bold shadow-soft hover:opacity-90 transition-opacity flex items-center gap-2">
          Comenzar test <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-20 flex flex-col md:flex-row items-center gap-12">

        <div className="flex-1 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              Descubre tu carrera
              <br />
              <span className="text-[var(--primary)]">profesional ideal</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mb-8">
              Descubre cuál es tu carrera profesional ideal según tu personalidad, estilos de pensamiento y aptitudes.
            </p>

            <div className="space-y-4">
              <p className="font-bold text-lg text-gray-800">Para empezar, elige tu género:</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/test" className="flex-1 min-w-[160px] max-w-[200px]">
                  <button className="w-full py-4 rounded-lg bg-[var(--primary)] text-white font-bold text-lg shadow-soft hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    <span>♂</span> Hombre
                  </button>
                </Link>
                <Link href="/test" className="flex-1 min-w-[160px] max-w-[200px]">
                  <button className="w-full py-4 rounded-lg bg-[#cd5eb7] text-white font-bold text-lg shadow-soft hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    <span>♀</span> Mujer
                  </button>
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-2">* El test es idéntico, solo ajustamos los ejemplos visuales.</p>
            </div>
          </motion.div>
        </div>

        {/* Hero Image / Mockup */}
        <div className="flex-1 relative w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 w-[300px] h-[600px] bg-white rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

            {/* Phone Screen Mockup */}
            <div className="flex-1 bg-[var(--background)] p-6 pt-12 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-[var(--primary)] flex items-center gap-1"><UserCircle className="w-4 h-4" /> V.co</span>
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <div className="w-[45%] h-full bg-[var(--primary)]"></div>
              </div>

              <div className="space-y-6 flex-1">
                <div className="space-y-2 text-center">
                  <h3 className="font-bold text-gray-800">Elige en qué medida te refleja cada afirmación.</h3>
                </div>

                <div className="flex justify-between px-2">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-gray-200 ${i === 4 ? 'bg-[var(--primary)] border-[var(--primary)]' : ''}`}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>Totalmente<br />en desacuerdo</span>
                  <span className="text-right">Totalmente<br />de acuerdo</span>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
                  <p className="text-sm text-gray-600 font-medium">Me muevo bien en entornos que me dan libertad.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-600 font-medium">Busco constantemente formas de mejorar.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ambient Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute  bottom-0 right-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
        </div>

      </main>
      {/* Social Proof & Authority Section (Neuromarketing) */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">+50,000</h3>
            <p className="text-gray-500 font-medium">Estudiantes Orientados</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">98%</h3>
            <p className="text-gray-500 font-medium">Precisión en Resultados</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[var(--primary)] mb-2">4.9/5</h3>
            <p className="text-gray-500 font-medium">Satisfacción Garantizada</p>
          </div>
        </div>

        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Respaldado por la Ciencia Cognitiva</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[var(--background)] rounded-2xl shadow-soft">
              <div className="text-4xl mb-4">🧠</div>
              <h4 className="font-bold mb-2">Neurociencia Aplicada</h4>
              <p className="text-sm text-gray-500">Basado en modelos de procesamiento cognitivo y plasticidad cerebral.</p>
            </div>
            <div className="p-6 bg-[var(--background)] rounded-2xl shadow-soft">
              <div className="text-4xl mb-4">🧬</div>
              <h4 className="font-bold mb-2">Psicometría Moderna</h4>
              <p className="text-sm text-gray-500">Algoritmos calibrados para detectar patrones subconscientes de talento.</p>
            </div>
            <div className="p-6 bg-[var(--background)] rounded-2xl shadow-soft">
              <div className="text-4xl mb-4">📈</div>
              <h4 className="font-bold mb-2">Big Data Vocacional</h4>
              <p className="text-sm text-gray-500">Cruzamos tu perfil con datos reales de éxito profesional en México.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
