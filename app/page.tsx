'use client'

import 'aos/dist/aos.css'
import Aos from 'aos'
import { useEffect, useState } from "react";
import Header from "./components/Header";
import api from "./api/api-connection";
import Pedido from "./components/Pedido";
import { TbShoppingCart, TbShoppingCartPlus, TbShoppingCartX } from "react-icons/tb";
import { useGlobalContext } from "./contexts/Contexto"
import NovoItemModal from "./components/NovoItemModal";
import { erroMessage } from './utils/Toasts';
import LoaderLogo from './components/LoaderLogo';


export default function Home() {
  const {item} = useGlobalContext()
  const [pedido, setPedido] = useState<PedidoTipo>()
  const [loading, setLoading] = useState(false)


  async function obterPedido(){
    const pedido = await api.getPedidoAtual()
    setPedido(pedido.data)
  }

  async function novoPedido(){
    setLoading(true)
    try {
      await api.novoPedido('Editar PIX ->')
      obterPedido()
      setLoading(false)
    } catch (error:any) {
      setLoading(false)
      erroMessage(error.response.data.mensagem)
    }
  }

  useEffect(() => {
    obterPedido()
  },[pedido, item])

  return (
    <main className="flex min-h-screen flex-col items-center pb-20 w-full">
          <Header/>
            {
              pedido ? <Pedido dados={pedido!}/> 
            : 
              <>
                {loading ?
                  <div className='flex mt-52'>
                      <LoaderLogo/> 
                  </div>
                : <div className="flex flex-col flex-grow text-azul items-center justify-center w-full h-full">
                      <TbShoppingCartPlus size={76}/>
                      <button onClick={novoPedido}
                            className="flex bg-laranja text-azul text-xl
                            font-bold rounded-lg p-4 mt-2">
                        Iniciar novo pedido
                      </button>
                  </div>               
                }
              </>
            }
      <NovoItemModal obterPedido={obterPedido}/>
    </main>
  );
}

export type PedidoTipo = {
  id:number
  pix:string
  status:string
  data:number[]
  itens:Item[]
  total:number
  totalPago:number
  totalAPagar:number
}

export type Item = {
  id:number
  nomeCliente:string
  quantidade:number
  pago: boolean
  sabor:Sabor
  total:number
}

export type Sabor = {
  id:number
  descricao:string
  preco:number
}