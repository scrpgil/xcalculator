import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'commaSeparatorPipe',
})
export class CommaSeparatorPipe implements PipeTransform {
    transform(value: string, ...args) {
        if(value == ""){
            return;
        }
        var tmp = String(Math.abs(Number(value)));
        var minus = false;
        if(Number(value) < 0){
            minus = true;
        }
        var ret ="";
        var res = tmp.split(".");
        for(var i = 1;i <= res[0].length;i++){
            if((i % 3) == 0){
                if(res[0][res[0].length - (i + 1)]){
                    ret = "," + res[0][res[0].length - i] + ret; 
                }else{
                    ret = res[0][res[0].length - i] + ret; 
                }
            }else{
                ret = res[0][res[0].length - i] + ret; 
            }
        }
        if(res.length >= 2){
            ret = ret + "." + res[1]; 
        }
        if(minus){
            ret = "-" + ret;
        }
        return ret;
    }
}
