import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorProjetoInterceptor } from './interceptor/interceptor-projeto.interceptor';
import { HomeComponent } from './home/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { guardiaoGuard } from './guard/guardiao.guard';
import { NavbarComponent } from './navbar/navbar.component';

// canActivate PASSA O guardiaoGuard como parÂmetro que verifica se o usuário está logado para que o mesmo tenha acesso a home
// Dentro de data passamos os tipo de usuários que tem acesso a home
export const appRouters : Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate: [guardiaoGuard], data: {role: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_FUNCIONARIO']}}
];

export const routes = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    routes
  ],
  // os parÂmetros dentro do providers faz com que o Interceptor funcione
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorProjetoInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
