import CategoryList from '@/components/CategoryList'
import fs from 'fs'
import path from 'path'

export default async function Home() {
  const dataPath = path.join(process.cwd(), 'src/lib', 'store.json')
  const categories = fs.readFileSync(dataPath, 'utf-8')

  return (
    <div className="flex justify-center py-8">
      <CategoryList data={JSON.parse(categories).categories.reverse()} />
    </div>
  )
}
