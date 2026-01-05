import { activeABtests } from "@guardian/ab-testing-config";
import { sendEmail } from "./lib/email.ts";
import { getExpiringAbTestsGroupedByOwner } from "./lib/expiringTestsByOwner.ts";

export const handler = async (): Promise<void> => {
	const expiringAbTestsByOwner =
		getExpiringAbTestsGroupedByOwner(activeABtests);

	await Promise.all(
		Object.entries(expiringAbTestsByOwner).map(([owner, abTests]) =>
			sendEmail(owner, abTests),
		),
	);
};
