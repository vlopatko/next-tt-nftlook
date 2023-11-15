'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import Switch from './Switch'
import { cn } from '@/lib/utils'
import DeleteIcon from '@/lib/icons/deleteIcon.svg'
import DragIcon from '@/lib/icons/dragIcon.svg'
import DeletePopup from './DeletePopup'

const ActionPanel = ({
  status,
  handleCheckedChange,
  handleDelete,
  id,
  className
}: {
  status: boolean
  handleCheckedChange: (value: string) => void
  handleDelete: () => void
  id: string
  className?: string
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false)

  const handleCancelDelete = () => {
    setShowDeletePopup(false)
  }

  const handleConfirmDelete = () => {
    handleDelete()
    setShowDeletePopup(false)
  }

  return (
    <div
      className={cn(
        'flex h-[26px] items-center justify-between gap-5 pl-5',
        className
      )}
    >
      <Switch
        id={id}
        checked={status}
        onCheckedChange={handleCheckedChange}
        className="h-[26px] w-[47px]"
      />
      <Button
        className={cn(
          'cursor-pointer bg-inherit p-0 transition-colors hover:bg-transparent hover:fill-white',
          {
            invisible: id === 'base-category'
          }
        )}
        disabled={id === 'base-category'}
        onClick={() => setShowDeletePopup(true)}
      >
        <DeleteIcon
          color="#9B9D9F"
          src="deleteIcon.svg"
          width={26}
          height={26}
          alt="delete category"
        />
      </Button>
      <Button
        variant={'ghost'}
        className={cn(
          'cursor-pointer bg-inherit p-0 transition-colors hover:bg-transparent hover:fill-white',
          {
            invisible: id === 'base-category'
          }
        )}
        disabled={id === 'base-category'}
      >
        <DragIcon
          src="dragIcon.svg"
          width={8}
          height={14}
          alt={`drag\'n\'drop\' category`}
          color="white"
        />
      </Button>
      {showDeletePopup && (
        <DeletePopup
          onCancelDelete={handleCancelDelete}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  )
}

export default ActionPanel
