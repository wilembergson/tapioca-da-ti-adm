import { toast } from "react-toastify"

export const erroMessage = (msg:string) => toast.error(msg, {autoClose: 2000, position: "top-center"})
export const sucessMessage = (msg:string) => toast.success(msg, {autoClose: 2000, position: "top-center"})
export const infoMessage = (msg:string) => toast.info(msg, {autoClose: 2000, position: "top-center"})