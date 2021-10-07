import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpCacheService } from "../services/cache.service";

@Injectable()
export class CacheInterceptor implements HttpInterceptor{

    constructor(private cacheService : HttpCacheService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method !== 'GET') {
            return next.handle(req);
          }

          if (!req.headers.get('cache-response')) {
            if (this.cacheService.cacheMap.get(req.url)) {
              this.cacheService.cacheMap.delete(req.url);
            }
      
            return next.handle(req);
          }
          

       const cachedResponse =  this.cacheService.get(req) || null;
       if(cachedResponse){
           return (cachedResponse instanceof Observable) ? cachedResponse : of(cachedResponse.clone());
       }

        return next.handle(req).pipe(tap((event : any)=> {
            if(event instanceof HttpResponse){
                this.cacheService.put(req , event);
            }
        }))
    }
    
}