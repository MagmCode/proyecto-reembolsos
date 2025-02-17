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
  isAdmin = false; // Variable para almacenar si el usuario es admin
  username = 'Usuario'; // Variable para almacenar el nombre de usuario

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Obtener el rol y el nombre de usuario al inicializar el componente
    this.isAdmin = this.authService.getUserRole();
    // this.username = this.authService.getFullName(); // Obtener el nombre completo
    this.username = this.authService.getName(); // Obtener el nombre completo
  }

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
    this.router.navigate(['user/editar-perfil']);
  }

  changePassword() {
    this.router.navigate(['user/cambiar-password']);
  }

  assignProfile() {
    this.router.navigate(['admin/asignar-perfil']); // Ruta para asignar perfil (solo admin)
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
  }

  cargaFamiliar() {
    // console.log('Carga Familiar');
  }

  reembolso() {
    this.router.navigate(['user/reembolso']);
  }

  cartaAval() {
    this.router.navigate(['user/carta-aval']);
  }
}