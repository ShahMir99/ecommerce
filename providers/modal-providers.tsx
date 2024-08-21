"use client"

import { useState , useEffect} from "react";

import StoreModal from "@/components/modals/StoreModal";

const ModalProviders = () => {
    const [IsMounted , setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!IsMounted){
        return null
    }

    return(
        <StoreModal />
    )
}
 
export default ModalProviders;