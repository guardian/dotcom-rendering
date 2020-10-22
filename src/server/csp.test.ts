
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { getThirdPartyEmbeds } from 'capi'
import { articleContentWith } from 'item.test';


// const content: Content =   

// {
//     blocks: { body: [{ id: 'id',
//         bodyHtml: 'html',
//         bodyTextSummary: 'body',
//         attributes: {},
//         published: true,
//         contributors: [],
//         elements: [{
//             type: ElementType.TWEET,
//             assets: [],
//             tweetTypeData: {
//                 id: "id",
//                 html: "<blockquote>tweet<blockquote>"
//             }
//         }],}] },
//     elements: 
//         [
//             {id: 'id', relation: 'article', type: ElementType.TWEET, assets: [],}
//         ],
//         id: 'id',
//     type: ContentType.ARTICLE,
//     webTitle: 'ArtickleTitle',
//     webUrl: 'web',
//     apiUrl: 'api',
//     tags: [],
//     references: [],
//     isHosted: false,
//     }

const contentTwitter = articleContentWith({
    type: ElementType.TWEET,
    assets: [],
    tweetTypeData: {
        id: "id",
        html: "<blockquote>tweet<blockquote>"
    }})

describe('Handles different DOM structures', () => {
    test('Does not count other tag types', () => {
        // const testingThirdparty = checkForThirdPartyEmbed(noThirdPartyEmbeds, contentBlocksBody);
        const newcontent = getThirdPartyEmbeds(contentTwitter)
        console.log('-=-=-.>>>',newcontent);
        
        expect(newcontent.twitter).toBe(true);
    });
});