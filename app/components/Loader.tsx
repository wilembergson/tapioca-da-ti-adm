import { RotatingLines } from "react-loader-spinner";

export default function Loader(){
    return (
        <RotatingLines
            visible={true}
            width="50"
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
        />
    )
}