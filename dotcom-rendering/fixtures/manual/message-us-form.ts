export const MessageForm: MessageUs = {
	formId: 'form1234',
	formFields: [
		{
			id: 'message',
			label: 'Your message',
			name: 'your_message',
			required: true,
			type: 'textarea',
		},
		{
			name: 'your_name',
			label: 'Your name',
			id: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'your_email',
			label: 'Your e-mail',
			id: 'email',
			type: 'text',
			required: false,
		},
	],
};
