import { TestBed } from '@angular/core/testing';
import { HttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { baseUrlInterceptor } from './base-url.interceptor'; // Adjust the path as needed
import { environment } from '@/environments/environment'; // Adjust path as needed

describe('BaseUrlInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const baseApiUrl = environment.baseApiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useValue: baseUrlInterceptor, multi: true }
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should prepend base URL to relative requests', () => {
    const relativeUrl = '/test-endpoint';
    const fullUrl = `${baseApiUrl}${relativeUrl}`;

    httpClient.get(relativeUrl).subscribe();

    const req = httpTestingController.expectOne(fullUrl);
    expect(req.request.url).toBe(fullUrl); // Verify that the URL was modified
    req.flush({}); // Complete the request
  });

  it('should not modify absolute URLs', () => {
    const absoluteUrl = 'https://anotherapi.com/test-endpoint';

    httpClient.get(absoluteUrl).subscribe();

    const req = httpTestingController.expectOne(absoluteUrl);
    expect(req.request.url).toBe(absoluteUrl); // Verify that the URL was not modified
    req.flush({}); // Complete the request
  });
});
