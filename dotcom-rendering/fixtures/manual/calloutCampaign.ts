export const calloutCampaign: CalloutBlockElement = {
	_type: 'model.dotcomrendering.pageElements.CalloutBlockElement',
	elementId: 'mockId',
	id: '14d1b1bc-8983-43fb-8f2e-8ca08a711944',
	calloutsUrl:
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
	tagName: 'callout-early-coronavirus-events',
	activeFrom: 1588118400000,
	displayOnSensitive: false,
	formId: 3860296,
	title: 'Were you infected at this time?',
	description:
		'<p>If you attended one of these events and believe you may have been infected by coronavirus, we\'d like to hear from you. You can get in touch by filling in the form below, or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447867825056">clicking here&nbsp;</a>or adding the contact +44(0)7867825056. Only the Guardian can see your contributions and one of our journalists may contact you to discuss further. </p>',
	formFields: [
		{
			name: 'share_your_experiences',
			description: 'Be as elaborate or as brief as you like',
			hideLabel: false,
			label: 'Share your experiences here',
			id: '91884874',
			type: 'textarea',
			required: true,
		},
		{
			name: 'upload_image_video',
			description:
				'May not work on some mobile devices, or files may be too large',
			hideLabel: false,
			label: 'Upload image/video',
			id: '91884877',
			type: 'file',
			required: false,
		},
		{
			name: 'can_we_publish_your_response',
			options: [
				{
					label: 'Choose an option ...',
					value: 'Choose an option ...',
				},
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
			id: '91884878',
			type: 'select',
			required: true,
		},
		{
			name: 'your_name',
			description: 'Just your first name is fine',
			hideLabel: false,
			label: 'Your name',
			id: '91884874',
			type: 'text',
			required: true,
		},
		{
			name: 'your_phone_number',
			description:
				'Helpful so we can contact you for more information. This will only be seen by The Guardian.',
			hideLabel: false,
			label: 'Your phone number',
			id: '91884874',
			type: 'text',
			required: true,
		},
		{
			name: 'your_email_address',
			description: 'Your email address',
			hideLabel: false,
			label: 'Helpful so we can contact you for more information. This will only be seen by The Guardian.',
			id: '91884874',
			type: 'text',
			required: true,
		},
		{
			name: 'where_do_you_live',
			description: 'Town or area is fine.',
			hideLabel: false,
			label: 'Where do you live?',
			id: '91884874',
			type: 'text',
			required: true,
		},
		{
			name: 'tell_us_a_bit_about_yourself',
			description: 'Your age and what you do',
			hideLabel: false,
			label: 'Tell us a bit about yourself',
			id: '91884874',
			type: 'textarea',
			required: true,
		},
		{
			name: 'any_extra_information',
			description: 'Anything else you would like to add',
			hideLabel: false,
			label: 'Any extra information',
			id: '91884881',
			type: 'textarea',
			required: false,
		},
	],
};

export const calloutCampaignOnlyTwoRadio: CalloutBlockElement = {
	_type: 'model.dotcomrendering.pageElements.CalloutBlockElement',
	elementId: 'mockId',
	id: '14d1b1bc-8983-43fb-8f2e-8ca08a711944',
	calloutsUrl:
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
	tagName: 'callout-early-coronavirus-events',
	activeFrom: 1588118400000,
	displayOnSensitive: false,
	formId: 3860296,
	title: 'Were you infected at this time?',
	description:
		'<p>If you attended one of these events and believe you may have been infected by coronavirus, we\'d like to hear from you. You can get in touch by filling in the form below, or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447867825056">clicking here&nbsp;</a>or adding the contact +44(0)7867825056. Only the Guardian can see your contributions and one of our journalists may contact you to discuss further. </p>',
	formFields: [
		{
			textSize: 50,
			name: 'which_event_did_you_attend_and_when',
			hideLabel: false,
			label: 'Which event did you attend and when?',
			id: '91884886',
			type: 'text',
			required: true,
		},
		{
			name: 'share_your_experiences_here',
			description: 'Please include as much detail as possible',
			hideLabel: false,
			label: 'Share your experiences here',
			id: '91884874',
			type: 'textarea',
			required: true,
		},
		{
			name: 'you_can_upload_a_photo_here_if_you_think_it_will_add_to_your_story',
			hideLabel: false,
			label: 'You can upload a photo here if you think it will add to your story',
			id: '91884877',
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
			],
			hideLabel: false,
			label: 'Can we publish your response?',
			id: '91884878',
			type: 'radio',
			required: true,
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
			id: '918848785',
			type: 'checkbox',
			required: true,
		},
		{
			name: 'do_you_have_anything_else_to_add',
			hideLabel: false,
			label: 'Do you have anything else to add?',
			id: '91884881',
			type: 'select',
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
			required: false,
		},
	],
};
