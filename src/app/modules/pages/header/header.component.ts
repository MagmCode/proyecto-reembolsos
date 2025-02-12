import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<boolean>();
  menuOpen = false;
    sidenavOpen = false;
  
    constructor(
      private router: Router,
      private renderer: Renderer2,
      private authService: AuthService,
    ) {}
  
    ngOnInit(): void {}
  
    showMenu() {
      this.menuOpen = true;
    }
  
    hideMenu() {
      this.menuOpen = false;
    }
  
    toggleSidenav() {
      this.sidenavOpen = !this.sidenavOpen;
      this.sidenavToggle.emit(this.sidenavOpen);
    }
  
 
    closeSidenav(event: Event) {
      if (this.sidenavOpen && !(event.target as HTMLElement).closest('mat-sidenav')) {
        this.sidenavOpen = false;
        this.sidenavToggle.emit(this.sidenavOpen);
      }
    }
  
    onSidenavChange(opened: boolean) {
      this.sidenavOpen = opened;
      this.sidenavToggle.emit(this.sidenavOpen);
    }
    addBlur() {
      const content = document.querySelector('mat-sidenav-content');
      if (content) {
        this.renderer.addClass(content, 'blurred');
      }
    }
  
    removeBlur() {
      const content = document.querySelector('mat-sidenav-content');
      if (content) {
        this.renderer.removeClass(content, 'blurred');
      }
    }
  
    // RUTAS
    // User Menu
    editProfile() {
      // console.log('Edit Profile');
    }
  
    changePassword() {
      // console.log('change Password');
    }
  
    logout() {
      this.authService.logout();
    }
  
    // Nav Menu
    home() {
      if (this.sidenavOpen) {
        this.sidenavOpen = false;
      }
      this.router.navigate(['user/home-page']);
      
      // console.log('Home');
    }
  
    cargaFamiliar() {
      // console.log('Carga Familiar');
    }
  
    reembolso() {
      this.router.navigate(['user/reembolso'])
      // console.log('Reembolso');
    }
  
    cartaAval() {
      this.router.navigate(['user/carta-aval'])
      // console.log('Carta Aval');
    }
  }
  