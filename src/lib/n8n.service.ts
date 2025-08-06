import { PostData } from '@/types/postData'
import axios from 'axios'

const N8NURL = process.env.NEXT_PUBLIC_N8N_ADDRESS 

export const postOnLinkedin = async (phrase: string) => {
  try {
    await axios.post(`${N8NURL}/webhook/postOnLinkedin`, {
      data: phrase
    })
  } catch (error) {
    console.error(error)
  }
}

export const getPostFromPhrase = async (phrase: string): Promise<PostData> => {
  try {
    const response = await axios.post(`${N8NURL}/webhook/generatePostfromPhrase`, {
      message: phrase
    })

    const postData: PostData = {
      output: response.data.output || '',
      title: response.data.title || '',
      imageUrl: response.data.imageUrl || '',
      id: response.data.id || undefined,
      date: new Date().toISOString(), 
    }

    return postData
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo generar el post desde la temática")
  }
}

export const getPostFromArticle = async (phrase: string): Promise<PostData> => {
  try {
    const response = await axios.post(`${N8NURL}/webhook/generatePostfromArticle`, {
      message: phrase
    })

    const postData: PostData = {
      output: response.data.output || '',
      title: response.data.title || '',
      imageUrl: response.data.imageUrl || '',
      id: response.data.id || undefined,
      date: new Date().toISOString(), 
    }

    return postData
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo generar el post desde el artículo")
  }
}


