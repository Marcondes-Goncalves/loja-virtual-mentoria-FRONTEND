import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environments';

// com o guardião verificamos se o usuário está logado e se possui acessos para determinarmos a que rotas ele terá acesso no app.module
export const guardiaoGuard: CanActivateFn = (route, state) => {

  var username = localStorage.getItem('username');
  var roles = route.data;

  var role = JSON.parse(JSON.stringify(roles)).role.toString();
  var authorization = '' + localStorage.getItem("Authorization");

  // Faz uma requisição SINCRONA para verificar quais acessos o usuário possui
  var request = new XMLHttpRequest();
  request.open('GET', environment.urlApi + 'possuiAcesso/' + username + '/' + role, false);
  request.setRequestHeader('Authorization', authorization);
  request.send();

  var possuiAcessoRetorno = request.responseText === 'true' || new Boolean(request.responseText) === true;
  var usuarioLogado = inject(LoginService).usuarioLogado();

  return usuarioLogado  && possuiAcessoRetorno;
};
