import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardComponent } from './job-card.component';
import { RouterLink, provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { JobInterface } from '../../types';

const mockJob: JobInterface = {
  id: '2',
  title: 'Frontend Developer',
  company: 'Design Co',
  description: 'description',
  location: '',
  industry: '',
  jobType: 'full-time',
  salaryRange: [1, 12],
  postDate: new Date(),
  expiryDate: new Date(),
  source: '',
  externalUrl: '',
  keywords: ['1', '2', '3']
};

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;
  let componentRef: ComponentRef<JobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCardComponent, RouterLink],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef
    componentRef.setInput('job', mockJob)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render title', () => {
    const element: HTMLElement = fixture.nativeElement;
    const a = element.querySelector('a')!;
    expect(a.textContent?.trim()).toEqual(mockJob.title);
  });

  it('should render description', () => {
    const element: HTMLElement = fixture.nativeElement;
    const p = element.querySelector('p')!;
    expect(p).toBeDefined();
    expect(p?.textContent?.trim()).toEqual(mockJob.description);
  });

  it('should render keyworkds', () => {
    const element: HTMLElement = fixture.nativeElement;
    const p = element.querySelectorAll('.chip')!;

    expect(p).toBeDefined();
    expect(p.length).toEqual(mockJob.keywords.length);

    p.forEach((item, index) => {
      expect(mockJob.keywords[index]).toEqual(item.textContent!);
    })
  });
});
