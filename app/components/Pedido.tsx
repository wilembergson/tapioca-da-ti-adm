import { useEffect, useRef, useState } from 'react'
import {PedidoTipo} from '../page'
import EditarItemModal from './EditarItemModal'
import Item from './Item'
import { erroMessage, sucessMessage } from '../utils/Toasts'
import api from '../api/api-connection'
import { FaEdit } from "react-icons/fa"
import { FaCheckCircle } from "react-icons/fa"
import { MdDeleteForever } from 'react-icons/md'
import { FaCheck } from "react-icons/fa"
import { MdDeliveryDining } from "react-icons/md"
import { LuPackageCheck } from "react-icons/lu";

type Props = {
    dados:PedidoTipo
}

export default function Pedido({dados}:Props){
    const inputRef = useRef<HTMLInputElement>(null)
    const [editando, setEditando] = useState(false)
    const [pix, setPix] = useState<string>(dados.pix)
    const [statusId, setStatusId] = useState<number>(1)

    function handleChange(e: any) {
        e.preventDefault()
        setPix((e.target.value))
    }

    function editar(){
        setEditando(true)
    }

    async function atualizar(){
        try {
            const response = await api.atualizarPix(pix)
            sucessMessage(response.data.mensagem)
            setEditando(false)
        } catch (error:any) {
            erroMessage(error.response.data.mensagem)
        }
    }

    async function atualizarStatusDoPedido(id:number){
        try {
            const response = await api.atualizarStatusPedido(id)
            sucessMessage(response.data.mensagem)
        } catch (error:any) {
            erroMessage(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [editando])

    return(
            <div className='flex flex-col p-2 w-full rounded-md'>
                <div className='flex flex-col bg-white text-azul shadow-md rounded-md w-full p-2 mb-4'>
                    <div className='flex flex-wrap mb-4 justify-start items-center'>
                        {editando ?
                            <input ref={inputRef} className='flex mr-2 bg-gray-300 p-2 rounded-md'
                                type="text"
                                placeholder='pix'
                                name='pix'
                                onChange={(e: any) => handleChange(e)}
                                value={pix}
                                required
                            />
                        :
                            <h1 className='flex text-lg mr-2 font-bold'>
                                PIX: {dados?.pix}
                            </h1>
                        } 
                        {editando ?
                            <button onClick={() => atualizar()}>
                                <FaCheckCircle size={30} color='#F5B041'/>
                            </button>    
                        :
                            <button onClick={() => editar()}>
                                <FaEdit size={30} color='#F5B041'/>
                            </button>
                        }
                    </div>
                    <section className='flex flex-col'>
                        <h1>STATUS: <strong>{dados.status}</strong></h1>
                        <div className='flex flex-wrap mb-4'>
                            <div className="flex items-center bg-blue-600 cursor-pointer
                                    text-white rounded-md shadow-md p-1 mr-2"
                                    onClick={() => atualizarStatusDoPedido(2)}>
                                <FaCheck size={14}/>
                                Feito
                            </div>
                            <div className="flex bg-orange-600 cursor-pointer
                                    text-white rounded-md shadow-md p-1 mr-2"
                                    onClick={() => atualizarStatusDoPedido(3)}>
                                <MdDeliveryDining size={24}/> 
                                <h1>À caminho</h1>
                            </div>
                            <div className="flex items-center bg-green-600 cursor-pointer
                                    text-white rounded-md shadow-md p-1"
                                    onClick={() => atualizarStatusDoPedido(4)}>
                                <LuPackageCheck size={24}/> Entregue
                        </div>
                        </div>
                    </section>
                    <section className='flex justify-between w-full'>
                        <div>
                            <h2 className='text-red-700'>Faltam pagar: R${dados.totalAPagar.toFixed(2)}</h2>
                            <h2 className='text-green-700'>Já foi pago: R${dados.totalPago.toFixed(2)}</h2>
                        </div>
                        <div className='flex flex-col items-end font-bold'>
                            <h2>TOTAL</h2>
                            <h2>R${dados.total.toFixed(2)}</h2> 
                        </div>
                    </section>
                </div>
                <div className='flex flex-col w-full'>
                    {dados.itens.length !== 0
                    ? dados?.itens?.map(item => <Item key={item.id} dados={item}/>)
                    : <></>}
                </div>
                <EditarItemModal/>
            </div>
    )
}