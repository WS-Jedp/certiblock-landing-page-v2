import React, { useRef, useEffect } from 'react';
import { type UseCase } from './PhoneScreen';

interface ContextCarouselProps {
    currentUseCase: UseCase;
    onUseCaseChange: (useCase: UseCase) => void;
}

interface CaseData {
    id: UseCase;
    title: string;
    description: string;
    icon: string;
}

const CASES: CaseData[] = [
    {
        id: 'DPA',
        title: 'Activo Digital (DA)',
        description: 'Rastrea el mantenimiento, estado en tiempo real y ciclo de vida de maquinaria pesada.',
        icon: '🏭'
    },
    {
        id: 'DLA',
        title: 'Moda de Lujo',
        description: 'Verifica la autenticidad y procedencia de prendas de alta gama.',
        icon: '👗'
    },
    {
        id: 'LUX',
        title: 'Arte y NFT',
        description: 'Conecta arte físico con gemelos digitales y contratos inteligentes.',
        icon: '🎨'
    },
];

const ContextCarousel: React.FC<ContextCarouselProps> = ({ currentUseCase, onUseCaseChange }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll active item into view on change
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeIndex = CASES.findIndex(c => c.id === currentUseCase);
            const card = scrollContainerRef.current.children[activeIndex] as HTMLElement;
            if (card) {
                const container = scrollContainerRef.current;
                const scrollLeft = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2);
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [currentUseCase]);

    return (
        <div className="w-full max-w-[100vw] px-4 overflow-x-hidden overflow-y-hidden">
            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 p-8 py-12 snap-x snap-mandatory no-scrollbar items-center w-full"
                style={{ scrollBehavior: 'smooth' }}
            >
                {CASES.map((c) => {
                    const isActive = currentUseCase === c.id;
                    return (
                        <button
                            key={c.id}
                            onClick={() => onUseCaseChange(c.id)}
                            className={`
                                w-[240px] md:min-w-[360px] h-[150px] flex-shrink-0 snap-center rounded-2xl px-6 py-4 cursor-pointer transition-all duration-700 ease-out border relative overflow-hidden group
                                ${isActive
                                    ? 'border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] scale-100 opacity-100'
                                    : 'border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.08)] scale-95 opacity-70 hover:opacity-90 hover:scale-[0.97] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)]'
                                }
                            `}
                            style={isActive ? {
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            } : {
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.6) 100%)',
                                backdropFilter: 'blur(12px) saturate(150%)',
                                WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                            }}
                        >
                            {/* Subtle top shine - Apple style */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>

                            {/* Green accent glow for active card only */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-transparent pointer-events-none"></div>
                            )}

                            <div className="flex flex-col h-full relative z-10">
                                {/* Title and description at top for clean hierarchy */}
                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className={`text-lg font-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-black' : 'text-black/70'}`}>
                                            {c.title}
                                        </h3>
                                        {isActive && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-pulse mt-1.5"></div>
                                        )}
                                    </div>
                                    <p className={`text-xs  text-start leading-relaxed transition-colors duration-500 ${isActive ? 'text-black/60' : 'text-black/50'}`}>
                                        {c.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    );
                })}

                {/* Spacer for end of scroll */}
                <div className="w-4 flex-shrink-0"></div>
            </div>

            {/* Scroll Indicators - Clean minimalist style */}
            <div className="flex justify-center gap-2 -mt-6">
                {CASES.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => onUseCaseChange(c.id)}
                        className={`h-1 rounded-full transition-all duration-500 ${currentUseCase === c.id ? 'w-8 bg-black' : 'w-1.5 bg-black/20 hover:bg-black/40'}`}
                        aria-label={`Select ${c.title}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContextCarousel;
