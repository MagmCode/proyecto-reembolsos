import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  menuOpen = false;
  sidenavOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showMenu() {
    this.menuOpen = true;
  }

  hideMenu() {
    this.menuOpen = false;
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
    console.log("Sidenav", this.sidenavOpen);
  }

  closeSidenav(event: Event) {
    if (this.sidenavOpen && !(event.target as HTMLElement).closest('mat-sidenav')) {
      this.sidenavOpen = false;
    }
  }

  // RUTAS
  // User Menu
  editProfile() {
    console.log("Edit Profile");
  }
  changePassword() {
    console.log("change Password");
  }
  logout() {
    this.router.navigate(["/Login"]);
    console.log("Logout");
  }

  //  Nav Menu

  home() {
    this.router.navigate(["/home"]);
    console.log("Home");
  }

  cargaFamiliar() {
    console.log("Carga Familiar");
  }

  reembolso() {
    console.log("Reembolso");
  }

  cartaAval() {
    console.log("Carta Aval");
  }
}
