import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

    loginForm: FormGroup | any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router){}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    if(this.loginForm.invalid) { return; }

    const {email, password} = this.loginForm.value;

    this.authService.loginUsuario(email, password)
    .then( credenciales => {
      this.router.navigate(['/']);
    })
    .catch( err =>
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message
    }));

  }


}
