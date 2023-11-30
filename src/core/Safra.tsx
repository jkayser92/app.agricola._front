import { stringParaEntradaDeData } from "@/utils/converters";

export default class Safra {
    id: number | null;
    ano: string;
    cultura: string;
   

    constructor(id: number | null, ano: string, cultura: string,
        ) {
        this.id = id;
        this.ano = ano;
        this.cultura= cultura;
        
    }

  
    static vazio(): Safra {
      return new Safra(null, "", stringParaEntradaDeData(""));
    }
}