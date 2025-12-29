import { MessageRejected, SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.ts";

const createSendEmailCommand = (
	recipients: string[],
	messageHtml: string,
	messagePlainText?: string,
) => {
	return new SendEmailCommand({
		Destination: {
			ToAddresses: recipients,
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: messageHtml,
				},
				// Only attach plaintext message if provided
				...(messagePlainText
					? {
							Text: {
								Charset: "UTF-8",
								Data: messagePlainText,
							},
					  }
					: {}),
			},
			Subject: {
				Charset: "UTF-8",
				Data: "Expiring AB Tests",
			},
		},
		Source: "dig.dev.web-engineers@theguardian.com",
	});
};

export const sendEmail = async (recipients: string[], messageHtml: string) => {
	const sendEmailCommand = createSendEmailCommand(recipients, messageHtml);
	console.log("sending email");
	try {
		return void sesClient.send(sendEmailCommand);
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
