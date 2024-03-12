import axios from "axios";
import API_URL from "./api-url";

export type AtualizarItem = {
    id:number
    quantidade:number
    sabor_id:number
}

export type NovoItem = {
    nomeCliente:string,
    quantidade: number|undefined,
    sabor_id:number|undefined
}
async function getPedidoAtual(){
    return await axios.get(`${API_URL}/pedido/atual`)
}

async function atualizarPix(pix:string){
    return await axios.put(`${API_URL}/pedido/atualizar-pix`, {
        pix
    })
}

async function getItemPorId(id:number){
    return await axios.get(`${API_URL}/item/${id}`)
}

async function deletarItemPorId(id:number){
    return await axios.delete(`${API_URL}/item/${id}`)
}

async function atualizarItem(data:AtualizarItem){
    return await axios.put(`${API_URL}/item/atualizar`, data)
}

async function atualizarStatusPagamento(id:number){
    return await axios.put(`${API_URL}/item/atualizar-status/${id}`)
}

async function novoItem(data:NovoItem){
    return await axios.post(`${API_URL}/item`, data)
}

async function listarSabores(){
    return await axios.get(`${API_URL}/sabor/listar`)
}

const api = {
    getPedidoAtual,
    getItemPorId,
    listarSabores,
    atualizarItem,
    novoItem,
    deletarItemPorId,
    atualizarPix,
    atualizarStatusPagamento
}

export default api