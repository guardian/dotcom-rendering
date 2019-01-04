import {
    getString,
    getNumber,
    getNonEmptyString,
    getBoolean,
    getArray,
    getObject,
} from './validators';

describe('validators', () => {
    describe('getString', () => {
        it('returns string successfully if defined and type string', () => {
            const data = {
                config: {
                    prop: 'foo',
                },
            };

            expect(getString(data, 'config.prop')).toBe('foo');
        });

        it('returns fallback value if not type string', () => {
            const data = {
                config: {
                    prop: true,
                },
            };

            expect(getString(data, 'config.prop', 'foo')).toBe('foo');
        });

        it('returns fallback value if undefined', () => {
            const data = {
                config: {},
            };

            expect(getString(data, 'config.prop', 'foo')).toBe('foo');
        });

        it('throws error if undefined and no fallback', () => {
            const data = {
                config: {},
            };

            expect(() => {
                getString(data, 'config.prop');
            }).toThrow();
        });
    });

    describe('getNonEmptyString', () => {
        it('returns string successfully if defined and type string', () => {
            const data = {
                config: {
                    prop: 'foo',
                },
            };

            expect(getNonEmptyString(data, 'config.prop')).toBe('foo');
        });

        it('throws error if not a string', () => {
            const data = {
                config: {
                    prop: true,
                },
            };

            expect(() => {
                getNonEmptyString(data, 'config.prop');
            }).toThrow();
        });

        it('throws error if empty string', () => {
            const data = {
                config: {
                    prop: '',
                },
            };

            expect(() => {
                getNonEmptyString(data, 'config.prop');
            }).toThrow();
        });

        it('throws error if undefined', () => {
            const data = {
                config: {},
            };

            expect(() => {
                getNonEmptyString(data, 'config.prop');
            }).toThrow();
        });
    });

    describe('getNumber', () => {
        it('returns number successfully if defined', () => {
            const data = {
                config: {
                    prop: 101,
                },
            };

            expect(getNumber(data, 'config.prop')).toBe(101);
        });

        it('throws error if not a number', () => {
            const data = {
                config: {
                    prop: true,
                },
            };

            expect(() => {
                getNumber(data, 'config.prop');
            }).toThrow();
        });

        it('throws error if undefined', () => {
            const data = {
                config: {},
            };

            expect(() => {
                getNumber(data, 'config.prop');
            }).toThrow();
        });
    });

    describe('getBoolean', () => {
        it('returns boolean successfully if defined', () => {
            const data = {
                config: {
                    prop: true,
                },
            };

            expect(getBoolean(data, 'config.prop')).toBe(true);
        });

        it('returns fallback value if not type boolean', () => {
            const data = {
                config: {
                    prop: 'foo',
                },
            };

            expect(getBoolean(data, 'config.prop', true)).toBe(true);
        });

        it('returns fallback value if undefined', () => {
            const data = {
                config: {},
            };

            expect(getBoolean(data, 'config.prop', true)).toBe(true);
        });

        it('throws error if undefined and no fallback', () => {
            const data = {
                config: {},
            };

            expect(() => {
                getBoolean(data, 'config.prop');
            }).toThrow();
        });
    });

    describe('getArray', () => {
        it('returns array successfully if defined', () => {
            const data = {
                config: {
                    prop: ['foo', 'bar'],
                },
            };

            expect(getArray(data, 'config.prop').length).toBe(2);
        });

        it('returns fallback value if not type array', () => {
            const data = {
                config: {
                    prop: 'foo',
                },
            };

            expect(getArray(data, 'config.prop', ['foo', 'bar']).length).toBe(
                2,
            );
        });

        it('returns fallback value if undefined', () => {
            const data = {
                config: {},
            };

            expect(getArray(data, 'config.prop', ['foo', 'bar']).length).toBe(
                2,
            );
        });

        it('throws error if undefined and no fallback', () => {
            const data = {
                config: {},
            };

            expect(() => {
                getArray(data, 'config.prop');
            }).toThrow();
        });
    });

    describe('getObject', () => {
        it('returns object successfully if defined', () => {
            const data = {
                config: {
                    prop: {
                        foo: 'bar',
                    },
                },
            };

            expect(getObject(data, 'config.prop').foo).toBe('bar');
        });

        it('returns fallback value if not type object', () => {
            const data = {
                config: ['foo', 'bar'],
            };

            expect(
                getObject(data, 'config.prop', {
                    foo: 'bar',
                }).foo,
            ).toBe('bar');
        });

        it('returns fallback value if undefined', () => {
            const data = {
                config: {},
            };

            expect(
                getObject(data, 'config.prop', {
                    foo: 'bar',
                }).foo,
            ).toBe('bar');
        });

        it('throws error if undefined and no fallback', () => {
            const data = {
                config: {},
            };

            expect(() => {
                getObject(data, 'config.prop');
            }).toThrow();
        });
    });
});
