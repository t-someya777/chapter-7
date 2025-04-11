import { useEffect, useState } from "react";
import styles from './Contact.module.css';

type ValuesProps = {
  name:string
  email:string
  content:string
}

type ErrorsProps = {
  name: {
    message:string
    valid: boolean
  }
  email: {
    message:string
    valid: boolean
  }
  content: {
    message:string
    valid: boolean
  }
}

export default function Contact() {
  
  const [values, setValues] = useState<ValuesProps>({
    name: '',
    email: '',
    content: ''
  })
  
  const [errors, setErrors] = useState<ErrorsProps>({
    name: {
      message:'',
      valid: false,
    },
    email: {
      message:'',
      valid: false,
    },
    content: {
      message:'',
      valid: false,
    }
  })
  const [disabled, setDisabled] = useState<boolean>(false)

  const valueClear = () => {
    setValues(prev => ({
      ...prev,
      name: '',
      email: '',
      content: ''
    }))
  }

  const onSubmit = (e:React.FormEvent) => {
    e.preventDefault()

    if (values.name.length === 0) {
      setErrors(prev => ({
        ...prev,
        name: {
          message:'お名前は必須です。',
          valid:false
        }
      }))
    } else if(values.name.length >= 30) {
      setErrors(prev => ({
        ...prev, 
        name: {
          message:'お名前は30文字以内で入力してください。',
          valid:false
        }
      }))
    }else {
      setErrors(prev => ({
        ...prev,
        name: {
          message:'',
          valid:true
        }
      }))
    }

    if (values.email.length === 0) {
      setErrors(prev => ({
        ...prev,
        email: {
          message: 'メールアドレスは必須です。',
          valid:false
        }
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        email:{
        message: '',
        valid:true
      }
      }))
    }

    if (values.content.length === 0) {
      setErrors(prev => ({
        ...prev,
        content: {
          message: '本文は必須です。',
          valid:false
        }
      }))
    } else if(values.content.length >= 500) {
      setErrors(prev => ({
        ...prev,
        content: {
          message: '本文は500文字以内で入力してください。',
          valid:false
        }
      }))
    }else {
      setErrors(prev => ({
        ...prev,
        content: {
        message: '',
        valid:true
      }
      }))
    }
  }

  useEffect(() => {
    const errorCheck = Object.values(errors).every(({valid}) => valid)

    if(errorCheck) {
      postSend()
    }
  },[errors])

  const postSend = async () => {
    try{
      setDisabled(true)

      const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values)
      })

      if(!response.ok) {
        throw new Error('データを送信できませんでした。')
      }

      alert('送信しました')
      valueClear()
    } catch (error) {
      console.error(error)
    }finally {
      setDisabled(false)
    }
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-black text-xl font-bold">問合わせフォーム</h1>
      <form onSubmit={onSubmit} action="" className="mt-10">
        <div className="flex items-center">
          <label htmlFor="name" className="font-medium w-56">お名前</label>
          <div className='grow'>
            <input 
              id="name"
              name='name'
              className="w-full border border-gray-300 border-solid rounded-md p-2"
              type='text'
              value={values.name}
              onChange={(e) => setValues(prev => ({...prev, name:e.target.value}))}
              disabled={disabled}
            />
            <p className='text-red-800'>{errors.name.message}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <label htmlFor="email" className="font-medium w-56">メールアドレス</label>
          <div className='grow'>
            <input 
              id="email"
              name='email'
              className="w-full border border-gray-300 border-solid rounded-md p-2"
              type='email'
              value={values.email}
              onChange={(e) => setValues(prev => ({...prev, email:e.target.value}))}
              disabled={disabled}
            />
            <p className='text-red-800'>{errors.email.message}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <label htmlFor="content" className="font-medium w-56">本文</label>
          <div className='grow'>
            <textarea 
              id="content"
              name='content'
              className="h-48 w-full border border-gray-300 border-solid rounded-md p-2"
              value={values.content}
              onChange={(e) => setValues(prev => ({...prev, content:e.target.value}))}
              disabled={disabled}
            ></textarea>
            <p className='text-red-800'>{errors.content.message}</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center gap-8">
          <button 
            className={styles.buttonBlack}
            disabled={disabled}
          >
            送信
          </button>
          <button
            type="button"
            onClick={valueClear}
            disabled={disabled}
            className="bg-gray-200 font-bold py-2 px-4 rounded-lg"
          >
            クリア
          </button>
        </div>
      </form>
    </div>

    </div>
  )
}