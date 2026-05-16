import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, ChevronRight, CircleDot, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- A. NAVBAR ---
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -100',
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(242, 240, 233, 0.6)', backdropFilter: 'blur(16px)', color: '#1A1A1A', border: '1px solid rgba(0,0,0,0.05)', duration: 0.3 });
          } else if (self.progress === 0) {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'none', color: '#F2F0E9', border: '1px solid transparent', duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-[3rem] text-[#F2F0E9] flex items-center gap-8 transition-colors" ref={navRef}>
      <div className="font-sans font-bold text-lg tracking-tight">LivrExpress</div>
      <div className="hidden md:flex gap-6 text-sm font-outfit font-semibold opacity-90">
        <a href="#features" className="lift-link cursor-pointer">Fonctionnalités</a>
        <a href="#philosophy" className="lift-link cursor-pointer">Philosophie</a>
        <a href="#protocol" className="lift-link cursor-pointer">Protocole</a>
      </div>
      <button className="bg-accent text-white px-5 py-2 rounded-full font-sans font-semibold text-sm magnet-button lift-link hidden md:block">
        Demander un devis
      </button>
    </div>
  );
};

// --- B. HERO ---
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-20 px-6 md:px-16 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2500&auto=format&fit=crop" 
          alt="Dark forest texture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="hero-text text-[#F2F0E9] font-sans font-semibold text-2xl md:text-3xl mb-[-10px] md:mb-[-20px] tracking-tight">
          LivrExpress est le
        </div>
        <div className="hero-text text-accent font-serif italic text-7xl md:text-[8rem] leading-[1.1] mb-8 pr-4">
          Mouvement Continu.
        </div>
        <button className="hero-text bg-accent text-white px-8 py-4 rounded-[2rem] font-sans font-semibold text-lg flex items-center gap-3 magnet-button lift-link">
          Demander un devis <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

// --- C. FEATURES ---
const DiagnosticMixer = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Analyse des itinéraires" },
    { id: 2, text: "Optimisation de la flotte" },
    { id: 3, text: "Déploiement immédiat" }
  ]);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 border border-dark/5 shadow-lg relative overflow-hidden flex flex-col h-[320px]">
      <div className="mb-4">
        <h3 className="font-sans font-bold text-xl text-dark">Livraison rapide</h3>
        <p className="font-outfit text-sm text-dark/70 mt-1">Diagnostic de temps de transit</p>
      </div>
      <div className="flex-1 relative mt-4">
        {cards.map((card, i) => {
          const isTop = i === 0;
          const isMiddle = i === 1;
          const isBottom = i === 2;
          
          return (
            <div 
              key={card.id}
              className={`absolute left-0 right-0 bg-white p-4 rounded-xl border border-dark/10 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                ${isTop ? 'top-0 scale-100 z-30 opacity-100' : ''}
                ${isMiddle ? 'top-4 scale-95 z-20 opacity-70' : ''}
                ${isBottom ? 'top-8 scale-90 z-10 opacity-40' : ''}
              `}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-primary">{`SEQ_${card.id}`}</span>
                <CircleDot size={14} className="text-accent" />
              </div>
              <p className="font-sans font-medium text-sm mt-2 text-dark">{card.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const TelemetryTyping = () => {
  const text = "Initialisation du protocole de service... \nQualité vérifiée. \nLivraison sécurisée activée.";
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 border border-dark/5 shadow-lg relative overflow-hidden flex flex-col h-[320px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-sans font-bold text-xl text-dark">Service professionnel</h3>
          <p className="font-outfit text-sm text-dark/70 mt-1">Télémétrie en temps réel</p>
        </div>
        <div className="flex items-center gap-2 bg-dark/5 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-[10px] text-dark/70 uppercase">Flux en Direct</span>
        </div>
      </div>
      <div className="flex-1 bg-dark text-[#F2F0E9] p-5 rounded-xl font-mono text-sm leading-relaxed overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #CC5833 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        <div className="whitespace-pre-wrap">{displayed}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span></div>
      </div>
    </div>
  );
};

const CursorScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cellRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set(cursorRef.current, { x: 0, y: 150, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 120, y: 30, duration: 1, ease: 'power2.inOut' })
        // Click action
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to(cellRef.current, { backgroundColor: '#CC5833', color: 'white', duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        // Move to save
        .to(cursorRef.current, { x: 220, y: 140, duration: 0.8, ease: 'power2.inOut', delay: 0.2 })
        // Click save
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to(btnRef.current, { scale: 0.95, duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(btnRef.current, { scale: 1, duration: 0.1 }, "<")
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.2 })
        .to(cellRef.current, { backgroundColor: 'transparent', color: '#1A1A1A', duration: 0.3 }, "<");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 border border-dark/5 shadow-lg relative overflow-hidden flex flex-col h-[320px]" ref={containerRef}>
      <div className="mb-6">
        <h3 className="font-sans font-bold text-xl text-dark">Dispo 24h/24</h3>
        <p className="font-outfit text-sm text-dark/70 mt-1">Planificateur de disponibilité</p>
      </div>
      
      <div className="relative flex-1">
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs font-medium text-dark/50 mb-2">
          <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        <div className="grid grid-cols-7 gap-1 h-12">
          {[...Array(7)].map((_, i) => (
            <div key={i} ref={i === 3 ? cellRef : null} className="border border-dark/10 rounded-md flex items-center justify-center font-mono text-xs text-dark transition-colors">
              {24}
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-2 right-0">
          <button ref={btnRef} className="bg-primary text-white text-xs px-4 py-2 rounded-full font-sans font-semibold">
            Confirmer
          </button>
        </div>

        {/* Cursor */}
        <div ref={cursorRef} className="absolute top-0 left-0 z-20 pointer-events-none drop-shadow-md">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-white">
            <path d="M4 4l16 16" />
            <path d="M4 4v16l4-4h8l4-12z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 px-6 md:px-16 bg-[#F2F0E9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DiagnosticMixer />
          <TelemetryTyping />
          <CursorScheduler />
        </div>
      </div>
    </section>
  );
};

// --- D. PHILOSOPHY ---
const Philosophy = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philo-line', {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" className="relative py-40 px-6 md:px-16 bg-dark text-[#F2F0E9] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2500&auto=format&fit=crop" 
          alt="Forest parallax" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div ref={textRef} className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="philo-line font-sans text-xl md:text-2xl text-[#F2F0E9]/70 mb-8 tracking-tight">
          La plupart des services logistiques se concentrent sur : la simple livraison.
        </p>
        <p className="philo-line font-serif italic text-4xl md:text-6xl leading-tight">
          Nous nous concentrons sur : <span className="text-accent">l'intégrité</span> du flux continu.
        </p>
      </div>
    </section>
  );
};

// --- E. PROTOCOL ---
const ProtocolCard = ({ step, title, desc, visual }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 bg-background/50 backdrop-blur-sm protocol-card-wrapper">
      <div className="protocol-card bg-white rounded-[3rem] p-12 md:p-20 shadow-xl max-w-5xl w-full mx-4 border border-dark/5 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="font-mono text-accent text-sm font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent"></span>
            ETAPE_{step}
          </div>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark mb-6 tracking-tight">{title}</h2>
          <p className="font-outfit text-lg text-dark/70 leading-relaxed max-w-md">{desc}</p>
        </div>
        <div className="flex-1 w-full h-[300px] bg-dark/5 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
          {visual}
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card-wrapper');
      
      cards.forEach((cardWrapper, i) => {
        const card = cardWrapper.querySelector('.protocol-card');
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cardWrapper,
            start: 'top top',
            endTrigger: cards[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0.5,
              filter: 'blur(20px)',
              ease: 'power2.inOut'
            }),
            scrub: true
          });
        }
      });
      
      // Animations for visuals
      gsap.to('.spin-slow', { rotation: 360, duration: 20, repeat: -1, ease: 'linear' });
      gsap.to('.scan-line', { top: '100%', duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative pb-32">
      <ProtocolCard 
        step="01" 
        title="Acquisition" 
        desc="Prise en charge immédiate avec vérification diagnostique de l'itinéraire optimal."
        visual={
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 border-2 border-dashed border-primary rounded-full spin-slow"></div>
            <div className="absolute inset-4 border border-accent rounded-full spin-slow" style={{ animationDirection: 'reverse' }}></div>
            <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-dark w-10 h-10" />
          </div>
        }
      />
      <ProtocolCard 
        step="02" 
        title="Acheminement" 
        desc="Navigation en temps réel à travers l'écosystème urbain de Dakar."
        visual={
          <div className="w-full h-full relative p-8">
            <div className="w-full h-full grid grid-cols-10 grid-rows-6 gap-2 opacity-20">
              {[...Array(60)].map((_, i) => <div key={i} className="bg-primary rounded-sm"></div>)}
            </div>
            <div className="scan-line absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_10px_rgba(204,88,51,0.8)] top-0 z-10"></div>
          </div>
        }
      />
      <ProtocolCard 
        step="03" 
        title="Remise" 
        desc="Confirmation biologique de la remise au destinataire. Le cycle est complet."
        visual={
          <svg className="w-full h-24 stroke-accent stroke-[3px] fill-none" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 L30,10 L35,2 L40,18 L45,10 L100,10" strokeDasharray="100" strokeDashoffset="0">
              <animate attributeName="stroke-dashoffset" values="100;0" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
        }
      />
    </section>
  );
};

// --- F. GET STARTED ---
const GetStarted = () => {
  return (
    <section className="py-32 px-6 md:px-16 bg-[#F2F0E9] flex justify-center">
      <div className="bg-primary text-[#F2F0E9] rounded-[3rem] p-16 md:p-24 max-w-5xl w-full text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <h2 className="relative z-10 font-sans font-bold text-4xl md:text-5xl mb-6">Prêt à initier le transfert ?</h2>
        <p className="relative z-10 font-outfit text-lg text-[#F2F0E9]/70 mb-10 max-w-xl mx-auto">
          Demandez un devis immédiat et expérimentez la précision d'une livraison calibrée pour vos besoins.
        </p>
        <button className="relative z-10 bg-accent text-white px-10 py-5 rounded-full font-sans font-bold text-lg magnet-button lift-link inline-flex items-center gap-3">
          Demander un devis maintenant <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

// --- G. FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-dark text-[#F2F0E9] rounded-t-[4rem] pt-24 pb-12 px-6 md:px-16 mt-[-4rem] relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-sans font-bold text-3xl tracking-tight mb-4">LivrExpress</div>
          <p className="font-outfit text-[#F2F0E9]/60 max-w-xs">
            Livraison rapide de colis. L'instrument logistique de Dakar.
          </p>
        </div>
        <div>
          <h4 className="font-sans font-semibold mb-6">Navigation</h4>
          <ul className="space-y-4 font-outfit text-[#F2F0E9]/60 text-sm">
            <li><a href="#features" className="hover:text-accent transition-colors">Fonctionnalités</a></li>
            <li><a href="#philosophy" className="hover:text-accent transition-colors">Philosophie</a></li>
            <li><a href="#protocol" className="hover:text-accent transition-colors">Protocole</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans font-semibold mb-6">Légal</h4>
          <ul className="space-y-4 font-outfit text-[#F2F0E9]/60 text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">Confidentialité</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Conditions</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-[#F2F0E9]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-mono text-xs text-[#F2F0E9]/40">
          © {new Date().getFullYear()} LivrExpress. Tous droits réservés.
        </div>
        <div className="flex items-center gap-3 bg-[#F2F0E9]/5 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-mono text-xs text-[#F2F0E9]/80 uppercase tracking-widest">Système Opérationnel</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-background min-h-screen font-sans selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <GetStarted />
      <Footer />
    </div>
  );
}

export default App;
