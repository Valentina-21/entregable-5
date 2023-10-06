import axios from "axios"
import { useState } from "react"


const useFetch = (url) => {

  const [infoApi, setInfoApi] = useState()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const getApi = () => {
    setIsLoading(true)
    axios.get(url)
    .then(res=> {
      setInfoApi(res.data)
      setHasError(false)
      })
    .catch(err => {
      console.log(err)
      setHasError(true)
    })
    .finally(() => setIsLoading(false))
  }

  const getTypeApi = (urlType) => {
    setIsLoading(true)
    axios.get(urlType)
    .then(res=> {
      res.data
      const obj = {
        results: res.data.pokemon.map(e => e.pokemon)
      }
      setInfoApi(obj)
      setHasError(false)
    })
    .catch(err => {
      console.log(err)
      setHasError(true)
    })
    .finally(() => setIsLoading(false))
  }

  return [ infoApi, getApi, getTypeApi, hasError, isLoading ]
}

export default useFetch