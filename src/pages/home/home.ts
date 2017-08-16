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
    private calcHistories:any = [];
    private marginTop:number;
    private nowOperate:string;

    constructor(
        public navCtrl: NavController, 
        private calc:CalcProvider
    ) {
        this.nowCalc = this.calc.getNowCalc();
        this.calcHistories = this.calc.getCalcHistories();
    }
    ionViewDidEnter(){
    }
    operator(operate:string){
        if(this.nowCalc.Buffer != ""){
            this.calcHistories = this.calc.addCalcHistories(this.calc.createCalcHistory(this.nowOperate));
            this.nowCalc = this.calc.getNowCalc();
            this.scrollListMargin();
        }
        this.nowOperate = this.calc.changeNowCalcOperate(operate);
    }
    push(x){
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
    calcHistory(){
        return String(this.calc.calculateHistory());
    }


    // 画面描画関係
    scrollListMargin(){
        var history_col = <HTMLElement>document.getElementById('history-col');
        var tmp = history_col.offsetHeight- (this.calcHistories.length * 24);
        if(tmp < 0){
            tmp = 0;
        }
        this.marginTop = tmp;
        var history_list = <HTMLElement>document.getElementById('history-list');
        setTimeout(()=>{   
            history_list.scrollTop = history_list.scrollHeight - history_list.clientHeight;;
        }, 50);
    }
}
