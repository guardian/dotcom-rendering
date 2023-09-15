import { makeMemoizedFunction } from './memoize';

describe('memoize', () => {
	it('memoized function is only called once for each unique key', () => {
		const f = jest.fn().mockImplementation(<T>(x: T) => ({
			data: x,
		}));

		const memoizedF = makeMemoizedFunction(f);

		memoizedF('foo');
		memoizedF('foo');
		memoizedF('bar');
		memoizedF('foo');
		memoizedF('bar');
		memoizedF('baz');
		memoizedF('baz');

		expect(f).toHaveBeenCalledTimes(3);

		expect(f).toHaveBeenNthCalledWith(1, 'foo');
		expect(f).toHaveBeenNthCalledWith(2, 'bar');
		expect(f).toHaveBeenNthCalledWith(3, 'baz');

		expect(f).toHaveNthReturnedWith(1, { data: 'foo' });
		expect(f).toHaveNthReturnedWith(2, { data: 'bar' });
		expect(f).toHaveNthReturnedWith(3, { data: 'baz' });
	});

	it('has separate caches for each memoized function', () => {
		const f = jest.fn().mockImplementation((key: string) => ({
			f: key,
		}));
		const g = jest.fn().mockImplementation((key: string) => ({
			g: key,
		}));

		const memoizedF = makeMemoizedFunction(f);
		const memoizedG = makeMemoizedFunction(g);

		// If these two functions shared a cache they'd return the same value
		expect(memoizedF('input')).toStrictEqual({ f: 'input' });
		expect(memoizedG('input')).toStrictEqual({ g: 'input' });

		expect(f).toHaveBeenCalledTimes(1);
		expect(g).toHaveBeenCalledTimes(1);
	});
});
