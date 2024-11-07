import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { JobCardComponent } from "../job-card/job-card.component";
import { JobInterface } from '../../types';
import { JobsService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobCardComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListComponent {
  jobsService = inject(JobsService);
  jobs = toSignal(this.jobsService.jobs$, { initialValue: []});
}
