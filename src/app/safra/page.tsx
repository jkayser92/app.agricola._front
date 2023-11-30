'use client';
import Botao from "@/components/safras/botao";
import Formulario from "@/components/safras/formulario";
import Layout from "@/components/safras/layout";
import Tabela from "@/components/safras/tabela";
import Safra from "@/core/Safra";
import { atualizarSafra, cadastrarSafra, excluirSafra, fetchSafra } from "@/service/safraService";
import { useEffect, useState } from "react";

export default function Safras() {

  const [safras, setSafras] = useState<Safra>(Safra.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  const [safra, setSafra] = useState<Safra[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadSafra = async () => {
        try {
          const dados = await fetchSafra();
          setSafra(dados);
        } catch (error) {
          console.error("Erro ao buscar Safras:", error);
        }
      }

      loadSafra();
    }
  }, [visivel]);


  function safraSelecionado(safra: Safra) {
    setSafras(safra)
    setVisivel('form')
  }

  async function safraExcluido(safra: Safra) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir este evento?");
    if (confirmacao) {
      try {
        if (safra.id !== null) {
          await excluirSafra(safra.id);
        } else {
          console.error("safraId é null!");
        }
        setSafra(prevSafra => prevSafra.filter(ev => ev.id !== safra.id));
      } catch (error) {
        console.error("Erro ao excluir safra:", error);
      }
    }
  }

  function salvarOuAlterarSafra(safra:Safra) {
    if (safra.id) {
      alterarSafra(safra)
    } else {
      salvarSafra(safra)
    }
  }

  async function alterarSafra(safra:Safra) {
    try {
      const eventoAtualizado = await atualizarSafra(safra);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar safra:", error);
    }
  }

  async function salvarSafra(safra :Safra) {
    try {
      const novoSafra = await cadastrarSafra(safra);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar Safra:", error);
    }
  }

  function novoSafra() {
    setSafras(Safra.vazio())
    setVisivel("form")
  }

  return (
    <div className={`
     flex justify-center items-center h-screen
     bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
     text-white`}>
      <Layout titulo="Cadastro de Safra">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novoSafra()}>
                Novo evento
              </Botao>
            </div>
            <Tabela safra={safra}
              safraSelecionado={safraSelecionado}
              safraExcluido={safraExcluido}></Tabela>
          </>
        ) : (
          <Formulario safra={safras}
            safraMudou={salvarOuAlterarSafra}
            cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}
