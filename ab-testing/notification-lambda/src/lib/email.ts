import { MessageRejected, SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient";

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
		Source: "ab-testing-notifications@guardian.co.uk",
	});
};

export const sendEmail = async (recipients: string[], messageHtml: string) => {
	const sendEmailCommand = createSendEmailCommand(recipients, messageHtml);

	try {
		return await sesClient.send(sendEmailCommand);
	} catch (caught) {
		// Continue on error for MessageRejected error
		if (caught instanceof MessageRejected) {
			return caught;
		}
		throw caught;
	}
};
