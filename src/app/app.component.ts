import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './core/auth/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'automatizacion-de-reembolsos';
  
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Verifica si el usuario está navegando hacia atrás
        if (event.navigationTrigger === 'popstate') {
          this.authService.logout(); // Destruye la sesión
        }
      }
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.authService.logout(); // Asegura destruir la sesión al navegar hacia atrás
  }
}
