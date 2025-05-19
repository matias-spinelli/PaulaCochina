import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-top-bar',
  standalone: false,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  isMenuOpen = false;

  constructor(private cookie: CookieService, private router: Router, private dialog: MatDialog) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  confirmLogout() {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }
    
  logout(): void {
    this.cookie.delete('idToken', '/');
    this.router.navigate(['/auth/login']);
  }
}