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

      next: (res) => {
        console.info("--------------- JWT----------------")
        console.info(res);
        console.info("--------------- JWT----------------")
        alert("Login Realizado");
      },

      error: (error) => {
        alert("Deu Erro");
        console.info(error);
      }

    });

   }

}
