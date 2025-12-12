import React from 'react';

const steps = [
    {
        number: "01",
        title: "Registro",
        description: "La marca crea el Gemelo Digital del activo físico en la blockchain, asegurando su origen."
    },
    {
        number: "02",
        title: "Vinculación",
        description: "Se asocia un identificador único (NFC/QR) incopiable al producto físico."
    },
    {
        number: "03",
        title: "Verificación",
        description: "El usuario escanea y accede a la verdad absoluta. Sin intermediarios, sin dudas."
    }
];

interface HowItWorksProps {
    sectionRef: React.RefObject<HTMLDivElement>;
    lineRef: React.RefObject<HTMLDivElement>;
    leftContentRef: React.RefObject<HTMLDivElement>;
    titleRef: React.RefObject<HTMLHeadingElement>;
    descRef: React.RefObject<HTMLParagraphElement>;
    buttonRef: React.RefObject<HTMLButtonElement>;
    stepsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ sectionRef, lineRef, leftContentRef, titleRef, descRef, buttonRef, stepsRefs }) => {

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-[#FAFAFA] relative z-20 overflow-hidden">
            {/* Tech Pattern Background */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left Content */}
                    <div ref={leftContentRef} className="relative perspective-1000 transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Scan Line Effect */}
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00FF88] to-transparent opacity-40"></div>

                        <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tight transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                            El estándar de la<br />
                            <span className="relative inline-block">
                                verdad digital
                                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00FF88] opacity-40 blur-[2px]"></span>
                            </span>
                        </h2>
                        <p ref={descRef} className="text-xl text-black/60 mb-12 font-light leading-relaxed transform-gpu opacity-0">
                            Un proceso simple para la marca, una garantía absoluta para el usuario.
                        </p>

                        <button ref={buttonRef} className="px-10 py-4 bg-[#00FF88] hover:bg-[#00CC6A] text-black rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transform hover:-translate-y-1 active:scale-95 opacity-0">
                            Comenzar ahora
                        </button>
                    </div>

                    {/* Right Steps */}
                    <div className="relative pl-10 md:pl-0 perspective-1000" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Vertical Laser Line */}
                        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-black/5 hidden md:block overflow-hidden">
                            <div ref={lineRef} className="w-full h-full bg-[#00FF88] origin-top shadow-[0_0_10px_#00FF88]"></div>
                        </div>

                        <div className="space-y-20">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    ref={el => stepsRefs.current[index] = el}
                                    className="relative md:pl-24 group step-item transform-gpu opacity-0"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Glowing Node */}
                                    <div className="absolute left-0 md:left-[26px] top-3 w-5 h-5 rounded-full bg-white border-2 border-black/10 group-hover:border-[#00FF88] group-hover:shadow-[0_0_15px_rgba(0,255,136,0.6)] transition-all duration-500 z-10 hidden md:flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#00FF88] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <div className="flex flex-col md:block bg-white p-8 rounded-2xl border border-black/5 group-hover:border-[#00FF88]/30 transition-all duration-500 shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,255,136,0.1)]">
                                        <span className="font-mono-tech text-5xl font-bold text-black/5 mb-4 md:mb-0 md:absolute md:-left-2 md:-top-8 md:-z-10 group-hover:text-[#00FF88]/20 transition-all duration-500 select-none">
                                            {step.number}
                                        </span>
                                        <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-[#00FF88] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-black/60 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
