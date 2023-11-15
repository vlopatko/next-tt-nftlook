import React from 'react'
import ActionPanel from './ActionPanel'
import { cn } from '@/lib/utils'
import { Reorder } from 'framer-motion'

export interface CategoryItemType {
  id: string
  name: string
  status: boolean
}

const CategoryItemmm = ({
  item,
  handleCheckedChange,
  updateCategory,
  onChange,
  onClick,
  tempCategory
}: {
  item: CategoryItemType
  handleCheckedChange: (value: string) => void
  onChange: (value: string) => void
  updateCategory: (value: CategoryItemType[]) => void
  onClick: (value?: CategoryItemType) => void
  tempCategory: CategoryItemType | null
}) => {
  const { id, name, status } = item

  const handleDelete = async () => {
    await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then(updateCategory)
  }

  return (
    <Reorder.Item value={item}>
      <div className="mt-3 box-border flex h-[50px] items-center justify-between rounded-[4px] border-2 border-[var(--border-color)] bg-[var(--category-background)] px-5 py-3 text-[14px] leading-3">
        {id === tempCategory?.id ? (
          <div className="flex w-fit">
            <input
              autoFocus
              type="text"
              className={cn('w-fit bg-transparent', {
                'text-[#696969]': !tempCategory.status
              })}
              onBlur={() => onClick(tempCategory)}
              onChange={(e) => onChange(e.target.value)}
              value={tempCategory.name}
            />
            <p className="text-sm text-white/10">
              Don&apos;t forget save changes
            </p>
          </div>
        ) : (
          <div
            className={cn('bg-transparent', {
              'text-[#696969]': !status
            })}
            onClick={() => onClick()}
          >
            {name}
          </div>
        )}
        <ActionPanel
          status={status}
          handleCheckedChange={handleCheckedChange}
          handleDelete={handleDelete}
          id={id}
        />
      </div>
    </Reorder.Item>
  )
}

export default CategoryItemmm
