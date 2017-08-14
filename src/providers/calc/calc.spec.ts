import { CalcProvider} from './calc';

describe('CalcProvider ', () => {
    const provider = new CalcProvider();
    it('addition', ()=>{
        expect(provider.addition(1,2)).toBe(3);
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
        expect(provider.push(2)).toBe(2);
        expect(provider.push(5)).toBe(25);
    });
    it('pull', ()=>{
        expect(provider.pull()).toBe(2);
        it('buf is 0', ()=>{
            expect(provider.pull()).toBe(0);
            expect(provider.pull()).toBe(0);
        });
    });
    it('clear', ()=>{
        provider.push(20);
        provider.push(24);
        expect(provider.clear()).toBe(0);
        expect(provider.clear()).toBe(0);
    });
});
