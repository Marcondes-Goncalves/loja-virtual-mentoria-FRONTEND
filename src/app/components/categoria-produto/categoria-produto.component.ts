import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaProduto } from 'src/app/model/categoria-produto';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.css']
})
export class CategoriaProdutoComponent implements OnInit {
  
  lista = new Array<CategoriaProduto>();
  categoriaProdutoForm: FormGroup;
  catProduto: CategoriaProduto;

  constructor (private fb: FormBuilder, private categoriaProdutoService: CategoriaProdutoService, private loginService: LoginService) {

    this.catProduto = new CategoriaProduto();

    this.categoriaProdutoForm = this.fb.group({
      id:[],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });

  }

  // executa no momento que a tela abre
  ngOnInit(): void {
      this.listaCategorias();
  }

  novo ():void {

    this.categoriaProdutoForm = this.fb.group({
      id:[],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });

  }

  listaCategorias(): void{
    this.categoriaProdutoService.listarCategoriaProduto().subscribe({

        next: (res)=>{
          this.lista = res;
        },

        error: (error)=>{
          alert("ERRO: " + error);
        }
      })
  }

  categoriaProdutoObjeto(): CategoriaProduto {
    return {
      id: this.categoriaProdutoForm.get('id')?.value!,
      nomeDesc: this.categoriaProdutoForm.get('nomeDesc')?.value!,
      empresa: this.categoriaProdutoForm.get('empresa')?.value!
      // empresa: this.loginService.objetoEmpresa()
    }
  }

  // salvar categoria produto
  cadProdutoCategoria() {
    const categoria = this.categoriaProdutoObjeto();

    this.categoriaProdutoService.salvarCategoriaProduto(categoria);

    this.novo();
    this.listaCategorias();
  }

  // Editar a categoria de produto
 editarCp(c: CategoriaProduto): void{ 
  
  this.categoriaProdutoService.buscarPorId(c.id).subscribe({

    next: (data) =>{

      this.catProduto = data;

      this.categoriaProdutoForm = this.fb.group({
        id:[this.catProduto.id],
        nomeDesc: [this.catProduto.nomeDesc, Validators.required],
        empresa: [this.catProduto.empresa, Validators.required]
      });

    },

    error: (error) => {
      alert(error);
    }

  });
  
 }

}
