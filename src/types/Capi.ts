import { PillarId } from "../styles";
import { Asset } from 'utils/Asset';

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
                    'campaign';
            }];
            atoms?: object[];
        };
    };
}

export interface Series {
    webTitle?: string;
    webUrl?: string;
}

export interface Tag {
    webUrl: string;
    webTitle: string;
    type: string;
}

export interface Contributor {
    webTitle?: string;
    webUrl?: string;
    apiUrl?: string;
    bylineLargeImageUrl?: string;
}

export interface Block {
    id: string;
    title: string;
    attributes: {
        keyEvent?: boolean;
    };
    firstPublishedDate: Date;
    lastModifiedDate: Date;
    elements: {
        type: string;
        assets: [];
        textTypeData: {};
    };
}
