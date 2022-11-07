import type { Option } from '@guardian/types';
import { none, some } from '@guardian/types';
import { parse } from 'client/parser';
import Int64 from 'node-int64';

const mockCampaign = {
	id: '1fc53dab-1c76-4258-8194-b4b3d8399052',
	name: 'CALLOUT: ghost flights',
	priority: 0,
	displayOnSensitive: false,
	activeUntil: new Int64(1730542820000),
	fields: {
		callout: 'Share your experiences',
		formId: 4711223,
		tagName: 'callout-ghost-flights',
		description:
			'<p>If you have been affected or have any information, we\'d like to hear from you. You can get in touch by filling in the form below or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447766780300">clicking here&nbsp;</a>or\n adding the contact +44(0)7766780300. Only the Guardian can see your \ncontributions and one of our journalists may contact you to discuss \nfurther.&nbsp;<em>If you’re having trouble using the form, click&nbsp;<a href="https://guardiannewsandmedia.formstack.com/forms/facebook_whatsapp_and_instagram_outage">here</a>.<br></em></p>',
		formFields: [
			{
				mandatory: true,
				text_size: 50,
				description: 'Or your nickname',
				name: 'name',
				hide_label: '0',
				label: 'Name',
				id: '121575455',
				type: 'text',
				required: '1',
				options: [
					{
						label: 'Yes, entirely',
						value: 'Yes, entirely',
					},
				],
			},
			{
				mandatory: true,
				name: 'share_your_experiences_of_ghost_flights_during_the_pandemic',
				description: 'Include as much detail as possible.',
				hide_label: '0',
				label: 'Share your experiences of ghost flights during the pandemic',
				id: '121575458',
				type: 'textarea',
				required: '1',
				options: [
					{
						label: 'Yes, entirely',
						value: 'Yes, entirely',
					},
				],
			},
			{
				mandatory: false,
				text_size: '30',
				name: 'if_you_are_happy_to_please_upload_a_photo_of_yourself',
				hide_label: '0',
				label: 'If you are happy to, please upload a photo of yourself',
				id: '121575460',
				type: 'file',
				required: '0',
				options: [
					{
						label: 'Yes, entirely',
						value: 'Yes, entirely',
					},
				],
			},
			{
				mandatory: true,
				name: 'can_we_publish_your_response',
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
				hide_label: '0',
				label: 'Can we publish your response?',
				id: '121575461',
				type: 'select',
				required: '1',
			},
			{
				mandatory: true,
				name: 'do_you_like_the_guardian',
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
				hide_label: '0',
				label: 'Do you like the guardian?',
				id: '121575463451',
				type: 'radio',
				required: '1',
			},
			{
				mandatory: true,
				name: 'liked_colours',
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
				hide_label: '0',
				label: 'What colours do you like?',
				id: '121575463451',
				type: 'checkbox',
				required: '1',
			},
			// Basic fields supported by formstack that we need to support
			// Need to add checkbox support
			// and make sure we support - number, tel & email
		],
		formUrl:
			'https://guardiannewsandmedia.formstack.com/forms/ghost_flights',
	},
};

const parser = new DOMParser();
const parseHtml = (html: string): Option<DocumentFragment> =>
	parse(parser)(html).either<Option<DocumentFragment>>(
		(_err) => none,
		(doc) => some(doc),
	);
const campaignDescription = parseHtml(mockCampaign.fields.description);

export { mockCampaign, campaignDescription };
