import { normalizeCallout } from './normalizeCallout';
import { bodyJSON } from './exampleBodyJSON';

const example = JSON.parse(bodyJSON);

const campaign = {
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
        ],
        tagName: 'callout-early-coronavirus-events',
    },
};

// We are assuming that there will only be 1 callout per page
describe('Normalize callout campaigne data', () => {
    it('move callout campaigns data to elements', () => {
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
                            _type:
                                'model.dotcomrendering.pageElements.TextBlockElement',
                            html: '<p>I should not be edited.</p>',
                        },
                    ],
                },
            ],
            config: {
                ...example.config,
                campaigns: [campaign, { name: 'should-not-edit' }],
            },
        };

        const expectedOutput = {
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
                            campaign,
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
                campaigns: [{ name: 'should-not-edit' }],
            },
        };

        expect(normalizeCallout(input)).toEqual(expectedOutput);
    });
});
