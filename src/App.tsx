import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from './components/Hero';
import PhoneFrame from './components/PhoneFrame';
import ContextCarousel from './components/ContextCarousel';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { type UseCase } from './components/PhoneScreen';
import Header from './components/Header';
import Background from './components/Background';
import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [isScratched, setIsScratched] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState<UseCase>('industrial');
  const [currentStep, setCurrentStep] = useState(-1);

  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneSectionRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const descLine1Ref = useRef<HTMLParagraphElement>(null);
  const descLine2Ref = useRef<HTMLParagraphElement>(null);
  const descLine3Ref = useRef<HTMLParagraphElement>(null);

  // Features Refs
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const featuresTitleRef = useRef<HTMLHeadingElement>(null);
  const featuresSubtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // HowItWorks Refs
  const howItWorksSectionRef = useRef<HTMLDivElement>(null);
  const howItWorksLineRef = useRef<HTMLDivElement>(null);
  const howItWorksLeftContentRef = useRef<HTMLDivElement>(null);
  const howItWorksTitleRef = useRef<HTMLHeadingElement>(null);
  const howItWorksDescRef = useRef<HTMLParagraphElement>(null);
  const howItWorksButtonRef = useRef<HTMLButtonElement>(null);
  const howItWorksStepsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Footer Refs
  const footerSectionRef = useRef<HTMLDivElement>(null);
  const footerBrandRef = useRef<HTMLDivElement>(null);
  const footerLinksRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerBottomBarRef = useRef<HTMLDivElement>(null);

  // CTA Section Refs
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaGlowRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const ctaDescRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect scroll to trigger auto-reveal
    const scrollTrigger = ScrollTrigger.create({
      start: "top top", // When page starts scrolling
      onUpdate: (self) => {
        if (self.scroll() > 50 && !isScratched) { // Threshold of 50px
          setForceReveal(true);
        }
      }
    });

    return () => scrollTrigger.kill();
  }, [isScratched]);

  useEffect(() => {
    // Initialize GSAP animations for phone section
    const ctx = gsap.context(() => {

      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, scale: 0.7, y: 250, z: -150 });
      gsap.set(subtitleRef.current, { opacity: 0, scale: 0.85, y: 200, z: -100 });
      gsap.set(descLine1Ref.current, { opacity: 0, scale: 0.9, y: 60 });
      gsap.set(descLine2Ref.current, { opacity: 0, scale: 0.9, y: 60 });
      gsap.set(descLine3Ref.current, { opacity: 0, scale: 0.9, y: 60 });

      // Hero Fade Out Animation
      gsap.to(heroRef.current, {
        opacity: 0.2,
        ease: "none", // Linear scrub for direct control
        scrollTrigger: {
          trigger: phoneSectionRef.current,
          start: "top 90%", // Start fading slightly after it enters view
          end: "top 30%", // Fade out completely when top is at 30% (70% visible)
          scrub: true,
        }
      });

      // Title Fade In Animation - Appears from behind the phone with premium elegance
      gsap.fromTo(titleRef.current,
        {
          scale: 0.7,
          opacity: 0,
          y: 250, // Much deeper starting position
          z: -150, // Further behind the phone in 3D space
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          z: 0,
          ease: "power3.out", // Smoother, more elegant easing
          scrollTrigger: {
            trigger: phoneSectionRef.current,
            start: "top 90%",
            end: "top -20%", // Extended scroll distance for prolonged parallax
            scrub: 2, // Higher scrub value for slower, more premium feel
            immediateRender: false, // Prevent immediate calculation of animation state
          }
        }
      );

      // Subtitle Fade In Animation - Appears after title with refined timing
      gsap.fromTo(subtitleRef.current,
        {
          scale: 0.85,
          opacity: 0,
          y: 200, // Deeper starting position
          z: -100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          z: 0,
          ease: "power3.out", // Matching elegant easing
          scrollTrigger: {
            trigger: phoneSectionRef.current,
            start: "top 80%", // Starts later than title
            end: "top -30%", // Extended scroll distance for smooth, prolonged reveal
            scrub: 2.5, // Even slower for refined feel
            immediateRender: false, // Prevent immediate calculation of animation state
          }
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: phoneSectionRef.current,
          start: "top top", // When phone section hits top
          end: "+=500%", // Extended scroll distance for onboarding steps (now 6 steps)
          scrub: 1,
          pin: true,
          // markers: true,
          onUpdate: (self) => {
            // Calculate step based on progress (0 to 1)
            // We have 6 steps (0-5).
            // Let's map progress to steps 0-5
            const progress = self.progress;
            if (progress < 0.15) {
              setCurrentStep(-1); // No step active initially
            } else if (progress < 0.28) {
              setCurrentStep(0);
            } else if (progress < 0.42) {
              setCurrentStep(1);
            } else if (progress < 0.56) {
              setCurrentStep(2);
            } else if (progress < 0.70) {
              setCurrentStep(3);
            } else if (progress < 0.84) {
              setCurrentStep(4);
            } else if (progress < 0.95) {
              setCurrentStep(5);
            } else {
              setCurrentStep(-1); // Hide at the end
            }
          }
        }
      });

      // Initial state - No need to set here since fromTo handles it
      gsap.set(phoneWrapperRef.current, { scale: 1.2, y: 50 }); // Smaller initial scale and less offset
      gsap.set(carouselRef.current, { y: 0 }); // Initial position at bottom

      // Animation sequence - Phone scales down and centers
      tl.to(phoneWrapperRef.current, {
        scale: 1,
        y: 0,
        duration: 0.15, // Faster animation
        ease: "power2.out"
      });

      // Carousel Parallax Animation - Moves up during onboarding to be visible
      tl.to(carouselRef.current, {
        y: -90, // Move up significantly to be visible at bottom of viewport during onboarding
        duration: 0.3, // Slower reveal
        ease: "power2.out"
      }, "<"); // Start at the same time as phone animation

      // Move carousel back down at the end
      tl.to(carouselRef.current, {
        y: 0, // Return to original position below phone
        duration: 0.2,
        ease: "power2.in"
      }, ">=0.6"); // After steps are done

      // Description lines parallax - Appear from below independently when they enter viewport
      gsap.fromTo(descLine1Ref.current,
        { opacity: 0, scale: 0.85, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descLine1Ref.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1.5,
            immediateRender: false,
          }
        }
      );

      gsap.fromTo(descLine2Ref.current,
        { opacity: 0, scale: 0.85, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descLine2Ref.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1.5,
            immediateRender: false,
          }
        }
      );

      gsap.fromTo(descLine3Ref.current,
        { opacity: 0, scale: 0.85, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descLine3Ref.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1.5,
            immediateRender: false,
          }
        }
      );

      // --- FEATURES ANIMATIONS ---
      // Title & Subtitle
      gsap.fromTo(featuresTitleRef.current,
        { opacity: 0, y: 50, rotateX: 20 },
        {
          opacity: 1, y: 0, rotateX: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresSectionRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
      gsap.fromTo(featuresSubtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresSectionRef.current,
            start: "top 65%",
            end: "top 45%",
            scrub: 1
          }
        }
      );
      // Cards Staggered Parallax
      featuresCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 100, scale: 0.9, rotateX: 10 },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 1.5
            }
          }
        );
      });

      // --- HOW IT WORKS ANIMATIONS ---
      // Left Content Entrance
      gsap.fromTo(howItWorksLeftContentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
      // Title & Desc
      gsap.fromTo(howItWorksTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: "top 65%",
            end: "top 45%",
            scrub: 1
          }
        }
      );
      gsap.fromTo(howItWorksDescRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: "top 60%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
      gsap.fromTo(howItWorksButtonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: "top 55%",
            end: "top 35%",
            scrub: 1
          }
        }
      );
      // Line Drawing
      gsap.fromTo(howItWorksLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );
      // Steps Staggered
      howItWorksStepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step,
          { opacity: 0, x: 50, scale: 0.9 },
          {
            opacity: 1, x: 0, scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "top 60%",
              scrub: 1
            }
          }
        );
      });

      // --- FOOTER ANIMATIONS ---
      gsap.fromTo(footerSectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerSectionRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: 1
          }
        }
      );
      gsap.fromTo(footerBrandRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: footerSectionRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1
          }
        }
      );
      footerLinksRefs.current.forEach((linkGroup, i) => {
        if (!linkGroup) return;
        gsap.fromTo(linkGroup,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: footerSectionRef.current,
              start: `top ${75 - i * 5}%`,
              end: `top ${55 - i * 5}%`,
              scrub: 1
            }
          }
        );
      });
      gsap.fromTo(footerBottomBarRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: footerSectionRef.current,
            start: "bottom 95%",
            end: "bottom 85%",
            scrub: 1
          }
        }
      );

      // --- CTA SECTION ANIMATIONS ---
      // Initial States
      gsap.set(ctaContentRef.current, { opacity: 0, y: 80, scale: 0.9 });
      gsap.set(ctaTitleRef.current, { opacity: 0, rotateX: 20, y: 60, scale: 0.85 });
      gsap.set(ctaDescRef.current, { opacity: 0, y: 40 });
      gsap.set(ctaButtonsRef.current, { opacity: 0, scale: 0.7, y: 30 });

      // Glow Pulse
      gsap.to(ctaGlowRef.current, {
        scale: 1.5,
        opacity: 0.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Content Entrance
      gsap.to(ctaContentRef.current, {
        opacity: 1, y: 0, scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 75%",
          end: "top 40%",
          scrub: 1.5
        }
      });

      // Title 3D Rotate
      gsap.to(ctaTitleRef.current, {
        opacity: 1, rotateX: 0, y: 0, scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaTitleRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1.5
        }
      });

      // Description Parallax
      gsap.to(ctaDescRef.current, {
        opacity: 1, y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaDescRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1.5
        }
      });

      // Buttons Pop
      gsap.to(ctaButtonsRef.current, {
        opacity: 1, scale: 1, y: 0,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ctaButtonsRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1.5
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []); // Run once on mount

  const handleReveal = (isManual: boolean) => {
    setIsScratched(true);
    if (isManual) {
      // Auto-scroll to 30% of viewport height with GSAP for sophistication
      gsap.to(window, {
        scrollTo: window.innerHeight * 0.3,
        duration: 1.5, // Slightly faster scroll
        ease: "power2.inOut", // Smooth easing
      });
    }
  };

  return (
    <div ref={mainRef} className="w-full min-h-screen bg-transparent text-slate-900 mx-auto flex flex-col items-center justify-center">
      <Background currentUseCase={currentUseCase} />
      <Header />

      {/* Hero / Scratch Section - Fixed at top */}
      <div ref={heroRef} className="fixed top-0 left-0 w-full h-[100vh] z-0">
        <Hero onReveal={handleReveal} forceReveal={forceReveal} />
      </div>

      {/* Main Content - Scrolls over the Hero */}
      <main className="relative z-10 w-full mt-[66vh] mx-auto">

        {/* Phone Section - Starts with white background to cover Hero */}
        <section ref={phoneSectionRef} className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-x-hidden overflow-y-visible pt-20 pb-3 bg-gradient-to-b from-transparent via-white via-70% to-white left-0 right-0 mx-auto">

          {/* Tech Background Elements */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Background Parallax Elements - More subtle */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#00FF88] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center mx-auto justify-center min-h-screen">
            {/* Title Container - Both texts with independent animations */}
            <div className="text-center w-full px-6 mb-6 perspective-1000">
              {/* Main Title */}
              <div ref={titleRef} className="transform-gpu mb-6 opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                <h2 className="text-5xl md:text-6xl font-bold text-center tracking-tight">
                  <span className="text-[#00FF88]">Verificable</span> para siempre
                </h2>
              </div>

              {/* Subtitle */}
              <p ref={subtitleRef} className="text-black/60 text-lg max-w-2xl mx-auto transform-gpu opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                Gemelos digitales en blockchain
              </p>
            </div>

            {/* Phone Wrapper */}
            <div className="relative">
              <div ref={phoneWrapperRef} className="transform-gpu">
                <PhoneFrame currentUseCase={currentUseCase} currentStep={currentStep} />
              </div>
            </div>

            {/* Context Switcher - Fixed position during scroll, moves up during onboarding */}
            <div ref={carouselRef} className="-mt-3 md:-mt-9 z-20 w-full max-w-full overflow-x-hidden overflow-y-visible transform-gpu">
              <ContextCarousel
                currentUseCase={currentUseCase}
                onUseCaseChange={setCurrentUseCase}
              />
            </div>

          </div>
        </section>

        {/* Value Propositions Section - Independent scroll animations */}
        <section className="w-full flex flex-col items-center justify-center relative py-20 bg-white">
          <div className="w-full h-[30vh] flex flex-col items-center justify-center px-6 space-y-8">
            <p ref={descLine1Ref} className="text-4xl md:text-6xl lg:text-7xl text-black font-bold leading-tight text-center transform-gpu opacity-0">
              Adaptable a <span className="relative inline-block">
                <span className="relative z-10">cualquier</span>
                <span className="absolute inset-0 bg-[#00FF88]/20 -skew-x-12 animate-pulse"></span>
              </span> industria
            </p>
            <p ref={descLine2Ref} className="text-4xl md:text-6xl lg:text-7xl text-black font-bold leading-tight text-center transform-gpu opacity-0">
              <span className="relative inline-block">
                <span className="relative z-10">Autenticidad</span>
                <span className="absolute inset-0 bg-[#00FF88]/20 -skew-x-12 animate-pulse"></span>
              </span> garantizada
            </p>
            <p ref={descLine3Ref} className="text-4xl md:text-6xl lg:text-7xl text-black font-bold leading-tight text-center transform-gpu opacity-0">
              <span className="relative inline-block">
                <span className="relative z-10">Trazabilidad</span>
                <span className="absolute inset-0 bg-[#00FF88]/20 -skew-x-12 animate-pulse"></span>
              </span> total en blockchain
            </p>
          </div>
        </section>

        {/* Features Section */}
        <Features
          sectionRef={featuresSectionRef}
          titleRef={featuresTitleRef}
          subtitleRef={featuresSubtitleRef}
          cardsRef={featuresCardsRef}
        />

        {/* How It Works Section */}
        <HowItWorks
          sectionRef={howItWorksSectionRef}
          lineRef={howItWorksLineRef}
          leftContentRef={howItWorksLeftContentRef}
          titleRef={howItWorksTitleRef}
          descRef={howItWorksDescRef}
          buttonRef={howItWorksButtonRef}
          stepsRefs={howItWorksStepsRef}
        />

        {/* CTA Section */}
        <CTASection
          sectionRef={ctaSectionRef}
          glowRef={ctaGlowRef}
          contentRef={ctaContentRef}
          titleRef={ctaTitleRef}
          descRef={ctaDescRef}
          buttonsRef={ctaButtonsRef}
        />

        <Footer
          footerRef={footerSectionRef}
          brandRef={footerBrandRef}
          linksRefs={footerLinksRefs}
          bottomBarRef={footerBottomBarRef}
        />
      </main>
    </div>
  );
}

export default App;
