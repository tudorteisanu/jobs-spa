import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JobsService } from './jobs.service';
import { JobInterface } from '@/features/jobs';
import { ApiRoutes } from '@/shared/enum';
import { PaginatedResponse } from '@/shared/types';
import { provideHttpClient } from '@angular/common/http';

const defaultMockJob: JobInterface = {
  id: '2',
  title: 'Frontend Developer',
  company: 'Design Co',
  description: '',
  location: '',
  industry: '',
  jobType: 'full-time',
  salaryRange: [1, 12],
  postDate: new Date(),
  expiryDate: new Date(),
  source: '',
  externalUrl: '',
  keywords: []
};

describe('JobsService', () => {
  let service: JobsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        JobsService
      ],
    });

    service = TestBed.inject(JobsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch jobs and update BehaviorSubjects', fakeAsync(() => {
    const mockResponse: PaginatedResponse<JobInterface> = {
      data: [{
        ...defaultMockJob,
        id: '1',
        title: 'Software Developer',
        company: 'Tech Co',
      }],
      meta: { totalPages: 10, totalCount: 123, page: 1, size: 12 },
    };

    service.fetchJobs();

    const req = httpTestingController.expectOne(ApiRoutes.Jobs);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    tick(3000); // Simulate delay

    service.jobs$.subscribe(value => {
      expect(value).toEqual(mockResponse.data);
    })

    service.params$.subscribe(value => {
      expect(value).toEqual({ totalPages: 10, totalCount: 123, page: 1, size: 12 });
    })
  }));

  it('should fetch a job by ID and add it to jobs if not already present', () => {
    const jobId = '1';
    const mockJob: JobInterface = {
      ...defaultMockJob,
        id: jobId,
       title: 'Frontend Developer',
       company: 'Design Co',
    };

    service.fetchJobById(jobId).subscribe((job) => {
      expect(job).toEqual(mockJob);
    });

    const req = httpTestingController.expectOne(`${ApiRoutes.Jobs}/${jobId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockJob);

    service.jobs$.subscribe( value => expect(value).toContain(mockJob));
  });

  it('should not duplicate job in jobs BehaviorSubject if it already exists', () => {
    const jobId = '1';
    const existingJob: JobInterface = { ...defaultMockJob, id: jobId, title: 'Existing Job', company: 'Old Co' };

    service.fetchJobs();

    const jobsRequest = httpTestingController.expectOne(ApiRoutes.Jobs);
    jobsRequest.flush({
      data: [existingJob],
    })

    service.fetchJobById(jobId).subscribe((job) => {
      expect(job).toEqual(existingJob);
    });

    const req = httpTestingController.expectOne(`${ApiRoutes.Jobs}/${jobId}`);
    req.flush(existingJob);

    service.jobs$.subscribe(value => expect(value.length).toBe(1));
  });

  it('should set params in the params BehaviorSubject', () => {
    const params = { page: 2, limit: 10 };
    service.setParams(params);

    service.params$.subscribe(value =>  expect(value).toEqual(params));
  });

  it('should find a job by ID', () => {
    const jobId = '2';
    const mockResponse = [
        {
          ...defaultMockJob,
          id: '1',
          title: 'Software Developer',
          company: 'Tech Co',
        },
        {
          ...defaultMockJob,
          id: '2',
          title: 'Software Developer',
          company: 'Tech Co',
        },
    ];

    (service as any).jobs.next(mockResponse);

    const job = service.findById(jobId);

    expect(job).toEqual(mockResponse[1]);
  });

  it('should return undefined if job ID not found', () => {
    const job = service.findById('nonexistent-id');
    expect(job).toBeUndefined();
  });
});
