import {useEffect , useState} from 'react'

const PREFIX='codepen-clone-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey=PREFIX+key

    const [value, setValue]=useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey)
        
        // Return initialValue if no stored value exists
        if (jsonValue === null || jsonValue === 'undefined') {
            return typeof initialValue === 'function' 
                ? initialValue() 
                : initialValue
        }

        try {
            return JSON.parse(jsonValue)
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error)
            return typeof initialValue === 'function' 
                ? initialValue() 
                : initialValue
        }
        /*const jsonValue=localStorage.getItem(prefixedKey)
        if(jsonValue!=null && jsonValue!='undefined')return JSON.parse(jsonValue)
        if(typeof(initialValue)==='function'){
            return initialValue()
        }else {
            return initialValue
        }*/
    })
    useEffect(()=>{
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    },[prefixedKey,value])

    return [value, setValue]
}
