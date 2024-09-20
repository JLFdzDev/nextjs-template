import { NextResponse } from 'next/server'

import { players } from '@/mocks/players'

export function GET() {
	return NextResponse.json(players)
}
