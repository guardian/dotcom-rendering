import { ABTest } from '../../types.ts';
import { stringify } from '../lib.ts';

const createABTestDict = (tests: ABTest[]) =>
	tests.map((test) => ({
		item_key: test.name,
		item_value: stringify({
			exp: Math.floor(test.expirationDate.getTime() / 1000),
			type: test.type,
		}),
	}));

export { createABTestDict };
