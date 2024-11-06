// auth.service.spec.ts
import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient, } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ApiRoutes, PageRoutes } from '@/shared/enum';
import { TokensResponseInterface, LoginInputInterface, RegisterInputInterface, CurrentUser } from '@/features/auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        { provide: Router, useValue: routerSpyObj },
      ],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should login, set access token, fetch user, and navigate', fakeAsync(() => {
    const mockTokenResponse: TokensResponseInterface = { accessToken: 'mockToken', refreshToken: 'refr' };
    const mockUser: CurrentUser = { id: 'uuid', name: 'Test User', email: 'test@example.com' };
    const payload: LoginInputInterface = { email: 'test@example.com', password: 'password' };

    service.login(payload);

    // Expect login request
    const loginRequest = httpTestingController.expectOne(ApiRoutes.Login);
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush(mockTokenResponse);

    tick();

    // Expect getCurrentUser request after successful login
    const userRequest = httpTestingController.expectOne(ApiRoutes.CurrentUser);
    expect(userRequest.request.method).toBe('GET');
    userRequest.flush(mockUser);

    tick();

    // Validate token storage and current user
    expect(localStorage.getItem('accessToken')).toBe(mockTokenResponse.accessToken);
    service.accessToken.subscribe(token => {
      expect(token).toBe(mockTokenResponse.accessToken);
    });
    service.currentUser.subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    // Expect navigation to PageRoutes.Jobs
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(PageRoutes.Jobs);
  }));

  it('should register, set access token, fetch user, and navigate', () => {
    const mockTokenResponse: TokensResponseInterface = { accessToken: 'mockToken', refreshToken: 'refr' };
    const mockUser: CurrentUser = { id: 'uuid', name: 'Test User', email: 'test@example.com' };
    const payload: RegisterInputInterface = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      passwordConfirmation: 'password',
    };

    service.register(payload);

    // Expect register request
    const registerRequest = httpTestingController.expectOne(ApiRoutes.Register);
    expect(registerRequest.request.method).toBe('POST');
    registerRequest.flush(mockTokenResponse);

    // Expect getCurrentUser request after successful registration
    const userRequest = httpTestingController.expectOne(ApiRoutes.CurrentUser);
    expect(userRequest.request.method).toBe('GET');
    userRequest.flush(mockUser);

    // Validate token storage and current user
    expect(localStorage.getItem('accessToken')).toBe(mockTokenResponse.accessToken);
    service.accessToken.subscribe(token => {
      expect(token).toBe(mockTokenResponse.accessToken);
    });
    service.currentUser.subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    // Expect navigation to PageRoutes.Jobs
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(PageRoutes.Jobs);
  });

  it('should log out and navigate to login page', () => {
    localStorage.setItem('accessToken', 'mockToken');
    service.logout();

    // Check that access token and current user are cleared
    expect(localStorage.getItem('accessToken')).toBeNull();
    service.accessToken.subscribe(token => expect(token).toBeNull());
    service.currentUser.subscribe(user => expect(user).toBeNull());

    // Expect navigation to PageRoutes.Login
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(PageRoutes.Login);
  });
});
