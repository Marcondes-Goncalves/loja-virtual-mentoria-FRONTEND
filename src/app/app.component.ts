import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { usuario } from './model/usuario';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tituloLogin = 'Login da loja virtual';

  constructor (private fb: FormBuilder, private loginService: LoginService) {
  
  }

  /*Pegar dados do formulário */
  loginForm = this.fb.group({
    id: [],
    login: [null, Validators.required],
    senha: [null, Validators.required]
  });

  /*Transformar em objeto */
  loginObjeto(): usuario {
    return {
      login: this.loginForm.get('login')?.value!,
      senha: this.loginForm.get('senha')?.value!
    }
  }

  fazerLogin() {

    const usuario = this.loginObjeto();

    this.loginService.logar(usuario);

    console.info('dados de login -> ' + usuario.login);
    console.info('dados de login -> ' + usuario.senha);
    
  }

}