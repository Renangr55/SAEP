import { Outlet } from "react-router-dom";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Quadro } from "../Componentes/Quadro"


export function Inicial (){
    return(
        <>
            <Cabecalho/>
            <Outlet/>
        </>
    )
}