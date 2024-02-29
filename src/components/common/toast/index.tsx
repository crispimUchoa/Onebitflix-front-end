import { Toast, ToastBody } from "reactstrap"

interface props{
    isOpen: boolean
    message: string
    color: string
}

export default function ToastComponent({isOpen, message, color}: props){
    return<>
    <Toast className={`${color} text-white fixed-top ms-auto mt-3`} isOpen={isOpen}>
        <ToastBody className="text-center">{message}</ToastBody>
    </Toast>
    </>
}