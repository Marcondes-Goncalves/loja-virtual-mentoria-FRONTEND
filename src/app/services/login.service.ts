import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi = environment.urlApi

  constructor(private http: HttpClient) {


   }

   logar(usuario: usuario) {

    return this.http.post<String>(this.urlApi + 'login', usuario).subscribe({

    /*Pega o token após logar e o armazena no local storage para que o usuário,
     consiga realizar as requisições que ele pode vir a fazer no sistema */
      next: (res) => {

        // console.info("--------------- JWT----------------");
        var respJson = JSON.stringify(res);
        var jwt = JSON.parse(respJson);
        localStorage.setItem("Authorization", jwt.Authorization);
        // console.info(jwt.Authorization);
        // console.info("--------------- JWT----------------");

      },

      error: (error) => {

        alert("Erro: " + error.error.text);

      }

    });

   }

   recuperarSenha(login: String) {

    return this.http.post<String>(environment.urlApi + 'recuperarSenha', login).subscribe({


      next: (res) => {

        var respJson = JSON.stringify(res);
        var resposta = JSON.parse(respJson);
        alert(resposta.msg);

      },

      error: (error) => {

        var respJson = JSON.stringify(error);
        var resposta = JSON.parse(respJson);
        alert(resposta.msg);

      }

    });

   }

   usuarioLogado() {

    var authorization = '' + localStorage.getItem('Authorization');

    return authorization !== '' && authorization !== null && authorization !== 'null';

   }

}
