import Fertilizante from "@/core/fertilizante";
import Entrada from "./entrada";
import { useState } from "react";
import Botao from "./botao";
import Fertilizate from "@/core/fertilizante";

interface FormularioProps {
   fertilizate:Fertilizante
    fretilizateMudou?: (fertilizante:Fertilizante) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {

    const id = props.fertilizate?.id
    const [nome, setNome] = useState(props.fertilizate?.nome)
    const [quantidade, setQauntidade] = useState(props.fertilizate?.quantidade)
    const [preco, setPreco] = useState(props.fertilizate?.preco)
    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura></Entrada>) : false}
            <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
            <Entrada texto="Quantidade" valor={quantidade} onChange={setQauntidade}></Entrada>
            <Entrada texto="Preço" valor={preco} onChange={setPreco}></Entrada>
           
            <div className="flex justify-end mt-5">
                <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={() => props.fretilizateMudou?.(new Fertilizante(
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