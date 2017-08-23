import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'bottomup-list',
    templateUrl: 'bottomup-list.html'
})
export class BottomupListComponent implements OnChanges{
    @ViewChild('list') el;
    @Input('calcs') calcs;
    @Input('len') len;
    private oldChildElementCount:number;
    private marginTop:number;

    constructor() {
        this.marginTop = 0;
    }

    ngOnChanges(change:any){
        this.changeMarginTop();
    }

    changeMarginTop(){
        setTimeout(() => {
            var tmp = this.el.nativeElement.offsetHeight- ((this.el.nativeElement.childElementCount + 1) * 24);
            if(tmp < 0){
                tmp = 0;
            }
            this.marginTop = tmp;

            var start = this.el.nativeElement.scrollTop;
            var end = this.el.nativeElement.scrollHeight - this.el.nativeElement.clientHeight;
            var cnt = 0;
            var itr = 10;

            if(Math.abs(this.el.nativeElement.childElementCount - this.oldChildElementCount) >= 2){
                itr = 5;
            }
            var obs = Observable.interval(itr).subscribe((x) => {
                cnt = cnt + 1;
                this.el.nativeElement.scrollTop = start + cnt;
                if((start+cnt) >= end){
                    obs.unsubscribe();
                }
            });
            this.oldChildElementCount = this.el.nativeElement.childElementCount;
        }, 5);
    }
}
