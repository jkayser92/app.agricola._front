
import { IconeEdicao, IconeLixo } from "@/components/icones/tabela"
import Fertilizante from "@/core/fertilizante"

interface TabelaProps {
    fertilizate: Fertilizante[]
    fertilizanteSelecionado?: (fertilizante:Fertilizante) => void
    fertilizatenExcluido?: (defecivo: Fertilizante) => void
}

export default function Tabela(props: TabelaProps) {
    
    const exibirAcoes = props.fertilizanteSelecionado || props.fertilizatenExcluido

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
        return props.fertilizate?.map((fertilizante, i) => {
            return (
                <tr key={fertilizante.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{fertilizante.id}</td>
                    <td className="text-left p-3">{fertilizante.nome}</td>
                    <td className="text-left p-3">{fertilizante.quantidade}</td>
                    <td className="text-left p-3">{fertilizante.preco}</td>
                    {exibirAcoes 
                    ? renderizarAcoes(fertilizante)
                    : false }
                </tr>
            )
        })
    }

    function renderizarAcoes(fertilizante: Fertilizante) {
        return (
            <td className="flex justify-center">
                {props.fertilizanteSelecionado? (
                    <button onClick={() => props.fertilizanteSelecionado?.(fertilizante)} className={`flex justify-center items
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-gray-100`}>{IconeEdicao}</button>
                ) : false }
                {props.fertilizanteSelecionado? (
                    <button onClick={() => props.fertilizatenExcluido?.(fertilizante)} className={`flex justify-center items
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