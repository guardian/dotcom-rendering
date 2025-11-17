import { stringifyFastlySubfield } from "../../lib/fastly-subfield.ts";
import type { ABTest } from "../../types.ts";

const buildABTestGroupKeyValues = (tests: ABTest[]) =>
	tests.flatMap((test) =>
		test.groups.map((group) => ({
			item_key: `${test.name}:${group}`,
			item_value: stringifyFastlySubfield({
				exp: Math.floor(new Date(test.expirationDate).getTime() / 1000),
				type: test.type,
			}),
		})),
	);

export { buildABTestGroupKeyValues };
