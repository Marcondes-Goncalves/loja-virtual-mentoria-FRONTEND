import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaProduto } from 'src/app/model/categoria-produto';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.css']
})
export class CategoriaProdutoComponent {

  constructor (private fb: FormBuilder, private categoriaProdutoService: CategoriaProdutoService, private loginService: LoginService) {

  }

  categoriaProdutoForm = this.fb.group({
    id:[],
    nomeDesc: [null, Validators.required],
    empresa: [this.loginService.objetoEmpresa(), Validators.required]
  });

  categoriaProdutoObjeto(): CategoriaProduto {
    return {
      id: this.categoriaProdutoForm.get('id')?.value!,
      nomeDesc: this.categoriaProdutoForm.get('nomeDesc')?.value!,
      empresa: this.categoriaProdutoForm.get('empresa')?.value!
    }
  }

  // salvar categoria produto
  cadProdutoCategoria() {
    const categoria = this.categoriaProdutoObjeto();

    this.categoriaProdutoService.salvarCategoriaProduto(categoria);
  }

}
