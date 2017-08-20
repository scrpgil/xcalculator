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
    private marginTop:number;
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
            this.scrollListMargin();
        }else{
            if(this.nowOperate == "="){
                this.push(this.sumCalcs());
                this.calcs = this.calc.addOperator("");
                this.nowCalc = this.calc.getNowCalc();
                this.scrollListMargin();
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


    // 画面描画関係
    scrollListMargin(){
        setTimeout(()=>{   
            var history_col = <HTMLElement>document.getElementById('history-col');
            var history_list = <HTMLElement>document.getElementById('history-list');
            var tmp = history_col.offsetHeight- ((history_list.childElementCount + 1) * 24);
            if(tmp < 0){
                tmp = 0;
            }
            this.marginTop = tmp;
            history_list.scrollTop = history_list.scrollHeight - history_list.clientHeight;;
        }, 50);
    }
}
