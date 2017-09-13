import { OnChanges, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[flowtype]' // Attribute selector
})
export class FlowtypeDirective implements OnChanges {
    @Input('flowtype') flowType: any;
    @Input('size') size: number;
    constructor(private el: ElementRef) {
    }

    ngOnInit(){
        var fontSize = this.size;
        this.el.nativeElement.style.fontSize = fontSize + "vw";
        this.changeFontSize();
    }
    ngOnChanges(changes:any) {
        this.changeFontSize();
    }
    changeFontSize(){
        console.log("change:" + this.size );
        var fontSize = this.size;
        var len = this.fontType.length - 1;
        if(this.size > (100 / len) * 1.7){
            var ret = (100 / len) * 1.7;
            fontSize = ret;
        }
        this.el.nativeElement.style.fontSize = fontSize + "vw";
        this.el.nativeElement.innerHTML = this.flowType;
    }
}
