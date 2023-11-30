'use client';
import Botao from "@/components/sementes/botao";
import Formulario from "@/components/sementes/formulario";
import Layout from "@/components/sementes/layout";
import Tabela from "@/components/sementes/tabela";
import Sementes from "@/core/sementes";

import { atualizarSementes, cadastrarSementes, excluirSementes, fetchSementes } from "@/service/sementesService";
import { useEffect, useState } from "react";

export default function Semente() {

  const [semente, setSemente] = useState<Sementes>(Sementes.vazio)
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  const [sementes, setSementes] = useState<Sementes[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadSementes = async () => {
        try {
          const dados = await fetchSementes();
          setSementes(dados);
        } catch (error) {
          console.error("Erro ao buscar sementes:", error);
        }
      }

      loadSementes();
    }
  }, [visivel]);


  function sementesSelecionado(semente: Sementes) {
    setSemente( semente)
    setVisivel('form')
  }

  async function sementesExcluido(sementes: Sementes) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir este sementes?");
    if (confirmacao) {
      try {
        if (sementes.id !== null) {
          await excluirSementes(sementes.id);
        } else {
          console.error("safraId é null!");
        }
        setSementes(prevSemente=> prevSemente.filter(ev => ev.id !== sementes.id));
      } catch (error) {
        console.error("Erro ao excluir safra:", error);
      }
    }
  }

  function salvarOuAlterarSementes(sementes:Sementes) {
    if (sementes.id) {
      alterarSementes(sementes)
    } else {
      salvarSementes(sementes)
    }
  }

  async function alterarSementes(sementes:Sementes) {
    try {
      const eventoAtualizado = await atualizarSementes(sementes);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar sementes:", error);
    }
  }

  async function salvarSementes(sementes : Sementes) {
    try {
      const novoSafra = await cadastrarSementes(sementes);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar sementes:", error);
    }
  }

  
  function novoSementes() {
    setSemente(Sementes.vazio())
    setVisivel("form")
  }
  return (
    <div className={`
     flex justify-center items-center h-screen
     bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
     text-white`}>
      <Layout titulo="Cadastro de sementes">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novoSementes()}>
                Novo evento
              </Botao>
            </div>
            <Tabela sementes={sementes}
              sementeaSelecionado={sementesSelecionado}
              sementesExcluido={sementesExcluido}></Tabela>
          </>
        ) : (
          <Formulario sementes={semente}
            sementesMudou={salvarOuAlterarSementes}
            cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}
