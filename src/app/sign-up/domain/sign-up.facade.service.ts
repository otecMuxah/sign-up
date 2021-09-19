import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupValidator } from './validators/signup-validator.service';
import { SignUpApiService } from './api/sign-up.api.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpFacadeService {
  public emailValidating = this.signupValidator.emailValidating;
  public signUpForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl(
        '',
        [Validators.required, this.signupValidator.emailFormatValidator()],
        [this.signupValidator.checkUniqueEmail()]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.signupValidator.letterCaseValidator(),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      updateOn: 'blur',
      validators: [
        this.signupValidator.nameInPasswordValidator(),
        this.signupValidator.passwordsMatchValidator(),
      ],
    }
  );

  constructor(
    private signupValidator: SignupValidator,
    private signupApi: SignUpApiService
  ) {}

  public submit(): void {
    const formValue = this.signUpForm.value;
    delete formValue.confirmPassword;
    this.signupApi.postUser(formValue).subscribe();
  }
}
