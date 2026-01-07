import { SendEmailCommand } from "@aws-sdk/client-ses";
import { type ABExpiryChecks } from "./checkExpiry.ts";
import { sesClient } from "./sesClient.ts";

const getEmailBodyHtml = (expiryChecks: ABExpiryChecks): string => {
	const tableConfig: Record<
		keyof ABExpiryChecks,
		{ title: string; accentColour: string }
	> = {
		expired: {
			title: "Expired",
			accentColour: "firebrick",
		},
		within1Day: {
			title: "Expiring today after 23:59",
			accentColour: "chocolate",
		},
		within2Days: {
			title: "Expires tomorrow after 23:59",
			accentColour: "peru",
		},
	};

	const getTestsTableHtml = (group: keyof typeof tableConfig): string => {
		const { accentColour, title } = tableConfig[group];

		return `
			<h2 style="margin-bottom: 0.5rem; font-size: 1.2rem; color: ${accentColour};">
				${title}
			</h2>
			<table style="width: 100%; border-spacing: 4px; padding: 6px; border: 1px dashed ${accentColour};">
			<thead style="text-align: left;">
				<th style="width: 30%; border-bottom: 1px solid rgba(0,0,0,0.3);">Name</th>
				<th style="width: 10%; border-bottom: 1px solid rgba(0,0,0,0.3);">Expiry</th>
				<th style="width: 30%; border-bottom: 1px solid rgba(0,0,0,0.3);">Owners</th>
				<th style="width: 30%; border-bottom: 1px solid rgba(0,0,0,0.3);">Description</th>
			</thead>
			<tbody style="text-align: left;">
			${expiryChecks[group]
				.map((test) => {
					return `
					<tr>
						<td><strong>${test.name}</strong></td>
						<td>${test.expirationDate}</td>
						<td>${test.owners.join("<br/>")}</td>
						<td>${test.description}</td>
					</tr>`;
				})
				.join("")}
			</tbody>
			</table>
		`;
	};

	return `<div style="margin:auto; font-family: sans-serif;">
		<h1 style="font-size: 1.4rem">AB Tests Expiry Reminder</h1>
		${expiryChecks["expired"].length ? getTestsTableHtml("expired") : ""}
		${expiryChecks["within1Day"].length ? getTestsTableHtml("within1Day") : ""}
		${expiryChecks["within2Days"].length ? getTestsTableHtml("within2Days") : ""}
		<br>
		<p>
			If you are not ready to remove a test yet but are happy to leave it expired for now, please turn it <strong>OFF</strong>
			in <a href="https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/abTests.ts">the code</a>.
		</p>
		<br>
		<p>
			<em>See https://frontend.gutools.co.uk/analytics/ab-testing for more details</em>
		</p>
	</div>`;
};

const getEmailBodyPlainText = (expiryChecks: ABExpiryChecks): string => {
	return [
		`AB Tests Expiry Reminder\n`,

		`${expiryChecks.expired.length ? "Expired:" : ""}`,
		`${expiryChecks.expired
			.map(({ name, owners, description }) =>
				[
					`\tName: ${name}`,
					`Description: ${description}`,
					`Owners: ${owners.join(", ")}`,
				].join("\n\t"),
			)
			.join("\n\n")}`,

		`${
			expiryChecks.within1Day.length ? "Expiring today at midnight:" : ""
		}`,
		`${expiryChecks.within1Day
			.map(({ name, owners, description }) =>
				[
					`\tName: ${name}`,
					`Description: ${description}`,
					`Owners: ${owners.join(", ")}`,
				].join("\n\t"),
			)
			.join("\n\n")}`,

		`${
			expiryChecks.within2Days.length
				? "Expiring tomorrow at midnight:"
				: ""
		}`,
		`${expiryChecks.within2Days
			.map(({ name, owners, description }) =>
				[
					`\tName: ${name}`,
					`Description: ${description}`,
					`Owners: ${owners.join(", ")}`,
				].join("\n\t"),
			)
			.join("\n\n")}`,

		`If you are not ready to remove a test yet but are happy to leave it expired for now, please turn it OFF in the code (https://github.com/guardian/dotcom-rendering/blob/main/ab-testing/config/abTests.ts)\n`,
		`See https://frontend.gutools.co.uk/analytics/ab-testing for more details\n`,
	].join("\n");
};

export const sendEmail = async (
	recipient: string,
	expiringAbTests: ABExpiryChecks,
): Promise<void> => {
	try {
		await sesClient
			.send(
				new SendEmailCommand({
					// Verified email domain in AWS. Ensure to update in CDK if changing
					Source: `AB Testing <notifications@${process.env.EMAIL_DOMAIN}>`,
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
								Data: getEmailBodyHtml(expiringAbTests),
								Charset: "UTF-8",
							},
							Text: {
								Data: getEmailBodyPlainText(expiringAbTests),
								Charset: "UTF-8",
							},
						},
					},
				}),
			)
			.then(() =>
				console.log(
					`Sent AB test expiry reminder email to ${recipient} for tests
					${Object.values(expiringAbTests)
						.flat()
						.map((test) => test.name)
						.join(", ")}`,
				),
			);
	} catch (error) {
		console.error(`Error sending email to ${recipient}`, error);
		throw error;
	}
};
