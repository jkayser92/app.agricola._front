import axios from 'axios';
import Fertilizante from '../core/fertilizante';


interface ApiResponse {
    content: Fertilizante[];
}
const BASE_URL = 'http://localhost:8080';

export const fetchFertilizante= async (): Promise<Fertilizante[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/fertilizante`);
    return response.data.content;
  } catch (error) {
    throw new Error('Erro ao buscar fertiliazate');
  }
};

export const cadastrarFertilizate = async (fertilizante: Fertilizante): Promise<Fertilizante> => {
    try {
      const response = await axios.post<Fertilizante>(`${BASE_URL}/fertilizante`, fertilizante);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar fertilizante:", error);
      throw error;
    }
  };

  export const atualizarFertilizante = async (fertiliazate: Fertilizante): Promise<Fertilizante> => {
    try {
      const response = await axios.put<Fertilizante>(`${BASE_URL}/fertilizante/${fertiliazate.id}`, fertiliazate);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar fertiliazate:", error);
      throw error;
    }
  };

  export const excluirFertilizante = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/fertiliazate/${id}`);
    } catch (error) {
      console.error("Erro ao excluir :", error);
      throw error;
    }
  };