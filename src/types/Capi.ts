import { PillarId } from "../styles";
import { Asset } from "../components/shared/HeaderImage";

export interface Capi {
    response: {
        content: {
            type: string;
            webPublicationDate: string;
            pillarId: PillarId;
            fields: {
                headline: string;
                standfirst: string;
                bylineHtml: string;
                webPublicationDate: string;
                displayHint: string;
                body: string;
                starRating?: string;
            };
            elements: [{
                relation: string;
                type: string;
                assets: Asset[];
            }];
            tags: [{
                id: string;
                webUrl: string;
                webTitle: string;
                type:
                    'contributor' |
                    'keyword' |
                    'series' |
                    'newspaper_book_section' |
                    'newspaper_book' |
                    'blog' |
                    'tone' |
                    'type' |
                    'publication' |
                    'tracking' |
                    'paid_content' |
                    'campaign'
            }];
            atoms?: object[];
        };
    };
}
