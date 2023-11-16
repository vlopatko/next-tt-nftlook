import { CategoryItemType } from '@/components/CategoryItem'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CategoriesState = {
  categories: CategoryItemType[]
}

interface InitialState {
  value: CategoriesState
}

const initialState = {
  value: {
    categories: [
      {
        name: 'Technology',
        status: true,
        id: 'tech-category'
      },
      {
        name: 'Food',
        status: true,
        id: 'food-category'
      },
      {
        name: 'Books',
        status: false,
        id: 'books-category'
      },
      {
        name: 'Sports',
        status: true,
        id: 'sports-category'
      }
    ]
  } as CategoriesState,
} as InitialState

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateCategories: (_, action: PayloadAction<CategoryItemType[]>) => {
      return {
        value: {
          categories: action.payload,
        },
      }
    },
  },
})

export const { updateCategories } = categories.actions
export default categories.reducer
