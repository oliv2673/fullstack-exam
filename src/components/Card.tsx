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
		<article className="relative rounded-xl shadow-lg p-6 bg-card-bg/25 backdrop-blur-[2px] text-shadow-main">
			<div className="space-y-2 mb-4 flex justify-end">

				<h2 className="font-play text-2xl text-gray-300 text-white">#{String(pokemon.id).padStart(4, "0")}</h2>
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
			<div className="py-2">
				<h2 className="font-play text-2xl font-bold capitalize text-white">{pokemon.name}</h2>
			</div>

			<div className="flex gap-2 object-contain">
				{types.map((type) => (
					<div key={type.id} className="relative">
						<Image src={type.logo} alt={type.name} width={64} height={28} className="pixelated object-contain" unoptimized />
					</div>
				))}
			</div>
		</article>
	);
}
