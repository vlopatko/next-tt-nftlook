'use client'

import React from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setSearch } from '@/redux/slices/search'

const Search = () => {
  const search = useAppSelector((state) => state.value)
  const dispatch = useDispatch()

  return (
    <div className="flex h-10 w-full max-w-[380px] items-center rounded-[4px] bg-[var(--input-background)] px-[20px] py-[10px] text-sm font-normal">
      <input
        type="text"
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Search"
        className="m-0 w-full border-none bg-inherit p-0 focus:outline-none"
        value={search.search}
      />
      <SearchIcon className="text-[var(--text-color)]" width={20} height={20} />
    </div>
  )
}

export default Search
