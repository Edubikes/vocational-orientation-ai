'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CognitiveStyle } from '@/lib/questions';
import { careers, Career } from '@/lib/careers';
import { careerDetails, CareerDetail } from '@/lib/data_universities'; // Detailed data
import RadarChart from '@/components/RadarChart';
import Link from 'next/link';
import { ArrowLeft, Download, Trophy, DollarSign, MapPin, BookOpen, School, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

function ResultsContent() {
    const [profile, setProfile] = useState<Record<CognitiveStyle, number> | null>(null);
    const [topCareers, setTopCareers] = useState<{ career: Career; score: number; details?: CareerDetail }[]>([]);
    const [expandedCareer, setExpandedCareer] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedScores = localStorage.getItem('vocational_scores');
        if (!savedScores) {
            router.push('/test');
            return;
        }

        const parsedScores = JSON.parse(savedScores) as Record<CognitiveStyle, number>;
        setProfile(parsedScores);

        // Calculate matches
        const matches = careers.map(career => {
            let score = 0;
            Object.entries(career.weights).forEach(([style, weight]) => {
                if (parsedScores[style as CognitiveStyle]) {
                    score += weight * parsedScores[style as CognitiveStyle];
                }
            });

            // Find detailed info if available
            const details = careerDetails.find(d => d.name === career.name || d.id === career.name); // Simple match
            // Or fuzzy match:
            const fuzzyDetails = careerDetails.find(d => career.name.includes(d.name) || d.name.includes(career.name));

            return { career, score, details: details || fuzzyDetails };
        });

        matches.sort((a, b) => b.score - a.score);
        setTopCareers(matches.slice(0, 5)); // Just top 5 for detailed view

    }, [router]);

    if (!profile) return <div className="min-h-screen bg-[var(--background)] flex items-center justify-center text-[var(--primary)] font-bold">Calculando resultados...</div>;

    const topStyles = Object.entries(profile)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([style]) => style);

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans pb-20">
            {/* Header */}
            <header className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-[var(--background)]/90 backdrop-blur-md z-50 shadow-sm">
                <Link href="/" className="text-gray-400 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <span className="font-bold text-lg text-[var(--primary)]">Informe Vocacional</span>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors text-gray-700 font-medium"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar PDF</span>
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-4 pt-12 space-y-24">

                {/* Hero Summary */}
                <section className="text-center max-w-3xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-[var(--primary)] font-bold text-sm mb-4">
                            Resultados Oficiales
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Tu mente brilla en el pensamiento <span className="text-[var(--primary)]">{topStyles[0]}</span>.
                        </h1>
                        <p className="text-xl text-gray-500 leading-relaxed">
                            Hemos analizado tus 12 dimensiones cognitivas. Tu perfil indica una fuerte inclinación hacia carreras que requieren
                            <b> {topStyles[0].toLowerCase()}</b> y <b>{topStyles[1].toLowerCase()}</b>.
                        </p>
                    </motion.div>
                </section>

                {/* Charts & Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Mapa Cognitivo</h3>
                        <div className="aspect-square">
                            <RadarChart scores={profile} />
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-[var(--secondary)]">
                            <h4 className="font-bold text-gray-900 text-lg mb-2">Tu Superpoder: {topStyles[0]}</h4>
                            <p className="text-gray-600">
                                Tienes una habilidad natural para abordar problemas desde esta perspectiva.
                                Las empresas valoran tu capacidad para integrar esto en equipos de alto rendimiento.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                            <h4 className="font-bold text-gray-900 text-lg mb-2">Punto de Equilibrio: {topStyles[1]}</h4>
                            <p className="text-gray-600">
                                No solo te limitas a tu estilo principal, sino que lo complementas con un enfoque {topStyles[1].toLowerCase()}.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Detailed Career Investigation */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-2 h-8 bg-[var(--primary)] rounded-full"></div>
                        <h2 className="text-3xl font-bold text-gray-900">Tus Carreras Ideales (Con universidades)</h2>
                    </div>

                    <div className="space-y-6">
                        {topCareers.map((item, idx) => (
                            <motion.div
                                key={item.career.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl p-1 shadow-soft border border-gray-100"
                            >
                                <div
                                    className="p-6 md:p-8 cursor-pointer group"
                                    onClick={() => setExpandedCareer(expandedCareer === item.career.name ? null : item.career.name)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-bold text-[var(--primary)] text-xl shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.career.name}</h3>
                                                <p className="text-gray-500 text-sm hidden md:block">{item.career.description}</p>
                                                <div className="flex flex-wrap gap-4 mt-3 text-sm font-medium text-gray-500">
                                                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {item.career.salary} MXN</span>
                                                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">Alta Compatibilidad</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                            <div className="text-right">
                                                <span className="block text-2xl font-black text-[var(--primary)]">{Math.round((item.score / topCareers[0].score) * 100)}%</span>
                                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Match</span>
                                            </div>
                                            {expandedCareer === item.career.name ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedCareer === item.career.name && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="border-t border-gray-100 bg-gray-50/50 rounded-b-3xl overflow-hidden"
                                    >
                                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Universities */}
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <School className="w-5 h-5 text-gray-400" />
                                                    Universidades Destacadas
                                                </h4>
                                                {item.details ? (
                                                    <ul className="space-y-4">
                                                        {item.details.universities.map((uni, i) => (
                                                            <li key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                                <div className="font-bold text-gray-800">{uni.university.name}</div>
                                                                <div className="text-sm text-gray-500 flex justify-between mt-1">
                                                                    <span>{uni.university.type}</span>
                                                                    <span>{uni.university.location}</span>
                                                                </div>
                                                                <a href={uni.university.website} target="_blank" className="text-xs text-[var(--primary)] font-bold mt-2 inline-block hover:underline">Visitar Sitio Web →</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-400 italic text-sm">Información detallada de universidades no disponible para esta carrera específica en la base de datos de muestra.</p>
                                                )}
                                            </div>

                                            {/* Curriculum / Materias */}
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <BookOpen className="w-5 h-5 text-gray-400" />
                                                    Plan de Estudios (Materias Clave)
                                                </h4>
                                                {item.details && item.details.universities.length > 0 ? (
                                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                                        <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider font-bold">Ejemplo: {item.details.universities[0].university.name}</p>
                                                        <ul className="grid grid-cols-1 gap-2">
                                                            {item.details.universities[0].plan.map((materia, m) => (
                                                                <li key={m} className="text-sm text-gray-600 flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"></div>
                                                                    {materia}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-400 italic text-sm">Plan de estudios detallado no disponible.</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-10 font-bold text-gray-400">Analizando respuestas...</div>}>
            <ResultsContent />
        </Suspense>
    );
}
