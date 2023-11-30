
import Entrada from "./entrada";
import { useState } from "react";
import Botao from "./botao";
import Sementes from "@/core/sementes";

interface FormularioProps {
   sementes:Sementes
    sementesMudou?: (sementes:Sementes) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {

    const id = props.sementes ?.id
    const [nome, setNome] = useState(props.sementes?.nome)
    const [quantidade, setQauntidade] = useState(props.sementes?.quantidade)
    const [preco, setPreco] = useState(props.sementes?.preco)
    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura></Entrada>) : false}
            <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
            <Entrada texto="Quantidade" valor={quantidade} onChange={setQauntidade}></Entrada>
            <Entrada texto="Preço" valor={preco} onChange={setPreco}></Entrada>
           
            <div className="flex justify-end mt-5">
                <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={() => props.sementesMudou?.(new Sementes(
                        id,nome, quantidade,preco ))}>
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