import { CampaignFieldType } from 'src/types/content';

type MessageForm = {
	articleID: string;
	formID: string;
	submissionURL: string;
	formFields: CampaignFieldType[];
};

export const MessageForm: MessageForm = {
	articleID: 'article1234',
	formID: 'form1234',
	submissionURL:
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',

	formFields: [
		{
			name: 'your_phone_number',
			description:
				'Your contact details will only be seen by the Guardian',
			hideLabel: false,
			label: 'Your phone number',
			id: 'phone',
			type: 'text',
			required: true,
		},
		{
			name: 'your_email_address',
			hideLabel: false,
			label: 'Your e-mail address',
			id: 'email',
			type: 'text',
			required: true,
		},
		{
			name: 'additional_information',
			description: 'Is there anything else you would like to add',
			hideLabel: false,
			label: 'Additional information',
			id: 'additional',
			type: 'textarea',
			required: false,
		},
	],
};
