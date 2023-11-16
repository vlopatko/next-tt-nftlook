import { store } from "@/redux/store"
import { NextResponse } from "next/server"

export async function GET() {
  const categoriesFromStore = store.getState().categories.value.categories

  return NextResponse.json(categoriesFromStore)
}