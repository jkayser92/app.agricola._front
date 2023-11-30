'use client';
import Botao from "@/components/fertilizante/botao"
import Formulario from "@/components/fertilizante/formulario";
import Layout from "@/components/fertilizante/layout";
import Tabela from "@/components/fertilizante/tabela";
import Fertilizante from "@/core/fertilizante";
import { atualizarFertilizante, cadastrarFertilizate, excluirFertilizante, fetchFertilizante } from "@/service/fertilizanteService";
import { useEffect, useState } from "react";

export default function Fertilizantes() {

  const [fertilizante, setFertilizate] = useState<Fertilizante>(Fertilizante.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  const [fertilizantes, setFertilizates] = useState<Fertilizante[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadFertilizate = async () => {
        try {
          const dados = await fetchFertilizante();
          setFertilizates(dados);
        } catch (error) {
          console.error("Erro ao buscar fertilizantes:", error);
        }
      }

      loadFertilizate();
    }
  }, [visivel]);


  function fertiliazteSelecionado(fertilizante:Fertilizante ) {
    setFertilizate(fertilizante)
    setVisivel('form')
  }

  async function fertilizateExcluido(fertilizante: Fertilizante) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir este fertilizante?");
    if (confirmacao) {
      try {
        if (fertilizante.id !== null) {
          await excluirFertilizante(fertilizante.id);
        } else {
          console.error("fertilizante Id é null!");
        }
        setFertilizates(prevSafra => prevSafra.filter(ev => ev.id !== fertilizante.id));
      } catch (error) {
        console.error("Erro ao excluir fertilizantes:", error);
      }
    }
  }

  function salvarOuAlterarFertilizate(fertilizante:Fertilizante) {
    if (fertilizante.id) {
      alterarFertlizate(fertilizante)
    } else {
      salvarFertilinte(fertilizante)
    }
  }

  async function alterarFertlizate(fertilizante:Fertilizante) {
    try {
      const eventoAtualizado = await atualizarFertilizante(fertilizante);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar fertilizante:", error);
    }
  }

  async function salvarFertilinte(fertilizante :Fertilizante) {
    try {
      const novoSafra = await cadastrarFertilizate(fertilizante);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar fertilizante:", error);
    }
  }

  function novoFertilizate() {
    setFertilizate(Fertilizante.vazio())
    setVisivel("form")
  }

  return (
    <div className={`
     flex justify-center items-center h-screen
     bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
     text-white`}>
      <Layout titulo="Cadastro de fertilizante">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novoFertilizate()}>
                Novo evento
              </Botao>
            </div>
            <Tabela fertilizate={fertilizantes}
              fertilizanteSelecionado={fertiliazteSelecionado}
              fertilizatenExcluido={fertilizateExcluido}></Tabela>
          </>
        ) : (
          <Formulario fertilizate={fertilizante}
          fretilizateMudou={salvarOuAlterarFertilizate}
          cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}
