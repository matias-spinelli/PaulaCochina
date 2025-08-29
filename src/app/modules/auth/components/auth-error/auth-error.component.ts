import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-error',
  standalone: false,
  templateUrl: './auth-error.component.html',
  styleUrl: './auth-error.component.css',
  animations: [
    trigger('fadeBounce', [
      transition(':enter', [
        animate(
          '400ms ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-5px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 0.8 }),
            style({ transform: 'translateY(-2px)', offset: 0.9 }),
            style({ transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class AuthErrorComponent {
  @Input() controls: { name: string; control: FormControl }[] = [];
  @Input() serverError: string | null = null;

  get errorMessage(): string | null {
    if (this.serverError) return this.serverError;

    for (const { name, control } of this.controls) {
      if (control.touched && control.errors) {
        if (control.errors['required']) {
          return name === 'email'
            ? 'El email es obligatorio.'
            : 'La contraseña es obligatoria.';
        }
        if (control.errors['email']) return 'Debe ser un email válido.';
        if (control.errors['minlength']) return 'Mínimo 6 caracteres.';
        if (control.errors['maxlength']) return 'Máximo 12 caracteres.';
      }
    }

    return null;
  }
}