import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, FileSignature, Package, Users, Globe, 
  Sparkles, ShoppingBag, GraduationCap, Megaphone,
  CheckCircle2, ArrowRight, Info, Play, Droplet, LogOut
} from 'lucide-react';
import AuthModal from './components/AuthModal';
import FloatingNav from './components/FloatingNav';
import { PremiumTestimonials } from './components/ui/premium-testimonials';
import { AnimatedBackground } from './components/ui/animated-background';
import { BentoPricing } from './components/ui/bento-pricing';
import { InnovationsCardStack } from './components/ui/innovations-card-stack';
import { HolographicCard } from './components/ui/holographic-card';
import HeroSection from './components/ui/hero-section-2';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

const Annotation = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 flex items-start gap-3 rounded-lg bg-zinc-900/80 border border-zinc-700/50 p-4 text-sm text-zinc-400 font-mono shadow-lg backdrop-blur-sm">
    <Info className="w-5 h-5 mt-0.5 shrink-0 text-white" />
    <span className="leading-relaxed">
      <strong className="text-zinc-300">Nota per il Web Designer:</strong> {children}
    </span>
  </div>
);

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-white/30 font-sans relative">
      <AnimatedBackground />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Droplet className="w-6 h-6 text-white" />
            <span className="font-sans font-semibold text-lg tracking-tight text-white">INKSYNC</span>
          </a>
          
          <FloatingNav />
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-zinc-300 hidden md:block">
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                  title="Esci"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <button className="bg-white hover:bg-zinc-200 text-black px-4 py-1.5 rounded-full text-sm font-medium transition-all">
                  Dashboard
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors hidden md:block"
                >
                  Accedi
                </button>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-white hover:bg-zinc-200 text-black px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                >
                  Acquista
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}

      {/* Hero Section */}
      <HeroSection
        videoSrc="/hero-video.mp4"
        logoText=""
        navLinks={[]}
        avatarSrcList={[
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64",
        ]}
        userCount={1250}
        title={
          <>
            Il tuo studio.<br />Superpotenziato.
          </>
        }
        description="Appuntamenti perfetti. Consensi digitali. Inventario intelligente. Tutto in un'unica app."
        placeholder="La tua email"
        ctaText="Acquista"
        onSubmit={(email) => {
          console.log("Email submitted:", email);
          setIsAuthModalOpen(true);
        }}
        footerVersion="v1.0 INK SYNC"
      />

      {/* Core Features Section */}
      <section id="features" className="py-24 bg-transparent border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-sans text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
              Tutto quello che ti serve.<br />E molto di più.
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium tracking-tight">
              Funzionalità potenti, racchiuse in un design essenziale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Appuntamenti Complessi",
                description: "Gestione sessioni multiple, depositi non rimborsabili, promemoria WhatsApp/Email anti-assenteismo.",
                icon: <Calendar className="w-6 h-6 text-white" />,
                annotation: "Icona di un calendario con una spunta verde e un badge di notifica WhatsApp. Mockup di un telefono che riceve il promemoria."
              },
              {
                title: "Burocrazia e Consensi",
                description: "Generazione automatica PDF, firma digitale e archiviazione cloud sicura dei consensi legali.",
                icon: <FileSignature className="w-6 h-6 text-white" />,
                annotation: "Animazione di un documento che viene firmato digitalmente e salvato in una cartella cloud protetta."
              },
              {
                title: "Inventario e Scadenze",
                description: "Tracciamento inchiostri (alert per scadenze 12 mesi), aghi monouso e consumabili.",
                icon: <Package className="w-6 h-6 text-white" />,
                annotation: "Grafica di boccette di inchiostro con un indicatore di livello e un alert rosso di scadenza."
              },
              {
                title: "Gestione Studio e Multi-Artista",
                description: "Calendari sincronizzati (3-10 tatuatori), split dei pagamenti (percentuali studio/artista) e dashboard fatturato.",
                icon: <Users className="w-6 h-6 text-white" />,
                annotation: "Dashboard con grafici a torta per lo split dei pagamenti e avatar multipli degli artisti."
              },
              {
                title: "Portfolio & Booking 24/7",
                description: "Sito integrato, i clienti vedono gli slot liberi, pagano il deposito online e approvano i design.",
                icon: <Globe className="w-6 h-6 text-white" />,
                annotation: "Mockup di un sito web elegante su laptop con una galleria di tatuaggi e un pulsante 'Prenota Ora'."
              }
            ].map((feature, idx) => (
              <HolographicCard 
                key={idx}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                annotation={feature.annotation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section id="innovations" className="py-24 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="font-sans text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
              Avanti anni luce.
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium tracking-tight max-w-2xl">
              Tecnologie esclusive. Per farti dominare il settore.
            </p>
          </div>

          <InnovationsCardStack />
        </div>
      </section>

      {/* Testimonials Section */}
      <PremiumTestimonials />

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-transparent border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-sans text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
              Potenza per ogni studio.
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium tracking-tight">
              Piani chiari. Valore assoluto.
            </p>
          </div>

          <BentoPricing />

          <div className="mt-12 text-center text-sm text-zinc-500">
            * Servizi extra disponibili: setup su misura (€500-€1500), commissioni sui pagamenti online e corsi premium avanzati.
          </div>
        </div>
      </section>

      {/* Footer & Final CTA */}
      <footer className="border-t border-white/10 bg-transparent relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="font-sans text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-tight">
                Pronto a fare il salto?
              </h2>
              <p className="text-zinc-400 text-xl md:text-2xl font-medium tracking-tight mb-8">
                Unisciti ai migliori studi. Inizia oggi.
              </p>
              <Annotation>Logo del software in grande, texture di sfondo scura (es. pattern geometrico o texture pelle/carta ruvida).</Annotation>
            </div>
            
            <div 
              className="p-8 rounded-3xl"
              style={{
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.05), 0 10px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">Contattaci</h3>
              <p className="text-zinc-400 mb-6 font-medium">Hai domande o vuoi saperne di più? Compila il modulo e ti risponderemo al più presto.</p>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Il tuo nome" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors font-medium"
                />
                <input 
                  type="email" 
                  placeholder="La tua email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors font-medium"
                />
                <textarea 
                  placeholder="Il tuo messaggio" 
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none font-medium"
                ></textarea>
                <button type="submit" className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-zinc-200 transition-colors mt-2">
                  Invia Messaggio
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Droplet className="w-6 h-6 text-white" />
                <span className="font-sans font-semibold text-lg tracking-tight text-white">INKSYNC</span>
              </div>
              <p className="text-zinc-500 text-sm font-medium">
                Il gestionale definitivo per i professionisti del tatuaggio.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-tight">Prodotto</h4>
              <ul className="space-y-2 text-sm text-zinc-500 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Funzionalità</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prezzi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corsi Online</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 tracking-tight">Azienda</h4>
              <ul className="space-y-2 text-sm text-zinc-500 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Chi Siamo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contatti</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 tracking-tight">Legale</h4>
              <ul className="space-y-2 text-sm text-zinc-500 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termini di Servizio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
            <div>
              &copy; {new Date().getFullYear()} InkSync. Tutti i diritti riservati.
            </div>
            <div className="font-medium">
              v1.0 INK SYNC
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
