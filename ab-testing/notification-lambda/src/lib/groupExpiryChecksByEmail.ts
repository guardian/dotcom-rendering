import { activeABtests } from "@guardian/ab-testing-config";
import {
	type ABExpiryChecks,
	checkExpiry,
	testExpiresWithinDays,
} from "./checkExpiry.ts";

/**
 * Returns an object containing AB test owners and a grouped version of
 * their tests which are near or past expiry
 */
export const getExpiringAbTestsGroupedByOwner = (): Record<
	string,
	ABExpiryChecks
> => {
	const expiringSoon = activeABtests.filter(testExpiresWithinDays(2));

	/** Gets unique list of AB test owners who have tests that are about to expire */
	const ownersWithExpiringTests = new Set(
		expiringSoon.flatMap((test) => test.owners),
	);

	return Array.from(ownersWithExpiringTests).reduce(
		(testsByOwner: Record<string, ABExpiryChecks>, owner: string) => {
			// find tests owned by owner
			const testsForOwner = activeABtests.filter((test) =>
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
