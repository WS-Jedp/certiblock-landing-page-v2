import React, { useEffect, useRef } from 'react';
import { type UseCase } from './PhoneScreen';

interface BackgroundProps {
    currentUseCase: UseCase;
}

const Background: React.FC<BackgroundProps> = ({ currentUseCase }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Particle colors based on Use Case - More subtle
    const getParticleColor = (useCase: UseCase) => {
        switch (useCase) {
            case 'industrial': return 'rgba(0, 255, 136, 0.15)'; // Neon Green - Reduced opacity
            case 'fashion': return 'rgba(157, 0, 255, 0.15)'; // Violet - Reduced opacity
            case 'art': return 'rgba(0, 194, 255, 0.15)'; // Cyan - Reduced opacity
            default: return 'rgba(0, 255, 136, 0.15)';
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 1.5 + 0.3; // Smaller, more subtle dots
                this.speedX = Math.random() * 0.3 - 0.15; // Slower movement
                this.speedY = Math.random() * 0.3 - 0.15;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around screen
                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = getParticleColor(currentUseCase);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / 20000); // Lower density
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', () => {
            resizeCanvas();
            init();
        });

        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [currentUseCase]);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* 1. Base Background */}
            <div className="absolute inset-0 bg-[#F5F5F7]" />

            {/* 2. Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* 3. Particles Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* 4. Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none animate-noise"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px'
                }}
            />

            {/* 5. Vignette for focus */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/5" />
        </div>
    );
};

export default Background;
