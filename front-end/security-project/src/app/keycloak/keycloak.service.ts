import {Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './userProfile';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;

  constructor(private router: Router,
    private authService: AuthService) { }

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'security-project',
        clientId: 'security-project-id'
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
      });
      console.log("AUTHENTICATED:", authenticated);
  
      if (authenticated) {
        console.log("User is authenticated");
  
        // Ovde možete postaviti profil ili raditi druge stvari nakon autentifikacije
        // this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
        // this._profile.token = this.keycloak.token || '';
        
        this.router.navigate(['/ad-requests']);
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Keycloak initialization error:", error);
    }
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }
}