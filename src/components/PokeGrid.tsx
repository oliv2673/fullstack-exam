import Card, { TypeInfo } from "./Card";
import { getPokemon, getTypes, Pokemon } from "@/services/api-client";

export default async function PokeGrid() {
	// Create an array of numbers from 1 to 20
	const pokemonIds = Array.from({ length: 20 }, (_, i) => String(i + 1));

	// Fetch type list once + all pokemon in parallel
	const [typeList, pokemons] = await Promise.all([
		getTypes(),
		Promise.all(pokemonIds.map((id) => getPokemon(id))),
	]);

	const makeTypeInfo = (pokemon: Pokemon): TypeInfo[] =>
		pokemon.types
			.map((t) => {
				const type = typeList.results.find((poke) => poke.name === t.type.name);
				if (!type) return null;
				const match = type.url.match(/\/(\d+)\/$/);
				const id = match ? match[1] : "0";
				return {
					id,
					name: type.name,
					logo: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/${id}.png`,
				};
			})
			.filter((t): t is TypeInfo => t !== null);

	return (
		<div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1200px] m-auto">
			{pokemons.map((pokemon) => (
				<Card key={pokemon.id} pokemon={pokemon} types={makeTypeInfo(pokemon)} />
			))}
		</div>
	);
}
