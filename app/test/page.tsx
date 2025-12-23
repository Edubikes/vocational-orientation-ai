'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { questions, CognitiveStyle } from "@/lib/questions";
import { useRouter } from "next/navigation";

export default function TestPage() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    const handleOptionSelect = (optionId: string) => {
        setAnswers(prev => ({ ...prev, [question.id]: optionId }));
        // Auto advance after short delay for smoother flow? No, let user click next or manual. 
        // Actually, Likert tests usually auto-advance or have big next buttons.
        // Let's stick to manual "Siguiente" for clarity, or auto-advance if it feels right.
        // Given the scenario/text options, manual is better so they can read what they picked.
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            finishTest();
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const finishTest = () => {
        const finalScores: Record<CognitiveStyle, number> = {
            'Analítico': 0, 'Creativo': 0, 'Práctico': 0, 'Detallista': 0,
            'Abstracto': 0, 'Crítico': 0, 'Colaborativo': 0, 'Sistémico': 0,
            'Intuitivo': 0, 'Conceptual': 0, 'Emocional': 0, 'Reflexivo': 0
        };

        questions.forEach(q => {
            const answerId = answers[q.id];
            const selectedOption = q.options.find(opt => opt.id === answerId);
            if (selectedOption && selectedOption.scores) {
                Object.entries(selectedOption.scores).forEach(([style, points]) => {
                    finalScores[style as CognitiveStyle] += points || 0;
                });
            }
        });

        localStorage.setItem('vocational_scores', JSON.stringify(finalScores));
        router.push('/checkout');
    };

    const isAnswered = !!answers[question.id];

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col items-center pt-10 pb-20 px-4">

            {/* Header / Progress */}
            <div className="w-full max-w-2xl mb-12">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                    <span>Paso {currentQuestionIndex + 1} de {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[var(--primary)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white rounded-[2rem] shadow-soft p-8 md:p-12 border border-gray-100 text-center">

                        {question.context && (
                            <p className="text-[var(--primary)] font-semibold mb-6 uppercase tracking-wider text-xs">
                                CONTEXTO: {question.context}
                            </p>
                        )}

                        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-800 leading-snug">
                            {question.text}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-left">
                            {question.options.map((opt, idx) => {
                                const isSelected = answers[question.id] === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleOptionSelect(opt.id)}
                                        className={`group relative p-4 px-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4
                                        ${isSelected
                                                ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                                                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                            }
                                    `}
                                    >
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                         ${isSelected ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-gray-300 text-gray-400'}
                                    `}>
                                            {isSelected ? <div className="w-2.5 h-2.5 bg-white rounded-full" /> : <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>}
                                        </div>
                                        <span className={`text-lg ${isSelected ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{opt.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Footer Navigation */}
            <div className="w-full max-w-2xl mt-8 flex justify-between items-center px-4">
                <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center gap-2 font-medium transition-colors ${currentQuestionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    <ChevronLeft className="w-5 h-5" /> Atrás
                </button>

                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-soft
                    ${isAnswered
                            ? 'bg-[var(--primary)] text-white hover:scale-105 hover:bg-emerald-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }
                `}
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
