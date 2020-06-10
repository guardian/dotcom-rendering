export const calloutCampaign: CalloutBlockElement = {
    _type: 'model.dotcomrendering.pageElements.CalloutBlockElement',
    id: '14d1b1bc-8983-43fb-8f2e-8ca08a711944',
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
            name: 'name',
            description: 'You can use your first name only',
            hideLabel: false,
            label: 'Name',
            id: 91884870,
            type: 'text',
            required: true,
        },
        {
            textSize: 50,
            name: 'where_do_you_live',
            description: 'Town or area is fine',
            hideLabel: false,
            label: 'Where do you live?',
            id: 91884872,
            type: 'text',
            required: true,
        },
        {
            textSize: 50,
            name: 'tell_us_a_bit_about_yourself_age_and_what_you_do_etc',
            hideLabel: false,
            label: 'Tell us a bit about yourself (age and what you do etc.)',
            id: 91884871,
            type: 'text',
            required: false,
        },
        {
            textSize: 50,
            name: 'which_event_did_you_attend_and_when',
            hideLabel: false,
            label: 'Which event did you attend and when?',
            id: 91884886,
            type: 'text',
            required: true,
        },
        {
            name: 'share_your_experiences_here',
            description: 'Please include as much detail as possible',
            hideLabel: false,
            label: 'Share your experiences here',
            id: 91884874,
            type: 'textarea',
            required: true,
        },
        {
            name:
                'you_can_upload_a_photo_here_if_you_think_it_will_add_to_your_story',
            hideLabel: false,
            label:
                'You can upload a photo here if you think it will add to your story',
            id: 91884877,
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
            id: 91884878,
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
            id: 918848785,
            type: 'checkbox',
            required: true,
        },
        {
            textSize: 50,
            name: 'email_address_',
            description:
                'Your contact details are helpful so we can contact you for more information. They will only be seen by the Guardian.',
            hideLabel: false,
            label: 'Email address ',
            id: 91884879,
            type: 'text',
            required: true,
        },
        {
            textSize: 50,
            name: 'phone_number',
            description:
                'Your contact details are helpful so we can contact you for more information. They will only be seen by the Guardian.',
            hideLabel: false,
            label: 'Phone number',
            id: 91884880,
            type: 'text',
            required: false,
        },
        {
            name: 'do_you_have_anything_else_to_add',
            hideLabel: false,
            label: 'Do you have anything else to add?',
            id: 918848810,
            type: 'textarea',
            required: false,
        },
        {
            name: 'do_you_have_anything_else_to_add',
            hideLabel: false,
            label: 'Do you have anything else to add?',
            id: 91884881,
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
