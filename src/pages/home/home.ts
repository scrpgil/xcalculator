import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalcProvider } from '../../providers/calc/calc';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [CalcProvider]
})
export class HomePage {
    private buf:number;
    private arr:any = [];
    private marginTop:number;

    constructor(
        public navCtrl: NavController, 
        private calc:CalcProvider
    ) {
        this.buf = 0;
    }
    ionViewDidEnter(){
    }
    addtion(){
        this.arr.push(1);
        this.scrollListMargin();
    }
    push(x){
        this.buf = this.calc.push(x);
    }
    pull(){
        this.buf = this.calc.pull();
    }
    clear(){
        this.buf = this.calc.clear();
    }
    scrollListMargin(){
        var history_col = <HTMLElement>document.getElementById('history-col');
        var tmp = history_col.offsetHeight- (this.arr.length * 24);
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
