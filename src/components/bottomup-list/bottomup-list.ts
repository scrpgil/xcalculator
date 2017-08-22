import { Component, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'bottomup-list',
    templateUrl: 'bottomup-list.html'
})
export class BottomupListComponent implements OnChanges{
    @ViewChild('list') el;
    @Input('calcs') calcs;
    @Input('len') len;
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
            this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight - this.el.nativeElement.clientHeight;;
        }, 5);
    }
}
