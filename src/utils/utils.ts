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

export const exportJSON = (data: object, filename:string) => {
    let blob = new Blob([JSON.stringify(data, null, 2)],{type: 'application/json'});
    let url = URL.createObjectURL(blob);
    let linknode = document.createElement('a');
    linknode.setAttribute('href',url);
    linknode.setAttribute('download',`${filename}.json`);
    linknode.click();
    linknode.remove();
}