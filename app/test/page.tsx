import { Suspense } from 'react';
import TestClient from './ui';

export default function TestPage() {
    return (
        <Suspense fallback={<div className="boot-fallback" />}>
            <TestClient />
        </Suspense>
    );
}
