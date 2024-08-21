"use client"

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModelProps {
    isOpen : boolean;
    onClose : () => void;
    onConfirm : () => void
    Loading : boolean
}

export const AlertModel : React.FC<AlertModelProps> = ({
    isOpen,
    onClose,
    onConfirm,
    Loading
}) => {

    const [Mounted , setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    } ,[])

    if(!Mounted){
        return null
    }

  return (
    <Modal
    title="Are You Sure ?"
    description="This Action cannot be undone"
    isOpen={isOpen}
    onClose={onClose}
    >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={Loading} variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button disabled={Loading} variant="destructive" onClick={onConfirm}>
                Continue
            </Button>
        </div>

    </Modal>
  )
}
