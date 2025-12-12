import React from 'react';

interface FooterProps {
    footerRef: React.RefObject<HTMLDivElement>;
    brandRef: React.RefObject<HTMLDivElement>;
    linksRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    bottomBarRef: React.RefObject<HTMLDivElement>;
}

const Footer: React.FC<FooterProps> = ({ footerRef, brandRef, linksRefs, bottomBarRef }) => {

    return (
        <footer ref={footerRef} className="bg-black text-white py-24 px-6 relative z-20 overflow-hidden opacity-0">
            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, #00FF88 1px, transparent 1px),
                                     linear-gradient(to bottom, #00FF88 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Neon Glow Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF88] rounded-full blur-[150px] opacity-5"></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">

                {/* Brand */}
                <div ref={brandRef} className="col-span-1 md:col-span-2 perspective-1000 transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="flex items-center gap-3 mb-8">
                        <img className='w-52 object-contain' src="/assets/images/logo-blanco.svg" alt="" />
                    </div>
                    <p className="text-white/50 max-w-md leading-relaxed mb-8">
                        La plataforma líder en certificación digital y trazabilidad blockchain. Protegiendo la autenticidad en un mundo digital.
                    </p>
                    {/* Status Indicator */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_10px_#00FF88]"></div>
                        <span className="text-white/40 text-sm font-mono-tech uppercase tracking-wider">System Online</span>
                    </div>
                </div>

                {/* Links - Platform */}
                <div ref={el => linksRefs.current[0] = el} className="perspective-1000 transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                    <h4 className="font-bold text-lg mb-6 text-white relative inline-block">
                        Plataforma
                        <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00FF88]"></span>
                    </h4>
                    <ul className="space-y-4 text-white/50">
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Soluciones</a></li>
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Casos de Uso</a></li>
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Desarrolladores</a></li>
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Precios</a></li>
                    </ul>
                </div>

                {/* Links - Company */}
                <div ref={el => linksRefs.current[1] = el} className="perspective-1000 transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                    <h4 className="font-bold text-lg mb-6 text-white relative inline-block">
                        Compañía
                        <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#00FF88]"></span>
                    </h4>
                    <ul className="space-y-4 text-white/50">
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Nosotros</a></li>
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Blog</a></li>
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Contacto</a></li>
                        <li><a href="#" className="hover:text-[#00FF88] transition-colors duration-300 hover:translate-x-1 inline-block">Legal</a></li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div ref={bottomBarRef} className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm relative z-10 transform-gpu opacity-0">
                <p className="font-mono-tech">© {new Date().getFullYear()} CERTIBLOCK. All rights reserved.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-[#00FF88] transition-colors duration-300">Privacidad</a>
                    <a href="#" className="hover:text-[#00FF88] transition-colors duration-300">Términos</a>
                    <a href="#" className="hover:text-[#00FF88] transition-colors duration-300">Blockchain Explorer</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
