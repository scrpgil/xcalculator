import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CalcProvider {
    public buf:string;
    public decimalFlag:boolean = false;
    constructor() {
        this.buf = "";
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
        if(this.buf.length <= 28){
            this.buf = this.buf + x;
        }
        return this.buf;
    }
    pull(){
        //this.buf = Math.floor(this.buf / 10);
        this.buf = this.buf.slice(0, -1);
        return this.buf;
    }
    clear(){
        this.buf = "";
        this.decimalFlag = false;
        return this.buf;
    }
    percent(){
        if(this.buf != ""){
            this.buf = String(Number(this.buf) / 100);
            this.decimalFlag = true;
        }
        return this.buf;
    }
    decimal(){
        if(!this.decimalFlag){
            this.decimalFlag = true;
            this.buf = this.buf + ".";
        }
        return this.buf;
    }


    getDecimalPlace(x) {
        if (typeof x !== 'number') {
            return null;
        }

        var decimalPlace = 0;
        var numbers = x.toString().split('.');
        if (numbers[1]) {
            decimalPlace = numbers[1].length;
        }

        return decimalPlace;
    };
}
