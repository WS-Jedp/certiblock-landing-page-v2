import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Array de logos de marcas
    const trustedBrands = [
        { name: 'Adidas', logo: '/assets/logos/adidas-13.svg' },
        { name: 'DIM', logo: '/assets/logos/deportivo-independiente-medellin.svg' },
        { name: 'Atlético Nacional', logo: '/assets/logos/atlanta-nacional.svg' },
        { name: 'Nike', logo: '/assets/logos/nike-4-2.svg' },
        { name: '', logo: '/assets/logos/puntos-colombia-allies.svg' },
        { name: '', logo: '/assets/logos/cadena-allies.svg' },
        { name: '', logo: '/assets/logos/naturanja-allies.svg' },
        { name: 'Starbucks', logo: '/assets/logos/starbucks-coffee.svg' },
        { name: 'Club Colombia', logo: '/assets/logos/cerveza-club-colombia.svg' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-4 left-1/2 -translate-x-1/2 w-[96%] md:max-w-3xl z-50 transition-all duration-700 ease-out rounded-xl ${isScrolled
                    ? 'bg-white/70 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] py-2'
                    : 'bg-transparent backdrop-blur-none border border-transparent py-2.5'
                    }`}
                style={isScrolled ? {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.65) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                } : {}}
            >
                <div className="px-4 flex items-center justify-between gap-6">
                    {/* Logo - Compact & Bold */}
                    <div className="flex items-center gap-2">
                        <img className='w-28 object-contain' src="/assets/images/logo.webp" alt="" />
                    </div>

                    {/* Navigation - Compact */}
                    <nav className="hidden md:flex items-center gap-6">
                        {['Features', 'How it works', 'Use Cases'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-xs font-semibold text-black/60 hover:text-black transition-all relative group"
                            >
                                {item}
                                {/* Underline effect */}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button - Realistic Glass 3D Style */}
                    <button className="
                    group relative px-8 py-2.5 rounded-xl text-xs font-bold transition-all duration-300
                    bg-gradient-to-b from-[#00FF88] to-[#00DD77]
                    text-black
                    hover:shadow-[0_8px_24px_rgba(0,255,136,0.35),0_2px_8px_rgba(0,255,136,0.2),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.2)]
                    shadow-[0_4px_16px_rgba(0,255,136,0.25),0_1px_4px_rgba(0,255,136,0.15),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.15)]
                    hover:translate-y-[-2px]
                    active:translate-y-[1px]
                    active:shadow-[0_1px_4px_rgba(0,255,136,0.3),inset_0_1px_2px_rgba(0,0,0,0.2)]
                    border-t border-t-white/40 border-b border-b-black/20
                    overflow-hidden
                    animate-[pulse-glow_6s_ease-in-out_infinite]
                ">
                        {/* Subtle shine effect - passes slowly */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                            style={{
                                animation: 'shine 8s ease-in-out infinite',
                                animationDelay: '2s'
                            }}></span>

                        {/* Subtle top highlight for realism */}
                        <span className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent rounded-t-xl"></span>

                        {/* Button text */}
                        <span className="relative z-10 flex items-center gap-2">
                            Solicitar Demo
                            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>

                    {/* Keyframes for animations */}
                    <style>{`
                    @keyframes shine {
                        0%, 100% { transform: translateX(-100%); }
                        50% { transform: translateX(100%); }
                    }
                    
                    @keyframes pulse-glow {
                        0%, 100% { 
                            box-shadow: 0 4px 16px rgba(0,255,136,0.25), 
                                        0 1px 4px rgba(0,255,136,0.15), 
                                        inset 0 1px 0 rgba(255,255,255,0.4), 
                                        inset 0 -1px 0 rgba(0,0,0,0.15);
                        }
                        50% { 
                            box-shadow: 0 4px 20px rgba(0,255,136,0.4), 
                                        0 2px 8px rgba(0,255,136,0.25),
                                        0 0 16px rgba(0,255,136,0.15),
                                        inset 0 1px 0 rgba(255,255,255,0.4), 
                                        inset 0 -1px 0 rgba(0,0,0,0.15);
                        }
                    }
                `}</style>
                </div>
            </header>

            {/* Trusted Brands Carousel - Shows when scrolled */}
            <div className={`fixed top-[76px] left-1/2 -translate-x-1/2 w-full z-40 transition-all duration-700 ease-out ${isScrolled
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[-10px] pointer-events-none'
                }`}>
                <div className="bg-white/40 backdrop-blur-lg border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.35) 100%)',
                        backdropFilter: 'blur(12px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                    }}>

                    {/* Subtle divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-black/3 to-transparent"></div>

                    {/* Carousel Container */}
                    {/* Carousel Container */}
                    <div className="relative py-2 overflow-hidden">
                        {/* Gradient overlays for fade effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/80 via-white/40 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/80 via-white/40 to-transparent z-10 pointer-events-none"></div>

                        {/* Scrolling content - duplicated 4 times for seamless infinite loop on all screens */}
                        <div className="flex gap-12 animate-scroll-slow w-max will-change-transform">
                            {[...trustedBrands, ...trustedBrands, ...trustedBrands, ...trustedBrands].map((brand, index) => (
                                <div key={index} className="flex items-center justify-center gap-3 min-w-[140px] px-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group">
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="h-6 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <span className="text-[11px] font-semibold text-black/40 group-hover:text-black/80 whitespace-nowrap tracking-wider uppercase transition-colors duration-500">
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyframes for carousel animation */}
            <style>{`
            @keyframes scroll-slow {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-25%); /* Move exactly 1/4 (one set) */
                }
            }
            
            .animate-scroll-slow {
                animation: scroll-slow 100s linear infinite; /* Extremely slow and subtle */
            }
            
            .animate-scroll-slow:hover {
                animation-play-state: paused;
            }
        `}</style>
        </>
    );
};

export default Header;
