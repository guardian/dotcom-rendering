import { jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import type {
	CampaignFieldCheckbox,
	CampaignFieldFile,
	CampaignFieldRadio,
	CampaignFieldSelect,
	CampaignFieldText,
	CampaignFieldTextArea,
} from '../../types/content';
import { Form } from './Form';

const textField: CampaignFieldText = {
	textSize: 50,
	name: 'which_event_did_you_attend_and_when',
	hideLabel: false,
	label: 'Which event did you attend and when?',
	id: '91884886',
	type: 'text',
	required: true,
	hidden: false,
};

const textAreaField: CampaignFieldTextArea = {
	name: 'share_your_experiences_here',
	description: 'Please include as much detail as possible',
	hideLabel: false,
	label: 'Share your experiences here',
	id: '91884874',
	type: 'textarea',
	required: true,
	hidden: false,
};

const fileField: CampaignFieldFile = {
	name: 'you_can_upload_a_photo_here_if_you_think_it_will_add_to_your_story',
	hideLabel: false,
	label: 'You can upload a photo here if you think it will add to your story',
	id: '91884877',
	type: 'file',
	required: false,
	hidden: false,
};

const firstRadioOption = {
	label: 'radio 1',
	value: 'radio 1',
};

const secondRadioOption = {
	label: 'radio 2',
	value: 'radio 2',
};

const thirdRadioOption = {
	label: 'radio 3',
	value: 'radio 3',
};

const radioField: CampaignFieldRadio = {
	name: 'can_we_publish_your_response',
	options: [firstRadioOption, secondRadioOption, thirdRadioOption],
	hideLabel: false,
	label: 'Can we publish your response?',
	id: '91884878',
	type: 'radio',
	required: true,
	hidden: false,
};

const firstCheckboxOption = {
	label: 'checkbox 1',
	value: 'checkbox 1',
};

const secondCheckboxOption = {
	label: 'checkbox 2',
	value: 'checkbox 2',
};

const thirdCheckboxOption = {
	label: 'checkbox 3',
	value: 'checkbox 3',
};

const checkboxField: CampaignFieldCheckbox = {
	name: 'can_we_publish_your_response',
	options: [firstCheckboxOption, secondCheckboxOption, thirdCheckboxOption],
	hideLabel: false,
	label: 'Can we publish your response?',
	id: '91884871',
	type: 'checkbox',
	required: true,
	hidden: false,
};

const selectField: CampaignFieldSelect = {
	name: 'do_you_have_anything_else_to_add',
	hideLabel: false,
	label: 'Do you have anything else to add?',
	id: '91884881',
	type: 'select',
	options: [
		{
			label: 'selection 1',
			value: 'selection 1',
		},
		{
			label: 'selection 2',
			value: 'selection 2',
		},
	],
	required: false,
	hidden: false,
};

describe('Callout form', () => {
	it('should submit text input', () => {
		const mockSubmit = jest.fn();
		const { getByTestId, queryByText } = render(
			<Form formFields={[textField]} onSubmit={mockSubmit} />,
		);
		const getByFieldId = (fieldId: number | string) =>
			getByTestId(`form-field-${fieldId}`);

		const textFieldComponent = getByFieldId(
			textField.id,
		) as HTMLInputElement;
		const textFieldValue = 'textInput';
		fireEvent.change(textFieldComponent, {
			target: { value: textFieldValue },
		});
		expect(textFieldComponent.value).toBe(textFieldValue);

		const submitButton = queryByText(
			'Share with the Guardian',
		) as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(mockSubmit.mock.calls.length).toBe(1);

		expect(mockSubmit.mock.calls[0]?.[0]).toMatchObject({
			[textField.id]: 'textInput',
		});
	});

	it('should submit textarea input', () => {
		const mockSubmit = jest.fn();
		const { getByTestId, queryByText } = render(
			<Form formFields={[textAreaField]} onSubmit={mockSubmit} />,
		);
		const getByFieldId = (fieldId: number | string) =>
			getByTestId(`form-field-${fieldId}`);

		const textAreaFieldComponent = getByFieldId(
			textAreaField.id,
		) as HTMLTextAreaElement;
		const textAreaFieldValue = 'textAreaInput';
		fireEvent.change(textAreaFieldComponent, {
			target: { value: textAreaFieldValue },
		});
		expect(textAreaFieldComponent.value).toBe(textAreaFieldValue);

		const submitButton = queryByText(
			'Share with the Guardian',
		) as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(mockSubmit.mock.calls.length).toBe(1);

		expect(mockSubmit.mock.calls[0]?.[0]).toMatchObject({
			[textAreaField.id]: 'textAreaInput',
		});
	});

	it('should submit radio', () => {
		const mockSubmit = jest.fn();
		const { getByTestId, queryByText } = render(
			<Form formFields={[radioField]} onSubmit={mockSubmit} />,
		);
		const getByFieldId = (fieldId: number | string) =>
			getByTestId(`form-field-${fieldId}`);

		const radioFieldComponent1 = getByFieldId(
			firstRadioOption.value,
		) as HTMLInputElement;
		fireEvent.click(radioFieldComponent1);
		expect(radioFieldComponent1.checked).toBe(true);

		const radioFieldComponent2 = getByFieldId(
			secondRadioOption.value,
		) as HTMLInputElement;
		fireEvent.click(radioFieldComponent2);
		expect(radioFieldComponent2.checked).toBe(true);

		const submitButton = queryByText(
			'Share with the Guardian',
		) as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(mockSubmit.mock.calls.length).toBe(1);

		expect(mockSubmit.mock.calls[0]?.[0]).toMatchObject({
			[radioField.id]: 'radio 2',
		});
	});

	it('should submit checkbox', () => {
		const mockSubmit = jest.fn();
		const { getByTestId, queryByText } = render(
			<Form formFields={[checkboxField]} onSubmit={mockSubmit} />,
		);
		const getByFieldId = (fieldId: number | string) =>
			getByTestId(`form-field-${fieldId}`);

		const checkBoxFieldComponent1 = getByFieldId(
			firstCheckboxOption.value,
		) as HTMLInputElement;
		fireEvent.click(checkBoxFieldComponent1);
		expect(checkBoxFieldComponent1.checked).toBe(true);

		const checkBoxFieldComponent3 = getByFieldId(
			thirdCheckboxOption.value,
		) as HTMLInputElement;
		fireEvent.click(checkBoxFieldComponent3);
		expect(checkBoxFieldComponent3.checked).toBe(true);

		const submitButton = queryByText(
			'Share with the Guardian',
		) as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(mockSubmit.mock.calls.length).toBe(1);

		expect(mockSubmit.mock.calls[0]?.[0]).toMatchObject({
			[checkboxField.id]: ['checkbox 1', 'checkbox 3'],
		});
	});
	test('should upload the file', async () => {
		const file = new File(['hello'], 'hello.png', { type: 'image/png' });
		const mockSubmit = jest.fn();
		const { queryByText } = render(
			<Form formFields={[fileField]} onSubmit={mockSubmit} />,
		);

		const input = screen.getByTestId<HTMLInputElement>(
			`form-field-${fileField.id}`,
		);

		await user.upload(input, file);

		const inputFiles = input.files ? input.files : [];

		expect(inputFiles[0]).toStrictEqual(file);
		expect(inputFiles).toHaveLength(1);

		const submitButton = queryByText(
			'Share with the Guardian',
		) as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(mockSubmit.mock.calls.length).toBe(1);
		// TODO: test mockSubmit internal
	});

	it('should submit select', () => {
		const mockSubmit = jest.fn();
		const { getByTestId, queryByText } = render(
			<Form formFields={[selectField]} onSubmit={mockSubmit} />,
		);
		const getByFieldId = (fieldId: number | string) =>
			getByTestId(`form-field-${fieldId}`);

		const selectText = 'selection 1';
		const selectFieldComponent = getByFieldId(
			selectField.id,
		) as HTMLSelectElement;
		fireEvent.change(selectFieldComponent, {
			target: { value: selectText },
		});

		const submitButton = queryByText(
			'Share with the Guardian',
		) as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(mockSubmit.mock.calls.length).toBe(1);

		expect(mockSubmit.mock.calls[0]?.[0]).toMatchObject({
			[selectField.id]: selectText,
		});
	});

	it('submit multiple values', () => {
		const mockSubmit = jest.fn();
		const { getByTestId, queryByText } = render(
			<Form
				formFields={[radioField, checkboxField]}
				onSubmit={mockSubmit}
			/>,
		);
		const getByFieldId = (fieldId: number | string) =>
			getByTestId(`form-field-${fieldId}`);

		const radioFieldComponent = getByFieldId(
			firstRadioOption.value,
		) as HTMLInputElement;
		fireEvent.click(radioFieldComponent);
		expect(radioFieldComponent.checked).toBe(true);

		const checkBoxFieldComponent1 = getByFieldId(
			firstCheckboxOption.value,
		) as HTMLInputElement;
		fireEvent.click(checkBoxFieldComponent1);
		expect(checkBoxFieldComponent1.checked).toBe(true);

		const checkBoxFieldComponent2 = getByFieldId(
			secondCheckboxOption.value,
		) as HTMLInputElement;
		fireEvent.click(checkBoxFieldComponent2);
		expect(checkBoxFieldComponent2.checked).toBe(true);

		const submitButton = queryByText(
			'Share with the Guardian',
		) as HTMLButtonElement;
		fireEvent.click(submitButton);
		expect(mockSubmit.mock.calls.length).toBe(1);

		expect(mockSubmit.mock.calls[0]?.[0]).toMatchObject({
			[checkboxField.id]: ['checkbox 1', 'checkbox 2'],
			[radioField.id]: 'radio 1',
		});
	});
});
