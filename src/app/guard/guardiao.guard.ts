import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

// com o guardião verificamos se o usuário está logado para determinarmos a que rotas ele terá acesso no app.module
export const guardiaoGuard: CanActivateFn = (route, state) => {

  // console.info('Chamou o guardiao');
  return inject(LoginService).usuarioLogado();
};
