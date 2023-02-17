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
			name: 'your_message',
			hideLabel: false,
			label: 'Your message',
			id: 'message',
			type: 'textarea',
			required: true,
		},
		{
			name: 'your_name',
			hideLabel: false,
			label: 'Your name',
			id: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'your_email',
			hideLabel: false,
			label: 'Your e-mail',
			id: 'email',
			type: 'text',
			required: false,
		},
	],
};
