
import { IconeEdicao, IconeLixo } from "../icones/tabela"
import Sementes from "@/core/sementes"

interface TabelaProps {
    sementes: Sementes[]
    sementeaSelecionado?: (sementes:Sementes) => void
    sementesExcluido?: (sementes: Sementes) => void
}

export default function Tabela(props: TabelaProps) {
    
    const exibirAcoes = props.sementeaSelecionado || props.sementesExcluido

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
        return props.sementes?.map((sementes, i) => {
            return (
                <tr key={sementes.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{sementes.id}</td>
                    <td className="text-left p-3">{sementes.nome}</td>
                    <td className="text-left p-3">{sementes.quantidade}</td>
                    <td className="text-left p-3">{sementes.preco}</td>
                    {exibirAcoes 
                    ? renderizarAcoes(sementes)
                    : false }
                </tr>
            )
        })
    }

    function renderizarAcoes(sementes: Sementes) {
        return (
            <td className="flex justify-center">
                {props.sementeaSelecionado? (
                    <button onClick={() => props.sementeaSelecionado?.(sementes)} className={`flex justify-center items
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-gray-100`}>{IconeEdicao}</button>
                ) : false }
                {props.sementeaSelecionado? (
                    <button onClick={() => props.sementesExcluido?.(sementes)} className={`flex justify-center items
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