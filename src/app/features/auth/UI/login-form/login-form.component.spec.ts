import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { AuthService } from '@/features/auth';
import { EMPTY, of } from 'rxjs';
import { By } from '@angular/platform-browser';

const email = 'someemail@example.com';
const password = '123456789'
const mockAuthService = { login: () => of(EMPTY) }

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const emailInput = fixture.debugElement.query(By.css('#email'));
    const passwordInput = fixture.debugElement.query(By.css('#password'));

    emailInput.nativeElement.value = email;
    passwordInput.nativeElement.value = password;
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    expect(emailInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()

    expect(component.loginForm.getRawValue()).toEqual({email, password});
    spyOn(component, 'login');
    component.login();
    expect(component.login).toHaveBeenCalled();
  });

  it('should call service login', () => {
    spyOn(service, 'login');
    component.loginForm.setValue({email, password});
    component.login();
    expect(service.login).toHaveBeenCalledWith({email, password});
  })

  it('should not call service login', () => {
    spyOn(service, 'login');
    component.login();
    expect(service.login).not.toHaveBeenCalled();
  })
});
