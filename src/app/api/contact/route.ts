import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    // Send to n8n webhook (replace with your actual webhook URL)
    await axios.post('https://your-n8n-webhook-url.com/webhook/contact', {
      name,
      email,
      message
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}