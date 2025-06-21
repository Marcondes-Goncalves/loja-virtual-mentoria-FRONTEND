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

  title = '';

  constructor (private fb: FormBuilder, private loginService: LoginService) {
  
  }


}