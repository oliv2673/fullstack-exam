import Image from "next/image";
import { env } from "@/config/env";

export default async function Home() {
	// define TypeInfo type
	type TypeInfo = {
		id: string;
		name: string;
		logo: string;
	};

	// Fetch Pokémon data
	const pokeRes = await fetch(`${env.API_URL}pokemon/pikachu`);
	const pokeData = await pokeRes.json();

	// Fetch all types
	const typeRes = await fetch(`${env.API_URL}type/`);
	const typeData = await typeRes.json();

	// Map Pokémon types to their type IDs
	const typeInfo = pokeData.types
		.map((t: { type: { name: string } }) => {
			// Find the type in the type list
			const type = typeData.results.find(
				(x: { name: string; url: string }) => x.name === t.type.name
			);
			if (!type) return null;

			// Extract type ID from URL (the last number in the API URL)
			const idMatch = type.url.match(/\/(\d+)\/$/);
			const typeId = idMatch ? idMatch[1] : "0";

			return {
				name: type.name,
				id: typeId,
				// Build the GitHub sprite URL dynamically
				// #TODO: Cleanup URL pattern og få det til at virke med .env i stedet for hardcoded
				logo: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/${typeId}.png`,
			};
		})
		.filter(Boolean);

	return (
		<main>
			<h1 className="play-font text-2xl font-bold">{pokeData.name}</h1>
			<h2>#{String(pokeData.id).padStart(4, "0")}</h2>

			<Image
				src={pokeData.sprites.other["official-artwork"].front_default ?? ""}
				alt={pokeData.name}
				width={500}
				height={500}
				// optional pixelated style
			/>
			{/* Render type logos dynamically */}
			{/* #TODO fix type og cleanup */}

			{typeInfo.map((type: TypeInfo) => (
				<Image
					key={type.id}
					src={type.logo}
					alt={type.name}
					width={100}
					height={100}
					className="pixelated"
					unoptimized
				/>
			))}
		</main>
	);
}
