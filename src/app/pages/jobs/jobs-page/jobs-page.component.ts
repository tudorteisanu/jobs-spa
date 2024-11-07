import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JobSearchComponent, JobListComponent } from '@/features/jobs';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [JobListComponent, JobSearchComponent],
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsPageComponent {

}
