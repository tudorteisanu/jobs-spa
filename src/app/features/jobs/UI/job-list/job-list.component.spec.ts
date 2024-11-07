import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from "@angular/platform-browser";

import { JobListComponent } from './job-list.component';
import { JobInterface } from '../../types';
import { JobCardComponent } from '../job-card/job-card.component';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { JobsService } from '../../services';

const mockJob: JobInterface = {
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

const mockJobList = [
  { ...mockJob, id: '1'},
  { ...mockJob, id: '2'},
  { ...mockJob, id: '3'},
]

const jobsServiceMock = {
  jobs$ : of(mockJobList)
}

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListComponent],
      providers: [provideRouter([]), { provide: JobsService, useValue: jobsServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items', () => {
    fixture.detectChanges();
    expect(component.jobs().length).toEqual(3)

    const jobCards = fixture.debugElement.queryAll(By.directive(JobCardComponent));

    expect(jobCards.length).toEqual(mockJobList.length);
  });
});
