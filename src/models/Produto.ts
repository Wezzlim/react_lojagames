import type Categoria from "./Categoria";

export default interface Produto {
    id: number | undefined;
    nome: string;
    preco: number;
    foto: string;
    curtir: number;
    categoria: Categoria | null;
}