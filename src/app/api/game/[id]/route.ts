import prisma from '@/db/connection'
import { NextRequest, NextResponse } from 'next/server'

const playersNames = ['leixa', 'jose', 'izan', 'pepo', 'jl', 'jacobo']

export async function GET(req: NextRequest, { params: { id: gameId } }: { params: { id: string } }) {
	const players = await getPlayersByNameOrAlias(playersNames)

	const notFoundPlayers = playersNames.filter(
		(name) => !players.find((player) => player.name === name || player.alias === name),
	)

	if (notFoundPlayers.length > 0) {
		const newPlayers = await createPlayersByPlayerNames(notFoundPlayers)

		players.push(...newPlayers)
	}

	const playersAssociatedToGame = await prisma.game_player.findMany({
		select: {
			player_id: true,
		},
		where: {
			game_id: gameId,
		},
	})

	const notAssociatedPlayers = players.filter(player => )

	return NextResponse.json({
		gameId,
		players,
		notFoundPlayers,
	})
}

async function getPlayersByNameOrAlias(playerNames: string[]) {
	const players = await prisma.player.findMany({
		select: {
			id: true,
			name: true,
			alias: true,
		},
		where: {
			OR: [
				{
					alias: {
						in: playerNames,
					},
				},
				{
					name: {
						in: playerNames,
					},
				},
			],
		},
	})

	return players
}

async function createPlayersByPlayerNames(playersNames: string[]) {
	const players = await prisma.player.createManyAndReturn({
		select: {
			id: true,
			name: true,
			alias: true,
		},
		data: playersNames.map((name) => {
			return {
				name,
				alias: name,
			}
		}),
	})

	return players
}
