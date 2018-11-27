import GapList from './gap-list';

describe('gap-list', () => {
    it('should populate the template', async () => {
        const globalAny: any = global;
        const resp = {
            ok: true,
            json: () => ({ foo: 1 }),
        };
        globalAny.fetch = jest.fn(async () => resp);
        document.body.innerHTML = `<gap-list id='test' data-src='example.json'>`;
        const el = document.getElementById('test');

        if (el === null) {
            fail();
            return;
        }

        await GapList.do(el as Element);
        expect(el.innerHTML).toBe('<div>1</div>');
    });
});
