import { useState } from 'react'
import {PedidoTipo} from '../page'
import EditarItemModal from './EditarItemModal'
import Item from './Item'
import { erroMessage, sucessMessage } from '../utils/Toasts'
import api from '../api/api-connection'
import { FaEdit } from "react-icons/fa"
import { FaCheckCircle } from "react-icons/fa"

type Props = {
    dados:PedidoTipo
}

export default function Pedido({dados}:Props){
    const [editando, setEditando] = useState(false)
    const [pix, setPix] = useState<string>(dados.pix)

    function handleChange(e: any) {
        e.preventDefault()
        setPix((e.target.value))
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

    return(
            <div className='flex flex-col p-2 m-4 md:w-4/5 w-full rounded-md text-gray-clear'>
                <div className='flex flex-col bg-white shadow-md rounded-md w-full p-2 mb-4'>
                    <div className='flex justify-between items-center'>
                        {editando ?
                            <input className='flex mb-4 bg-gray-300 p-2 rounded-md'
                                type="text"
                                placeholder='pix'
                                name='pix'
                                onChange={(e: any) => handleChange(e)}
                                value={pix}
                                required
                            />
                        :
                            <h1 className='flex text-2xl mb-4 font-bold'>
                                PIX: {dados?.pix}
                            </h1>
                        } 
                        {editando ?
                            <button onClick={() => atualizar()}>
                                <FaCheckCircle size={30}/>
                            </button>    
                        :
                            <button onClick={() => setEditando(true)}>
                                <FaEdit size={30}/>
                            </button>
                        }
                    </div>
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
                <div>{dados.itens.length !== 0
                    ? dados?.itens?.map(item => <Item key={item.id} dados={item}/>)
                    : <></>}
                </div>
                <EditarItemModal/>
            </div>
    )
}