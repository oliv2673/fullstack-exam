import Image from "next/image";
import { Pokemon } from "@/services/api-client";

export type TypeInfo = {
	id: string;
	name: string;
	logo: string;
};

interface CardProps {
	pokemon: Pokemon;
	types: TypeInfo[];
}

export default function Card({ pokemon, types }: CardProps) {
	return (
		<article className="relative rounded-xl shadow-lg p-6 bg-card-bg/100 backdrop-blur-sm transition-transform hover:scale-105">
			<div className="space-y-2 mb-4">
				<h1 className="font-play text-2xl font-bold capitalize text-white">{pokemon.name}</h1>
				<h2 className="text-gray-300 text-sm">#{String(pokemon.id).padStart(4, "0")}</h2>
			</div>

			<div className="relative aspect-square mb-4">
				<Image
					src={pokemon.sprites.other["official-artwork"].front_default ?? ""}
					alt={pokemon.name}
					fill
					className="object-contain p-2"
					priority
				/>
			</div>

			<div className="flex gap-2 flex-wrap">
				{types.map((type) => (
					<div key={type.id} className="relative w-8 h-8">
						<Image src={type.logo} alt={type.name} fill className="pixelated" unoptimized />
					</div>
				))}
			</div>
		</article>
	);
}
