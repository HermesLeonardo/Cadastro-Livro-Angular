import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
  standalone: false
})
export class CadastrarComponent {
  formGroup: FormGroup;

  categorias = ['Ficção', 'Realismo', 'Biografia', 'Terror', 'Romance'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
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

    const novoLivro = {
      id: new Date().getTime(),
      ...this.formGroup.value,
      exibirExcluir: false
    };

    console.log('Livro salvo (JSON):', JSON.stringify(novoLivro, null, 2));

    const livrosSalvos = JSON.parse(localStorage.getItem('livros') || '[]');
    livrosSalvos.push(novoLivro);
    localStorage.setItem('livros', JSON.stringify(livrosSalvos));

    this.snackBar.open('Livro cadastrado com sucesso!', 'Fechar', { duration: 3000 });
    this.formGroup.reset();

    window.dispatchEvent(new Event('livros:atualizar'));
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
