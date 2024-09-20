import { Player } from '@/types'

import { players as playersMock } from '@/mocks/players'

import prisma from '@/db/connection'

import { NextResponse } from 'next/server'
import { getSortedTeams, getTeamLevel, matchTeams, sortPlayersByLevel } from '@/utils/player'
import { shuffleArray } from '@/utils/array'

export async function GET() {
	const p: Player[] = await new Promise((resolve) => {
		resolve(playersMock)
	})

	// const players = await prisma.player.findMany({
	// 	take: 18,
	// })

	const players = shuffleArray(p)

	console.log({ players })

	const sortedPlayers = sortPlayersByLevel(players)
	const { team1, team2 } = getSortedTeams(sortedPlayers)

	const { team1: matchTeam1, team2: matchTeam2 } = matchTeams(team1, team2)

	return NextResponse.json({
		white: {
			players: matchTeam1,
			level: getTeamLevel(matchTeam1),
		},
		blue: {
			players: matchTeam2,
			level: getTeamLevel(matchTeam2),
		},
	})
}
