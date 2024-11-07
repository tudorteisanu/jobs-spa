import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JobsService } from '@/features/jobs';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSearchComponent {
  private jobsService = inject(JobsService);

  search(search: string): void {
    this.jobsService.setParams({search});
    this.jobsService.fetchJobs().subscribe();
  }
}
