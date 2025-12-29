import { MessageRejected, SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.ts";

export const sendEmail = async (recipients: string[], messageHtml: string) => {
	console.log("sending email");

	try {
		return void sesClient.send(
			new SendEmailCommand({
				Source: "Dig Dev Web Engineers <dig.dev.web-engineers@theguardian.com>",
				Destination: {
					ToAddresses: recipients,
				},
				Message: {
					Subject: {
						Data: "Expiring AB Tests",
					},
					Body: {
						Html: {
							Data: messageHtml,
						},
						Text: {
							Data: "Test",
						},
					},
				},
			}),
		);
	} catch (caught) {
		console.log("error");
		console.log(caught);
		// Continue on error for MessageRejected error
		if (caught instanceof MessageRejected) {
			return caught;
		}
		throw caught;
	}
};
