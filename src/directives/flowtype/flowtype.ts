import { OnChanges, Directive, ElementRef, Input } from '@angular/core';

/**
 * Generated class for the FlowtypeDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
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
    }
    ngOnChanges(changes:any) {
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
