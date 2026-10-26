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
                backgroundColor: 'rgba(224, 32, 32, 0.16)',
                borderColor: '#111111',
                borderWidth: 1.5,
                pointBackgroundColor: '#E02020',
                pointBorderColor: '#111111',
                pointHoverBackgroundColor: '#111111',
                pointHoverBorderColor: '#E02020',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(17, 17, 17, 0.16)'
                },
                grid: {
                    color: 'rgba(17, 17, 17, 0.16)'
                },
                pointLabels: {
                    color: '#111111',
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
