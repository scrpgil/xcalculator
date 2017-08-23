import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalcProvider } from '../../providers/calc/calc';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [CalcProvider]
})
export class HomePage {
    private nowCalc:any;
    private calcs:any = [];
    private nowOperate:string;

    constructor(
        public navCtrl: NavController, 
        private calc:CalcProvider
    ) {
        this.init();
    }

    init(){
        this.nowCalc = this.calc.getNowCalc();
        this.calcs = this.calc.getCalcs();
        this.nowOperate = "";
    }
    operator(operate:string){
        if(this.nowCalc.Buffer != ""){
            this.calcs = this.calc.addOperator(this.nowOperate);
            this.nowCalc = this.calc.getNowCalc();
        }else{
            if(this.nowOperate == "="){
                this.nowOperate = this.calc.changeNowCalcOperate("");
                this.nowCalc = this.calc.push(this.sumCalcs());
                this.calcs = this.calc.addOperator("");
                this.nowCalc = this.calc.getNowCalc();
            }
        }
        if(operate == "="){
            if(this.nowOperate != "="){
                this.calc.equal();
            }
        }
        this.nowOperate = this.calc.changeNowCalcOperate(operate);
    }
    push(x){
        if(this.nowOperate == "="){
            this.nowOperate = this.calc.changeNowCalcOperate("");
            this.calcs = this.calc.addOperator();
        }
        this.nowCalc = this.calc.push(x);
    }
    pull(){
        this.nowCalc = this.calc.pull();
    }
    clear(){
        this.nowCalc = this.calc.clear();
    }
    percent(){
        this.nowCalc = this.calc.percent();
    }
    decimal(){
        this.nowCalc = this.calc.decimal();
    }
    sumCalcs(){
        return String(this.calc.sumCalcs());
    }
    allClear(){
        this.calc.allClear();
        this.init();
    }
}
