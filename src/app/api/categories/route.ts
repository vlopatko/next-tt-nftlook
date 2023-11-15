import path from "path"
import fs from "fs"
import { NextResponse } from "next/server"

export async function GET() {
  const dataPath = path.join(process.cwd(), 'src/lib', 'store.json')
  const data = fs.readFileSync(dataPath, 'utf-8')

  return NextResponse.json(JSON.parse(data).categories)
}