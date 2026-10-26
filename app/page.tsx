import { Suspense } from 'react';
import Landing from '@/components/landing/Landing';

export default function Home() {
    return (
        <Suspense fallback={<main className="boot-fallback" />}>
            <Landing />
        </Suspense>
    );
}
