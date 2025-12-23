import { activeABtests } from "@guardian/ab-testing-config";
import { ABExpiryChecks, checkExpiry } from "./lib/checkExpiry";
import { sendEmail } from "./lib/email";

const getMessageBody = (
	recipient: string,
	checks: Record<string, unknown[]>,
) => {
	return `
	<h1>AB Tests Expiring soon</h1>
	${recipient}
	${checks}
	`;
};

const arrangeByEmail = (
	checks: ABExpiryChecks,
): Array<[string, ABExpiryChecks]> => {
	// TODO
	return [["charlotte.emms+abchecks1@guardian.co.uk", checks]];
};

export const handler = async (): Promise<void> => {
	const expiryChecks = checkExpiry(activeABtests);

	const expiryChecksByEmail = arrangeByEmail(expiryChecks);

	expiryChecksByEmail.forEach(
		([email, checks]: [string, Record<string, unknown[]>]) => {
			const message = getMessageBody(email, checks);
			sendEmail([email], message);
		},
	);
};
