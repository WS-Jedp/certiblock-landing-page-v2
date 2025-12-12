import React from 'react';

const features = [
    {
        title: "Inmutabilidad Absoluta",
        description: "Registros eternos en blockchain. Lo que se escribe, permanece inalterable para siempre.",
        icon: (
            <svg className="w-8 h-8 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        )
    },
    {
        title: "Trazabilidad Total",
        description: "Desde el origen hasta tus manos. Cada paso, cada transferencia, cada evento queda registrado.",
        icon: (
            <svg className="w-8 h-8 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        )
    },
    {
        title: "Transparencia Radical",
        description: "Sin cajas negras. Auditoría pública y accesible para todos, en cualquier momento.",
        icon: (
            <svg className="w-8 h-8 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        )
    }
];

interface FeaturesProps {
    sectionRef: React.RefObject<HTMLDivElement>;
    titleRef: React.RefObject<HTMLHeadingElement>;
    subtitleRef: React.RefObject<HTMLParagraphElement>;
    cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const Features: React.FC<FeaturesProps> = ({ sectionRef, titleRef, subtitleRef, cardsRef }) => {

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-white relative z-20 overflow-hidden">
            {/* Subtle Tech Grid Background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                                     linear-gradient(to bottom, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Floating Neon Orbs */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#00FF88] rounded-full blur-[100px] opacity-5 animate-pulse-neon"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-black rounded-full blur-[120px] opacity-5"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24 perspective-1000">
                    <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                        Más que un certificado,<br />
                        <span className="relative inline-block">
                            <span className="text-black">una verdad </span>
                            <span className="text-[#00FF88]">inmutable</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00FF88]/30 blur-sm"></span>
                        </span>
                    </h2>
                    <p ref={subtitleRef} className="text-xl text-black/60 max-w-3xl mx-auto font-light leading-relaxed transform-gpu opacity-0">
                        La tecnología blockchain garantiza que la historia de tu producto nunca pueda ser alterada, borrada o falsificada.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="bg-white p-10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_8px_40px_rgba(0,255,136,0.15)] hover:border-[#00FF88]/30 transition-all duration-500 group relative overflow-hidden transform-gpu opacity-0"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/0 via-[#00FF88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-black/60 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Tech Corner Accent */}
                            <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-[#00FF88]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
