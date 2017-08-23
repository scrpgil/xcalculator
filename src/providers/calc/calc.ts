import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export interface ICalc{
    Buffer: string;
    Operator: string;
    Decimal: boolean;
}

export interface IOldCalcs{
    Calcs: ICalc[][];
}

@Injectable()
export class CalcProvider {
    public buf:string;
    public nowCalc:ICalc;
    public calcs:ICalc[] = [];
    public oldCalcs:IOldCalcs;

    constructor() {
        this.init();
    }

    init(){
        this.buf = "";
        this.nowCalc = this.createCalc();
        this.calcs = [];
        var oldCalcs:IOldCalcs;
        this.oldCalcs = oldCalcs;
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
        if(y == 0){
            return Infinity;
        }
        return Math.round((x / y) * 100000) / 100000;
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
        this.nowCalc.Decimal = false;
        return this.nowCalc;
    }
    percent(){
        if(this.nowCalc.Buffer != ""){
            this.nowCalc.Buffer = String(Number(this.nowCalc.Buffer) / 100);
            if(this.nowCalc.Buffer.indexOf('.') != -1){
                this.nowCalc.Decimal = true;
            }
        }
        return this.nowCalc;
    }
    decimal(){
        if(!this.nowCalc.Decimal){
            this.nowCalc.Decimal = true;
            this.nowCalc.Buffer = this.nowCalc.Buffer + ".";
        }
        return this.nowCalc;
    }
    equal(){
        var calc = this.createCalc("=");
        calc.Buffer = String(this.sumCalcs()); 
        this.calcs.push(calc);
    }
    allClear(){
        this.init();
    }
    getNowCalc(){
        return this.nowCalc;
    }
    changeNowCalcOperate(operate:string){
        this.nowCalc.Operator = operate;
        return this.nowCalc.Operator;
    }

    // ここからcalc関連
    getCalcs(){
        return this.calcs;
    }
    addOperator(operate:string = ""){
        var calc = this.createCalc(operate);
        return this.addCalcs(calc);
    }
    addCalcs(calc:ICalc){
        this.calcs.push(this.nowCalc);
        this.nowCalc = calc;
        return this.calcs;
    }
    createCalc(operate:string = ""){
        var calc: ICalc= {
            Buffer:"",
            Operator:operate,
            Decimal:false
        };
        return calc;
    }
    clearCalcs(){
        this.calcs = [];
        return this.calcs;
    }
    sumCalcs():number{
        var sum = 0;
        for(var i=0; i < this.calcs.length; i++){
            sum = this.sumCalc(sum, this.calcs[i]);
        }
        sum = this.sumCalc(sum, this.nowCalc);
        return sum;
    }
    private sumCalc(sum:number, calc:ICalc):number{
        if(calc.Buffer == ""){
            // なにもしない
        } else if(calc.Operator == ""){
            sum = this.convertAtoI(calc.Buffer);
        } else if(calc.Operator == "+"){
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
    // ここからoldCalc関連
    addOldCalcs(){
        this.oldCalcs.Calcs.push(this.calcs);
        return;
    }
    getOldCalcs(){
        return this.oldCalcs;
    }
}
