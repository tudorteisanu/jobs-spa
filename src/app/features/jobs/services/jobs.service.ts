import {EventEmitter, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, delay, finalize, map, Observable} from "rxjs";
import {JobInterface} from "@/features/jobs";
import { ApiRoutes } from "@/shared/enum";
import {PaginatedResponse} from "@/shared/types";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly httpClient = inject(HttpClient);

  private jobs = new BehaviorSubject<JobInterface[]>([]);
  private params = new BehaviorSubject<Record<string, any>>({});
  private loading = new BehaviorSubject<boolean>(false);

  public jobs$ = this.jobs.asObservable();
  public params$ = this.params.asObservable();
  public loading$ =this.loading.asObservable();

  public fetchJobsEvent = new EventEmitter<void>();

  constructor() {
    this.fetchJobsEvent.subscribe({next: () => {
      this.fetchJobs();
    }});
  }

  fetchJobs(): void {
    const params = {...this.params.getValue()};

    this.loading.next(true);
    this.httpClient.get<PaginatedResponse<JobInterface>>(ApiRoutes.Jobs, {params})
      .pipe(
        delay(3000),
        map((jobs) => {
          const {data, meta} = jobs;
          this.jobs.next(data);
          this.params.next({...this.params.getValue(), ...meta});
        }),
        finalize(() =>  this.loading.next(false)),
      ).subscribe();
  }

  fetchJobById(id: string): Observable<JobInterface> {
    const jobUrl = `${ApiRoutes.Jobs}/${id}`;

    return this.httpClient.get<JobInterface>(jobUrl)
      .pipe(
        map(job => {
          const jobs = this.jobs.value;

          if (!jobs.some(job => job.id === id)) {
            this.jobs.next([...jobs, job]);
          }

          return job;
        })
      )
  }

  findById(id: string): JobInterface | undefined{
    return this.jobs.value.find((job: JobInterface) => job.id === id);
  }

  setParams(params: Record<string, any>): void {
    this.params.next(params);
  }
}
