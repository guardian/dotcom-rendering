// filter out callout campaigns from config array and move them to block elements
// Why:
// Campaign callout elements contains all the data you would need to server side render the component
// we therefore want to move this data to the block element, and remove it form being sent down
// to the client
// TODO: change how CAPI sends us this data (include it into the `EmbedBlockElement` Block element)
export const normalizeCallout = (body: CAPIType): CAPIType => {
    const calloutEle: CampaignsType | undefined =
        body.config.campaigns &&
        body.config.campaigns.find(
            ele => ele && ele.fields && ele.fields._type === 'callout',
        );

    if (calloutEle) {
        return {
            ...body,
            // add callout element to relavant block element
            blocks: body.blocks.map(block => ({
                ...block,
                elements: block.elements.map(ele => {
                    if (
                        ele._type ===
                            'model.dotcomrendering.pageElements.EmbedBlockElement' &&
                        ele.html.search(calloutEle.fields.tagName) !== -1
                    ) {
                        return {
                            ...ele,
                            campaign: calloutEle,
                        };
                    } 
                        return ele;
                    
                }),
            })),
            config: {
                ...body.config,
                // filter out callout element from config list
                campaigns: body.config.campaigns
                    ? body.config.campaigns.filter(ele => {
                          // remove element if _type is callout
                          if (
                              ele &&
                              ele.fields &&
                              ele.fields._type === 'callout'
                          ) {
                              return false;
                          } 
                              return true;
                          
                      })
                    : [],
            },
        };
    } 
        return body;
    
};
