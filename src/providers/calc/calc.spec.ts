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
        expect(provider.decimalFlag).toBe(true);
    });
    it('createCalcHistory', ()=>{
        expect(provider.createCalcHistory("+").Operator).toBe("+");
    });
    it('addCalcHistory', ()=>{
        provider.clearCalcHistories();
        provider.addCalcHistories(provider.createCalcHistory("+"))
        expect(provider.getNowCalc().Operator).toBe("+");
    });
    it('celarCalcHistory', ()=>{
        provider.clearCalcHistories();
        var tmp = provider.createCalcHistory("+");
        provider.addCalcHistories(tmp);
        expect(provider.calcHistories.length).toBe(1); 
        provider.clearCalcHistories();
        expect(provider.calcHistories.length).toBe(0);
    });
    it('calculateHistory', ()=>{
        // 足し算
        provider.clear();
        provider.push(4);
        provider.addCalcHistories(provider.createCalcHistory("+"));
        provider.clear();
        provider.push(4);
        expect(provider.calculateHistory()).toBe(8);
        provider.clearCalcHistories();

        // 引き算
        provider.clear();
        provider.push(8);
        provider.addCalcHistories(provider.createCalcHistory("-"));
        provider.clear();
        provider.push(4);
        expect(provider.calculateHistory()).toBe(4);
        provider.clearCalcHistories();

        // 割り算
        provider.clear();
        provider.push(9);
        provider.addCalcHistories(provider.createCalcHistory("÷"));
        provider.clear();
        provider.push(2);
        expect(provider.calculateHistory()).toBe(4.5);
        provider.clearCalcHistories();

        // 掛け算
        provider.clear();
        provider.push(9);
        provider.addCalcHistories(provider.createCalcHistory("×"));
        provider.clear();
        provider.push(2);
        expect(provider.calculateHistory()).toBe(18);
        provider.clearCalcHistories();
    });
    it('convert buffer', ()=>{
        expect(provider.convertAtoI("1234")).toBe(1234);
    });
});
