import { ABTest } from '../../types.ts';
import { stringify } from '../lib.ts';

const buildABTestDict = (tests: ABTest[]) =>
	tests
		.map((test) =>
			test.groups.map((group) => ({
				item_key: `${test.name}:${group}`,
				item_value: stringify({
					exp: Math.floor(test.expirationDate.getTime() / 1000),
					type: test.type,
				}),
			})),
		)
		.flat();

export { buildABTestDict };
