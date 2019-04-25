import {
    getString,
    getNumber,
    getNonEmptyString,
    getBoolean,
    getArray,
    getObject,
    getIdFromUrl,
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

    describe('getIdFromUrl', () => {
        it('Returns matching ID for YouTube formats', () => {
            const youtubeRegEx = '^[a-zA-Z0-9_-]{11}$';

            const formats = [
                {
                    url: 'http://www.youtube.com/ytscreeningroom?v=NRHEIGHTx8I',
                    id: 'NRHEIGHTx8I',
                },
                {
                    url: 'http://www.youtube.com/ytscreeningroom?v=NRH_IGHTx8I',
                    id: 'NRH_IGHTx8I',
                },
                {
                    url: 'http://www.youtube.com/ytscreeningroom?v=NRH-IGHTx8I',
                    id: 'NRH-IGHTx8I',
                },
            ];

            formats.map(_ => {
                expect(getIdFromUrl(_.url, youtubeRegEx, false, 'v')).toBe(
                    _.id,
                );
            });
        });

        it('Returns matching ID for Vimeo formats', () => {
            const vimeoRegEx = '(\\d+)($|\\/)';

            const formats = [
                {
                    url: 'https://vimeo.com/channels/staffpicks/332085955',
                    id: '332085955',
                },
                {
                    url:
                        'https://vimeo.com/channels/another/staffpicks/332085955',
                    id: '332085955',
                },
                {
                    url: 'https://vimeo.com/channels/staffpicks/123456',
                    id: '123456',
                },
            ];

            formats.map(_ => {
                expect(getIdFromUrl(_.url, vimeoRegEx, true)).toBe(_.id);
            });
        });

        it('Throws an error if it cannot find an ID', () => {
            expect(() => {
                getIdFromUrl('https://theguardian.com', '', false, 'v');
            }).toThrow();

            expect(() => {
                getIdFromUrl('https://theguardian.com?p=test', '', false, 'v');
            }).toThrow();

            expect(() => {
                getIdFromUrl('https://theguardian.com/test', '', false, 'p');
            }).toThrow();
        });

        it('Throws an error if it ID is in incorrect format', () => {
            expect(() => {
                expect(
                    getIdFromUrl(
                        'https://theguardian.com/test',
                        'nottest',
                        true,
                    ),
                ).toBe('test');
            }).toThrow();

            expect(() => {
                expect(
                    getIdFromUrl(
                        'https://theguardian.com?p=test',
                        'nottest',
                        false,
                        'p',
                    ),
                ).toBe('test');
            }).toThrow();
        });
    });
});
