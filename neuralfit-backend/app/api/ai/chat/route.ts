import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const hfRes = await fetch(process.env.HF_MODEL_ENDPOINT!, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: messages }),
    })

    if (!hfRes.ok) {
      const text = await hfRes.text()
      return NextResponse.json({ error: text }, { status: 500 })
    }

    const data = await hfRes.json()

    // adapt response shape to your frontend needs
    return NextResponse.json({ assistant: data })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
