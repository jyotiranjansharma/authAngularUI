import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MyDataServiceService } from './my-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class MyResolverService implements Resolve<any> {
  constructor(private myDataService: MyDataServiceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.myDataService.getData();
  }
}
