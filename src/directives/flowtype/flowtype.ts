import { OnChanges, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[flowtype]' // Attribute selector
})
export class FlowtypeDirective implements OnChanges {
    @Input('flowtype') flowtype: any;
    @Input() size: number;
    constructor(private el: ElementRef) {
    }

    ngOnInit(){
        var fontSize = this.size;
        this.el.nativeElement.style.fontSize = fontSize + "vw";
        this.changeFontSize();
    }
    ngOnChanges(changes:any) {
        console.log("change");
        this.changeFontSize();
    }
    changeFontSize(){
        console.log("change:" + this.size + ", text:" + this.flowtype);
        var fontSize = this.size;
        var len = this.flowtype.length - 1;
        var newSize = (100 / len) * 1.7;
            if(this.size > newSize){
            fontSize = newSize;
        }
        this.el.nativeElement.style.fontSize = fontSize + "vw";
        this.el.nativeElement.innerHTML = this.flowtype;
    }
}
