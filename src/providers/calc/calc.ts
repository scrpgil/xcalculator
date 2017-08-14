import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the CalcProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CalcProvider {

  constructor() {
    console.log('Hello CalcProvider Provider');
  }

  add(x, y){
      return x + y;
  }
}
