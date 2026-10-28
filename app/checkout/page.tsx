'use client';

import { motion } from "framer-motion";
import { Check, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PRICE_LABEL } from "@/lib/price";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        // In a real scenario, we call our API to create a checkout session
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
            });

            const { sessionId, url } = await response.json();

            if (url) {
                window.location.href = url;
            } else {
                console.error("No session URL returned");
                // Fallback for demo if no stripe key:
                alert("Stripe keys missing. Redirecting to demo results.");
                window.location.href = "/results";
            }

        } catch (error) {
            console.error(error);
            setLoading(false);
            // Fallback for demo
            window.location.href = "/results";
        }
    };

    return (
        <div className="min-h-screen bg-white text-[var(--foreground)] font-sans flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-soft"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-[var(--primary)]" />
                </div>

                <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">¡Test Completado!</h1>
                <p className="text-center text-gray-500 mb-8">
                    Tu perfil cerebral y vocacional ha sido calculado con éxito. Esto es lo que obtendrás:
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-medium text-gray-700">Análisis detallado de personalidad</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <Sparkles className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Ocho rutas + universidades en México</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-medium text-gray-700">Plan de estudios personalizado</span>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-500">Informe completo</p>
                    <div className="flex items-end justify-center gap-2 mt-2">
                        <span className="text-5xl font-bold text-gray-900">{PRICE_LABEL}</span>
                        <span className="text-xl text-gray-500 mb-1">MXN</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Un pago. El precio del informe.</p>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-4 bg-[var(--primary)] text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-soft"
                >
                    {loading ? 'Procesando...' : (
                        <>
                            <Lock className="w-4 h-4" />
                            PAGAR {PRICE_LABEL} MXN
                        </>
                    )}
                </button>

                <div className="mt-6 flex justify-center gap-6 pt-6 border-t border-gray-100 opacity-60 grayscale hover:grayscale-0 transition-all">
                    <span className="flex flex-col items-center">
                        <Lock className="w-4 h-4 mb-1" />
                        <span className="text-[10px] font-bold">SSL SEGURO</span>
                    </span>
                    <span className="flex flex-col items-center">
                        <Check className="w-4 h-4 mb-1" />
                        <span className="text-[10px] font-bold">GARANTIZADO</span>
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
