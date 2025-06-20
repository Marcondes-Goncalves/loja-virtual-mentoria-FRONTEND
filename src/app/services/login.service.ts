import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi = environment.urlApi + 'login'

  constructor(private http: HttpClient) {


   }

   logar(usuario: usuario) {

    return this.http.post<String>(this.urlApi, usuario).subscribe({

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

        alert("Deu Erro: " + error.error.text);
        // console.info(error);

      }

    });

   }

}
