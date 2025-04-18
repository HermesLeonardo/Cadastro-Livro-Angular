import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivroService } from '../service/livro.service';
import { Livro } from '../model/livro.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
  standalone: false
})
export class CadastrarComponent {
  formGroup: FormGroup;

  categorias = ['Ficção', 'Realismo', 'Biografia', 'Terror', 'Romance'];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private livroService: LivroService
  ) {
    this.formGroup = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categoria: ['', Validators.required],
      disponivel: [false],
      condicao: ['', Validators.required],
    });
  }

  salvar() {
    if (this.formGroup.invalid) {
      this.onError();
      return;
    }

    const novoLivro: Livro = {
      id: new Date().getTime(),
      ...this.formGroup.value,
      exibirExcluir: false
    };

    this.livroService.salvar(novoLivro);

    this.snackBar.open('Livro cadastrado com sucesso!', 'Fechar', { duration: 3000 });
    this.formGroup.reset();
    window.dispatchEvent(new Event('livros:atualizar'));
    window.location.href = '/listar';
  }

  private onError() {
    this.snackBar.open('Erro ao enviar formulário', 'Fechar', { duration: 3000 });
  }

  errorMessage(campo: string): string {
    const campoControl = this.formGroup.get(campo);

    if (campoControl?.hasError('required')) return 'Campo Obrigatório';
    if (campoControl?.hasError('minlength')) return 'Mínimo 3 caracteres';
    if (campoControl?.hasError('maxlength')) return 'Máximo 50 caracteres';

    return 'Erro desconhecido';
  }
}
