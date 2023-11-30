'use client';
import Botao from "@/components/defencivos/botao";
import Formulario from "@/components/defencivos/formulario";
import Layout from "@/components/defencivos/layout";
import Tabela from "@/components/defencivos/tabela";
import Defencivos from "@/core/defecivo";

import { atualizarDefencivo, cadastrarDefencivo, excluirDefencivo, fetchDefencivo } from "@/service/defecivoService ";
import { useEffect, useState } from "react";

export default function Defencivo() {

  const [defencivo, setDefencivo] = useState<Defencivos>(Defencivos.vazio)
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  const [defencivos, setDefencivos] = useState<Defencivos[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadDefencivos= async () => {
        try {
          const dados = await fetchDefencivo();
          setDefencivos(dados);
        } catch (error) {
          console.error("Erro ao buscar Defncivo:", error);
        }
      }

      loadDefencivos();
    }
  }, [visivel]);


  function defencivosSelecionado(defencivo: Defencivos) {
    setDefencivo(defencivo)
    setVisivel('form')
  }

  async function defencivoExcluido(defencivos: Defencivos) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir este defensivos?");
    if (confirmacao) {
      try {
        if (defencivos.id !== null) {
          await excluirDefencivo(defencivos.id);
        } else {
          console.error(" defensivo Id é null!");
        }
        setDefencivos(prevDefencivos=> prevDefencivos.filter(ev => ev.id !== defencivos .id));
      } catch (error) {
        console.error("Erro ao excluir defensivo:", error);
      }
    }
  }

  function salvarOuAlterarDefencivo(defecivo:Defencivos) {
    if (defencivo.id) {
      alterarDefencivo(defecivo)
    } else {
      salvarDefencivo(defecivo)
    }
  }

  async function salvarDefencivo(defecivo:Defencivos) {
    try {
      const eventoAtualizado = await cadastrarDefencivo(defecivo);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar defensivo:", error);
    }
  }

  async function alterarDefencivo(defecivo : Defencivos) {
    try {
      const novoSafra = await atualizarDefencivo(defecivo);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar defensivo:", error);
    }
  }

  
  function novoDefencivos() {
    setDefencivo(Defencivos.vazio())
    setVisivel("form")
  }
  return (
    <div className={`
     flex justify-center items-center h-screen
     bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
     text-white`}>
      <Layout titulo="Cadastro de defensivos">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novoDefencivos()}>
                Novo evento
              </Botao>
            </div>
            <Tabela defencivo={defencivos}
              defencivoSelecionado={defencivosSelecionado}
              defencivoExcluido={defencivoExcluido}></Tabela>
          </>
        ) : (
          <Formulario defecivo={defencivo}
            defecivoMudou={salvarOuAlterarDefencivo}
            cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}
