'use client'

import { SyntheticEvent, useState } from 'react'
import CategoryItem, { CategoryItemType } from './CategoryItem'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'
import ActionPanel from './ActionPanel'
import ChangesBar from './ChangesBar'
import { useAppSelector } from '@/redux/store'
import { Reorder } from 'framer-motion'
import { cn } from '@/lib/utils'

const CategoryList = () => {
  const categoriesFromStore = useAppSelector(
    (state) => state.categories.value.categories
  )
  const searchFromStore = useAppSelector((state) => state.search.value.search)

  const [categories, setCategories] =
    useState<CategoryItemType[]>(categoriesFromStore)
  const [baseCategory, _] = useState<CategoryItemType>({
    name: 'Other',
    status: true,
    id: 'base-category'
  })
  const [tempCategory, setTempCategory] = useState<CategoryItemType | null>(
    null
  )

  const getPreparedData = ({
    data,
    search
  }: {
    data: CategoryItemType[]
    search: string
  }) => {
    if (search && data.length) {
      const result = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )

      return result
    }

    return data
  }

  const preparedData = getPreparedData({
    data: categories,
    search: searchFromStore
  })

  const handleItemCheckedChange = (id: string) => {
    const newCategories = preparedData.map((category) => {
      if (category.id === id) {
        return {
          ...category,
          status: !category.status
        }
      }

      return category
    })

    setCategories(newCategories)
  }

  const handleAddCategoryItem = (e: SyntheticEvent) => {
    e.preventDefault()

    const newCategory = {
      name: '',
      status: true,
      id: crypto.randomUUID()
    }

    setTempCategory(newCategory)
  }

  const handleSaveChanges = async (category: CategoryItemType) => {
    const { id } = category
    const isExist = categories.find((item) => item.id === id)

    await fetch(`/api/categories/${category.id}`, {
      method: isExist ? 'PUT' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    }).then((res) => res.json())

    await fetch('/api/categories', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then(setCategories)
      .finally(() => setTempCategory(null))
  }

  const setNewCategories = (data: CategoryItemType[]) => {
    setCategories(data)
  }

  return (
    <div className="flex w-full max-w-[638px] flex-col gap-3">
      <Button
        className="flex h-[50px] gap-3"
        onClick={handleAddCategoryItem}
        disabled={tempCategory !== null}
      >
        <PlusIcon size={16} />
        Create a Category
      </Button>
      {tempCategory &&
        !categories.find((item) => item.id === tempCategory?.id) && (
          <div
            key={tempCategory?.id}
            className="box-border flex h-[50px] items-center justify-between rounded-[4px] border-2 border-[var(--border-color)] bg-[var(--category-background)] px-5 py-3 text-[14px] leading-3"
          >
            <input
              type="text"
              className="bg-transparent focus:outline-none"
              onChange={(e) => {
                e.preventDefault()

                setTempCategory({
                  name: e.target.value,
                  status: tempCategory.status,
                  id: tempCategory.id
                })
              }}
              value={tempCategory.name}
              placeholder="Enter a category name"
            />
            <ActionPanel
              className="flex h-[26px] items-center justify-between gap-5 pl-5"
              status={tempCategory.status}
              handleCheckedChange={() => {}}
              handleDelete={() => {}}
              id={tempCategory.id}
            />
          </div>
        )}
      <Reorder.Group values={preparedData} onReorder={setCategories} axis="y">
        {preparedData.map((category) => (
          <CategoryItem
            updateCategory={setNewCategories}
            key={category.id}
            item={category}
            tempCategory={tempCategory}
            onClick={(value = category) => setTempCategory(value)}
            onChange={(value: string) => {
              setTempCategory({ ...category, name: value })
            }}
            handleCheckedChange={handleItemCheckedChange}
          />
        ))}
      </Reorder.Group>
      <div className="box-border flex h-[50px] items-center justify-between rounded-[4px] border-2 border-[var(--border-color)] bg-[var(--category-background)] px-5 py-3 text-[14px] leading-3">
        <div
          className={cn('bg-transparent', {
            'text-[#696969]': !baseCategory.status
          })}
        >
          {baseCategory.name}
        </div>
        <ActionPanel
          status={baseCategory.status}
          handleCheckedChange={handleItemCheckedChange}
          handleDelete={() => {}}
          id={baseCategory.id}
        />
      </div>
      {tempCategory?.name && tempCategory?.name.length > 0 && (
        <ChangesBar
          handleSave={() => handleSaveChanges(tempCategory)}
          handleCancel={() => setTempCategory(null)}
        />
      )}
    </div>
  )
}

export default CategoryList
