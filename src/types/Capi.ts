import { Content } from 'types/capi-thrift-models';

export interface Capi {
    response: {
        content: Content;
    };
}

export interface Series {
    webTitle?: string;
    webUrl?: string;
}

export interface Contributor {
    webTitle?: string;
    webUrl?: string;
    apiUrl?: string;
    bylineLargeImageUrl?: string;
}
