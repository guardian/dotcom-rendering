import { memoize } from './memoize';

describe('memoize', () => {
	it('memoized function is only called once for each unique key', () => {
		const f = jest.fn().mockImplementation(<T>(x: T) => ({
			data: x,
		}));

		const memoizedF = memoize(f);

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
});
