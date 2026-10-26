import { Suspense } from 'react';
import PerfilClient from './ui';

export default function PerfilPage() {
    return (
        <Suspense fallback={<main className="boot-fallback">Leyendo tus respuestas…</main>}>
            <PerfilClient />
        </Suspense>
    );
}
