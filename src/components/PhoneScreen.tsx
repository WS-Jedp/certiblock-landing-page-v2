import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppVerificationButton from './certiblcok-emulator/whatsappButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReportButton from './certiblcok-emulator/ReportButton';

gsap.registerPlugin(ScrollTrigger);

export type UseCase = 'industrial' | 'fashion' | 'art';

interface PhoneScreenProps {
    currentUseCase: UseCase;
    currentStep?: number;
}

interface OnboardingSectionProps {
    stepIndex: number;
    currentStep: number;
    explanation: string;
    children: React.ReactNode;
}

const OnboardingSection: React.FC<OnboardingSectionProps> = ({ stepIndex, currentStep, explanation, children }) => {
    const isOnboarding = currentStep !== -1;
    const isActive = currentStep === stepIndex;
    const isPast = currentStep > stepIndex;

    // Visibility Logic:
    // - Not onboarding: All visible.
    // - Active or Past: Visible (opacity 1).
    // - Future: Invisible but takes space (opacity 0).
    const isVisible = !isOnboarding || isActive || isPast;

    // Explanation Logic:
    // - Only show when active.
    const showExplanation = isActive;

    return (
        <div className={`transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {children}

            {/* Inline Explanation */}
            <div className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${showExplanation ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}
            `}>
                <div className="relative px-4 py-3">
                    {/* Green arrow with curved connector from component to message */}
                    <svg
                        className="absolute -left-2 -top-2 w-8 h-10"
                        viewBox="0 0 32 40"
                        fill="none"
                    >
                        {/* Vertical line down */}
                        <line
                            x1="4" y1="0"
                            x2="4" y2="28"
                            stroke="#00FF88"
                            strokeWidth="1.5"
                            opacity="0.8"
                        />
                        {/* Curved connector */}
                        <path
                            d="M 4 28 Q 4 32, 8 32 L 16 32"
                            stroke="#00FF88"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.8"
                        />
                        {/* Arrow head */}
                        <polygon
                            points="16,30 20,32 16,34"
                            fill="#00FF88"
                        />
                    </svg>

                    <p className="text-[12px] text-end leading-relaxed text-black/50 font-medium tracking-wide pl-3">{explanation}</p>
                </div>
            </div>
        </div>
    );
};

// Data for each use case to populate the generic layout
const USE_CASE_DATA = {
    industrial: {
        headerImage: "/assets/images/certiblock-product.png",
        headerBg: "bg-emerald-300/20 border-blue-500/20",
        headerProductLogo: "/assets/images/certiblock-lx.webp",
        headerIconBg: "bg-emerald-500/20",
        productName: "Motor Industrial V8",
        productDesc: "Motor de inducción trifásico de alto rendimiento para aplicaciones industriales pesadas.",
        companyName: "Getdown Producciones",
        companyLogo: "/assets/images/certiblock-company.png",
        ownerId: "****8821",
        onboarding: [
            "Gemelo Digital: Representación visual y estado en tiempo real del activo.",
            "Verificación instantánea de autenticidad vía WhatsApp.",
            "Fabricante verificado: Identidad del creador registrada en blockchain.",
            "Especificaciones técnicas completas e historial del producto.",
            "Historial de propiedad transparente y titular actual verificado.",
            "Reportar cualquier anomalía o daño en el producto directamente desde aquí."
        ]
    },
    fashion: {
        headerImage: "/assets/images/certiblock-product-2.png",
        headerBg: "bg-emerald-300/20 border-blue-500/20",
        headerProductLogo: "/assets/images/certiblock-lx.webp",
        headerIconBg: "bg-emerald-500/20",
        productName: "Abrigo Edición Limitada",
        productDesc: "Abrigo de cuero italiano hecho a mano de la Colección Invierno 2025.",
        companyName: "Getdown Producciones",
        companyLogo: "/assets/images/certiblock-company.png",
        ownerId: "****8821",
        onboarding: [
            "Visualización del artículo de lujo con imágenes de alta resolución.",
            "Escanea para verificar el certificado digital de origen.",
            "Marca verificada: Autenticación oficial de la casa de moda.",
            "Composición del material, origen e instrucciones de cuidado.",
            "Prueba de propiedad digital y derechos de reventa verificados.",
            "Reportar cualquier daño o problema con el artículo directamente desde aquí."
        ]
    },
    art: {
        headerImage: "/assets/images/certiblock-product.png",
        headerBg: "bg-emerald-300/20 border-blue-500/20",
        headerProductLogo: "/assets/images/certiblock-lx.webp",
        headerIconBg: "bg-emerald-500/20",
        productName: "Sueños Neón #04",
        productDesc: "Coleccionable digital exclusivo (NFT) acuñado en Ethereum.",
        companyName: "Getdown Producciones",
        companyLogo: "/assets/images/certiblock-company.png",
        ownerId: "****8821",
        onboarding: [
            "Vista previa del NFT: Obra digital y visualización del token.",
            "Enlace directo para verificar el contrato en blockchain.",
            "Artista verificado: Identidad confirmada del creador digital.",
            "Metadatos inmutables del token y características de rareza.",
            "Dirección de wallet del coleccionista que posee este activo único.",
            "Reportar cualquier anomalía o daño en el producto directamente desde aquí."
        ]
    }
};

