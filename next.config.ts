import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				port: "",
				pathname: "/PokeAPI/sprites/**",
			},
			{
				protocol: "https",
				hostname: "assets.pokemon.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
