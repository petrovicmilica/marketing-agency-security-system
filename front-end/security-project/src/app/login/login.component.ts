import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ResponseMessage } from '../model/responseMessage.model';
import { LoginResponse } from '../model/loginResponse.model';
import { environment } from 'src/env/environment';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  verificationCode: string = '';
  changePasswordFlag: boolean = false;
  showVerificationCode: boolean = false;
  messageLogin: string | undefined;
  messagePassword: string | undefined;
  messageVerification: string | undefined = "";
  passwordForm: FormGroup = new FormGroup({});

  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;

  isEmployeed: boolean = false;

  isEmployeedAndMfaEnabled: boolean = false;

  siteKey = `${environment.recaptcha.siteKey}`;

  socialUser: SocialUser | undefined;

  constructor(private userService: UserService, 
    private fb: FormBuilder, 
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,
    private router: Router){}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.socialUser = user;
        console.log(this.socialUser);
        this.userService.verifyGoogleToken(this.socialUser).subscribe(
          response => {
            console.log(response);
            if (response.flag) {
              console.log("FLAG: "+ response.flag);
              console.log("EMAIL:::: " + response.googleEmail);
              console.log("MESSAGE: "+ response.responseMessage);
              console.log("PASSWROD: " + response.loginPassword);
              this.googleLogin(response.googleEmail, response.loginPassword);
              /*this.messageLogin = response.responseMessage;
              const googleEmail = response.googleEmail;
              console.log("GOOGLE EMAIL:::: " + googleEmail);
              //this.googleLogin(response.email, response.loginPassword);
              this.authService.googleLogin(googleEmail).subscribe(
                response => {
                  localStorage.setItem("jwt", response.accessToken);
                  localStorage.setItem("refreshToken", response.refreshToken);
                  this.authService.getLoggedInUser();
                  this.router.navigate(['/homepage']);
                },
                error => {
                  this.messageLogin = 'Google login faild.';
                }
              )
                */
            } else {
              this.messageLogin = response.responseMessage;
            }
          },
          error => {
            this.messageLogin = 'Verification failed. Please try again later.';
          }
        );        
      }
    });

    /*
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      callback: (resp: any) => {
        
      }
    });

    google.account.id.renderButton(document.getById("google-btn")), {
      theme: 'filled_blue', 
      size: 'large', 
      shape: 'rectangle', 
      width: 350
    }
      */
  }

  googleLogin(googleUsername: string, googlePassword: string) {
    this.authService.login({ username: googleUsername, password: googlePassword }).subscribe(
      (response: any) => {
        console.log('Login successful!!!');
      },
      (error) => {
        console.error('Login failed:', error);
        this.messageLogin = 'Login failed. Please try again.';
      }
    );
  }

  tryLogin(): void {
    this.userService.tryLogin(this.email, this.password).subscribe(
      (response: LoginResponse) => {
        if (response.response === "This account is not active, please wait for admin to activate your account.") {
          this.messageLogin = response.response;
          this.changePasswordFlag = false;
          return;
        }
        if (response.response === "The user did not enter the two-factor authentication code correctly, and his account is not active.") {
          this.messageLogin = response.response;
          this.changePasswordFlag = false;
          return;
        }
        
        if (response.employeed) {
          console.log("UPAO OVDE DA JE EMPLOYEE: " + response.employeed);

          if (!response.loggedInOnce) {
            this.changePasswordFlag = !response.loggedInOnce;
            return;
          }

          if (response.mfaEnabled) {
            this.showVerificationCode = true;
            this.messageVerification = "";
            this.isEmployeedAndMfaEnabled = true;
            return;
          } 

          this.loadReCaptcha();
          
        } else {
          this.finalizeLogin(response);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.messageLogin = 'Login failed. Please try again.';
      }
    );
  }

  loadReCaptcha() {
    this.messageLogin = 'Please complete the reCAPTCHA to proceed.';
          this.isEmployeed = true;
          // Render reCAPTCHA
          setTimeout(() => {
            if (typeof grecaptcha !== 'undefined') {
              grecaptcha.render('recaptcha-container', {
                sitekey: this.siteKey,
              });
              /*
              const response = grecaptcha.getResponse();
              console.log("RECAPTCHA RESPONSE::: " + response);
              */

            } 
          }, 0);
  }

  ngAfterViewInit(): void {
    if (this.isEmployeed && typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha.render('recaptcha-container', {
          sitekey: this.siteKey,
        });
      });
    }
  }

  recaptcha() {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
      this.messageLogin = 'Please complete the reCAPTCHA';
      return;
    } else {
      console.log("reCAPTCHA response token: ", response);

      //OVDE TREBA PROVERITI DA LI JE OK TOKEN NA BEKU
      const verificationData = {
        reCaptchaToken: response,
      };
      this.userService.verifyReCaptchaToken(verificationData).subscribe(
        response => {
          if (response.flag) {
            this.messageLogin = response.responseMessage;
            this.loginUser();
          } else {
            this.messageLogin = response.responseMessage;
          }
        },
        error => {
          this.messageLogin = 'Verification failed. Please try again later.';
        }
      );
    }
  }
  
  finalizeLogin(response: LoginResponse): void {
    this.messageLogin = response.response;

    if (response.mfaEnabled) {
      this.showVerificationCode = true;
      this.messageVerification = "";
      this.isEmployeedAndMfaEnabled = false;
      return;
    } 

    if (response.loggedInOnce) {
      this.loginUser();
    }
  }

  verifyCode(): void {
    const verificationData = {
      email: this.email,
      code: this.verificationCode,
      fromLogin: true
    };

    this.userService.verifyMfaCode(verificationData).subscribe(
      response => {
        if (response.flag) {
          this.messageLogin = response.responseMessage;
          if (this.isEmployeedAndMfaEnabled) {
            this.messageLogin = "";
            this.loadReCaptcha();
          }
          else {
            this.loginUser();
          }
        } else {
          this.messageVerification = 'Verification failed. Please check the code and try again.';
        }
      },
      error => {
        this.messageVerification = 'Verification failed. Please try again later.';
      }
    );
  }

  loginUser(): void {
    this.authService.login({ username: this.email, password: this.password }).subscribe(
      (response: any) => {
        console.log('Login successful!!!');
      },
      (error) => {
        console.error('Login failed:', error);
        this.messageLogin = 'Login failed. Please try again.';
      }
    );
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      const passwordData = {
        oldPassword: this.passwordForm.value.oldPassword,
        newPassword: this.passwordForm.value.newPassword,
        confirmPassword: this.passwordForm.value.confirmPassword,
        email: this.email,
      };
      this.userService.changePassword(passwordData).subscribe(
        (response: ResponseMessage) => {
          this.messagePassword = response.responseMessage;
        },
        (error) => {
          console.error('Error changing password:', error);
        }
      );
    }
  }


  ////////////////////////
  /*private accessToken = '';
  socialUser: SocialUser | undefined;
  socialLoggedIn: boolean | undefined;

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  getAccessToken(): void {
    this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  getGoogleCalendarData(): void {
    if (!this.accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((events) => {
        alert('Look at your console');
        console.log('events', events);
      });
  }
      */
}
