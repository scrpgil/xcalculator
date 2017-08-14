import { CalcProvider} from './calc';

describe('CalcProvider ', () => {
    const provider = new CalcProvider();
    it('add', ()=>{
        expect(provider.add(1,2)).toBe(3);
    });
});

