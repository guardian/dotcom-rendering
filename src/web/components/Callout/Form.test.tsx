import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Form } from './Form';

const textField = {
    textSize: 50,
    name: 'which_event_did_you_attend_and_when',
    hideLabel: false,
    label: 'Which event did you attend and when?',
    id: 91884886,
    type: 'text',
    required: true,
} as CampaignFieldText;

const textAreaField = {
    name: 'share_your_experiences_here',
    description: 'Please include as much detail as possible',
    hideLabel: false,
    label: 'Share your experiences here',
    id: 91884874,
    type: 'textarea',
    required: true,
} as CampaignFieldTextArea;

// TODO:
// const fileField = {
//     name:
//         'you_can_upload_a_photo_here_if_you_think_it_will_add_to_your_story',
//     hideLabel: false,
//     label:
//         'You can upload a photo here if you think it will add to your story',
//     id: 91884877,
//     type: 'file',
//     required: false,
// } as CampaignFieldFile

const radioField = {
    name: 'can_we_publish_your_response',
    options: [
        {
            label: 'radio 1',
            value: 'radio 1',
        },
        {
            label: 'radio 2',
            value: 'radio 2',
        },
    ],
    hideLabel: false,
    label: 'Can we publish your response?',
    id: 91884878,
    type: 'radio',
    required: true,
} as CampaignFieldRadio;

const checkboxField = {
    name: 'can_we_publish_your_response',
    options: [
        {
            label: 'checkbox 1',
            value: 'checkbox 1',
        },
        {
            label: 'checkbox 2',
            value: 'checkbox 2',
        },
        {
            label: 'checkbox 3',
            value: 'checkbox 3',
        },
    ],
    hideLabel: false,
    label: 'Can we publish your response?',
    id: 91884871,
    type: 'checkbox',
    required: true,
} as CampaignFieldCheckbox;

const selectField = {
    name: 'do_you_have_anything_else_to_add',
    hideLabel: false,
    label: 'Do you have anything else to add?',
    id: 91884881,
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
} as CampaignFieldSelect;

describe('Callout from', () => {
    it('submit data in form', async () => {
        const mockSubmit = jest.fn();

        const { getByTestId, queryByText } = render(
            <Form
                formFields={[
                    textField,
                    textAreaField,
                    radioField,
                    checkboxField,
                    selectField,
                ]}
                onSubmit={mockSubmit}
            />,
        );

        const getByFieldId = (fieldId: number | string) =>
            getByTestId(`form-field-${fieldId}`);

        const textFieldComponent = getByFieldId(
            textField.id,
        ) as HTMLInputElement;
        const textFieldValue = 'Text';
        fireEvent.change(textFieldComponent, {
            target: { value: textFieldValue },
        });
        expect(textFieldComponent.value).toBe(textFieldValue);

        const textAreaFieldComponent = getByFieldId(
            textAreaField.id,
        ) as HTMLTextAreaElement;
        const textAreaFieldValue = 'TextArea';
        fireEvent.change(textAreaFieldComponent, {
            target: { value: textAreaFieldValue },
        });
        expect(textAreaFieldComponent.value).toBe(textAreaFieldValue);

        const radioFieldComponent = getByFieldId(
            radioField.options[0].value,
        ) as HTMLInputElement;
        fireEvent.click(radioFieldComponent);
        expect(radioFieldComponent.checked).toBe(true);

        const checkBoxFieldComponent1 = getByFieldId(
            checkboxField.options[0].value,
        ) as HTMLInputElement;
        fireEvent.click(checkBoxFieldComponent1);
        expect(checkBoxFieldComponent1.checked).toBe(true);

        const checkBoxFieldComponent2 = getByFieldId(
            checkboxField.options[1].value,
        ) as HTMLInputElement;
        fireEvent.click(checkBoxFieldComponent2);
        expect(checkBoxFieldComponent2.checked).toBe(true);

        const selectText = 'selection 1';
        const selectFieldComponent = queryByText(
            selectText,
        ) as HTMLSelectElement;
        fireEvent.click(selectFieldComponent);

        const submitButton = queryByText(
            'Share with the Guardian',
        ) as HTMLButtonElement;
        fireEvent.click(submitButton);

        expect(mockSubmit.mock.calls.length).toBe(1);
        expect(mockSubmit.mock.calls[0][0]).toMatchObject({
            '91884871': ['checkbox 1', 'checkbox 2'],
            '91884874': 'TextArea',
            '91884878': 'radio 1',
            '91884886': 'Text',
        });
    });
});
