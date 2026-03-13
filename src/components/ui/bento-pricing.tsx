'use client';
import React from 'react';

import { cn } from '../../lib/utils';
import { Button } from './button';
import { Badge } from './badge';
import { CheckIcon, SparklesIcon } from 'lucide-react';

type PricingCardProps = {
	titleBadge: string;
	priceLabel: string;
	priceSuffix?: string;
	features: string[];
	cta?: string;
	className?: string;
};

function FilledCheck() {
	return (
		<div className="bg-white text-black rounded-full p-0.5">
			<CheckIcon className="size-3" strokeWidth={3} />
		</div>
	);
}

function PricingCard({
	titleBadge,
	priceLabel,
	priceSuffix = '/mese',
	features,
	cta = 'Inizia Ora',
	className,
}: PricingCardProps) {
	return (
		<div
			className={cn(
				'relative overflow-hidden rounded-3xl',
				className,
			)}
			style={{
				backdropFilter: "blur(40px) saturate(180%)",
				WebkitBackdropFilter: "blur(40px) saturate(180%)",
				backgroundColor: "rgba(255, 255, 255, 0.03)",
				border: "1px solid rgba(255, 255, 255, 0.12)",
				boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.05), 0 10px 40px rgba(0, 0, 0, 0.5)",
			}}
		>
			<div className="flex items-center gap-3 p-6">
				<Badge variant="secondary">{titleBadge}</Badge>
				<div className="ml-auto">
					<Button variant="outline" className="rounded-full">{cta}</Button>
				</div>
			</div>

			<div className="flex items-end gap-2 px-6 py-2">
				<span className="font-sans text-5xl font-semibold tracking-tighter text-white">
					{priceLabel}
				</span>
				{priceLabel.toLowerCase() !== 'gratis' && (
					<span className="text-zinc-400 text-sm mb-2 font-medium">{priceSuffix}</span>
				)}
			</div>

			<ul className="text-zinc-400 grid gap-4 p-6 text-sm">
				{features.map((f, i) => (
					<li key={i} className="flex items-center gap-3">
						<FilledCheck />
						<span>{f}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export function BentoPricing() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
			<div
				className={cn(
					'relative w-full overflow-hidden rounded-3xl',
					'lg:col-span-5',
				)}
				style={{
					backdropFilter: "blur(40px) saturate(180%)",
					WebkitBackdropFilter: "blur(40px) saturate(180%)",
					backgroundColor: "rgba(255, 255, 255, 0.03)",
					border: "1px solid rgba(255, 255, 255, 0.12)",
					boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.05), 0 10px 40px rgba(0, 0, 0, 0.5)",
				}}
			>
				<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
					<div className="from-white/20 to-transparent absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
						<div
							aria-hidden="true"
							className={cn(
								'absolute inset-0 size-full mix-blend-overlay',
								'bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)]',
								'bg-[size:24px]',
							)}
						/>
					</div>
				</div>
				<div className="flex items-center gap-3 p-6">
					<Badge variant="default" className="bg-white text-black font-semibold">STUDIO PRO</Badge>
					<Badge variant="outline" className="hidden lg:flex border-white/20 text-white font-medium">
						<SparklesIcon className="me-1 size-3" /> Più Scelto
					</Badge>
					<div className="ml-auto">
						<Button className="rounded-full bg-white text-black hover:bg-zinc-200 font-semibold">Acquista</Button>
					</div>
				</div>
				<div className="flex flex-col p-6 lg:flex-row">
					<div className="pb-4 lg:w-[30%]">
						<span className="font-sans text-5xl font-semibold tracking-tighter text-white">
							€29
						</span>
						<span className="text-zinc-400 text-sm font-medium">/mese</span>
					</div>
					<ul className="text-zinc-300 grid gap-4 text-sm lg:w-[70%]">
						{[
							'Perfetto per studi di tatuaggi in crescita',
							'Appuntamenti e artisti illimitati',
							'Gestione avanzata degli acconti',
							'Promemoria SMS automatici per i clienti',
						].map((f, i) => (
							<li key={i} className="flex items-center gap-3">
								<FilledCheck />
								<span className="leading-relaxed">{f}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<PricingCard
				titleBadge="SOLO ARTIST"
				priceLabel="€0"
				features={[
					'Perfetto per tatuatori indipendenti',
					'Fino a 50 appuntamenti al mese',
					'Gestione base del portfolio',
					'Moduli di consenso digitali',
				]}
				className="lg:col-span-3"
			/>

			<PricingCard
				titleBadge="MULTI-STUDIO"
				priceLabel="€89"
				features={[
					'Ideale per studi con più sedi',
					'Pianificazione centralizzata dello staff',
					'Analisi finanziarie avanzate',
					'Pagina di prenotazione con brand personalizzato',
				]}
				className="lg:col-span-4"
			/>

			<PricingCard
				titleBadge="FRANCHISE"
				priceLabel="€199"
				features={[
					'Progettato per grandi catene',
					'Account manager dedicato',
					'Integrazioni API personalizzate',
					'Supporto prioritario 24/7',
				]}
				className="lg:col-span-4"
			/>
		</div>
	);
}
