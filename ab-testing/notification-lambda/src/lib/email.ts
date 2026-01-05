import { SendEmailCommand } from "@aws-sdk/client-ses";
import { type ABExpiryChecks } from "./checkExpiry.ts";
import { sesClient } from "./sesClient.ts";

const getEmailBodyHtml = (abTestExpiryChecks: ABExpiryChecks): string => {
	const tableConfig: Record<
		keyof ABExpiryChecks,
		{ title: string; accentColour: string }
	> = {
		expired: {
			title: "‼️ Expired",
			accentColour: "orangered",
		},
		within1Day: {
			title: "⚠️ Expiring today @ 23:59",
			accentColour: "firebrick",
		},
		within2Days: {
			title: "⏰ Expires tomorrow @ 23:59",
			accentColour: "chocolate",
		},
	};

	const getTestsTableHtml = (group: keyof typeof tableConfig): string => {
		const config = tableConfig[group];
		return `
		<h2 style="margin-bottom: 0.5rem; font-size: 1.2rem; color: ${
			config.accentColour
		};">
			${config.title}
		</h2>
		<table style="border-spacing: 4px; padding: 6px; border: 1px dashed ${
			config.accentColour
		};">
		<thead style>
			<th>Test name</th>
			<th>Expiry date</th>
			<th>Owners</th>
		</thead>
		<tbody style="text-align: center;">
		${abTestExpiryChecks[group]
			.map((test) => {
				return `<tr style="padding: 10px;">
					<td><strong>${test.name}</strong></td>
					<td>${test.expirationDate}</td>
					<td>${test.owners.join("<br/>")}</td>
				</tr>`;
			})
			.join("<br />")}
		</tbody>
		</table>`;
	};

	return `
	<div style="margin:auto; margin:10px; font-family: sans-serif;">
		<h1 style="font-size: 1.4rem">AB Tests Expiry Reminder</h1>

		${abTestExpiryChecks["expired"].length ? getTestsTableHtml("expired") : ""}

		${
			abTestExpiryChecks["within1Day"].length
				? getTestsTableHtml("within1Day")
				: ""
		}

		${
			abTestExpiryChecks["within2Days"].length
				? getTestsTableHtml("within2Days")
				: ""
		}

		<br></br>

		If you are not ready to remove a test yet but are happy to leave it expired for now, please turn it <strong>OFF</strong> in <a href="https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/abTests.ts">the code</a>.

		<br></br>
		<br></br>

		<em>See https://frontend.gutools.co.uk/analytics/ab-testing for more details</em>
	</div>
	`;
};

const getEmailBodyPlainText = (abTestsByExpiryDate: ABExpiryChecks): string => {
	return `
	AB Tests Expiry Reminder

	Expired:
	${abTestsByExpiryDate.expired
		.map(
			(test) =>
				`${test.name} expired ${
					test.expirationDate
				}. Owners: ${test.owners.join(", ")}`,
		)
		.join("\n")}

	Expiring today (at 23:59):
	${abTestsByExpiryDate.within1Day
		.map(
			(test) =>
				`${test.name} expired ${
					test.expirationDate
				}. Owners: ${test.owners.join(", ")}`,
		)
		.join("\n")}

	Expiring tomorrow (at 23:59):
	${abTestsByExpiryDate.within2Days
		.map(
			(test) =>
				`${test.name} expired ${
					test.expirationDate
				}. Owners: ${test.owners.join(", ")}`,
		)
		.join("\n")}

	If you are not ready to remove a test yet but are happy to leave it expired for now, please turn it OFF in the code (https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/abTests.ts)

	See https://frontend.gutools.co.uk/analytics/ab-testing for more details
	`;
};

export const getEmailCommand = (
	recipient: string,
	abTestsByExpiryDate: ABExpiryChecks,
) =>
	new SendEmailCommand({
		// Verified email domain in AWS
		Source: `notifications@${process.env.EMAIL_DOMAIN}`,
		Destination: {
			ToAddresses: [recipient],
		},
		Message: {
			Subject: {
				Data: "Expiring AB Tests",
				Charset: "UTF-8",
			},
			Body: {
				Html: {
					Data: getEmailBodyHtml(abTestsByExpiryDate),
					Charset: "UTF-8",
				},
				Text: {
					Data: getEmailBodyPlainText(abTestsByExpiryDate),
					Charset: "UTF-8",
				},
			},
		},
	});

export const sendEmail = async (
	recipient: string,
	expiringAbTests: ABExpiryChecks,
): Promise<void> => {
	const emailCommand = getEmailCommand(recipient, expiringAbTests);

	try {
		await sesClient
			.send(emailCommand)
			.then(() =>
				console.log(
					`Sent AB test expiry reminder email to ${recipient}`,
				),
			);
	} catch (error) {
		console.log(`Error sending email to ${recipient}`, error);
	}
};
