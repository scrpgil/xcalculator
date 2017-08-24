import { OnChanges, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[flowtype]' // Attribute selector
})
export class FlowtypeDirective implements OnChanges {
    @Input('flowtype') flowType: number;
    @Input() text: any;
    constructor(private el: ElementRef) {
    }

    ngOnInit(){
        var fontSize = this.flowType;
        this.el.nativeElement.style.fontSize = fontSize + "vw";
        this.changeFontSize();
    }
    ngOnChanges(changes:any) {
        this.changeFontSize();
    }
    changeFontSize(){
        console.log("change:" + this.flowType );
        var fontSize = this.flowType;
        var len = this.text.length - 1;
        if(this.flowType > (100 / len) * 1.7){
            var ret = (100 / len) * 1.7;
            fontSize = ret;
        }
        this.el.nativeElement.style.fontSize = fontSize + "vw";
        this.el.nativeElement.innerHTML = this.text;
    }
}
