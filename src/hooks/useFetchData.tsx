import { useState, useEffect } from "react"

type DataProps = {
  id:number
  title:string
  createdAt:string
  thumbnailUrl:string
  content:string
  categories:string[]
}

export default function useFetchData<T = DataProps[] | DataProps>(url:string, page:string){
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchData(url)
  }, [])

  const fetchData = async(url:string) => {
    try {
      const response = await fetch(url)

      if(!response.ok) {
        throw new Error('データを取得できませんでした')
      }
      const data = await response.json()

      const posts = page === 'top' ? data.posts : data.post
      setData(posts)
      setLoading(true)
    }catch (error) {
      console.error(error)
    }
  }

  return {data, loading}
}