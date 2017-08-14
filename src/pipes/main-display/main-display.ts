import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MainDisplayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'mainDisplay',
})
export class MainDisplayPipe implements PipeTransform {
    transform(value: string, ...args) {
        var ret ="";
        var res = value.split(".");
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
        return ret;
    }
}
