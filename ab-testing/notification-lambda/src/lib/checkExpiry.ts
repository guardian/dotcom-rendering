import type { ABTest } from "../../../config/types.ts";

export type ABExpiryChecks = {
	within2Days: ABTest[];
	within1Day: ABTest[];
	expired: ABTest[];
};

export const testExpiresWithinDays = (days: number) => (test: ABTest) => {
	const now = Date.now();
	const oneDay = 1000 * 60 * 60 * 24; // a day in millis
	const daysInMillis = days * oneDay;
	return new Date(test.expirationDate) < new Date(now + daysInMillis);
};

export const checkExpiry = (tests: ABTest[]) => {
	return tests.reduce(
		(acc: ABExpiryChecks, test: ABTest) => {
			// Has the test expired?
			if (testExpiresWithinDays(0)) {
				acc.expired.push(test);
				return acc;
			}

			// Is the test expiring within the next day?
			if (testExpiresWithinDays(1)) {
				acc.within1Day.push(test);
				return acc;
			}

			// Is the test expiring within the next two days?
			if (testExpiresWithinDays(2)) {
				acc.within2Days.push(test);
				return acc;
			}

			return acc;
		},
		{ within2Days: [], within1Day: [], expired: [] },
	);
};
