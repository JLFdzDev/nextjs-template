import { Player } from '@/types'
import { shuffleArray } from '@/utils/array'

interface Team {
	players: Player[]
	level: number
}

interface Data {
	white: Team
	blue: Team
}

async function getData() {
	const res = await fetch('http://localhost:3001/api/game', {
		next: {
			revalidate: 0,
		},
	})

	const data = (await res.json()) as Data

	return data
}

export default async function Home() {
	const { white, blue } = await getData()

	/*const { shuffleWhite, shuffleBlue } = {
		shuffleWhite: shuffleArray(white.players),
		shuffleBlue: shuffleArray(blue.players),
	}*/

	return (
		<div className="flex items-center justify-center w-full h-screen bg-background text-foreground">
			<div className="flex flex-wrap w-96">
				<div className="w-1/2 flex flex-col gap-4">
					<h1 className="text-2xl font-bold">Blanco ({white.level})</h1>
					<ul>
						{white.players.map((player) => (
							<li key={player.id} className="py-2 px-4 border border-b-0 last:border-b">
								{player.name}
							</li>
						))}
					</ul>
				</div>
				<div className="w-1/2 flex flex-col gap-4">
					<h1 className="text-2xl font-bold">Azul ({blue.level})</h1>
					<ul>
						{blue.players.map((player) => (
							<li key={player.id} className="py-2 px-4 border border-b-0 last:border-b">
								{player.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
