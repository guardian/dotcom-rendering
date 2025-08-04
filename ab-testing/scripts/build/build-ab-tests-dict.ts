import { ABTest } from '../../types.ts';
import { stringifyFastlySubfield } from '../lib/fastly-subfield.ts';

const buildABTestGroupKeyValues = (tests: ABTest[]) =>
	tests
		.map((test) =>
			test.groups.map((group) => ({
				item_key: `${test.name}:${group}`,
				item_value: stringifyFastlySubfield({
					exp: Math.floor(
						new Date(test.expirationDate).getTime() / 1000,
					),
					type: test.type,
				}),
			})),
		)
		.flat();

export { buildABTestGroupKeyValues };
