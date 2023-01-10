import { parse } from 'client/parser';

const mockCampaign = {
	id: '1fc53dab-1c76-4258-8194-b4b3d8399052',
	name: 'CALLOUT: ghost flights',
	priority: 0,
	displayOnSensitive: false,
	fields: {
		callout: 'Share your experiences',
		formId: 4711223,
		tagName: 'callout-ghost-flights',
		description:
			'<p>If you have been affected or have any information, we\'d like to hear from you. You can get in touch by filling in the form below or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447766780300">clicking here&nbsp;</a>or\n adding the contact +44(0)7766780300. Only the Guardian can see your \ncontributions and one of our journalists may contact you to discuss \nfurther.&nbsp;If you’re having trouble using the form, click&nbsp;<a href="https://guardiannewsandmedia.formstack.com/forms/facebook_whatsapp_and_instagram_outage">here</a>.<br></p>',
		formFields: [
			{
				id: '121575455',
				label: 'Name',
				name: 'name',
				description: 'Or your nickname',
				type: 'text',
				mandatory: true,
				options: [],
			},
			{
				id: '121sd5455',
				label: 'Phone number',
				name: 'phone',
				type: 'phone',
				mandatory: false,
				options: [],
			},
			{
				id: '121575575',
				label: 'Email',
				name: 'email',
				type: 'email',
				mandatory: false,
				options: [],
			},
			{
				id: '121575458',
				label: 'Share your experiences of ghost flights during the pandemic',
				name: 'share_your_experiences_of_ghost_flights_during_the_pandemic',
				description: 'Include as much detail as possible.',
				type: 'textarea',
				mandatory: true,
				options: [],
			},
			{
				id: '121575460',
				label: 'If you are happy to, please upload a photo of yourself',
				name: 'if_you_are_happy_to_please_upload_a_photo_of_yourself',
				type: 'file',
				mandatory: false,
				options: [],
			},
			{
				id: '121575461',
				label: 'Can we publish your response?',
				name: 'can_we_publish_your_response',
				type: 'select',
				mandatory: true,
				options: [
					{
						label: 'Yes, entirely',
						value: 'Yes, entirely',
					},
					{
						label: 'Yes, but contact me first',
						value: 'Yes, but contact me first',
					},
					{
						label: 'Yes, but please keep me anonymous',
						value: 'Yes, but please keep me anonymous',
					},
					{
						label: 'No, this is information only',
						value: 'No, this is information only',
					},
				],
			},
			{
				id: '121575463451',
				label: 'Do you like the guardian?',
				name: 'do_you_like_the_guardian',
				description: 'say yes',
				type: 'radio',
				mandatory: true,
				options: [
					{
						label: 'Yes',
						value: 'yes',
					},
					{
						label: 'No',
						value: 'no',
					},
				],
			},
			{
				id: '121575463675',
				label: 'What colours do you like?',
				name: 'liked_colours',
				type: 'checkbox',
				mandatory: true,
				options: [
					{
						label: 'Blue',
						value: 'blue',
					},
					{
						label: 'Red',
						value: 'red',
					},
					{
						label: 'Yellow',
						value: 'yellow',
					},
				],
			},
		],
		formUrl:
			'https://guardiannewsandmedia.formstack.com/forms/ghost_flights',
	},
};

const parser = new DOMParser();
const parseHtml = (html: string): DocumentFragment | undefined =>
	parse(parser)(html).either<DocumentFragment | undefined>(
		(_err) => undefined,
		(doc) => doc,
	);
const campaignDescription: DocumentFragment | undefined = parseHtml(
	mockCampaign.fields.description,
);

export { mockCampaign, campaignDescription };
