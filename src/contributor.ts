// ----- Imports ----- //

import { Option, fromNullable, None } from 'types/option';
import { Content } from '@guardian/content-api-models/v1/content';
import { articleContributors } from 'capi';
import { srcsetWithWidths, src, Dpr, Image } from 'image';


// ------ Types ----- //

type Contributor = {
    id: string;
    apiUrl: string;
    name: string;
    image: Option<Image>;
}


// ----- Functions ----- //

const contributorSrcset = srcsetWithWidths([32, 64, 128, 192, 256, 400, 600]);

const isSingleContributor = (cs: Contributor[]): boolean =>
    cs.length === 1

const parseContributors = (salt: string, content: Content): Contributor[] =>
    articleContributors(content).map(contributor => ({
        id: contributor.id,
        apiUrl: contributor.apiUrl,
        name: contributor.webTitle,
        image: fromNullable(contributor.bylineLargeImageUrl).fmap(url => ({
            srcset: contributorSrcset(url, salt, Dpr.One),
            src: src(salt, url, 64, Dpr.One),
            dpr2Srcset: contributorSrcset(url, salt, Dpr.Two),
            height: 192,
            width: 192,
            credit: new None(),
            caption: new None(),
            alt: new None(),
            role: new None(),
            nativeCaption: new None(),
        })),
    }));


// ----- Exports ----- //

export {
    Contributor,
    isSingleContributor,
    parseContributors,
}
