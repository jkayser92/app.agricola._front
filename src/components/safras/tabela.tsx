
import { IconeEdicao, IconeLixo } from "@/components/icones/tabela"
import Safra from "@/core/Safra"

interface TabelaProps {
    safra: Safra[]
    safraSelecionado?: (safra:Safra) => void
    safraExcluido?: (safra: Safra) => void
}

export default function Tabela(props: TabelaProps) {
    
    const exibirAcoes = props.safraSelecionado || props.safraExcluido

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">id</th>
                <th className="text-left p-3">ano</th>
                <th className="text-left p-3">cultura</th>
               
                {exibirAcoes ? <th className="p-3">Ações</th> : false}
            </tr>
        )
    }

    function renderDados() {
        return props.safra?.map((safra, i) => {
            return (
                <tr key={safra.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{safra.id}</td>
                    <td className="text-left p-3">{safra.ano}</td>
                    <td className="text-left p-3">{safra.cultura}</td>
                  
                    {exibirAcoes 
                    ? renderizarAcoes(safra)
                    : false }
                </tr>
            )
        })
    }

    function renderizarAcoes(safra: Safra) {
        return (
            <td className="flex justify-center">
                {props.safraSelecionado? (
                    <button onClick={() => props.safraSelecionado?.(safra)} className={`flex justify-center items
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-gray-100`}>{IconeEdicao}</button>
                ) : false }
                {props.safraSelecionado? (
                    <button onClick={() => props.safraExcluido?.(safra)} className={`flex justify-center items
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