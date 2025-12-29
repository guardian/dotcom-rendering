import { activeABtests } from "@guardian/ab-testing-config";
import { type ABExpiryChecks, checkExpiry } from "./lib/checkExpiry.ts";
import { sendEmail } from "./lib/email.ts";

const getMessageBody = (
	recipient: string,
	checks: Record<string, unknown[]>,
) => {
	return `
	<h1>AB Tests Expiring soon</h1>
	${recipient}
	${JSON.stringify(checks)}
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
	console.dir(expiryChecks, { depth: null });
	const expiryChecksByEmail = arrangeByEmail(expiryChecks);

	expiryChecksByEmail.forEach(
		([email, checks]: [string, Record<string, unknown[]>]) => {
			const message = getMessageBody(email, checks);
			console.dir({ message, email }, { depth: null });

			sendEmail([email], message);
		},
	);
};
