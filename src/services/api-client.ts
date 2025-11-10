import axios from "axios";
import { env } from "@/config/env";

export interface Pokemon {
	id: number;
	name: string;
	sprites: {
		other: {
			"official-artwork": {
				front_default: string | null;
			};
		};
	};
	types: Array<{
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}>;
}

export interface TypeList {
	count: number;
	next?: string;
	previous?: string;
	results: Array<{
		name: string;
		url: string;
	}>;
}

const client = axios.create({
	baseURL: env.API_URL,
	timeout: 10_000,
});

export async function getPokemon(nameOrId: string): Promise<Pokemon> {
	const res = await client.get<Pokemon>(`pokemon/${nameOrId}`);
	return res.data;
}

export async function getTypes(): Promise<TypeList> {
	const res = await client.get<TypeList>("type/");
	return res.data;
}
