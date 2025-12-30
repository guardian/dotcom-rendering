import { activeABtests } from "@guardian/ab-testing-config";
import { checkExpiry } from "./lib/checkExpiry.ts";
import { sendEmail } from "./lib/email.ts";

const testEmail = "charlotte.emms@theguardian.com";

export const handler = async (): Promise<void> => {
	const expiryChecks = checkExpiry(activeABtests);

	await sendEmail([testEmail], expiryChecks);
};
