export interface Livro {
    id: number;
    titulo: string;
    categoria: string;
    disponivel: boolean;
    condicao: string;
    exibirExcluir?: boolean;
  }
  