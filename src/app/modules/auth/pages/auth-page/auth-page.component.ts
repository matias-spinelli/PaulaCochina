import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '@modules/auth/services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  standalone: false,
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {
  authForm:FormGroup = new FormGroup({});
  isLoginMode = true;
  isLoading = false;
  serverError: string | null = null;
  controlConfigs: { name: string; control: FormControl }[] = [];

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

    this.controlConfigs = [
      { name: 'email', control: this.authForm.get('email') as FormControl },
      { name: 'password', control: this.authForm.get('password') as FormControl },
    ];
  }
  
  get email() {
    return this.authForm.get('email') as FormControl;
  }
  
  get password() {
    return this.authForm.get('password') as FormControl;
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  sendLogin(): void {
    if (this.authForm.invalid) return;

    this.serverError = '';
    this.isLoading = true;

    const { email, password } = this.authForm.value;
    const authObs = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.register(email, password);
  
    authObs
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (response) => {
        const { idToken, expiresIn } = response
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

        this.cookie.set('idToken', idToken, expirationDate, '/')
        this.router.navigate(['/', 'recipes'])
      },
      error: (err) => {
        console.error('Ocurrio un error con tu email o password', err)
        const msg = err?.error?.errors?.[0]?.msg || 'Ocurrió un error inesperado.';
        this.serverError = err?.error?.errors?.[0]?.msg || 'Error desconocido';
      }
    });
  }
}
