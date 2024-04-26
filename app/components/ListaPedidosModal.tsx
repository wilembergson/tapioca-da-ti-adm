import { useEffect, useRef } from "react";
import Modal from "./Modal";
import { Items } from "../page";
import { useGlobalContext } from "../contexts/Contexto";
import { erroMessage, sucessMessage } from "../utils/Toasts";
import Clipboard from 'clipboard';
import BotaoCopiar from "./BotaoCopiar";
import { GiCancel } from "react-icons/gi";

type Props = {
    pedido?:Items[] | undefined
    textoCopiado?:string | undefined
}

export default function ListaPedidosModal({pedido, textoCopiado}:Props) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    let clipboard: Clipboard | null = null;
    const {showNovoItemModal, setShowNovoItemModal} = useGlobalContext()
    
    function cancelar(){
        setShowNovoItemModal(false)
    }

    useEffect(() => {
        if (buttonRef.current) {
          clipboard = new Clipboard(buttonRef.current, {
            text: () => textoCopiado!
          });
    
          clipboard.on('success', () => {
            sucessMessage('PIX copiado.')
          });
    
          clipboard.on('error', () => {
            erroMessage('Erro ao copiar o texto!');
          });
        }
    
        return () => {
          if (clipboard) {
            clipboard.destroy();
          }
        };
      }, [textoCopiado]);
    return (
        <Modal isVisible={showNovoItemModal}>
            <div className="flex flex-col bg-white w-full mx-10 shadow-lg rounded-lg" data-aos="zoom-in">
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
                    <BotaoCopiar textToCopy={textoCopiado!}/>
                    <button className='flex items-center bg-red-500 text-white font-white rounded-md p-2'
                        onClick={() => cancelar()}>
                        <GiCancel size={20}/>
                        <h1 className='flex ml-1'>
                          Fechar
                        </h1>
                    </button>
                </div>
            </div>
        </Modal>
    )
}