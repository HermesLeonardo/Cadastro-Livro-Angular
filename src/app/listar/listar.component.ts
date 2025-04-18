import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivroService } from '../service/livro.service';
import { Livro } from '../model/livro.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone: false
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'categoria', 'disponivel', 'condicao', 'acoes'];
  livros: Livro[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private livroService: LivroService
  ) {}

  ngOnInit(): void {
    this.carregarLivros();

    window.addEventListener('livros:atualizar', () => {
      this.carregarLivros();
    });
  }

  carregarLivros() {
    this.livroService.listar().subscribe((livros) => {
      this.livros = livros.map((livro: Livro) => ({
        ...livro,
        titulo: livro.titulo || 'Sem título',
        categoria: livro.categoria || 'Desconhecida',
        disponivel: livro.disponivel ?? false,
        condicao: livro.condicao || 'Não informada',
        exibirExcluir: livro.exibirExcluir ?? false
      }));
    });
  }

  excluirLivro(livro: Livro) {
    this.livroService.excluir(livro.id);
    this.carregarLivros();
    this.snackBar.open('Livro excluído com sucesso!', 'Fechar', { duration: 2000 });
  }

  toggleExcluir(livro: Livro) {
    livro.exibirExcluir = !livro.exibirExcluir;
    this.livros = [...this.livros]; // Força detecção de mudança
  }
}
