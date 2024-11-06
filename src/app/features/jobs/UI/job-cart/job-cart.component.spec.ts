import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCartComponent } from './job-cart.component';

describe('JobCartComponent', () => {
  let component: JobCartComponent;
  let fixture: ComponentFixture<JobCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
