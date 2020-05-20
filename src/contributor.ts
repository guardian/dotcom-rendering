// ----- Imports ----- //

import { Option, fromNullable } from 'types/option';
import { IContent as Content } from 'mapiThriftModels';
import { articleContributors } from 'capi';
import { srcsetWithWidths, src } from 'image';


// ------ Types ----- //

type Contributor = {
    id: string;
    apiUrl: string;
    name: string;
    image: Option<{
        srcset: string;
        src: string;
    }>;
}


// ----- Functions ----- //

const contributorSrcset = srcsetWithWidths([32, 64, 128, 192, 256]);

const isSingleContributor = (cs: Contributor[]): boolean =>
    cs.length === 1

const parseContributors = (salt: string, content: Content): Contributor[] =>
    articleContributors(content).map(contributor => ({
        id: contributor.id,
        apiUrl: contributor.apiUrl,
        name: contributor.webTitle,
        image: fromNullable(contributor.bylineLargeImageUrl).fmap(url => ({
            srcset: contributorSrcset(url, salt),
            src: src(salt, url, 64),
        })),
    }));


// ----- Exports ----- //

export {
    Contributor,
    isSingleContributor,
    parseContributors,
}
