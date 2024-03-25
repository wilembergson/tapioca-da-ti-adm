import { useGlobalContext } from "../contexts/Contexto"
import { Item } from "../page"
import { MdDeleteForever } from "react-icons/md"
import { MdOutlineAttachMoney } from "react-icons/md";
import api from "../api/api-connection";
import { erroMessage, sucessMessage } from "../utils/Toasts"
import { useState } from "react";
import Loader from "./Loader";

type Props = {
    dados: Item
}

export default function Item({dados}:Props){
    const {setItem} = useGlobalContext()
    const [loading, setLoading] = useState(false)

    async function mudarStatus(){
        setLoading(true)
        try {
            const response = await api.atualizarStatusPagamento(dados.id)
            setLoading(false)
        } catch (error:any) {
            setLoading(false)
            erroMessage(error.response.data.mensagem)
        }
    }

    async function deletarItem(){ 
        setLoading(true)
        try{
            const response = await api.deletarItemPorId(dados.id)
            setItem(dados)
            sucessMessage(response.data.mensagem)
            setLoading(false)
        }catch(error:any){
            setLoading(false)
            erroMessage(error.response.data.mensagem)
        }
    }

    return(
        <section className={`flex justify-between shadow-lg rounded-md my-1 p-2
        ${dados.pago ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}>
            <div className="flex flex-col w-max">
                <h2 className="flex text-md">{dados.sabor.descricao}</h2>
                <h2 className="font-sm">QUANTIDADE: {dados.quantidade}</h2>   
                <h2 className={`flex`}>
                    {dados.nomeCliente}
                </h2>
            </div>
            <div className="flex flex-col">
                <h2 className="flex text-lg font-bold">R${dados.sabor.preco.toFixed(2)}</h2>
                <section className="flex">
                    {!loading ?
                    <>
                        <div className="flex items-center bg-green-600
                                    text-white rounded-md shadow-md p-2 mr-1"
                                     onClick={mudarStatus}>
                            <MdOutlineAttachMoney size={30}/>
                        </div>
                        <div className="flex items-center bg-red-600
                                    text-white rounded-md shadow-md p-2"
                                     onClick={deletarItem}>
                            <MdDeleteForever size={30}/>
                        </div>
                    </> : <Loader/>    
                }
                </section>
            </div>
        </section>
    )
}