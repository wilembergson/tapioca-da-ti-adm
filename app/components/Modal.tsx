import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

type Props = {
    isVisible: boolean
    children: ReactNode

}

export default function Modal({ isVisible, children}: Props) {
    if(!isVisible) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
            flex justify-center items-center z-20">
            <ToastContainer/>
            {children}
        </div>
    )
}