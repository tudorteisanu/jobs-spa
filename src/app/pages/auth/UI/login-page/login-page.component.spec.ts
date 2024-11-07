import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { LoginFormComponent } from '@/features/auth';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, LoginFormComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Login Page title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toBe('Login page');
  });

  it('should render login form', () => {
    const loginForm = fixture.debugElement.query(By.directive(LoginFormComponent));
    expect(loginForm).toBeTruthy();
  });
});
