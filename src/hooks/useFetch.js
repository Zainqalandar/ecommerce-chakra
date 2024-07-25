
import { useNotification } from '@/provider/context/NotificationProvider';
import React, { useEffect, useState } from 'react'

const useFetch = (endpoint, method = 'GET', payload = null) => {
    const notify = useNotification();
    const baseUrl = 'https://fakestoreapi.com';
    const [data, setdata] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const options = {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                if(payload){
                    options.body = JSON.stringify(payload)
                }
                const res = await fetch(`${baseUrl}/${endpoint}`, options)
                const result = await res.json()
                setdata(result)
                if(!res.ok){
                    throw new Error(`Error: ${res.status}`)
                }
                
            } catch (error) {
                setError(error);
                notify(`Error: ${error.message}`, 'error', 2000);
            } finally {
                setLoading(false)
            }

        }

        fetchData()
      
    }, [endpoint, method, payload])


    return {data, loading, error}
    
  
}

export default useFetch