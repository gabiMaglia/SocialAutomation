import axios from 'axios'

const N8NURL = process.env.N8N_ADDRESS || "https://team7.n8n.darwoft.io" 


export const postOnLinkedin = async (phrase:string) => {
    console.log(process.env.N8N_ADDRESS)
    try {
        axios.post(`${N8NURL}/webhook/postOnLinkedin`, {
            data:phrase
        })
    } catch (error) {
        console.error(error)
    }
}
export const getPostFromPhrase = async (phrase:string) => {
    try {
        axios.post(`${N8NURL}/webhook/generatePostfromPhrase`, {
            data:phrase
        })
    } catch (error) {
        console.error(error)
    }
}

export const getPostFromArticle = async (phrase:string) => {
  try {
        axios.post(`${N8NURL}/webhook/generatePostfromArticle`, {
            data:phrase
        })
    } catch (error) {
        console.error(error)
    }
}

