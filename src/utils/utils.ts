import { useEffect, useState } from "react"

export const useDebounce = <T>(value:T,delay?:number)=> {
    const [debouncedValue,setDebouncedValue] = useState(value)
    useEffect(()=>{
        let timeout = setTimeout(()=>{
            setDebouncedValue(value)
        },delay)
        return ()=>clearTimeout(timeout)
    },[value,delay])
    return debouncedValue
}