import { LuSandwich } from "react-icons/lu";
import { TailSpin } from "react-loader-spinner";

export default function LoaderLogo(){
    return (
        <div className="relative text-laranja">
            <section className="absolute flex items-center justify-center
             w-full h-full z-0">
                <LuSandwich size={70} />
            </section>
            <div className="flex z-11">
            <TailSpin
                visible={true}
                height="100"
                width="100"
                color="#F5B041"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
            </div>   
        </div>
    )
}