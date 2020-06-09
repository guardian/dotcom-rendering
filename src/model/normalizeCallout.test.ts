import { normalizeCallout } from './normalizeCallout';
import { bodyJSON } from './exampleBodyJSON';

const example = JSON.parse(bodyJSON);

const preNormalizedCampaign: preNormalizedCampaignType = {
    id: '14d1b1bc-8983-43fb-8f2e-8ca08a711944',
    name: 'CALLOUT: early coronavirus events',
    rules: [],
    priority: 0,
    activeFrom: 1588118400000,
    displayOnSensitive: false,
    fields: {
        formId: 3860296,
        callout: 'Were you infected at this time?',
        _type: 'callout',
        description:
            '<p>If you attended one of these events and believe you may have been infected by coronavirus, we\'d like to hear from you. You can get in touch by filling in the form below, or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447867825056">clicking here&nbsp;</a>or adding the contact +44(0)7867825056. Only the Guardian can see your contributions and one of our journalists may contact you to discuss further. </p>',
        formFields: [
            {
                text_size: 50,
                name: 'name',
                description: 'You can use your first name only',
                hide_label: '0',
                label: 'Name',
                id: '91884870',
                type: 'text',
                required: '1',
            },
            {
                name: 'share_your_experiences_here',
                description: 'Please include as much detail as possible',
                hide_label: '0',
                label: 'Share your experiences here',
                id: '91884874',
                type: 'textarea',
                required: '1',
            },
            {
                name:
                    'you_can_upload_a_photo_here_if_you_think_it_will_add_to_your_story',
                hide_label: '0',
                label:
                    'You can upload a photo here if you think it will add to your story',
                id: '91884877',
                type: 'file',
                required: '0',
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
                hide_label: '0',
                label: 'Can we publish your response?',
                id: '91884878',
                type: 'radio',
                required: '0',
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
                hide_label: '0',
                label: 'Can we publish your response?',
                id: '918848785',
                type: 'checkbox',
                required: '1',
            },
            {
                name: 'do_you_have_anything_else_to_add',
                hide_label: '0',
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
                required: '0',
            },
        ],
        tagName: 'callout-early-coronavirus-events',
    },
};

const postNormalizedCampaign: CalloutBlockElement = {
    _type: 'model.dotcomrendering.pageElements.CalloutBlockElement',
    id: '14d1b1bc-8983-43fb-8f2e-8ca08a711944',
    activeFrom: 1588118400000,
    displayOnSensitive: false,
    formId: 3860296,
    title: 'Were you infected at this time?',
    description:
        '<p>If you attended one of these events and believe you may have been infected by coronavirus, we\'d like to hear from you. You can get in touch by filling in the form below, or by contacting us&nbsp;<a href="https://www.theguardian.com/info/2015/aug/12/whatsapp-sharing-stories-with-the-guardian">via WhatsApp</a>&nbsp;by&nbsp;<a href="https://api.whatsapp.com/send?phone=447867825056">clicking here&nbsp;</a>or adding the contact +44(0)7867825056. Only the Guardian can see your contributions and one of our journalists may contact you to discuss further. </p>',
    tagName: 'callout-early-coronavirus-events',
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
            textSize: undefined,
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
            id: 918848785,
            type: 'checkbox',
            required: true,
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

// We are assuming that there will only be 1 callout per page
describe('Normalize callout campaigne data', () => {
    it('convert relavant EmbedBlockElement to CalloutBlockElement', () => {
        const input = {
            ...example,
            blocks: [
                {
                    elements: [
                        {
                            alt: 'Callout callout-early-coronavirus-events',
                            _type:
                                'model.dotcomrendering.pageElements.EmbedBlockElement',
                            html:
                                '<div data-callout-tagname="callout-early-coronavirus-events">          \n                               <h2>Callout</h2>\n                               <p>callout-early-coronavirus-events</p>\n                           </div>',
                            isMandatory: false,
                        },
                        {
                            alt: 'Callout should-not-be-removed',
                            _type:
                                'model.dotcomrendering.pageElements.EmbedBlockElement',
                            html:
                                '<div data-callout-tagname="should-not-be-removed">          \n                               <h2>Callout</h2>\n                               <p>should-not-be-removed</p>\n                           </div>',
                            isMandatory: false,
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.EmbedBlockElement',
                            html:
                                '<div data-callout-tagname="should-not-be-removed">          \n                               <h2>Callout</h2>\n                               <p>should-not-be-removed</p>\n                           </div>',
                            isMandatory: false,
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should not be edited.</p>',
                        },
                    ],
                },
            ],
            config: {
                ...example.config,
                campaigns: [{ name: 'should-not-edit' }, preNormalizedCampaign],
            },
        };

        const expectedOutput = {
            ...example,
            blocks: [
                {
                    elements: [
                        postNormalizedCampaign,
                        {
                            alt: 'Callout should-not-be-removed',
                            _type:
                                'model.dotcomrendering.pageElements.EmbedBlockElement',
                            html:
                                '<div data-callout-tagname="should-not-be-removed">          \n                               <h2>Callout</h2>\n                               <p>should-not-be-removed</p>\n                           </div>',
                            isMandatory: false,
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.EmbedBlockElement',
                            html:
                                '<div data-callout-tagname="should-not-be-removed">          \n                               <h2>Callout</h2>\n                               <p>should-not-be-removed</p>\n                           </div>',
                            isMandatory: false,
                        },
                        {
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should not be edited.</p>',
                        },
                    ],
                },
            ],
            config: {
                ...example.config,
                campaigns: [{ name: 'should-not-edit' }, preNormalizedCampaign],
            },
        };

        expect(normalizeCallout(input)).toEqual(expectedOutput);
    });
});
