// It organizes application into cohesive block of functionality and configure the compiler and injector.
import { NgModule } from '@angular/core';

// It provides services that are essential to launch and run a browser application
import { BrowserModule } from '@angular/platform-browser';

// It knows which component to display based on the URL in the browser addreess bar
import { AppRoutingModule } from './app-routing.module';

// Entry component that Angular loads into the DOM during the bootstrap process
import { AppComponent } from './app.component';

// It introduces the animation capabilities into our Angular Root Application Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Template driven forms make use of the "FormsModule" and Reactive forms are based on "ReactiveFormsModule"
// Template asynchronous in nature and logic driven whereas Reactive are mostly synchronous and logid resides in component
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Provides a sophisticated layout API using Flexbox CSS + mediaQuery.
// Its real power is in its responsive engine
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToastrModule } from 'ngx-toastr';

// custom component created for projects
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { LayoutComponent } from './components/layout/layout.component';

// Importing different Angular Material Components via Material Modules
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NotFoundComponent,
    HeaderComponent,
    SidenavListComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    SocialLoginModule,
    HttpClientModule,
    ToastrModule.forRoot(), // Toastr Module Added
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '400372858878-9r7qufnop1r2m5jjb9iqfo3slrmq1sdh'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
