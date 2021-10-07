import { HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

abstract class HttpCache {
    abstract get(req : HttpRequest<any>) : HttpResponse<any>|null;
    abstract put(req : HttpRequest<any> , resp : HttpResponse<any>) : void;

}

@Injectable()
export class HttpCacheService implements HttpCache{
    
    cacheMap = new Map<any, any>(null);

    put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
        this.cacheMap.set(req.url , resp);
    }
    get(req: HttpRequest<any>): HttpResponse<any> | null {
        return this.cacheMap.get(req.url);
    }

    
}