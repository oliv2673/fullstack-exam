import Card from "@/components/Card";
import PokeGrid from "@/components/PokeGrid";

export default function Home() {
	return (
		<>
			<main className="bg-[url('/grass.webp')] bg-size-[250px] pixelated">{<PokeGrid />}</main>
		</>
	);
}
