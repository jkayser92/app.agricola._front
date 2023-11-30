import axios from 'axios';
import Defencivo from '../core/defecivo';

interface ApiResponse {
    content: Defencivo[];
}
const BASE_URL = 'http://localhost:8080';

export const fetchDefencivo = async (): Promise<Defencivo[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/defencivos`);
    return response.data.content;
  } catch (error) {
    throw new Error('Erro ao buscar defensivo');
  }
};

export const cadastrarDefencivo = async (defencivo: Defencivo): Promise< Defencivo> => {
    try {
      const response = await axios.post< Defencivo>(`${BASE_URL}/defencivos`,  defencivo);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar denfensivo:", error);
      throw error;
    }
  };

  export const atualizarDefencivo = async (defencivo:  Defencivo): Promise< Defencivo> => {
    try {
      const response = await axios.put< Defencivo>(`${BASE_URL}/defencivos/${ defencivo.id}`,  defencivo);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar defensivo:", error);
      throw error;
    }
  };

  export const excluirDefencivo = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/defencivos/${id}`);
    } catch (error) {
      console.error("Erro ao excluir :", error);
      throw error;
    }
  };