const PhoneScreen: React.FC<PhoneScreenProps> = ({ currentUseCase, currentStep = -1 }) => {
    const data = USE_CASE_DATA[currentUseCase];
    const contentRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic: show header initially, then scroll to bottom when content appears
    useEffect(() => {
        if (!contentRef.current) return;

        const content = contentRef.current;

        // Small delay to ensure content is rendered
        const timer = setTimeout(() => {
            // If we're not in onboarding mode (currentStep === -1) or on step 0-2, keep at top to show header
            if (currentStep === -1 || currentStep <= 2) {
                gsap.to(content, {
                    scrollTop: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            } else {
                // During onboarding steps 3+, scroll to bottom to show latest content
                // Use a longer delay for step 5 to ensure ReportButton is rendered
                const scrollDelay = currentStep === 5 ? 0.5 : 0.3;
                gsap.to(content, {
                    scrollTop: content.scrollHeight + 100, // Extra pixels to ensure bottom visibility
                    duration: 2.5, // Slower and more subtle
                    ease: "power2.inOut", // Natural fluid motion
                    delay: scrollDelay
                });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [currentUseCase, currentStep]);

    // Variants for smooth page transitions
    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            filter: 'blur(10px)'
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const, // Custom bezier for premium feel
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            y: -20,
            filter: 'blur(10px)',
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1] as const
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentUseCase}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                ref={contentRef}
                className="flex flex-col h-full bg-white text-slate-900 p-4 overflow-y-auto overflow-x-hidden no-scrollbar shadow-[inset_0_2px_20px_rgba(0,0,0,0.15)] pointer-events-none"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >

                {/* Step 0: Header */}
                <OnboardingSection stepIndex={0} currentStep={currentStep} explanation={data.onboarding[0]}>
                    <div className={`relative h-40 rounded-xl mt-3 mb-4 flex items-center justify-center border ${data.headerBg}`}>
                        <img src={data.headerImage} alt="Product" className="w-36 h-36 object-contain" />

                        {/* Botones de acciones (Mock UI) */}
                        <div className='absolute bottom-0 right-0 m-auto flex flex-col items-end justify-between w-auto h-full p-1'>
                            <img src={data.headerProductLogo} alt="Product" className="w-12 h-12 object-contain" />
                            <div className='flex flex-col items-end justify-end space-y-1'>
                                <div className='w-auto py-2 px-3 bg-green-500/90 rounded-2xl text-xs text-center flex items-center justify-center'>
                                    <span className='text-[9px] font-light'>
                                        Autentico
                                    </span>
                                </div>
                                <div className='w-24 h-9 bg-gray-300/30 rounded-2xl text-xs text-center flex items-center justify-center'>
                                    <span className='text-[9px]'>
                                        14 vistas previas
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </OnboardingSection>

                <section className="space-y-2 text-sm text-slate-400">

                    {/* Step 1: Verify */}
                    <OnboardingSection stepIndex={1} currentStep={currentStep} explanation={data.onboarding[1]}>
                        <WhatsAppVerificationButton />
                    </OnboardingSection>

                    {/* Step 2: Company */}
                    <OnboardingSection stepIndex={2} currentStep={currentStep} explanation={data.onboarding[2]}>
                        <article className='w-full h-auto bg-gray-50 rounded-xl p-2 flex items-center gap-3'>
                            <img src={data.companyLogo} alt="" className='w-20' />
                            <div className='flex-1'>
                                <span className='text-[10px] uppercase font-light text-slate-500'>Compañia</span>
                                <p className='text-sm font-semibold text-slate-800'>
                                    {data.companyName}
                                </p>
                            </div>
                        </article>
                    </OnboardingSection>

                    {/* Step 3: Product Description */}
                    <OnboardingSection stepIndex={3} currentStep={currentStep} explanation={data.onboarding[3]}>
                        <article className="p-2">
                            <h2 className="text-lg font-bold text-slate-900 mb-1">
                                {data.productName}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {data.productDesc}
                            </p>
                        </article>
                    </OnboardingSection>

                    {/* Step 4: Owner */}
                    <OnboardingSection stepIndex={4} currentStep={currentStep} explanation={data.onboarding[4]}>
                        <article className='w-full h-auto bg-white border border-emerald-300/30 rounded-md p-2 flex items-center gap-3'>
                            <div className='flex-1'>
                                <span className='text-[9px] text-black uppercase'>Propietario</span>

                                <p className='text-[10px]'>
                                    Daniel Gomez
                                </p>
                                <p className='text-[10px] font-mono text-slate-800'>
                                    {data.ownerId}
                                </p>
                            </div>
                        </article>
                    </OnboardingSection>

                    <OnboardingSection stepIndex={5} currentStep={currentStep} explanation={data.onboarding[5]}>
                        <ReportButton />
                    </OnboardingSection>
                </section>
            </motion.div>
        </AnimatePresence>
    );
};

export default PhoneScreen;
