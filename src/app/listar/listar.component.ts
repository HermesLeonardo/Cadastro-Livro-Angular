import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone  : false
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'categoria', 'disponivel', 'condicao', 'acoes'];

  livros: any[] = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarLivros();

    window.addEventListener('livros:atualizar', () => {
      this.carregarLivros();
    });
  }

  carregarLivros() {
    const livrosSalvos = JSON.parse(localStorage.getItem('livros') || '[]');
  
    this.livros = livrosSalvos.map((livro: any) => ({
      titulo: livro.titulo || livro.nome || 'Sem título',
      categoria: livro.categoria || 'Desconhecida',
      disponivel: livro.disponivel ?? false,
      condicao: livro.condicao || 'Não informada',
      id: livro.id,
      exibirExcluir: livro.exibirExcluir ?? false
    }));
  }
  

  excluirLivro(livro: any) {
    this.livros = this.livros.filter(l => l.id !== livro.id);
    localStorage.setItem('livros', JSON.stringify(this.livros));
    this.snackBar.open('Livro excluído com sucesso!', 'Fechar', { duration: 2000 });
  }

  toggleExcluir(livro: any) {
    livro.exibirExcluir = !livro.exibirExcluir;
    this.livros = [...this.livros];
  }


}
