
import { IconeEdicao, IconeLixo } from "../icones/tabela"
import Defencivo from "@/core/defecivo"

interface TabelaProps {
    defencivo: Defencivo[]
    defencivoSelecionado?: (defencivo:Defencivo) => void
    defencivoExcluido?: (defecivo: Defencivo) => void
}

export default function Tabela(props: TabelaProps) {
    
    const exibirAcoes = props.defencivoSelecionado || props.defencivoExcluido

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Quantiade</th>
                <th className="text-left p-3">Preço</th>
               
                {exibirAcoes ? <th className="p-3">Ações</th> : false}
            </tr>
        )
    }

    function renderDados() {
        return props.defencivo?.map((defecivo, i) => {
            return (
                <tr key={defecivo.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{defecivo.id}</td>
                    <td className="text-left p-3">{defecivo.nome}</td>
                    <td className="text-left p-3">{defecivo.quantidade}</td>
                    <td className="text-left p-3">{defecivo.preco}</td>
                    {exibirAcoes 
                    ? renderizarAcoes(defecivo)
                    : false }
                </tr>
            )
        })
    }

    function renderizarAcoes(defencivo: Defencivo) {
        return (
            <td className="flex justify-center">
                {props.defencivoSelecionado? (
                    <button onClick={() => props.defencivoSelecionado?.(defencivo)} className={`flex justify-center items
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-gray-100`}>{IconeEdicao}</button>
                ) : false }
                {props.defencivoSelecionado? (
                    <button onClick={() => props.defencivoExcluido?.(defencivo)} className={`flex justify-center items
                    text-red-600 rounded-full p-2 m-1
                    hover:bg-gray-100`}>{IconeLixo}</button>
                ) : false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
            bg-gradient-to-r from-indigo-500 to-indigo-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderDados()}
            </tbody>
        </table>
    )
}