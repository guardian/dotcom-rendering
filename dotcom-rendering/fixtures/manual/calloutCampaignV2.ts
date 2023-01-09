import type { CalloutBlockElementV2 } from '../../src/types/content';

export const calloutCampaign: CalloutBlockElementV2 = {
	_type: 'model.dotcomrendering.pageElements.CalloutBlockElementV2',
	elementId: 'mockId',
	id: '14d1b1bc-8983-43fb-8f2e-8ca08a711944',
	calloutsUrl:
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
	tagName: 'callout-early-coronavirus-events',
	activeFrom: 1588118400000,
	activeUntil: 1672669481,
	displayOnSensitive: false,
	formId: 3860296,
	title: 'Are you affected by the issues in this article?',
	isNonCollapsible: true,
	description:
		'<p>We’d like to hear how people are being affected, whether they’re applying for a mortgage or refixing an existing one. Are you on a variable rate mortgage, or a fixed rate that is about to expire? How will it impact you financially? </p> <p> We’re also interested in how people, particularly first-time buyers, have been affected by disappearing mortgage deals. </p> ',
	formFields: [
		{
			name: 'your_name',
			description: 'How should we refer to you?',
			hideLabel: false,
			label: 'Your name',
			id: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'where_do_you_live',
			description: 'Town or area is fine.',
			hideLabel: false,
			label: 'Where do you live?',
			id: 'live',
			type: 'text',
			required: true,
		},
		{
			name: 'tell_us_a_bit_about_yourself',
			description: 'For example, your age and what you do',
			hideLabel: false,
			label: 'Tell us a bit about yourself',
			id: 'about',
			type: 'text',
			required: true,
		},
		{
			name: 'share_your_experiences',
			description: 'Give as much or as little detail as you would like',
			hideLabel: false,
			label: 'Share your experiences here',
			id: 'experience',
			type: 'textarea',
			required: true,
		},
		{
			name: 'what_events_did_you_attend',
			description: 'Select as many as you like',
			hideLabel: false,
			label: 'What events did you attend? ',
			id: 'events',
			type: 'checkbox',
			required: false,
			options: [
				{
					label: '1st Dec',
					value: '1st Dec',
				},
				{
					label: '3rd Dec',
					value: '3rd Dec',
				},
				{
					label: '5th Dec',
					value: '5th Dec',
				},
			],
		},
		{
			name: 'upload_image_video',
			description:
				'File uploads not work on some mobile devices, or files may be too large.',
			hideLabel: false,
			label: 'Add a file',
			id: 'upload',
			type: 'file',
			required: false,
		},
		{
			name: 'can_we_publish_your_response',
			options: [
				{
					label: 'Yes, entirely',
					value: 'Yes, entirely',
				},
				{
					label: 'Yes, but please keep me anonymous',
					value: 'Yes, but please keep me anonymous',
				},
				{
					label: 'Yes, but please contact me first',
					value: 'Yes, but please contact me first',
				},
				{
					label: 'No, this is information only',
					value: 'No, this is information only',
				},
			],
			hideLabel: false,
			label: 'Can we publish your response?',
			id: 'permissions',
			type: 'select',
			required: true,
		},
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
			description:
				'Your contact details will only be seen by the Guardian',
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
