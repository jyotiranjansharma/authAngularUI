import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
        
    authService = inject(AuthService);
    isLogged: boolean = false
    router = inject(Router);
    userName: any = ''

    ngOnInit() {
        this.authService.isLoggedIn$.subscribe((res: any)=>{
            this.isLogged = this.authService.isloggedIn()
        })
        this.authService.userName$.subscribe((res) => {
            this.userName = this.authService.userName()
        })
    }
    
    logout() {
        this.authService.logout();
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        this.authService.isLoggedIn$.next(false);
        this.router.navigate(['/login']);
    }
}
