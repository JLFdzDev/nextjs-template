import { Player } from '@/types'

import { describe, expect, it } from 'vitest'

import { players } from '../mocks/players'

function getTeams(players: Player[]) {
	const a: Player[] = []
	const b: Player[] = []

	players.forEach((player, index) => {
		if (index % 2 === 0) {
			a.push(player)
		} else {
			b.push(player)
		}
	})

	return [a, b]
}

function sumTeamLevel(team: Player[]) {
	return team.reduce((acc, player) => acc + player.level, 0)
}

describe('Match', () => {
	/*it('should divide players into two teams', () => {
		const teams = getTeams(players)

		expect(teams.length).toBe(2)
	})*/
	it('should return two arrays', () => {
		const teams = getTeams([])

		expect(teams[0]).toBeInstanceOf(Array)
		expect(teams[1]).toBeInstanceOf(Array)
	})
	it('should have the same number of players in each team or first team can have 1 player more', () => {
		const teams = getTeams(players)
		const teamDifference = teams[0].length - teams[1].length

		expect(teamDifference).toBeLessThanOrEqual(1)
	})
	it('should have the same level sum in each team or first team must have +3 level', () => {
		const players = [
			{ id: '1', name: 'a', level: 5 },
			{ id: '1', name: 'b', level: 5 },
			{ id: '1', name: 'c', level: 5 },
			{ id: '1', name: 'd', level: 1 },
			{ id: '1', name: 'e', level: 1 },
			{ id: '1', name: 'f', level: 1 },
		]

		const teams = getTeams(players)
		const teamDifference = sumTeamLevel(teams[0]) - sumTeamLevel(teams[1])

		expect(teamDifference).toBeLessThanOrEqual(3)
	})
})
