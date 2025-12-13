
import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

interface HeroProps {
    onReveal: (isManual: boolean) => void;
    forceReveal?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onReveal, forceReveal }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stickerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const instructionRef = useRef<HTMLDivElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const revealAll = useCallback((isManual: boolean = false) => {
        if (isRevealed) return;
        setIsRevealed(true);

        const canvas = canvasRef.current;
        const sticker = stickerRef.current;

        if (canvas && sticker) {
            // Create a timeline for the reveal sequence
            const tl = gsap.timeline({
                onStart: () => {
                    onReveal(isManual); // Trigger scroll immediately
                }
            });

            // 1. Canvas fade out smoothly
            tl.to(canvas, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut"
            });

            // 2. Subtle scale up - elegant and refined
            tl.to(sticker, {
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out",
            }, "-=0.3");

            // 3. Settle back smoothly
            tl.to(sticker, {
                scale: 1,
                duration: 0.6,
                ease: "power3.out"
            });

        } else {
            onReveal(isManual);
        }
    }, [isRevealed, onReveal]);

    useEffect(() => {
        if (forceReveal && !isRevealed) {
            revealAll(false);
        }
    }, [forceReveal, isRevealed, revealAll]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const sticker = stickerRef.current;
        if (!canvas || !sticker) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match the sticker container
        const resizeCanvas = () => {
            canvas.width = sticker.offsetWidth;
            canvas.height = sticker.offsetHeight;

            // Draw content function
            const drawContent = () => {
                // Save context state
                ctx.save();

                // Make it a circle to match the container
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
                ctx.clip();

                // Create a silver/matte gradient
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#E0E0E0'); // Light silver
                gradient.addColorStop(0.5, '#C0C0C0'); // Medium silver
                gradient.addColorStop(1, '#A0A0A0'); // Darker silver
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add subtle noise/texture to the scratch layer
                const noiseSize = 2;
                for (let i = 0; i < canvas.width; i += noiseSize) {
                    for (let j = 0; j < canvas.height; j += noiseSize) {
                        if (Math.random() > 0.8) {
                            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
                            ctx.fillRect(i, j, noiseSize, noiseSize);
                        }
                    }
                }

                // Add "Security Pattern" overlay (subtle lines)
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i < canvas.width; i += 20) {
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, canvas.height);
                }
                ctx.stroke();

                // Draw Certiblock logo
                const logo = new Image();
                logo.crossOrigin = 'anonymous';
                logo.onload = () => {
                    // Draw logo centered, starting higher
                    const logoWidth = canvas.width * 0.50;
                    const logoHeight = logoWidth * 0.2;
                    const logoX = (canvas.width - logoWidth) / 2;
                    const logoY = canvas.height * 0.32;
                    
                    ctx.globalAlpha = 0.35;
                    ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
                    ctx.globalAlpha = 1;
                };
                logo.src = '/assets/images/logo.webp';

                // Add "Scratch to Reveal" CTA - closer to logo
                ctx.font = 'bold 13px Inter, sans-serif';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('RASPA PARA REVELAR', canvas.width / 2, canvas.height * 0.5);

                // Add unique code at bottom - closer to CTA
                ctx.font = '11px "Courier New", monospace';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillText('CB-2024-X8F9K2L', canvas.width / 2, canvas.height * 0.6);

                // Restore context state
                ctx.restore();
            };

            drawContent();
        };

        resizeCanvas();
        // Resize observer might be better here if the sticker size changes, 
        // but window resize is okay for now if sticker is responsive.
        window.addEventListener('resize', resizeCanvas);

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const getMousePos = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            let clientX, clientY;

            if ('touches' in e) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }

            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        };

        const scratch = (e: MouseEvent | TouchEvent) => {
            if (!isDrawing || isRevealed) return;

            const { x, y } = getMousePos(e);

            ctx.globalCompositeOperation = 'destination-out';
            
            // Draw a line from last position to current position for smooth scratching
            ctx.lineWidth = 25; // Width of the scratch
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Update last position
            lastX = x;
            lastY = y;

            // Add some randomness to make it look more realistic
            // Occasionally add small scratches around the main scratch
            if (Math.random() > 0.7) {
                const offsetX = (Math.random() - 0.5) * 8;
                const offsetY = (Math.random() - 0.5) * 8;
                ctx.globalAlpha = 0.3 + Math.random() * 0.4; // Varying opacity for realism
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, 3 + Math.random() * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            // Check percentage revealed (throttled for performance)
            if (Math.random() > 0.6) {
                checkReveal();
            }
        };

        const checkReveal = () => {
            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let transparentPixels = 0;

                // Check every 50th pixel (smaller area)
                for (let i = 3; i < data.length; i += 200) {
                    // Check if alpha is low enough (relaxed check for anti-aliasing)
                    if (data[i] < 50) {
                        transparentPixels++;
                    }
                }

                const totalSampled = data.length / 200;
                const percentage = transparentPixels / totalSampled;

                // Threshold calculation:
                // Corners (always transparent) = ~21.5% of square canvas.
                // Circle area = ~78.5% of square canvas.
                // If user scratches 80% of the circle: 0.215 + (0.785 * 0.8) = 0.843 (84.3%)
                // If user scratches 50% of the circle: 0.215 + (0.785 * 0.5) = 0.607 (60.7%)
                // User reported issues with >80%, so we lower the threshold to ensure it triggers.
                // Setting to 0.5 (50% total transparency) means they need to scratch about 36% of the circle.
                // This ensures it feels responsive. We can tune up if it's too easy.

                if (percentage > 0.5) {
                    revealAll(true);
                }
            } catch (e) {
                console.error("Error checking reveal:", e);
            }
        };

        const startDrawing = (e: MouseEvent | TouchEvent) => {
            isDrawing = true;
            const pos = getMousePos(e);
            lastX = pos.x;
            lastY = pos.y;
        };
        const stopDrawing = () => isDrawing = false;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('touchstart', startDrawing);

        window.addEventListener('mouseup', stopDrawing);
        window.addEventListener('touchend', stopDrawing);

        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('touchmove', scratch);

        // Expose revealAll to effect scope if needed, but we use the separate effect for forceReveal

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('touchstart', startDrawing);
            window.removeEventListener('mouseup', stopDrawing);
            window.removeEventListener('touchend', stopDrawing);
            canvas.removeEventListener('mousemove', scratch);
            canvas.removeEventListener('touchmove', scratch);
        };
    }, [isRevealed, onReveal, revealAll]); // Removed forceReveal from here to avoid re-binding events unnecessarily

    // Separate effect for forceReveal to ensure it can trigger even if other deps haven't changed
    // Actually, I put it at the top.

    // Floating animation
    useEffect(() => {
        if (stickerRef.current) {
            gsap.to(stickerRef.current, {
                y: -15,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, []);

    // Parallax effect for title and subtitle when scrolling
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = 500; // Maximum scroll for parallax effect
            const scrollProgress = Math.min(scrollY / maxScroll, 1);

            if (titleRef.current) {
                // Title moves faster - appears to go behind the sticker
                gsap.to(titleRef.current, {
                    y: scrollProgress * 150,
                    z: scrollProgress * -100,
                    opacity: 1 - (scrollProgress * 0.8),
                    scale: 1 - (scrollProgress * 0.15),
                    duration: 0.3,
                    ease: "power2.out"
                });
            }

            if (subtitleRef.current) {
                // Subtitle moves slightly slower
                gsap.to(subtitleRef.current, {
                    y: scrollProgress * 120,
                    z: scrollProgress * -80,
                    opacity: 1 - (scrollProgress * 0.7),
                    scale: 1 - (scrollProgress * 0.1),
                    duration: 0.3,
                    ease: "power2.out"
                });
            }

            if (instructionRef.current) {
                // Instruction text moves slowest - stays visible longer
                gsap.to(instructionRef.current, {
                    y: scrollProgress * 100,
                    z: scrollProgress * -60,
                    opacity: 1 - (scrollProgress * 0.6),
                    scale: 1 - (scrollProgress * 0.08),
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-transparent pointer-events-none">

            {/* Tech Headline */}
            <div className="text-center mb-6 pointer-events-auto perspective-1000 text-sm md:text-lg">
                <h1 ref={titleRef} className="px-3 md:text-7xl font-bold text-black mb-4 tracking-tight leading-tight transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                    Protege tu marca con <br />
                    <span className="text-[#00FF88] relative inline-block">
                        Blockchain
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00FF88] opacity-30 blur-sm"></span>
                    </span>
                </h1>
                <p ref={subtitleRef} className="text-black/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                    Certifica tus productos en minutos
                </p>
            </div>

            {/* Sticker Container - Enhanced with neon glow */}
            <div
                ref={stickerRef}
                className="relative w-72 h-72 rounded-full pointer-events-auto cursor-pointer group"
            >
                {/* Neon Ring Glow - Animated */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#00FF88]/20 via-transparent to-[#00FF88]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-neon"></div>

                {/* Sticker Base - Realistic paper/vinyl effect */}
                <div className="absolute inset-0 rounded-full bg-white overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.8)]">
                    {/* Sticker edge highlight - simulates thickness */}
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/40 ring-inset"></div>

                    {/* Subtle texture overlay for paper/vinyl feel */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
                    }}></div>

                    {/* Sticker Content Area */}
                    <div className="absolute inset-0 p-4 flex items-center justify-center">
                        {/* Inner black section with QR */}
                        <div className="w-full h-full bg-gradient-to-br bg-white rounded-full p-8 flex items-center justify-center relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">

                            {/* QR Code with realistic sticker styling */}
                            <div className="w-42 h-42 bg-white p-3 rounded-lg relative overflow-visible shadow-[0_3px_8px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)]">
                                
                                {/* Sticker paper texture */}
                                <div className="absolute inset-0 opacity-[0.03] rounded-lg pointer-events-none z-10" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='stickerPaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23stickerPaper)'/%3E%3C/svg%3E")`,
                                    backgroundSize: '180px 180px'
                                }}></div>

                                {/* Edge lift effect - simulates sticker peeling possibility */}
                                <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 bg-gradient-to-tl from-black/5 to-transparent rounded-br-lg pointer-events-none z-20"></div>
                                <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 bg-gradient-to-tr from-black/5 to-transparent rounded-bl-lg pointer-events-none z-20"></div>

                                {/* Sticker adhesive slight transparency on edges */}
                                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/[0.03] pointer-events-none z-20"></div>

                                {/* Certiblock QR SVG */}
                                <div className="w-full h-full relative z-10">
                                    <img 
                                        src="/assets/images/certiblock-qr-svg.svg" 
                                        alt="Certiblock landing page svg qr"
                                        className="w-full h-full object-contain"
                                        style={{
                                            filter: 'contrast(1.01) brightness(0.99)'
                                        }}
                                    />
                                </div>

                                {/* Enhanced scan line effect when revealed */}
                                {isRevealed && (
                                    <>
                                        {/* Main scan line with green glow - subtle */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF88]/20 to-transparent animate-scan z-30 rounded-lg"></div>
                                        {/* Soft pulsing green overlay */}
                                        <div className="absolute inset-0 bg-[#00FF88]/3 animate-pulse z-30 rounded-lg"></div>
                                    </>
                                )}

                                {/* Realistic sticker gloss - top left light catch */}
                                <div className="absolute top-0 left-0 right-1/2 h-1/3 bg-gradient-to-br from-white/10 via-white/4 to-transparent pointer-events-none z-40 rounded-tl-lg"></div>
                                
                                {/* Corner shine */}
                                <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-white/15 to-transparent pointer-events-none z-40 rounded-tl-lg"></div>

                                {/* Subtle paper grain shadow for depth */}
                                <div className="absolute inset-0 rounded-lg shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.02)] pointer-events-none z-40"></div>
                            </div>

                            {/* Product Information - Top */}
                            <div className="absolute top-3 left-0 right-0 text-center">
                                <p className="text-[6px] font-bold text-black/60 tracking-widest uppercase">Authenticity Certificate</p>
                            </div>

                            {/* Brand Badge - Top Center */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-[#00FF88]"></div>
                                <p className="text-[7px] font-bold text-black/80 tracking-wide">CERTIBLOCK</p>
                                <div className="w-1 h-1 rounded-full bg-[#00FF88]"></div>
                            </div>

                            {/* Serial Number - Bottom */}
                            <div className="absolute bottom-3 left-0 right-0 text-center">
                                <p className="text-[6px] font-mono text-black/50 tracking-wider">SN: CB-2024-X8F9K2L</p>
                            </div>


                            {/* Security Level - Bottom Right */}
                            <div className="absolute bottom-5 right-6 text-right">
                                <p className="text-[5px] font-bold text-[#00FF88]/70 uppercase tracking-wide">Verified</p>
                            </div>

                            {/* Barcode decoration - Left side */}
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-[1px]">
                                <div className="w-[2px] h-3 bg-black/20"></div>
                                <div className="w-[1px] h-3 bg-black/20"></div>
                                <div className="w-[2px] h-3 bg-black/20"></div>
                                <div className="w-[1px] h-3 bg-black/20"></div>
                            </div>

                            {/* Date stamp - Right side */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90">
                                <p className="text-[5px] font-mono text-black/30">2024-12</p>
                            </div>

                            {/* Corner markers with glow - Enhanced with subtle animation when revealed */}
                            <div className={`absolute top-9 left-9 w-3 h-3 border-l-2 border-t-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`}></div>
                            <div className={`absolute top-9 right-9 w-3 h-3 border-r-2 border-t-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`} style={{ transitionDelay: '0.1s' }}></div>
                            <div className={`absolute bottom-9 left-9 w-3 h-3 border-l-2 border-b-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`} style={{ transitionDelay: '0.2s' }}></div>
                            <div className={`absolute bottom-9 right-9 w-3 h-3 border-r-2 border-b-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`} style={{ transitionDelay: '0.3s' }}></div>
                        </div>
                    </div>

                    {/* Sticker light reflection - simulates glossy finish */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-1/2 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-full blur-xl pointer-events-none"></div>

                    {/* Edge shadow for depth */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                </div>

                {/* Scratch Layer - Circular Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full rounded-full z-10 touch-none cursor-crosshair"
                />

                {/* Outer sticker edge ring */}
                <div className="absolute inset-0 rounded-full ring-1 ring-black/5 pointer-events-none"></div>
            </div>

            {/* Tech Instruction */}
            <div ref={instructionRef} className="mt-7 flex items-center justify-center pointer-events-auto max-w-xl transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                <p className="text-sm tracking-tight text-center">
                    <span className="text-black/90 font-semibold italic relative inline-block">
                        <span className="relative z-10">¿Es auténtico?</span>
                        <span className="absolute bottom-0 left-0 right-0 h-[40%] bg-[#00FF88]/30 -z-0"></span>
                    </span>
                    <span className="text-black/60 font-light tracking-wide"> La respuesta, a un scan de distancia.</span>
                </p>
            </div>
        </div>
    );
};

export default Hero;
