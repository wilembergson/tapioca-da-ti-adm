import { useEffect, useState } from "react";
import api, { NovoItem } from "../api/api-connection";
import Modal from "./Modal";
import { Item, Items, PedidoTipo, Sabor } from "../page";
import { useGlobalContext } from "../contexts/Contexto";
import { erroMessage, sucessMessage } from "../utils/Toasts";

type Props = {
    pedido?:Items[] | undefined
}

export default function ListaPedidosModal({pedido}:Props) {
    const {showNovoItemModal, setShowNovoItemModal} = useGlobalContext()

    function cancelar(){
        setShowNovoItemModal(false)
    }

    return (
        <Modal isVisible={showNovoItemModal}>
            <div className="flex flex-col bg-white w-full mx-10 shadow-lg rounded-lg">
                <h1 className="`flex text-center font-black text-lg p-2 bg-azul text-laranja rounded-t-lg">
                    Lista de pedidos
                </h1>
                <div className="flex flex-col p-2">
                    {
                        pedido?.map(item => 
                            <h1 key={item.nome} className="flex my-1">
                                {item.quantidade} {item.nome}
                            </h1>
                        )
                    }
                </div>
                <div className="flex p-2">
                    {/*<button className='flex bg-blue-500 text-white font-white rounded-md p-2 mr-2'
                        >
                        Copiar
                </button>*/}
                    <button className='flex bg-red-500 text-white font-white rounded-md p-2'
                        onClick={() => cancelar()}>
                        Fechar
                    </button>
                </div>
            </div>
        </Modal>
    )
}