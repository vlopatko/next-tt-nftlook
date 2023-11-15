import { cn } from '@/lib/utils'
import React from 'react'

interface SwitchProps {
  checked: boolean
  onCheckedChange: (value: string) => void
  className: string
  id: string
}

const Switch = ({ checked, onCheckedChange, className, id }: SwitchProps) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center justify-between rounded-full bg-[#3E3F49] p-[7px] text-[11px] font-bold text-[#9B9D9F] transition-all duration-500 hover:bg-[#3E3F49]',
        {
          'text-[#07D41B]': checked
        },
        className
      )}
      onClick={(e) => {
        e.preventDefault()
        onCheckedChange(id)
      }}
    >
      {checked && <p>On</p>}
      <div
        className={cn(
          'h-3 w-3 rounded-full bg-[#9B9D9F] transition-colors duration-500',
          {
            'bg-[#07D41B]': checked
          }
        )}
      />
      {!checked && <p>Off</p>}
    </div>
  )
}

export default Switch
