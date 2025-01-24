import { Component, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  menuOpen = false;
  sidenavOpen = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
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
    if (this.sidenavOpen) {
      this.addBlur();
    } else {
      this.removeBlur();
    }
    // // console.log('Sidenav', this.sidenavOpen);
  }

  closeSidenav(event: Event) {
    if (this.sidenavOpen && !(event.target as HTMLElement).closest('mat-sidenav')) {
      this.sidenavOpen = false;
      this.removeBlur();
    }
  }

  onSidenavChange(opened: boolean) {
    this.sidenavOpen = opened;
    if (!opened) {
      this.removeBlur();
    }
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
    this.router.navigate(['/Login']);
    // console.log('Logout');
  }

  // Nav Menu
  home() {
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
    }
    // this.router.navigate(['/home']);
    
    // console.log('Home');
  }

  cargaFamiliar() {
    // console.log('Carga Familiar');
  }

  reembolso() {
    // console.log('Reembolso');
  }

  cartaAval() {
    // console.log('Carta Aval');
  }
}
