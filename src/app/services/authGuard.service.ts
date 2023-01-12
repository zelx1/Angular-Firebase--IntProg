import { DataService } from 'src/app/services/data.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";


@Injectable()
export class AuthGuard {
  constructor(
    public servis: DataService
  ) {

  }
  

}
