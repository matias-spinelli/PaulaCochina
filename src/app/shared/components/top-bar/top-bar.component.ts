import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthServiceService } from '@modules/auth/services/auth-service.service';

@Component({
  selector: 'app-top-bar',
  standalone: false,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  isMenuOpen = false;

  constructor(private authService: AuthServiceService, private dialog: MatDialog) { }

  toggleMenu() {
    const menu = document.querySelector('.nav-links') as HTMLElement;
    const burger = document.querySelector('.hamburger') as HTMLElement;

    if (this.isMenuOpen) {
      // cerrar menú con animación inversa
      menu.classList.remove('open');
      menu.classList.add('closing');
      burger.classList.remove('active'); // 👈 vuelve a hamburguesa
      setTimeout(() => {
        menu.classList.remove('closing');
        menu.style.visibility = 'hidden';
        this.isMenuOpen = false;
      }, 350);
    } else {
      // abrir menú con rebote
      menu.style.visibility = 'visible';
      menu.classList.add('open');
      burger.classList.add('active'); // 👈 se convierte en X
      this.isMenuOpen = true;
    }
  }

  confirmLogout() {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }
    
  logout(): void {
    this.authService.logout();
  }
}