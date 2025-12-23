'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CognitiveStyle } from '@/lib/questions';
import { careers, Career } from '@/lib/careers';
import { careerDetails, CareerDetail } from '@/lib/data_universities'; // Detailed data
import { archetypes, Archetype, determineArchetype } from '@/lib/archetypes';
import RadarChart from '@/components/RadarChart';
import Link from 'next/link';
import { ArrowLeft, Download, Trophy, DollarSign, MapPin, BookOpen, School, ChevronDown, ChevronUp, Zap, ShieldAlert, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

function ResultsContent() {
    const [profile, setProfile] = useState<Record<CognitiveStyle, number> | null>(null);
    const [topCareers, setTopCareers] = useState<{ career: Career; score: number; details?: CareerDetail }[]>([]);
    const [expandedCareer, setExpandedCareer] = useState<string | null>(null);
    const [archetype, setArchetype] = useState<Archetype | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedScores = localStorage.getItem('vocational_scores');
        if (!savedScores) {
            router.push('/test');
            return;
        }

        const parsedScores = JSON.parse(savedScores) as Record<CognitiveStyle, number>;
        setProfile(parsedScores);
        setArchetype(determineArchetype(parsedScores));

        // Calculate matches
        const matches = careers.map(career => {
            let score = 0;
            Object.entries(career.weights).forEach(([style, weight]) => {
                if (parsedScores[style as CognitiveStyle]) {
                    // Exponential scoring to reward peaks (uniqueness) over averages
                    // Logic: (UserScore^1.2) * Weight
                    score += (Math.pow(parsedScores[style as CognitiveStyle], 1.2)) * weight;
                }
            });

            const details = careerDetails.find(d => d.name === career.name || d.id === career.name);
            // Fuzzy match
            const fuzzyDetails = careerDetails.find(d => career.name.includes(d.name) || d.name.includes(career.name));

            return { career, score, details: details || fuzzyDetails };
        });

        matches.sort((a, b) => b.score - a.score);
        setTopCareers(matches.slice(0, 8)); // Show top 8 now

    }, [router]);

    if (!profile || !archetype) return <div className="min-h-screen bg-[var(--background)] flex items-center justify-center text-[var(--primary)] font-bold">Descifrando tu ADN vocacional...</div>;

    const stylesEntries = Object.entries(profile).sort(([, a], [, b]) => b - a);
    const topStyles = stylesEntries.slice(0, 3).map(([style]) => style);
    const bottomStyle = stylesEntries[stylesEntries.length - 1][0];

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans pb-20">
            {/* Header */}
            <header className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-[var(--background)]/90 backdrop-blur-md z-50 shadow-sm">
                <Link href="/" className="text-gray-400 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <span className="font-bold text-lg text-[var(--primary)]">Tu "Wrapped" Vocacional</span>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors text-gray-700 font-medium"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar PDF</span>
                </button>
            </header>

            <main className="max-w-5xl mx-auto px-4 pt-12 space-y-24">

                {/* HERO: ARCHETYPE REVEAL (Spotify Wrapped Style) */}
                <section className="text-center max-w-4xl mx-auto space-y-8 relative">
                    {/* Background Flair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block"
                    >
                        <div className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Tu Arquetipo Mental</div>
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mb-6 leading-tight">
                            {archetype.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                            {archetype.description}
                        </p>
                    </motion.div>

                    {/* Power Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 bg-white rounded-3xl shadow-soft border border-gray-100"
                        >
                            <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 text-lg">Tu Mantra</h3>
                            <p className="text-2xl font-black text-[var(--primary)] mt-2">"{archetype.powerWord}"</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 bg-white rounded-3xl shadow-soft border border-gray-100"
                        >
                            <Trophy className="w-10 h-10 text-[var(--primary)] mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 text-lg">Tu Top 1</h3>
                            <p className="text-2xl font-black text-gray-800 mt-2">{topStyles[0]}</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 bg-white rounded-3xl shadow-soft border border-gray-100"
                        >
                            <ShieldAlert className="w-10 h-10 text-red-400 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 text-lg">Tu Anti-Estilo</h3>
                            <p className="text-2xl font-black text-gray-400 mt-2 line-through décoration-2">{bottomStyle}</p>
                        </motion.div>
                    </div>
                </section>

                {/* Deep Analysis (Radar Chart) */}
                <section className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">El Mapa de tu Cerebro</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                No eres promedio. Tu combinación de <b>{topStyles[0]}</b> y <b>{topStyles[1]}</b> te hace único/a.
                                Mientras la mayoría se especializa en una cosa, tú tienes la capacidad de integrar {archetype.powerWord.toLowerCase()}.
                            </p>
                            <ul className="space-y-4">
                                {topStyles.map((style, i) => (
                                    <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary)] text-white font-bold">{i + 1}</span>
                                        <span className="text-lg font-bold text-gray-800">{style}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <RadarChart scores={profile} />
                        </div>
                    </div>
                </section>

                {/* Detailed Career Investigation */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-2 h-8 bg-[var(--secondary)] rounded-full"></div>
                        <h2 className="text-3xl font-bold text-gray-900">Tu Futuro (Top 8 Selecciones)</h2>
                    </div>

                    <div className="space-y-6">
                        {topCareers.map((item, idx) => (
                            <motion.div
                                key={item.career.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl p-1 shadow-soft border border-gray-100 transition-all hover:shadow-lg"
                            >
                                <div
                                    className="p-6 md:p-8 cursor-pointer group"
                                    onClick={() => setExpandedCareer(expandedCareer === item.career.name ? null : item.career.name)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 transition-colors ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-50 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white'}`}>
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.career.name}</h3>
                                                <p className="text-gray-500 text-sm hidden md:block">{item.career.description}</p>
                                                <div className="flex flex-wrap gap-4 mt-3 text-sm font-medium text-gray-500">
                                                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {item.career.salary} MXN</span>
                                                    {idx === 0 && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1"><Sparkles className="w-3 h-3" /> Top Match</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                            <div className="text-right">
                                                <span className="block text-2xl font-black text-[var(--primary)]">{Math.round((item.score / topCareers[0].score) * 100)}%</span>
                                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Afinidad</span>
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
                                                <p className="text-sm text-gray-500 mb-4">{item.career.universities}</p>
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
                                                    <p className="text-gray-400 italic text-sm">Mostrando datos generales. Para detalles específicos de plan de estudios, consulta directamente con las universidades sugeridas.</p>
                                                )}
                                            </div>

                                            {/* Curriculum / Materias */}
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <BookOpen className="w-5 h-5 text-gray-400" />
                                                    Lo que estudiarás (Ejemplo)
                                                </h4>
                                                {item.details && item.details.universities.length > 0 ? (
                                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                                        <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider font-bold">Plan Típico</p>
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
                                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                                        <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider font-bold">Materias Comunes</p>
                                                        <p className="text-sm text-gray-600">Dependiendo de la universidad, encontrarás materias enfocadas en:</p>
                                                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                                                            <li>Fundamentos de {item.career.name}</li>
                                                            <li>Proyectos Prácticos</li>
                                                            <li>Ética y Legislación</li>
                                                            <li>Tecnología Aplicada</li>
                                                        </ul>
                                                    </div>
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
