import Image from 'next/image'
import React from 'react'
import Search from './Search'

const NavBar = () => {
  return (
    <header className="sticky left-0 top-0 z-10 box-border flex w-full items-center justify-center border-b border-[var(--border-color)] bg-inherit py-[18px]">
      <div className="flex w-full max-w-[1298px] items-center justify-between">
        <Image src="/LeftLogo.svg" alt="company logo" width={196} height={30} />
        <Search key={'search'} />
      </div>
    </header>
  )
}

export default NavBar
