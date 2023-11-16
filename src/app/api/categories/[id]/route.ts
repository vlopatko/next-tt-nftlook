import { NextRequest, NextResponse } from 'next/server'
import { CategoryItemType } from '@/components/CategoryItem'
import { store } from '@/redux/store'
import { updateCategories } from '@/redux/slices/categories'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const categoriesFromStore = store.getState().categories.value.categories

  const reqBody = await req.json()

  const { id } = params
  const updatedCategories = [
    ...categoriesFromStore,
    { ...reqBody, id }
  ]

  store.dispatch(updateCategories(updatedCategories))

  return NextResponse.json(updatedCategories);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const categoriesFromStore = store.getState().categories.value.categories
  const reqBody = await req.json()

  const { id } = params
  const updatedCategories = categoriesFromStore.map((category: CategoryItemType) => {
    if (category.id === id) {
      return { ...category, ...reqBody }
    }

    return category
  })

  store.dispatch(updateCategories(updatedCategories))

  return NextResponse.json(updatedCategories);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const categoriesFromStore = store.getState().categories.value.categories

  const { id } = params
  const updatedCategories = categoriesFromStore.filter((category: CategoryItemType) => category.id !== id)

  store.dispatch(updateCategories(updatedCategories))

  return NextResponse.json(updatedCategories);
}
