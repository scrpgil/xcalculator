import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CalcProvider {
    private buf:number;
    constructor() {
        this.buf = 0;
    }

    addition(x, y){
        return x + y;
    }
    subtraction(x, y){
        return x - y;
    }
    multiplication(x, y){
        return x * y;
    }
    division(x, y){
        return x / y;
    }
    push(x){
        this.buf = (this.buf * 10) + x;
        return this.buf;
    }
    pull(){
        this.buf = Math.floor(this.buf / 10);
        return this.buf;
    }
    clear(){
        this.buf = 0;
        return this.buf;
    }
}
