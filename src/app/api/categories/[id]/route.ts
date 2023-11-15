import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { CategoryItemType } from '@/components/CategoryItem'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const dataPath = path.join(process.cwd(), 'src/lib', 'store.json')
  const rawData = fs.readFileSync(dataPath, 'utf-8')
  const reqBody = await req.json()
  const data = JSON.parse(rawData).categories

  const { id } = params
  const updatedData = {
    categories: [
      ...data,
      { ...reqBody, id }
    ]
  }

  fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf-8')

  return NextResponse.json(updatedData);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const dataPath = path.join(process.cwd(), 'src/lib', 'store.json')
  const rawData = fs.readFileSync(dataPath, 'utf-8')
  const reqBody = await req.json()
  const data = JSON.parse(rawData).categories

  const { id } = params
  const updatedData = {
    categories: data.map((category: CategoryItemType) => {
      if (category.id === id) {
        return { ...category, ...reqBody }
      }

      return category
    })
  }

  fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf-8')

  return NextResponse.json(updatedData);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const dataPath = path.join(process.cwd(), 'src/lib', 'store.json')
  const rawData = fs.readFileSync(dataPath, 'utf-8')
  const data = JSON.parse(rawData).categories

  const { id } = params
  const updatedData = {
    categories: data.filter((category: CategoryItemType) => category.id !== id)
  }

  fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf-8')

  return NextResponse.json(updatedData.categories);
}
