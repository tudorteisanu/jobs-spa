import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchComponent } from './job-search.component';
import { By } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';
import { JobsService } from '@/features/jobs';

const mockJobsService = {
  fetchJobs: () => of(EMPTY),
  setParams: (params: Record<string, any>) => {}
}

describe('JobSearchComponent', () => {
  let component: JobSearchComponent;
  let fixture: ComponentFixture<JobSearchComponent>;
  let service: JobsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSearchComponent],
      providers: [ { provide: JobsService, useValue: mockJobsService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSearchComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(JobsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search method on click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    const input = fixture.debugElement.query(By.css('input'));
    const searchValue = 'search';

    expect(button).toBeTruthy();
    expect(input).toBeTruthy();

    spyOn(component, 'search');
    spyOn(service, 'setParams');
    spyOn(service, 'fetchJobs');

    input.nativeElement.value = searchValue;
    input.nativeElement.dispatchEvent(new Event('input'));
    button.nativeElement.click();
    expect(component.search).toHaveBeenCalled();
  });
});
