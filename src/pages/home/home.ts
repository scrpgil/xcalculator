import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalcProvider } from '../../providers/calc/calc';
import { MainDisplayPipe } from '../../pipes/main-display/main-display';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [CalcProvider,MainDisplayPipe]
})
export class HomePage {
    private buf:string;
    private arr:any = [];
    private marginTop:number;
    private fontSize:number;

    constructor(
        public navCtrl: NavController, 
        public mainDisplayPipe: MainDisplayPipe, 
        private calc:CalcProvider
    ) {
        this.buf = "";
        this.fontSize = 15;
    }
    ionViewDidEnter(){
    }
    addtion(){
        this.arr.push(1);
        this.scrollListMargin();
    }
    push(x){
        this.buf = this.calc.push(x);
        this.changeMainDisplayFontSize();
    }
    pull(){
        this.buf = this.calc.pull();
        this.changeMainDisplayFontSize();
    }
    clear(){
        this.buf = this.calc.clear();
        this.fontSize = 15;
    }
    percent(){
        this.buf = this.calc.percent();
        this.changeMainDisplayFontSize();
    }
    decimal(){
        this.buf = this.calc.decimal();
        this.changeMainDisplayFontSize();
    }

    // 画面描画関係
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
    changeMainDisplayFontSize(){
        var tmp = this.mainDisplayPipe.transform(this.buf);
        var len = tmp.length - 1;
        if(15 > (100 / len) * 1.7){
            var ret = (100 / len) * 1.7;
            this.fontSize = ret;
        }
    }
}
