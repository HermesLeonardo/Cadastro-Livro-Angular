import { Injectable } from '@angular/core';
import { Livro } from '../model/livro.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly STORAGE_KEY = 'livros';

  listar(): Observable<Livro[]> {
    const livros = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return of(livros);
  }

  salvar(novoLivro: Livro): void {
    const livros = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    livros.push(novoLivro);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(livros));
  }

  excluir(id: number): void {
    const livros = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const atualizados = livros.filter((l: Livro) => l.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(atualizados));
  }
}
