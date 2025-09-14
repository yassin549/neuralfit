import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const name = `room-${Date.now()}`

  const r = await fetch('https://api.daily.co/v1/rooms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, privacy: 'private', ...body }),
  })

  const data = await r.json()
  return NextResponse.json(data)
}
