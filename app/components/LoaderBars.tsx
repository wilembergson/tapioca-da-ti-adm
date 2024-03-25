import { LineWave, ProgressBar } from "react-loader-spinner";

export default function LoaderBars(){
    return (
            <ProgressBar
                visible={true}
                height="60"
                width="70"
                barColor="#7D3174"
                borderColor="#F5B041"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
    )
}