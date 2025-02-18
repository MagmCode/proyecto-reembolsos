import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {  MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';




import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { HomePageComponent } from './modules/user/home-page/home-page.component';
import { FooterComponent } from './modules/pages/footer/footer.component';
import { HeaderComponent } from './modules/pages/header/header.component';
import { ForgotPasswordComponent } from './modules/user/forgot-password/forgot-password.component';
import { ReembolsoComponent } from './modules/user/reembolso/reembolso.component';
import { CartaAvalComponent } from './modules/user/carta-aval/carta-aval.component';
import { EditProfileComponent } from './modules/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './modules/user/change-password/change-password.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { HistorialComponent } from './modules/admin/historial/historial.component';
import { ReembolsoAdminComponent } from './modules/admin/reembolso-admin/reembolso-admin.component';
import { CartaavalAdminComponent } from './modules/admin/cartaaval-admin/cartaaval-admin.component';
import { EditProfileAdminComponent } from './modules/admin/edit-profile-admin/edit-profile-admin.component';
import { ChangePasswordAdminComponent } from './modules/admin/change-password-admin/change-password-admin.component';
import { AsignProfileComponent } from './modules/admin/asign-profile/asign-profile.component';
import { UnauthorizedComponent } from './modules/pages/unauthorized/unauthorized.component';
import { ReportesComponent } from './modules/admin/reportes/reportes.component';
import { DetalleReembolsoComponent } from './modules/admin/detalle-reembolso/detalle-reembolso.component';
import { DetalleCartaavalComponent } from './modules/admin/detalle-cartaaval/detalle-cartaaval.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    ReembolsoComponent,
    CartaAvalComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    DashboardComponent,
    HistorialComponent,
    ReembolsoAdminComponent,
    CartaavalAdminComponent,
    EditProfileAdminComponent,
    ChangePasswordAdminComponent,
    AsignProfileComponent,
    UnauthorizedComponent,
    ReportesComponent,
    DetalleReembolsoComponent,
    DetalleCartaavalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    ScrollingModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCardModule,
    MatSidenavModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
