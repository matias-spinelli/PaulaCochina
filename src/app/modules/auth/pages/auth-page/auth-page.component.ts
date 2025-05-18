import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '@modules/auth/services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  standalone: false,
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {
  authForm:FormGroup = new FormGroup({});
  isLoginMode = true;

  constructor(
    private authService: AuthServiceService, 
    private cookie: CookieService, 
    private router: Router,
    private fb: FormBuilder) 
  { }

  ngOnInit(): void {
    this.authForm = new FormGroup( 
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }
  
  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  sendLogin(): void {
    if (this.authForm.invalid) return;
    const { email, password } = this.authForm.value;

    console.log('sendLogin');
    console.log('isLoginMode', this.isLoginMode);

    const authObs = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.register(email, password);
  
    authObs.subscribe({
      next: (response) => {
        const { idToken, data } = response
        this.cookie.set('idToken', idToken, 4, '/')
        this.router.navigate(['/', 'recipes'])
      },
      error: (err) => {
        /* this.errorSession = true, */
        console.log('Ocurrio un error con tu email o password')
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
}
