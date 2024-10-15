import { useState } from "react"


export default function useModal() {
    const [isOpen, setIsOpen] = useState(false)

    // Función para abrir el modal
    const openModal = () => setIsOpen(true)

    // Función para cerrar el modal
    const closeModal = () => setIsOpen(false)
  
    return {
        isOpen,
        openModal,
        closeModal
    }
}
