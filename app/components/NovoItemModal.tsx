import { useEffect, useState } from "react";
import api, { NovoItem } from "../api/api-connection";
import Modal from "./Modal";
import { Item, Sabor } from "../page";
import { useGlobalContext } from "../contexts/Contexto";
import { erroMessage, sucessMessage } from "../utils/Toasts";

type Props = {
    obterPedido:any
}

export default function NovoItemModal({obterPedido}:Props) {
    const {showNovoItemModal, setShowNovoItemModal} = useGlobalContext()
    const [sabores, setSabores] = useState<Sabor[]>()
    const [saborAtual, setSaborAtual] = useState<Sabor>()
    const [quantidade, setQuantidade] = useState<number>(1)
  
    function mudarSabor(id:number){
        const sabor = sabores?.find(item => item.id === id)
        setSaborAtual(sabor!)
    }
    async function obterSabores() {
        try {
            const response = await api.listarSabores()
            setSabores(response.data)
            setSaborAtual(response.data[0])
        } catch (error: any) {
            alert(error)
            //alerts.ErrorAlert(error.response.data.mensagem)
        }
    }

    async function salvar(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        const nomeCliente = localStorage.getItem('nomeUsuario')?.toString()
        const dados:NovoItem = {
            nomeCliente: nomeCliente!,
            quantidade,
            sabor_id: saborAtual!.id
        }
        try {
            const response = await api.novoItem(dados)
            obterPedido()
            setShowNovoItemModal(false)
            sucessMessage(response.data.mensagem)
        } catch (error: any) {
            alert(error)
            erroMessage(error.response.data.mensagem)
        }
    }

    function cancelar(){
        setShowNovoItemModal(false)
    }

    useEffect(() => {
        obterSabores()
    }, [])

    return (
        <Modal isVisible={showNovoItemModal}>
            <div className="flex flex-col bg-white w-full mx-10 h-52 shadow-lg rounded-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-lg p-2 bg-azul text-laranja rounded-t-lg">
                    Novo pedido
                </h1>
                <form className='flex flex-col p-4 bg-white rounded-lg'>
                    {sabores !== undefined 
                        ? <select id="seletor"
                                className='flex mb-4 font-md bg-gray-100 p-2 rounded-md'
                                defaultValue={saborAtual!.id}
                                onChange={(e) => mudarSabor(parseInt(e.target.value))}
                            >
                        {sabores!.map(option => (
                          <option className='flex mb-4 bg-blue-200 my-2 font-sm bg-gray-100 p-2 rounded-md'
                                    key={option.id} value={option.id}>
                            {option.descricao} - R${option.preco.toFixed(2)}
                          </option>
                        ))}
                        </select>
                        : <></>
                    }
                     <input className='flex mb-4 bg-gray-100 p-2 rounded-md'
                        type="number"
                        placeholder='quantidade'
                        name='quantidade'
                        onChange={(e: any) => setQuantidade(e.target.value)}
                        value={quantidade}
                        required
                    />
                    <div className="flex">
                        <button className='flex bg-blue-500 text-white font-white rounded-md p-2 mr-2'
                            onClick={salvar}>
                            Salvar
                        </button>
                        <button className='flex bg-red-500 text-white font-white rounded-md p-2'
                            onClick={() => cancelar()}>
                            Cancelar
                        </button>
    </div>
                </form>

            </div>
        </Modal>
    )
}