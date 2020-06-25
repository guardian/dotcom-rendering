// ----- Imports ----- //

import { Result, Ok, Err } from './result';
import { identity } from 'lib';
import { withDefault } from 'types/option';


// ----- Setup ----- //

const ok: Result<string, number> = new Ok(4);
const err: Result<string, number> = new Err('message');

const onOk = (a: number): number => a + 2;
const onError = (e: string): string => `Output: ${e}`;


// ----- Tests ----- //

describe('either', () => {
    it('runs the correct function when Result is Ok', () => {
        expect(ok.either<number | string>(onError, onOk)).toBe(6);
    });

    it('runs the correct function when Result is Err', () => {
        expect(err.either<number | string>(onError, onOk)).toBe('Output: message');
    });
});

describe('fmap', () => {
    it('runs the function when Result is Ok', () => {
        expect(ok.fmap(onOk).either<number | string>(identity, identity)).toBe(6);
    });

    it('passes the error through when Result is Err', () => {
        expect(err.fmap(a => `Output: ${a}`).either<number | string>(identity, identity))
            .toBe('message');
    });
});

describe('andThen', () => {
    it('runs the function and unwraps the result when both Results are Ok', () => {
        const f = (a: number): Result<string, number> => new Ok(a + 2);

        expect(ok.andThen(f).either<string | number>(identity, identity)).toBe(6);
    });

    it('passes through the Err when the first Result is Err', () => {
        const f = (a: number): Result<string, number> => new Ok(a + 2);

        expect(err.andThen(f).either<string | number>(identity, identity)).toBe('message');
    });

    it('passes through the Err when the second Result is Err', () => {
        const f = (_: number): Result<string, number> => new Err('message');

        expect(ok.andThen(f).either<string | number>(identity, identity)).toBe('message');
    });

    it('passes through the first Err when the first Result is Err', () => {
        const f = (_: number): Result<string, number> => new Err('secondMessage');

        expect(err.andThen(f).either<string | number>(identity, identity)).toBe('message');
    });
});

describe('mapError', () => {
    it('passes through the result when Result is Ok', () => {
        expect(ok.mapError(onError).either<string | number>(identity, identity))
            .toBe(4);
    });

    it('runs the function when Result is Err', () => {
        expect(err.mapError(onError).either<string | number>(identity, identity))
            .toBe('Output: message');
    });
});

describe('toOption', () => {
    it('produces Some when Result is Ok', () => {
        expect(withDefault(6)(ok.toOption())).toBe(4);
    });

    it('produces None when Result is Err', () => {
        expect(withDefault(6)(err.toOption())).toBe(6);
    });
});
