import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { SignUpApiService } from '../api/sign-up.api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const EMAIL_PATTERN: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPPER_CASE_PATTERN: RegExp = /[A-Z]+/;
const LOWER_CASE_PATTERN: RegExp = /[a-z]+/;

@Injectable({
  providedIn: 'root',
})
export class SignupValidator {
  emailValidating = new BehaviorSubject(false);
  constructor(private signUpApiService: SignUpApiService) {}

  public checkUniqueEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const inputedEmail = control.value;
      if (!inputedEmail) {
        return of(null);
      }

      this.emailValidating.next(true);
      return this.signUpApiService.getUsers().pipe(
        map((users) => {
          return users.findIndex((user) => user.email === inputedEmail) === -1
            ? null
            : { uniqueEmail: true };
        }),
        tap(() => this.emailValidating.next(false))
      );
    };
  }

  public emailFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      return EMAIL_PATTERN.test(value) ? null : { emailFormat: true };
    };
  }

  public letterCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = UPPER_CASE_PATTERN.test(value);
      const hasLowerCase = LOWER_CASE_PATTERN.test(value);

      return hasUpperCase && hasLowerCase ? null : { letterCase: true };
    };
  }

  public nameInPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passControl = control.get('password');
      const firstName = control.get('firstName')?.value?.toLowerCase();
      const lastName = control.get('lastName')?.value?.toLowerCase();
      const password = passControl?.value?.toLowerCase();

      if (!firstName || !lastName || !password) {
        return null;
      }

      const firstNameInPassword = new RegExp(firstName).test(password);
      const lastNameInPassword = new RegExp(lastName).test(password);

      if (firstNameInPassword || lastNameInPassword) {
        passControl?.setErrors({ passwordIncludePersonal: true });
      }

      return firstNameInPassword || lastNameInPassword
        ? { passwordIncludePersonal: true }
        : null;
    };
  }

  public passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmPassControl = control.get('confirmPassword');
      const password = control.get('password')?.value;
      const confirmPassword = confirmPassControl?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      const passwordsMatch = new RegExp(password).test(confirmPassword);
      if (passwordsMatch) {
        confirmPassControl?.setErrors({ passwordMatch: true });
      }
      return passwordsMatch ? { passwordMatch: true } : null;
    };
  }
}
