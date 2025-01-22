import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  menuOpen = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

// Rutas

  toggleMenu() {
     this.menuOpen = !this.menuOpen;
   }
 
  editProfile() {
     // this.router.navigate(['/edit-profile']);
     console.log('Edit Profile');
   }
   changePassword() {
     // this.router.navigate(['/change-password']);
     console.log('change Password');
   }
   logout() {
     // this.router.navigate(['/sign-in']);
     console.log('Logout');
   }
   

}
