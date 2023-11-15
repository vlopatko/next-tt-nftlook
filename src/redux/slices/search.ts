import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchState = {
  search: string
}

interface InitialState {
  value: SearchState
}

const initialState = {
  value: {
    search: ''
  } as SearchState,
} as InitialState

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (_, action: PayloadAction<string>) => {
      return {
        value: {
          search: action.payload,
        },
      }
    },
  },
})

export const { setSearch } = search.actions
export default search.reducer
