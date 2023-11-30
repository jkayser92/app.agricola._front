import Safra from "@/core/Safra";
import Entrada from "./entrada";
import { useState } from "react";
import { stringParaEntradaDeData } from "@/utils/converters";
import Botao from "./botao";

interface FormularioProps {
    safra:Safra
    safraMudou?: (safra:Safra) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {

    const id = props.safra?.id
    const [ano, setData] = useState(props.safra?.ano)
    const [cultura, setCultura] = useState(props.safra?.cultura)
   
    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura></Entrada>) : false}
            <Entrada texto="Ano" tipo="date" valor={stringParaEntradaDeData(ano)} onChange={setData}></Entrada>
            <Entrada texto="Cultura" valor={cultura} onChange={setCultura}></Entrada>
           
            <div className="flex justify-end mt-5">
                <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={() => props.safraMudou?.(new Safra(
                        id,ano, cultura ))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700"
                    onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}