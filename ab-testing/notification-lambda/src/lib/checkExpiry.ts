import type { ABTest } from "../../../config/types.ts";

export type ABExpiryChecks = {
	within2Days: ABTest[];
	within1Day: ABTest[];
	expired: ABTest[];
};

export function checkExpiry(tests: ABTest[]) {
	return tests.reduce(
		(acc: ABExpiryChecks, test: ABTest) => {
			const expirationDate = new Date(test.expirationDate);
			const now = Date.now();
			const oneDay = 1000 * 60 * 60 * 24; // a day in millis

			// Has the test expired?
			if (expirationDate < new Date(now)) {
				acc.expired.push(test);
				return acc;
			}

			// Is the test expiring within the next day?
			if (expirationDate < new Date(now + oneDay)) {
				acc.within1Day.push(test);
				return acc;
			}

			// Is the test expiring within the next two days?
			if (expirationDate < new Date(now + oneDay + oneDay)) {
				acc.within2Days.push(test);
				return acc;
			}

			return acc;
		},
		{ within2Days: [], within1Day: [], expired: [] },
	);
}
