
import { stringParaEntradaDeNumero2 } from "@/utils/converters";

export default class  Sementes{
    id: number | null;
     nome: string;
     quantidade: string;
     preco: string;

    constructor(id: number | null, nome: string, quantidade: string, preco :string,
        ) {
        this.id = id;
        this.nome = nome;
        this .quantidade=quantidade;
        this .preco=preco;
        
    }

  
    static vazio(): Sementes {
        return new Sementes(null, "", stringParaEntradaDeNumero2(""),stringParaEntradaDeNumero2(""),);
      }
  }
    
