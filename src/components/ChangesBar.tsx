'use client'

import React from 'react'
import { Button } from './ui/button'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const ChangesBar = ({
  handleSave,
  handleCancel
}: {
  handleSave: () => void
  handleCancel: () => void
}) => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-[26px] bg-[#2E2F3C] py-5">
      <Button
        onClick={handleSave}
        className={cn(
          'box-border flex h-full max-h-[64px] w-full max-w-[638px] items-center justify-center gap-2 rounded-[4px] border-[3px] border-[#424454] bg-inherit hover:border-[#45CB54] hover:bg-[#45CB54]'
        )}
      >
        <CheckCircle size={20} />
        Save Changes
      </Button>
      <Button
        onClick={handleCancel}
        className={cn(
          'box-border flex h-full max-h-[64px] w-full max-w-[638px] items-center justify-center gap-2 rounded-[4px] border-[3px] border-[#424454] bg-inherit hover:border-[#FF4D4D] hover:bg-[#FF4D4D]'
        )}
      >
        Cancel
      </Button>
    </div>
  )
}

export default ChangesBar
