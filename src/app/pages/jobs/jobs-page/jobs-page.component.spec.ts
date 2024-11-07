import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPageComponent } from './jobs-page.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { JobListComponent } from '@/features/jobs/UI/job-list/job-list.component';

describe('JobsPageComponent', () => {
  let component: JobsPageComponent;
  let fixture: ComponentFixture<JobsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsPageComponent, JobListComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toBe('Jobs list');
  });

  it('should render jobs list', () => {
    const jobListPage = fixture.debugElement.query(By.directive(JobListComponent));
    expect(jobListPage).toBeTruthy();
  });
});
