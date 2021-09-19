import { ComponentFixture } from '@angular/core/testing';
import { SignUpComponent } from '../sign-up.component';

export class SignupPage {
  fixture: ComponentFixture<SignUpComponent>;

  constructor(someFixture: ComponentFixture<SignUpComponent>) {
    this.fixture = someFixture;
  }

  // getter properties wait to query the DOM until called.
  get inputs() {
    return this.queryAll<HTMLInputElement>('input');
  }

  get submitButton() {
    return this.query<HTMLButtonElement>('button');
  }

  get firstNameInput() {
    return this.query<HTMLElement>('input[formControlName="firstName"]');
  }

  get lastNameInput() {
    return this.query<HTMLInputElement>('input[formControlName="lastName"]');
  }
  get emailInput() {
    return this.query<HTMLInputElement>('input[formControlName="email"]');
  }
  get passwordInput() {
    return this.query<HTMLInputElement>('input[formControlName="password"]');
  }
  get confirmPasswordInput() {
    return this.query<HTMLInputElement>(
      'input[formControlName="confirmPassword"]'
    );
  }
  get errorElement() {
    return this.query<HTMLElement>('mat-error');
  }

  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
