import { NextResponse } from 'next/server'

export default async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const instrument = searchParams.get('instrument')

  return NextResponse.json({ name, instrument })
}
