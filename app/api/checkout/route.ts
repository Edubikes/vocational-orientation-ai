import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-12-15.clover' })
    : null;

export async function POST(request: Request) {
    if (!stripe) {
        // FALLBACK FOR DEVELOPMENT WITHOUT KEYS
        // Only for demonstration purposes so the user can see the flow
        return NextResponse.json({
            url: new URL('/results', request.url).toString()
        });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'mxn',
                        product_data: {
                            name: 'Informe Vocacional Premium',
                            description: 'Análisis completo de perfil cerebral y carreras compatibles.',
                        },
                        unit_amount: 2000, // $20.00 MXN in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/results?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/checkout`,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
