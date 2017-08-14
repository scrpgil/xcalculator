import { CalcProvider} from './calc';

describe('CalcProvider ', () => {
    const provider = new CalcProvider();
    it('addition', ()=>{
        expect(provider.addition(1,2)).toBe(3);
        expect(provider.addition(0.000000001,0.999999999)).toBe(1);
    });
    it('subtraction', ()=>{
        expect(provider.subtraction(5,2)).toBe(3);
    });
    it('multiplication', ()=>{
        expect(provider.multiplication(10, 2)).toBe(20);
        expect(provider.multiplication(10, 0.2)).toBe(2);
    });
    it('division', ()=>{
        expect(provider.division(10, 2)).toBe(5);
        expect(provider.division(12, 5)).toBe(2.4);
    });
    it('push', ()=>{
        provider.clear();
        expect(provider.push(2)).toBe("2");
        expect(provider.push(5)).toBe("25");
    });
    it('pull', ()=>{
        provider.clear();
        provider.push(2);
        provider.push(5);
        expect(provider.pull()).toBe("2");
        it('buf is 0', ()=>{
            expect(provider.pull()).toBe("");
            expect(provider.pull()).toBe("");
        });
    });
    it('clear', ()=>{
        provider.clear();
        provider.push(2);
        provider.push(4);
        expect(provider.clear()).toBe("");
        expect(provider.clear()).toBe("");
    });
    it('percent', ()=>{
        provider.clear();
        provider.push(2);
        provider.push(4);
        expect(provider.percent()).toBe("0.24");
        provider.clear();
        expect(provider.percent()).toBe("");
    });
    it('get Decimal point', ()=>{
        provider.clear();
        expect(provider.getDecimalPlace(1234.56789)).toBe(5);
    });
    it('Decimal point', ()=>{
        provider.clear();
        provider.push(4);
        expect(provider.decimal()).toBe("4.");
        expect(provider.push(4)).toBe("4.4");
        expect(provider.decimalFlag).toBe(true);
    });
});
