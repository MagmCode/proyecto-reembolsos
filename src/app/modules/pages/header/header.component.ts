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
  isAnalist = false; // Variable para almacenar si el usuario es analista
  first_name = 'Usuario'; // Variable para almacenar el nombre de usuario

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Obtener el rol y el nombre de usuario al inicializar el componente
    this.isAdmin = this.authService.isAdmin();
    // this.first_name = this.authService.getFullName(); // Obtener el nombre completo
    this.first_name = this.authService.getName(); // Obtener el nombre completo
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

  // #region RUTAS
  // 
  // 
  // 
  // 
  //
  //  
  //#region User Menu
  editProfile() {
    this.router.navigate(['user/editar-perfil']);
  }

  changePassword() {
    this.router.navigate(['user/cambiar-password']);
  }

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

// #region analist
  assignProfileAnalist() {
    this.router.navigate(['admin/asignar-perfil']); // Ruta para asignar perfil (solo admin)
  }

  homeAnalist() {
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
    }
    this.router.navigate(['admin/dashboard']); // Ruta para el dashboard (solo admin)
  }

  historialAnalist() {
    this.router.navigate(['admin/historial']);
  }
  reportesAnalist() {
    this.router.navigate(['admin/reportes']);
  }

  reembolsoAnalist() {
    this.router.navigate(['admin/reembolso']);
  }

  cartaAvalAnalist() {
    this.router.navigate(['admin/carta-aval']);
  }

  editAdminProfileAnalist() {
    this.router.navigate(['admin/editar-perfil']);
  }
  changePasswordAdminAnalist() {
    this.router.navigate(['admin/cambiar-password']);
  }


  // #region admin
  assignProfile() {
    this.router.navigate(['admin/asignar-perfil']); // Ruta para asignar perfil (solo admin)
  }

  dashboard() {
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
    }
    this.router.navigate(['admin/dashboard']); // Ruta para el dashboard (solo admin)
  }

  historial() {
    this.router.navigate(['admin/historial']);
  }
  reportes() {
    this.router.navigate(['admin/reportes']);
  }

  adminReembolso() {
    this.router.navigate(['admin/reembolso']);
  }

  adminCartaAval() {
    this.router.navigate(['admin/carta-aval']);
  }

  editAdminProfile() {
    this.router.navigate(['admin/editar-perfil']);
  }
  changePasswordAdmin() {
    this.router.navigate(['admin/cambiar-password']);
  }



  logout() {
    this.authService.logout();
  }

}