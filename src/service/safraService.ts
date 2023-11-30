import axios from 'axios';
import Safra from '../core/Safra';

interface ApiResponse {
    content: Safra[];
}
const BASE_URL = 'http://localhost:8080';

export const fetchSafra = async (): Promise<Safra[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/safra`);
    return response.data.content;
  } catch (error) {
    throw new Error('Erro ao buscar safra');
  }
};

export const cadastrarSafra = async (safra: Safra): Promise<Safra> => {
    try {
      const response = await axios.post<Safra>(`${BASE_URL}/safra`, safra);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar safra:", error);
      throw error;
    }
  };

  export const atualizarSafra = async (safra: Safra): Promise<Safra> => {
    try {
      const response = await axios.put<Safra>(`${BASE_URL}/safra/${safra.id}`, safra);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar Safra:", error);
      throw error;
    }
  };

  export const excluirSafra = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/safra/${id}`);
    } catch (error) {
      console.error("Erro ao excluir :", error);
      throw error;
    }
  };