import React, { useState } from "react";
import { Phone } from "lucide-react";

interface HeroSectionProps {
  videoSrc?: string;
  logoText?: string;
  navLinks?: Array<{ href: string; label: string }>;
  avatarSrcList?: string[];
  userCount?: number;
  title?: React.ReactNode;
  description?: string;
  placeholder?: string;
  ctaText?: string;
  onSubmit?: (email: string) => void;
  footerVersion?: string;
}

export default function HeroSection({
  videoSrc = "/hero-video.mp4",
  title = "",
  description = "",
  placeholder = "La tua email",
  ctaText = "Acquista",
  onSubmit = () => {},
}: HeroSectionProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmit(email);
    setEmail("");
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden z-10 bg-black font-sans">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Invisible header to push content down */}
      <header className="relative p-8 md:p-16 z-10 invisible">
        <div className="h-10"></div>
      </header>

      {/* Main Hero - Centered Apple Style */}
      <main className="relative flex-grow flex items-center justify-center z-10 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-white mb-6">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-medium tracking-tight">
            {description}
          </p>

          <form
            className="flex flex-col sm:flex-row w-full max-w-md mx-auto gap-3"
            onSubmit={handleSubmit}
            aria-label="Waitlist signup"
          >
            <label htmlFor="email" className="sr-only">
              Indirizzo Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full px-6 py-4 text-white placeholder:text-white/60 outline-none focus:border-white/50 transition-colors rounded-full font-medium"
              style={{
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.05), 0 10px 40px rgba(0, 0, 0, 0.5)",
              }}
              required
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold px-8 py-4 hover:bg-zinc-200 transition-colors whitespace-nowrap rounded-full shrink-0"
            >
              {ctaText}
            </button>
          </form>
        </div>
      </main>

      {/* Bottom spacer to balance the layout */}
      <div className="relative z-10 p-8 md:p-16 invisible">
        <div className="h-20"></div>
      </div>
    </section>
  );
}
