import { LuSandwich } from "react-icons/lu"

export default function Header(){
    return(
        <header className="flex bg-azul text-laranja w-full font-header
                        justify-between items-center py-4 px-2 shadow-md">
            <h1 className="flex items-center text-2xl font-bold">
                <LuSandwich size={40}/>
                Tapioca da T.I
            </h1>
            <h3 className=" text-md font-bold mr-1">
                ADM
            </h3> 
        </header>
    )
}