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
        expect(provider.push(2).Buffer).toBe("2");
        expect(provider.push(5).Buffer).toBe("25");
    });
    it('pull', ()=>{
        provider.clear();
        provider.push(2);
        provider.push(5);
        expect(provider.pull().Buffer).toBe("2");
        it('buf is 0', ()=>{
            expect(provider.pull().Buffer).toBe("");
            expect(provider.pull().Buffer).toBe("");
        });
    });
    it('clear', ()=>{
        provider.clear();
        provider.push(2);
        provider.push(4);
        expect(provider.clear().Buffer).toBe("");
        expect(provider.clear().Buffer).toBe("");
    });
    it('percent', ()=>{
        provider.clear();
        provider.push(2);
        provider.push(4);
        expect(provider.percent().Buffer).toBe("0.24");
        provider.clear();
        expect(provider.percent().Buffer).toBe("");
    });
    it('Decimal point', ()=>{
        provider.clear();
        provider.push(4);
        expect(provider.decimal().Buffer).toBe("4.");
        expect(provider.push(4).Buffer).toBe("4.4");
        expect(provider.getNowCalc().Decimal).toBe(true);
        provider.clear();
        provider.push(9);
        provider.addOperator("÷");
        provider.push(2);
        expect(provider.sumCalcs()).toBe(4.5);
        expect(provider.getNowCalc().Decimal).toBe(true);
        provider.allClear();
    });
    it('createCalc', ()=>{
        expect(provider.createCalc("+").Operator).toBe("+");
    });
    it('addOperator', ()=>{
        provider.clearCalcs();
        provider.addOperator("+")
        expect(provider.getNowCalc().Operator).toBe("+");
    });
    it('addCalc', ()=>{
        provider.clearCalcs();
        provider.addOperator("+")
        expect(provider.getNowCalc().Operator).toBe("+");
    });
    it('celarCalc', ()=>{
        provider.clearCalcs();
        provider.addOperator("+");
        expect(provider.calcs.length).toBe(1); 
        provider.clearCalcs();
        expect(provider.calcs.length).toBe(0);
    });
    it('sum', ()=>{
        // 足し算
        provider.push(4);
        provider.addOperator("+");
        provider.push(4);
        expect(provider.sumCalcs()).toBe(8);
        provider.allClear();

        // 引き算
        provider.push(8);
        provider.addOperator("-");
        provider.push(4);
        expect(provider.sumCalcs()).toBe(4);
        provider.allClear();

        // 割り算
        provider.push(9);
        provider.addOperator("÷");
        provider.push(2);
        expect(provider.sumCalcs()).toBe(4.5);
        provider.allClear();

        // 掛け算
        provider.push(9);
        provider.addOperator("×");
        provider.push(2);
        expect(provider.sumCalcs()).toBe(18);
        provider.allClear();
    });
    it('equal', ()=>{
        provider.allClear();
        provider.push(4);
        provider.addOperator("+");
        provider.push(4);
        //expect(provider.sumCalcs()).toBe(8);
        provider.equal();
        var calcs = provider.getCalcs();
        console.log(calcs);
        expect(calcs[calcs.length - 1].Buffer).toBe("8");
    });
    it('convert buffer', ()=>{
        expect(provider.convertAtoI("1234")).toBe(1234);
    });
    it('all calcs clear', ()=>{
        provider.allClear();
        provider.push(9);
        provider.addOperator("+");
        provider.push(2);
        expect(provider.sumCalcs()).toBe(11);
        provider.allClear()
        expect(provider.getNowCalc().Operator).toBe("");
        expect(provider.getNowCalc().Buffer).toBe("");
    });
});
