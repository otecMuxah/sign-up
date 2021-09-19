import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupPage } from './unit/signup.page.test';
import { SignUpFacadeService } from '../../domain/sign-up.facade.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let page: SignupPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SignUpComponent],
      providers: [SignUpFacadeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new SignupPage(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Render elements', () => {
    it('should render first name input', () => {
      expect(page.firstNameInput).toBeTruthy();
    });
    it('should render last name input', () => {
      expect(page.lastNameInput).toBeTruthy();
    });
    it('should render email input', () => {
      expect(page.emailInput).toBeTruthy();
    });
    it('should render password input', () => {
      expect(page.passwordInput).toBeTruthy();
    });
    it('should render confirm password input', () => {
      expect(page.confirmPasswordInput).toBeTruthy();
    });
    it('should render submit button', () => {
      expect(page.submitButton).toBeTruthy();
    });

    it('should render error', async () => {
      expect(page.errorElement).toBeTruthy();
    });
  });
});
