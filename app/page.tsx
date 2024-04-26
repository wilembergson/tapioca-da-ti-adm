'use client'

import 'aos/dist/aos.css'
import Aos from 'aos'
import { useEffect, useState } from "react";
import Header from "./components/Header";
import api from "./api/api-connection";
import Pedido from "./components/Pedido";
import { TbShoppingCart, TbShoppingCartPlus, TbShoppingCartX } from "react-icons/tb";
import { useGlobalContext } from "./contexts/Contexto"
import ListaPedidosModal from "./components/ListaPedidosModal";
import { erroMessage } from './utils/Toasts';
import LoaderLogo from './components/LoaderLogo';

export default function Home() {
  const {item} = useGlobalContext()
  const [pedido, setPedido] = useState<PedidoTipo>()
  const [loading, setLoading] = useState(false)
  const [somaPedidos, setSomaPedidos] = useState<Items[]>([])
  const [textoCopiado, setTextoCopiado] = useState('')

    function copiarPedido(pedido: Items[]){
        let resultado = ''
        for(const item of pedido!){
            resultado += `${item.quantidade} ${item.nome}\n`
        }
        setTextoCopiado(resultado)
    }

  function preencherDados(pedido: PedidoTipo){
      const mapSomaQuantidades = new Map<string, number>()
      for (const item of pedido.itens!) {
          if (mapSomaQuantidades.has(item.sabor.descricao)) {
              const quantidadeAtual = mapSomaQuantidades.get(item.sabor.descricao) || 0;
              mapSomaQuantidades.set(item.sabor.descricao, quantidadeAtual + item.quantidade);
          } else {
              mapSomaQuantidades.set(item.sabor.descricao, item.quantidade);
          }
      }

    const arraySomaQuantidades: Items[] = [];
    mapSomaQuantidades.forEach((quantidade, nome) => {
      arraySomaQuantidades.push({ nome, quantidade });
    });
    setSomaPedidos(arraySomaQuantidades)
    copiarPedido(arraySomaQuantidades)
}

  async function obterPedido(){
    const pedido = await api.getPedidoAtual()
    setPedido(pedido.data)
    preencherDados(pedido.data)
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
      <ListaPedidosModal pedido={somaPedidos} textoCopiado={textoCopiado}/>
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

export type Items = {
  nome: string
  quantidade: number
}