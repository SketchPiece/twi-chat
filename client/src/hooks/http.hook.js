import {useState,useCallback} from 'react'
import axios from 'axios'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) =>{
        setLoading(true)
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url,{ method,body,headers })
            const data = await response.json()
            // console.log(data)
            if(!response.ok){
                throw new Error(data.message || data ||'Что то пошло не так');
            }

            setLoading(false)

            return data;
        }catch(e){
            
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const requestFormData = useCallback(async (url, method = 'GET', formData = new FormData(), headers = {}) =>{
        setLoading(true)
        try{
            headers['Content-Type'] = 'application/x-www-form-urlencoded'

            // let data = null
            // console.log(url)
            // console.log(method)
            // console.log(headers)

            let data = await axios({
                url,method,headers,
                data:formData
            })
            // const response = await fetch(url,{ method,body,headers })
            // const data = await response.json()
            // console.log(data)
            // if(!response.ok){
            //     throw new Error(data.message || data ||'Что то пошло не так');
            // }
            // console.log(data)
            setLoading(false)

            return data;
        }catch(e){
            console.log(e)
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const clearError = useCallback(() => setError(null),[])

    return {loading, request, requestFormData, error, clearError}
}