import React from 'react'
import { Button } from './ui/button'
import DeleteIcon from '@/lib/icons/deleteIcon.svg'
import { X } from 'lucide-react'

const DeletePopup = ({
  onConfirmDelete,
  onCancelDelete
}: {
  onConfirmDelete: () => void
  onCancelDelete: () => void
}) => {
  return (
    <div className="fixed left-0 top-0 flex min-h-full min-w-full items-center justify-center bg-black bg-opacity-80">
      <div className="relative flex w-[400px] flex-col gap-3 bg-[#272934] px-6 py-8">
        <Button
          variant={'link'}
          className="absolute right-0 top-0 text-[#EAEAEA] opacity-20"
          onClick={onCancelDelete}
        >
          <X width={14} height={14} className="right-[0px] top-[0px]" />
        </Button>
        <p className="mb-8 text-center text-2xl">Delete the Category?</p>
        <Button
          onClick={onConfirmDelete}
          className="flex h-[58px] min-w-full items-center justify-center bg-gradient-to-r from-[#A139FD] to-[#50BDFC] py-[14px] text-white"
        >
          <DeleteIcon
            src="deleteIcon.svg"
            width={26}
            height={26}
            alt="delete category"
          />
          Delete
        </Button>
        <Button
          variant={'destructive'}
          onClick={onCancelDelete}
          className="text-red text-base"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default DeletePopup
