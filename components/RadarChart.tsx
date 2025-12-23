'use client';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { CognitiveStyle } from '@/lib/questions';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface Props {
    scores: Record<CognitiveStyle, number>;
}

export default function RadarChart({ scores }: Props) {
    const styles: CognitiveStyle[] = [
        'Analítico', 'Creativo', 'Práctico', 'Detallista',
        'Abstracto', 'Crítico', 'Colaborativo', 'Sistémico',
        'Intuitivo', 'Conceptual', 'Emocional', 'Reflexivo'
    ];

    const data = {
        labels: styles,
        datasets: [
            {
                label: 'Perfil Cognitivo',
                data: styles.map(s => scores[s]),
                backgroundColor: 'rgba(147, 51, 234, 0.2)', // Purple-500 optimized
                borderColor: 'rgba(147, 51, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 11
                    }
                },
                ticks: {
                    display: false,
                    backdropColor: 'transparent'
                }
            },
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return <Radar data={data} options={options} />;
}
