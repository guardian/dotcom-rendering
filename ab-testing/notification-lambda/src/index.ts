import { activeABtests } from "@guardian/ab-testing-config";
import { sendEmail } from "./lib/email.ts";
import { getExpiringAbTestsGroupedByOwner } from "./lib/expiringTestsByOwner.ts";

export const handler = async (): Promise<void> => {
	const expiringAbTestsByOwner =
		getExpiringAbTestsGroupedByOwner(activeABtests);

	// Check if any test owners have expiring tests
	// Early return if there are no results
	if (!Object.keys(expiringAbTestsByOwner).length) {
		console.log("No owners found with expiring tests");
		Promise.resolve();
	}

	// Sending emails to owners with expiring tests
	await Promise.all(
		Object.entries(expiringAbTestsByOwner).map(([owner, abTests]) =>
			sendEmail(owner, abTests),
		),
	);
};
