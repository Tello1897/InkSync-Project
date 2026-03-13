import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Home, LayoutGrid, Sparkles, CreditCard, MessageSquare } from 'lucide-react';

const navItems = [
  { name: 'Home', id: 'home', icon: Home },
  { name: 'Funzionalità', id: 'features', icon: LayoutGrid },
  { name: 'Innovazione', id: 'innovations', icon: Sparkles },
  { name: 'Prezzi', id: 'pricing', icon: CreditCard },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="hidden lg:flex items-center gap-1 sm:gap-2 p-1.5 rounded-full"
      style={{
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.05), 0 10px 40px rgba(0, 0, 0, 0.5)",
      }}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {isActive && (
              <>
                {/* Active background tint */}
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
                {/* Tubelight effect */}
                <motion.div
                  layoutId="tubelight"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white rounded-b-full z-20"
                  style={{
                    boxShadow: '0 2px 12px 2px rgba(255, 255, 255, 0.8)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              </>
            )}
            <item.icon className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{item.name}</span>
          </a>
        );
      })}
    </nav>
  );
}
