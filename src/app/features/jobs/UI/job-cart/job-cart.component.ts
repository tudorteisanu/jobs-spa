import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobInterface } from '@/features/jobs';

@Component({
  selector: 'app-job-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './job-cart.component.html',
  styleUrl: './job-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobCartComponent {
  job = input.required<JobInterface>();
}
