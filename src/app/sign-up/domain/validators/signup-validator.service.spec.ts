import { TestBed } from '@angular/core/testing';
import { SignupValidator } from './signup-validator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { SignUpApiService } from '../api/sign-up.api.service';
import { of } from 'rxjs';

describe('Signup Validator', () => {
  let service: SignupValidator;
  let control: FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpApiService],
    });
    control = new FormControl('input');
    service = TestBed.inject(SignupValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Email Unique Validator', () => {
    let checkUniqueEmail: ValidatorFn;
    let signupApi: SignUpApiService;
    const users = [
      { firstName: 'John', lastName: 'Doe', email: 'aaa@bbb.ccc' },
    ];
    beforeEach(() => {
      checkUniqueEmail = service.checkUniqueEmail();
      signupApi = TestBed.inject(SignUpApiService);
      spyOn(signupApi, 'getUsers').and.returnValue(of(users));
    });

    it('should return correct object if input is email is not unique', () => {
      control.setValue('aaa@bbb.ccc');
      checkUniqueEmail(control)?.subscribe((result: any) =>
        expect(result).toEqual({ uniqueEmail: true })
      );
    });

    it('should return null if input is email is unique', () => {
      control.setValue('aaafff@bbb.ccc');
      checkUniqueEmail(control)?.subscribe((result: any) =>
        expect(result).toEqual(null)
      );
    });
  });

  describe('Email Format Validator', () => {
    let emailFormatValidator: ValidatorFn;
    beforeEach(() => {
      emailFormatValidator = service.emailFormatValidator();
    });

    it('should return null if input is email address', () => {
      control.setValue('aaa@bbb.ccc');
      expect(emailFormatValidator(control)).toBeNull();
    });

    it('should return correct object if input not email address', () => {
      control.setValue('12345678901');
      expect(emailFormatValidator(control)).toEqual({ emailFormat: true });
    });
  });

  describe('Letter Case Validator', () => {
    let letterCaseValidator: ValidatorFn;
    beforeEach(() => {
      letterCaseValidator = service.letterCaseValidator();
    });

    it('should return null if input have both upper and lower case', () => {
      control.setValue('John');
      expect(letterCaseValidator(control)).toBeNull();
    });

    it('should return correct object if input not have upper case', () => {
      control.setValue('john');
      expect(letterCaseValidator(control)).toEqual({ letterCase: true });
    });

    it('should return correct object if input not have lower case', () => {
      control.setValue('JOHN');
      expect(letterCaseValidator(control)).toEqual({ letterCase: true });
    });
  });

  describe('Name In Password Validator', () => {
    let nameInPasswordValidator: ValidatorFn;
    beforeEach(() => {
      nameInPasswordValidator = service.nameInPasswordValidator();
    });

    it('should return null if input password have no names in it', () => {
      const form = new FormGroup({
        firstName: new FormControl('John'),
        lastName: new FormControl('Doe'),
        password: new FormControl('bob777'),
      });
      expect(nameInPasswordValidator(form)).toBeNull();
    });

    it('should return correct object if input password have first name in it', () => {
      const form = new FormGroup({
        firstName: new FormControl('John'),
        lastName: new FormControl('Doe'),
        password: new FormControl('john777'),
      });
      expect(nameInPasswordValidator(form)).toEqual({
        passwordIncludePersonal: true,
      });
    });

    it('should return correct object if input password have last name in it', () => {
      const form = new FormGroup({
        firstName: new FormControl('John'),
        lastName: new FormControl('Doe'),
        password: new FormControl('doe777'),
      });
      expect(nameInPasswordValidator(form)).toEqual({
        passwordIncludePersonal: true,
      });
    });
  });

  describe('Password Match Validator', () => {
    let passwordsMatchValidator: ValidatorFn;
    beforeEach(() => {
      passwordsMatchValidator = service.passwordsMatchValidator();
    });

    it('should return null if passwords match', () => {
      const form = new FormGroup({
        password: new FormControl('bob777'),
        confirmPassword: new FormControl('bob778'),
      });
      expect(passwordsMatchValidator(form)).toBeNull();
    });

    it('should return correct object if passwords not match', () => {
      const form = new FormGroup({
        password: new FormControl('bob777'),
        confirmPassword: new FormControl('bob777'),
      });

      expect(passwordsMatchValidator(form)).toEqual({
        passwordMatch: true,
      });
    });
  });
});
