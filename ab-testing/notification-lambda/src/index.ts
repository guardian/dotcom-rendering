import { sendEmail } from "./lib/email.ts";
import { getExpiringAbTestsGroupedByOwner } from "./lib/groupExpiryChecksByEmail.ts";

export const handler = async (): Promise<void> => {
	const abTestsByOwner = getExpiringAbTestsGroupedByOwner();

	await Promise.all(
		Object.entries(abTestsByOwner).map(([owner, abTests]) =>
			sendEmail(owner, abTests),
		),
	);
};
