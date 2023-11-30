import axios from 'axios';
import Sementes from '../core/sementes';

interface ApiResponse {
    content: Sementes[];
}
const BASE_URL = 'http://localhost:8080';

export const fetchSementes = async (): Promise<Sementes[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/sementes`);
    return response.data.content;
  } catch (error) {
    throw new Error('Erro ao buscar sementes');
  }
};

export const cadastrarSementes = async (sementes:Sementes ): Promise<Sementes> => {
    try {
      const response = await axios.post<Sementes>(`${BASE_URL}/sementes`, sementes);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar Sementes:", error);
      throw error;
    }
  };

  export const atualizarSementes = async (sementes: Sementes): Promise<Sementes> => {
    try {
      const response = await axios.put<Sementes>(`${BASE_URL}/sementes/${sementes.id}`, sementes);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar Sementes:", error);
      throw error;
    }
  };

  export const excluirSementes = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/sementes/${id}`);
    } catch (error) {
      console.error("Erro ao excluir :", error);
      throw error;
    }
  };