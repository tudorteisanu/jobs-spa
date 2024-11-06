import { environment } from '@/environments/environment';
import {HttpInterceptorFn} from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http')) {
    return next(req);
  }

  return next(req.clone({
    url: `${environment.baseApiUrl}${req.url}`,
  }));
};
