import React from 'react';

interface CTASectionProps {
    sectionRef: React.RefObject<HTMLDivElement>;
    glowRef: React.RefObject<HTMLDivElement>;
    contentRef: React.RefObject<HTMLDivElement>;
    titleRef: React.RefObject<HTMLHeadingElement>;
    descRef: React.RefObject<HTMLParagraphElement>;
    buttonsRef: React.RefObject<HTMLDivElement>;
}

const CTASection: React.FC<CTASectionProps> = ({ sectionRef, glowRef, contentRef, titleRef, descRef, buttonsRef }) => {
    return (
        <section ref={sectionRef} className="py-40 bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, #00FF88 1px, transparent 1px),
                           linear-gradient(to bottom, #00FF88 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}></div>
            </div>

            {/* Background Glow - Multiple layers for depth */}
            <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF88] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#00FF88] rounded-full blur-[100px] opacity-5 pointer-events-none"></div>

            <div ref={contentRef} className="text-center relative z-10 px-6 max-w-4xl perspective-1000 opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                {/* Tech Accent Line */}
                <div className="w-20 h-1 bg-[#00FF88] mx-auto mb-8 shadow-[0_0_10px_#00FF88]"></div>

                <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                    Protege tu marca <span className="text-[#00FF88]">hoy</span>
                </h2>

                <p ref={descRef} className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light transform-gpu opacity-0">
                    Únete a las empresas que certifican autenticidad con blockchain
                </p>

                <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 transform-gpu opacity-0">
                    <button className="px-12 py-3 bg-[#00FF88] hover:bg-[#00CC6A] text-black rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(0,255,136,0.4)] hover:shadow-[0_0_50px_rgba(0,255,136,0.6)] transform hover:-translate-y-1 active:scale-95">
                        Solicitar Demo
                    </button>
                </div>

                {/* Status indicators */}
                <div className="mt-16 flex items-center justify-center gap-8 text-sm text-white/40">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_10px_#00FF88]"></div>
                        <span className="font-mono-tech uppercase tracking-wider">Blockchain Active</span>
                    </div>
                    <div className="w-px h-4 bg-white/20"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_10px_#00FF88]" style={{ animationDelay: '0.5s' }}></div>
                        <span className="font-mono-tech uppercase tracking-wider">24/7 Verification</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
