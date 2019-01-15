import { interlace } from './interlace';

test('interlace', () => {
    const things = ['a', 'b', 'c', 'd'];
    const positions = [1, 3];
    const insert = (x: number) => `insert${x}`;
    const expected = ['a', 'insert0', 'b', 'c', 'insert1', 'd'];
    const actual = interlace(things, positions, insert);
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
});
