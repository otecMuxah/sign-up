import { TestBed } from '@angular/core/testing';

import { SignUpFacadeService } from './sign-up.facade.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

describe('SignUpFacadeService', () => {
  let service: SignUpFacadeService;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormBuilder],
    });
    service = TestBed.inject(SignUpFacadeService);
    form = service.signUpForm;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create signup form', () => {
    it('form should be created', () => {
      expect(form).toBeTruthy();
    });

    describe('first name control', () => {
      it('should has required validator', () => {
        const control: AbstractControl | null = form.get('firstName');

        control?.setValue(null);

        expect(control?.hasError('required')).toBeTruthy();
      });
    });

    describe('last name control', () => {
      it('should has required validator', () => {
        const control: AbstractControl | null = form.get('firstName');

        control?.setValue(null);

        expect(control?.hasError('required')).toBeTruthy();
      });
    });

    describe('email control', () => {
      let control: AbstractControl | null;
      beforeEach(() => {
        control = form.get('email');
      });
      it('should has required validator', () => {
        control?.setValue(null);
        expect(control?.hasError('required')).toBeTruthy();
      });

      it('should has format validator', () => {
        control?.setValue('12');
        expect(control?.hasError('emailFormat')).toBeTruthy();
      });

      it('should has async unique validator', () => {
        control?.setValue('aaa@bbb.ccc');
        expect(control?.status).toBe('PENDING');
      });
    });

    describe('password control', () => {
      it('should has required validator', () => {
        const control: AbstractControl | null = form.get('password');
        control?.setValue(null);
        expect(control?.hasError('required')).toBeTruthy();
      });

      it('should has min length validator', () => {
        const control: AbstractControl | null = form.get('password');
        control?.setValue('123');
        expect(control?.hasError('minlength')).toBeTruthy();
      });

      it('should has name in password validator', () => {
        const firstName: AbstractControl | null = form.get('firstName');
        const lastName: AbstractControl | null = form.get('lastName');
        const password: AbstractControl | null = form.get('password');
        firstName?.setValue('John');
        lastName?.setValue('Doe');
        password?.setValue('123john123');
        expect(password?.hasError('passwordIncludePersonal')).toBeTruthy();
      });
    });

    describe('confirm password control', () => {
      it('should has required validator', () => {
        const control: AbstractControl | null = form.get('confirmPassword');
        control?.setValue(null);
        expect(control?.hasError('required')).toBeTruthy();
      });

      it('should has password match validator', () => {
        const password: AbstractControl | null = form.get('password');
        const confirmPassword: AbstractControl | null =
          form.get('confirmPassword');

        password?.setValue('123');
        confirmPassword?.setValue('123');
        expect(form?.hasError('passwordMatch')).toBeTruthy();
      });
    });
  });
});
