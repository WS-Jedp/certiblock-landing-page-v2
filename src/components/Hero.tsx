
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

            // Fill with scratch surface color/texture
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

            // Add "Scratch Here" text or icon hint
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('SCRATCH', canvas.width / 2, canvas.height / 2 - 10);
            ctx.fillText('TO REVEAL', canvas.width / 2, canvas.height / 2 + 10);
        };

        resizeCanvas();
        // Resize observer might be better here if the sticker size changes, 
        // but window resize is okay for now if sticker is responsive.
        window.addEventListener('resize', resizeCanvas);

        let isDrawing = false;
        // let scratchedPixels = 0; // Unused
        // const totalPixels = canvas.width * canvas.height; // Unused

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
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2); // Smaller brush (was 30) for more subtle effect
            ctx.fill();

            // Check percentage revealed (throttled for performance)
            if (Math.random() > 0.5) { // Check 50% of the time (more frequent)
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

                // console.log("Scratch Percentage:", percentage); // Debugging

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

        const startDrawing = () => isDrawing = true;
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
                        <div className="w-full h-full bg-gradient-to-br from-black via-slate-900 to-black rounded-full p-8 flex items-center justify-center relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">

                            {/* QR Code with realistic styling */}
                            <div className="w-44 h-44 bg-white p-3 rounded-lg relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                                {/* QR pattern */}
                                <div className="w-full h-full bg-black pattern-grid-lg"></div>

                                {/* Enhanced scan line effect when revealed */}
                                {isRevealed && (
                                    <>
                                        {/* Main scan line with green glow - subtle */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF88]/20 to-transparent animate-scan"></div>
                                        {/* Soft pulsing green overlay */}
                                        <div className="absolute inset-0 bg-[#00FF88]/3 animate-pulse"></div>
                                    </>
                                )}

                                {/* Subtle gloss effect on QR */}
                                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Corner markers with glow - Enhanced with subtle animation when revealed */}
                            <div className={`absolute top-6 left-6 w-3 h-3 border-l-2 border-t-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`}></div>
                            <div className={`absolute top-6 right-6 w-3 h-3 border-r-2 border-t-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`} style={{ transitionDelay: '0.1s' }}></div>
                            <div className={`absolute bottom-6 left-6 w-3 h-3 border-l-2 border-b-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`} style={{ transitionDelay: '0.2s' }}></div>
                            <div className={`absolute bottom-6 right-6 w-3 h-3 border-r-2 border-b-2 border-[#00FF88] transition-all duration-700 ease-out ${isRevealed ? 'shadow-[0_0_10px_rgba(0,255,136,0.5)] scale-105' : 'shadow-[0_0_6px_rgba(0,255,136,0.3)]'}`} style={{ transitionDelay: '0.3s' }}></div>
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
            <div className="mt-12 flex items-center justify-center gap-3 pointer-events-auto">
                <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse shadow-[0_0_10px_#00FF88]"></div>
                <p className="text-black/50 text-sm font-light tracking-wide">
                    Verifica autenticidad al instante
                </p>
            </div>
        </div>
    );
};

export default Hero;
