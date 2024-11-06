import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap, switchMap, catchError, Observable, throwError } from 'rxjs';
import { ApiRoutes, PageRoutes } from '@/shared/enum';
import { CurrentUser, LoginInputInterface, TokensResponseInterface, RegisterInputInterface } from '@/features/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private  readonly router = inject(Router);

  currentUser = new BehaviorSubject<CurrentUser|null>(null);
  isLoggedIn = this.currentUser.asObservable().pipe(map(e => !!e));
  accessToken = new BehaviorSubject<string | null>(null);

  protected readonly http = inject(HttpClient);

  login(payload: LoginInputInterface): void {
    this.http.post<TokensResponseInterface>(ApiRoutes.Login, payload)
      .pipe(
        tap(({accessToken}) => {
          localStorage.setItem('accessToken', accessToken);
          this.accessToken.next(accessToken);
        }),
        switchMap(() => {
          return  this.getCurrentUser();
        }),
        tap(() => {
          this.router.navigateByUrl(PageRoutes.Jobs);
        }),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      )
      .subscribe()
  }

  register(payload: RegisterInputInterface): void {
    this.http.post<TokensResponseInterface>(ApiRoutes.Register, payload)
      .pipe(
        tap(({accessToken}) => {
          localStorage.setItem('accessToken', accessToken);
          this.accessToken.next(accessToken);
        }),
        switchMap(() => {
          return  this.getCurrentUser();
        }),
        tap(() => {
          this.router.navigateByUrl(PageRoutes.Jobs);
        }),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      )
      .subscribe();
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.currentUser.next(null);
    this.accessToken.next(null);
    this.router.navigateByUrl(PageRoutes.Login);
  }

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(ApiRoutes.CurrentUser)
      .pipe(
        tap((user) =>  this.currentUser.next(user)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }


  handleError(err: HttpErrorResponse) {
    // todo Add error handler
    return throwError(() => err);
  }
}
