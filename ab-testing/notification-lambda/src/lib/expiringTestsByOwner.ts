import type { ABTest } from "@guardian/ab-testing-config";
import {
	type ABExpiryChecks,
	checkExpiry,
	expiresWithinDays,
} from "./checkExpiry.ts";

/**
 * Returns an object containing AB test owners and a grouped version of
 * their tests which are near or past expiry
 */
export const getExpiringAbTestsGroupedByOwner = (
	abTests: ABTest[],
): Record<string, ABExpiryChecks> => {
	// Filter list of AB tests expiring within the next two days
	const expiringSoon = abTests.filter(expiresWithinDays(2));

	// Finds AB test owners who have tests that are about to expire
	const ownersWithExpiringTests = new Set(
		expiringSoon.flatMap((test) => test.owners),
	);

	// Returns expiring, or expired, AB tests grouped by owner
	return Array.from(ownersWithExpiringTests).reduce(
		(testsByOwner: Record<string, ABExpiryChecks>, owner: string) => {
			// find tests owned by owner
			const testsForOwner = abTests.filter((test) =>
				test.owners.includes(owner),
			);
			// group into expiry categories
			const expiryChecksForOwner = checkExpiry(testsForOwner);

			return {
				...testsByOwner,
				[owner]: expiryChecksForOwner,
			};
		},
		{},
	);
};
