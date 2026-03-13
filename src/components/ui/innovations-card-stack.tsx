"use client";

import { CardStack, CardStackItem } from "./card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "AI per Design e Preventivi",
    description: "L'intelligenza artificiale stima tempi, costi (in base a zona corporea e complessità) e genera bozze da foto di riferimento.",
    imageSrc: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    title: "Community & Marketplace",
    description: "Compra/vendi flash design e attrezzature usate certificate. Forum integrato.",
    imageSrc: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    title: "Formazione Continua",
    description: "Accesso a corsi online (realismo, fine line) e webinar con artisti di fama internazionale.",
    imageSrc: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    title: "Automazione Marketing",
    description: "Auto-post su Instagram dei prima/dopo, email marketing per riattivare vecchi clienti, gestione recensioni.",
    imageSrc: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    href: "#",
  },
];

export function InnovationsCardStack() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl p-8">
        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={3000}
          pauseOnHover
          showDots
        />
      </div>
    </div>
  );
}
