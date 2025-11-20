import type { ABTest } from "../../types.ts";

export function enoughSpace(allTests: ABTest[]) {
	const spaceTotalSize = allTests.reduce(
		(acc, test) => {
			const space = test.audienceSpace ?? "A";

			acc[space] += test.audienceSize;
			return acc;
		},
		{ A: 0, B: 0, C: 0 },
	);

	Object.entries(spaceTotalSize).forEach(([space, size]) => {
		if (size > 1) {
			throw new Error(`Audience sizes in space ${space} exceeds 100%`);
		}
	});

	return true;
}
