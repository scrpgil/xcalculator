import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export interface ICalcHistory {
    Buffer: string;
    Operator: string;
}

@Injectable()
export class CalcProvider {
    public buf:string;
    public nowCalc:ICalcHistory;
    public calcHistories:ICalcHistory[] = [];
    public decimalFlag:boolean = false;

    constructor() {
        this.buf = "";
        this.nowCalc = this.createCalcHistory();
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
        if(this.nowCalc.Buffer.length <= 16){
            this.nowCalc.Buffer = this.nowCalc.Buffer + x;
        }
        return this.nowCalc;
    }
    pull(){
        this.nowCalc.Buffer = this.nowCalc.Buffer.slice(0, -1);
        return this.nowCalc;
    }
    clear(){
        this.nowCalc.Buffer = "";
        this.decimalFlag = false;
        return this.nowCalc;
    }
    percent(){
        if(this.nowCalc.Buffer != ""){
            this.nowCalc.Buffer = String(Number(this.nowCalc.Buffer) / 100);
            this.decimalFlag = true;
        }
        return this.nowCalc;
    }
    decimal(){
        if(!this.decimalFlag){
            this.decimalFlag = true;
            this.nowCalc.Buffer = this.nowCalc.Buffer + ".";
        }
        return this.nowCalc;
    }
    getNowCalc(){
        return this.nowCalc;
    }
    changeNowCalcOperate(operate:string){
        this.nowCalc.Operator = operate;
        return this.nowCalc.Operator;
    }

    // ここからcalcHistoru関連
    createCalcHistory(operate:string = ""){
        var calcHistory: ICalcHistory = {
            Buffer:"",
            Operator:operate
        };
        return calcHistory;
    }
    getCalcHistories(){
        return this.calcHistories;
    }
    addCalcHistories(calcHistory:ICalcHistory){
        this.calcHistories.push(this.nowCalc);
        this.nowCalc = calcHistory;
        return this.calcHistories;
    }
    clearCalcHistories(){
        this.calcHistories = [];
        return this.calcHistories;
    }
    calculateHistory():number{
        var sum = 0;
        for(var i=0; i < this.calcHistories.length; i++){
            if(i == 0){
                sum = this.convertAtoI(this.calcHistories[i].Buffer);
                continue;
            }
            sum = this.calculateCalc(sum, this.calcHistories[i]);
        }
        sum = this.calculateCalc(sum, this.nowCalc);
        return sum;
    }
    calculateCalc(sum:number, calc:ICalcHistory):number{
        if(calc.Operator == "" || calc.Operator == "+"){
            sum = this.addition(sum, this.convertAtoI(calc.Buffer));
        } else if(calc.Operator == "-"){
            sum = this.subtraction(sum, this.convertAtoI(calc.Buffer));
        } else if(calc.Operator == "×"){
            sum = this.multiplication(sum, this.convertAtoI(calc.Buffer));
        } else if(calc.Operator == "÷"){
            sum = this.division(sum, this.convertAtoI(calc.Buffer));
        }
        return sum;
    }
    convertAtoI(num:string):number{
        return Number(num);
    }
}
