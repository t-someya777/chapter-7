import { useParams } from "react-router-dom"
import useFetchData from "../../hooks/useFetchData"
import { handleDate } from "../../functions/handleDate"

type DataProps = {
  id:number
  title:string
  createdAt:string
  thumbnailUrl:string
  content:string
  categories:string[]
}

export default function Post() {

  const {id} = useParams()
  const url:string = `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
  const {data:post, loading}:{data:DataProps|null, loading:boolean} = useFetchData(url, 'lower')

  if(!loading) return <div>読み込み中</div>
  if(!post) return <div>データがありません</div>

  console.log(post)
  return (
    <div className='max-w-3xl mx-auto px-8 pt-10'>
      <div>
        <img src={post.thumbnailUrl} alt="" />
      </div>
      <div className="flex items-center justify-between pt-6 px-3">
        <time className="text-gray-500 text-sm" dateTime={post.createdAt.split('T')[0]}>{handleDate(post.createdAt)}</time>
        <div>
          {post.categories.map(category => (
            <span className="ml-1 p-2 border rounded text-blue-600 text-sm" key={category}>{category}</span>
          ))}
        </div>
      </div>
      <h1 className="pt-8 text-3xl">{post.title}</h1>
      <p className="pt-8" dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}