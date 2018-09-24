import compose from 'compose-function';
import { string as curly } from 'curlyquotes';
import get from 'lodash.get';

import clean from './clean';
import bigBullets from './big-bullets';
import { pillarNames } from '../../pillars';

const headline = compose(
    clean,
    curly,
);
const standfirst = compose(
    clean,
    bigBullets,
);
const main = clean;
const body = clean;

const defaultArgs = { config: {}, contentFields: {} };

// tslint:disable:prefer-array-literal
const apply = (input: string, ...fns: Array<(_: string) => string>): string => {
    return fns.reduce((acc, fn) => fn(acc), input);
};

const getString = (obj: object, selector: string): string => {
    const found = get(obj, selector);
    if (typeof found === 'string') {
        return found;
    }

    throw new Error(
        `expected string at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getNumber = (obj: object, selector: string): number => {
    const found = get(obj, selector);
    if (typeof found === 'number') {
        return found;
    }

    throw new Error(
        `expected number at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getNonEmptyString = (obj: object, selector: string): string => {
    const found = get(obj, selector);
    if (typeof found === 'string' && found.length > 0) {
        return found;
    }

    throw new Error(
        `expected non-empty string at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getArray = (obj: object, selector: string): any[] => {
    const found = get(obj, selector);
    if (Array.isArray(found)) {
        return found;
    }

    throw new Error(
        `expected array at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const findPillar: (name: string) => Pillar | undefined = name => {
    const pillar: string = name.toLowerCase();
    return pillarNames.find(_ => _ === pillar);
};

const getLink = (data: {}, { isPillar }: { isPillar: boolean }): LinkType => ({
    title: getString(data, 'title'),
    longTitle: getString(data, 'longTitle'),
    url: getString(data, 'url'),
    pillar: isPillar ? findPillar(getString(data, 'title')) : undefined,
    children: getArray(data, 'children').map(
        l => getLink(l, { isPillar: false }), // children are never pillars
    ),
    mobileOnly: false,
});

// TODO really it would be nice if we passed just the data we needed and
// didn't have to do the transforms/lookups below. (While preserving the
// validation on types.)
export const extractArticleMeta = (data: {}): CAPIType => ({
    headline: apply(
        getNonEmptyString(data, 'config.page.headline'),
        clean,
        curly,
    ),
    standfirst: apply(
        getString(data, 'contentFields.fields.standfirst'),
        clean,
        bigBullets,
    ),
    main: apply(getNonEmptyString(data, 'contentFields.fields.main'), clean),
    body: getArray(data, 'contentFields.fields.blocks.body')
        .map(block => block.bodyHtml)
        .filter(Boolean)
        .join(''),
    author: getString(data, 'config.page.author'),
    webPublicationDate: new Date(
        getNumber(data, 'config.page.webPublicationDate'),
    ),
    sectionName: getNonEmptyString(data, 'config.page.section'),
});

export const extractNavMeta = (data: {}): NavType => {
    let pillars = getArray(data, 'config.nav.pillars');

    pillars = pillars.map(link => getLink(link, { isPillar: true }));

    const subnav = get(data, 'config.nav.subNavSections');

    return {
        pillars,
        otherLinks: {
            url: '', // unused
            title: 'More',
            longTitle: 'More',
            more: true,
            children: getArray(data, 'config.nav.otherLinks').map(l =>
                getLink(l, { isPillar: false }),
            ),
        },
        brandExtensions: getArray(data, 'config.nav.brandExtensions').map(l =>
            getLink(l, { isPillar: false }),
        ),
        subNavSections: subnav
            ? {
                  parent: getLink(subnav.parent, { isPillar: false }),
                  links: getArray(subnav, 'links').map(l =>
                      getLink(l, { isPillar: false }),
                  ),
              }
            : undefined,
    };
};
