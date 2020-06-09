const formatCalloutObject = (
    calloutObject: preNormalizedCampaignType,
): CalloutBlockElement => ({
    // this is a type suggestion for EmbedBlockElement that are acctually callout
    _type: 'model.dotcomrendering.pageElements.CalloutBlockElement',
    id: calloutObject.id,
    activeFrom: calloutObject.activeFrom,
    displayOnSensitive: calloutObject.displayOnSensitive,
    formId: calloutObject.fields.formId,
    title: calloutObject.fields.callout,
    description: calloutObject.fields.description,
    tagName: calloutObject.fields.tagName,
    formFields: calloutObject.fields.formFields.map(
        (field: preNormalizedCampaignFieldType): CampaignFieldType => {
            switch (field.type) {
                case 'text':
                    return {
                        id: Number(field.id),
                        type: 'text',
                        name: field.name,
                        description: field.description,
                        required: field.required === '1',
                        textSize: field.text_size
                            ? Number(field.text_size)
                            : undefined,
                        hideLabel: field.hide_label === '1',
                        label: field.label,
                    } as CampaignFieldText;
                case 'textarea':
                    return {
                        id: Number(field.id),
                        type: 'textarea',
                        name: field.name,
                        description: field.description,
                        required: field.required === '1',
                        textSize: field.text_size
                            ? Number(field.text_size)
                            : undefined,
                        hideLabel: field.hide_label === '1',
                        label: field.label,
                    } as CampaignFieldTextArea;
                case 'file':
                    return {
                        id: Number(field.id),
                        type: 'file',
                        name: field.name,
                        required: field.required === '1',
                        hideLabel: field.hide_label === '1',
                        label: field.label,
                    } as CampaignFieldFile;
                case 'radio':
                    return {
                        id: Number(field.id),
                        type: 'radio',
                        name: field.name,
                        required: field.required === '1',
                        options: field.options.map(option => ({
                            label: option.label,
                            value: option.value,
                        })),
                        hideLabel: field.hide_label === '1',
                        label: field.label,
                    } as CampaignFieldRadio;
                case 'checkbox':
                    return {
                        id: Number(field.id),
                        type: 'checkbox',
                        name: field.name,
                        required: field.required === '1',
                        options: field.options.map(option => ({
                            label: option.label,
                            value: option.value,
                        })),
                        hideLabel: field.hide_label === '1',
                        label: field.label,
                    } as CampaignFieldCheckbox;
                case 'select':
                    return {
                        id: Number(field.id),
                        type: 'select',
                        name: field.name,
                        required: field.required === '1',
                        options: field.options.map(option => ({
                            label: option.label,
                            value: option.value,
                        })),
                        hideLabel: field.hide_label === '1',
                        label: field.label,
                    } as CampaignFieldSelect;
            }
        },
    ),
});

// Convert callout campaigns from EmbedBlockElement to CalloutBlockElement
export const normalizeCallout = (body: CAPIType): CAPIType => {
    const calloutElements: preNormalizedCampaignType[] = body.config.campaigns
        ? body.config.campaigns.filter(
              ele => ele && ele.fields && ele.fields._type === 'callout',
          )
        : [];

    if (calloutElements.length) {
        return {
            ...body,

            // Need to convert EmbedBlockElement to relavant CalloutBlockElement
            // This is made a little complex due to the fact that we are handling multiple arrys.
            // Furthermore there is no clear way of checking if a EmbedBlockElement is a CalloutBlockElement
            // currently `alt` and `html` in the EmbedBlockElement to search for a string mathcing the calloutElements tagName
            blocks: body.blocks.map(({ elements, ...rest }) => ({
                ...rest,
                elements: elements.map(block => {
                    if (
                        block._type ===
                        'model.dotcomrendering.pageElements.EmbedBlockElement'
                    ) {
                        // need to determin if EmbedBlockElement is a callout
                        const relatedCalloutElement = calloutElements.filter(
                            ele => {
                                // if `alt` is defined we should use that in favor of HTML
                                // as doing such a search can be costly
                                if (block.alt) {
                                    return (
                                        block.alt.search(ele.fields.tagName) !==
                                        -1
                                    );
                                }
                                return (
                                    block.html.search(ele.fields.tagName) !== -1
                                );
                            },
                        );

                        // TODO: throw warning if we have more than 1 match
                        if (relatedCalloutElement.length > 1) {
                            // eslint-disable-next-line no-console
                            console.warn(
                                'More than one callout block match candidate, need to investigate and mitigate issue',
                            );
                        }

                        // if we find a match we should remove that EmbedBlockElement with a CalloutBlockElement
                        if (relatedCalloutElement.length) {
                            return formatCalloutObject(
                                relatedCalloutElement[0],
                            );
                        }
                        return block;
                    }
                    return block;
                }),
            })),

            // TODO: we can potentually remove callout campaigns from configs?
        };
    }
    return body;
};
