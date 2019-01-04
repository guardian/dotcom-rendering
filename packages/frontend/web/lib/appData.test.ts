import { get, testHelpers } from './appData';

describe('appData', () => {
    beforeEach(() => {
        testHelpers.set('foo', {
            x: {
                y: {
                    z: 'z',
                },
            },
            falsyValue: false,
        });
    });

    it('`get` should return a value using dot notation', () => {
        expect(get('foo.x.y.z')).toEqual('z');
    });

    it('`get` should return undefined for non existing indexes', () => {
        expect(get('foo.x.z.y')).toEqual(undefined);
        expect(get('foo.x.z.y', false)).toEqual(false);
    });

    it('`get` should return a value using bracket notation', () => {
        expect(get('foo[x].y[z]')).toEqual('z');
    });

    it('`get` should return undefined for non-existing key', () => {
        expect(get('foo.qwert')).toBeUndefined();
    });

    it('`get` should return default value for non-existing key with a default', () => {
        expect(get('foo.qwert', ['I am the default'])).toEqual([
            'I am the default',
        ]);
    });

    it('`get` should return falsy value for defined key with a default', () => {
        expect(get('foo.falsyValue', 'I am the default')).toEqual(false);
    });
});
