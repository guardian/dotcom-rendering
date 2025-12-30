import { SendEmailCommand } from "@aws-sdk/client-ses";
import { type ABExpiryChecks } from "./checkExpiry.ts";
import { sesClient } from "./sesClient.ts";

const getEmailBodyHtml = (abTestExpiryChecks: ABExpiryChecks) => {
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

	const getTestsTableHtml = (group: keyof typeof tableConfig) => {
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
		${abTestExpiryChecks[group].map(
			(test) =>
				`<tr style="padding: 10px;">
					<td><strong>${test.name}</strong></td>
					<td>${test.expirationDate}</td>
					<td>
						<ul style="list-style: none; margin: unset; padding-left: 2px;">
						${test.owners.map((owner) => `<li>${owner}</li>`)}
						</ul>
					</td>
				</tr>`,
		)}
		</tbody>
		</table>`;
	};

	return `
	<div style="margin:auto; margin:10px; font-family: sans-serif;">
		<h1 style="font-size: 1.4rem">AB Tests Expiry Reminder</h1>

		${!!abTestExpiryChecks["expired"].length ? getTestsTableHtml("expired") : ""}

		${
			!!abTestExpiryChecks["within1Day"].length
				? getTestsTableHtml("within1Day")
				: ""
		}

		${
			!!abTestExpiryChecks["within2Days"].length
				? getTestsTableHtml("within2Days")
				: ""
		}

		<br></br>
		If you are not ready to remove a test yet but are happy to leave it expired for now, please turn it <strong>OFF</strong> in <a href="https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/abTests.ts">the code</a>

		<br></br>
		<em>See https://frontend.gutools.co.uk/analytics/ab-testing for more details</em>

	</div>
	`;
};

const getEmailBodyPlainText = (abTestsByExpiryDate: ABExpiryChecks): string => {
	return `
	AB Tests Expiry Reminder

	Expired:
	${abTestsByExpiryDate.expired.map(
		(test) =>
			`${test.name} expired ${test.expirationDate}. Owners: ${test.owners}`,
	)}

	Expiring today (at 23:59):
	${abTestsByExpiryDate.within1Day.map(
		(test) =>
			`${test.name} expired ${test.expirationDate}. Owners: ${test.owners}`,
	)}

	Expiring tomorrow (at 23:59):
	${abTestsByExpiryDate.within2Days.map(
		(test) =>
			`${test.name} expired ${test.expirationDate}. Owners: ${test.owners}`,
	)}

	If you are not ready to remove a test yet but are happy to leave it expired for now, please turn it OFF in the code (https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/abTests.ts)

	See https://frontend.gutools.co.uk/analytics/ab-testing for more details
	`;
};

export const getEmailCommand = (
	recipients: string[],
	abTestsByExpiryDate: ABExpiryChecks,
) =>
	new SendEmailCommand({
		Source: "dig.dev.web-engineers@theguardian.com",
		Destination: {
			ToAddresses: recipients,
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
	recipients: string[],
	expiringAbTests: ABExpiryChecks,
): Promise<void> => {
	const emailCommand = getEmailCommand(recipients, expiringAbTests);

	try {
		await sesClient
			.send(emailCommand)
			.then(() =>
				console.log(
					`Sent AB test expiry reminder email to ${recipients}`,
				),
			);
	} catch (error) {
		console.log(`Error sending email to ${recipients}`, error);
	}
};
