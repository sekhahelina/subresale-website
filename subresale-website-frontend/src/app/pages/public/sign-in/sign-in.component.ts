import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignedInUser, SignInRequest, SignInResponse } from '../../../_system/_interfaces/sign-in';
import { SignInService } from '../../../_system/_services/sign-in/sign-in.service';
import { TokenService } from '../../../_system/_services/token/token.service';
import { UserStateService } from '../../../_system/_services/user-state/user-state.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  standalone: false,
})
export class SignInComponent {
  public userToken!: string;
  public signInForm!: FormGroup;
  public userData!: SignedInUser;
  public signInRequest!: SignInRequest;
  public signInResponse!: SignInResponse;
  public isSignInSuccess: boolean = true;
  public signInErrorTimeoutId: any = null;
  public isPasswordVisible: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private signInService: SignInService,
    private userStateService: UserStateService,
  ) {
    this.signInForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w.]+@(gmail\.com|ukr\.net|icloud\.com)$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]
    });
  }

  getFieldErrors(field: string) {
    return this.signInForm.get(field)?.errors;
  }

  isFieldInvalid(field: string) {
    const control = this.signInForm.get(field);

    return control?.touched && control?.invalid;
  }

  onSubmit() {
    if (this.signInErrorTimeoutId) {
      clearTimeout(this.signInErrorTimeoutId);
      this.signInErrorTimeoutId = null;
    }

    if (this.signInForm.valid) {
      this.signInRequest = this.signInForm.value;

      this.signInService.signIn(this.signInRequest).subscribe({
        next: (data) => {
          if (data) {
            this.signInResponse = data;
            this.isSignInSuccess = true;

            this.userData = this.signInResponse.user;
            this.userToken = this.signInResponse.token;

            this.tokenService.token = this.userToken;

            this.userStateService.currentUser$.next(this.userData);

            this.router.navigate(['']);
            this.signInForm.reset();
          }
        },
        error: (err) => {
          console.error('Sign-in error:', err);
          this.isSignInSuccess = false;

          this.signInErrorTimeoutId = setTimeout(() => {
            this.isSignInSuccess = true;
            this.signInErrorTimeoutId = null;
          }, 3000);
        }
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  showPassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
