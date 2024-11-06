import {APP_INITIALIZER} from "@angular/core";
import {AuthService} from "@/features/auth";
import {EMPTY, Observable, of} from "rxjs";

function initializeApp(authService: AuthService): () => Observable<any> {
  return () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      authService.accessToken.next(token);
      return authService.getCurrentUser();
    }

    return of(EMPTY);
  }
}


export const provideAppInitializer = () => ({
  provide: APP_INITIALIZER,
  useFactory: initializeApp,
  multi: true,
  deps: [AuthService],
})
