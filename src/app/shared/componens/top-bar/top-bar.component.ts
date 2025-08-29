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
    this.authService.logout();
  }
}