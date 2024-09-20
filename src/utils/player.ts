import { Player } from '@/types'

export function sortPlayersByLevel(players: Player[]) {
	return players.sort((a, b) => b.level - a.level)
}

export function getSortedTeams(players: Player[]) {
	const sortedPlayers = sortPlayersByLevel(players)

	const team1: Player[] = []
	const team2: Player[] = []

	sortedPlayers.forEach((player, index) => {
		if (index % 2 === 0) {
			team1.push(player)
		} else {
			team2.push(player)
		}
	})

	return {
		team1,
		team2,
	}
}

export function getTeamLevel(team: Player[]) {
	return team.reduce((acc, player) => acc + player.level, 0)
}

export function matchTeams(team1: Player[], team2: Player[]) {
	const team1Level = getTeamLevel(team1)
	const team2Level = getTeamLevel(team2)

	if (team1Level === team2Level) {
		return {
			team1,
			team2,
		}
	}

	const difference = Math.abs(team1Level - team2Level)

	const maxLevel = 5
	let minLevel = 2

	while (difference > 1 && minLevel <= maxLevel) {
		const player1Index = team1.findIndex((player) => player.level === minLevel)
		const player2Index = team2.findIndex((player) => player.level === minLevel - 1)

		if (player1Index !== -1 && player2Index !== -1) {
			const player1 = team1[player1Index]
			const player2 = team2[player2Index]

			team1[player1Index] = player2
			team2[player2Index] = player1

			return matchTeams(team1, team2)
		}

		minLevel++
	}

	return {
		team1,
		team2,
	}
}
