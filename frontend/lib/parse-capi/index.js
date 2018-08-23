// @flow

import { string as curly } from 'curlyquotes';
import get from 'lodash.get';

import clean from './clean';
import bigBullets from './big-bullets';

const apply = (input: string, ...fns: Array<(string) => string>): string =>
    fns.reduce((acc, fn) => fn(acc), input);

const getString = (obj, selector) => {
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

const getNonEmptyString = (obj, selector) => {
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

const getArray = (obj, selector) => {
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

const asLink = (data: {}, { isPillar }: { isPillar: boolean }): LinkType => ({
    title: getNonEmptyString(data, 'title'),
    longTitle: getString(data, 'longTitle'),
    url: getNonEmptyString(data, 'url'),
    children: getArray(data, 'children').map(
        l => asLink(l, { isPillar: false }), // children are never pillars
    ),
    mobileOnly: false,
    isPillar,
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
        getNonEmptyString(data, 'contentFields.fields.standfirst'),
        clean,
        bigBullets,
    ),
    main: apply(getNonEmptyString(data, 'contentFields.fields.main'), clean),
    body: getArray(data, 'contentFields.fields.blocks.body')
        .map(block => block.bodyHtml)
        .filter(Boolean)
        .join(''),
});

export const extractNavMeta = (data: {}): NavType => {
    let pillars = getArray(data, 'config.nav.pillars');

    pillars = pillars.map(link => asLink(link, { isPillar: true }));

    pillars.push({
        url: '', // unused
        title: 'More',
        longTitle: 'More',
        isPillar: false,
        children: getArray(data, 'config.nav.otherLinks').map(l =>
            asLink(l, { isPillar: false }),
        ),
    });

    const subnav = get(data, 'config.nav.subNavSections');

    return {
        pillars,
        otherLinks: getArray(data, 'config.nav.otherLinks').map(l =>
            asLink(l, { isPillar: false }),
        ),
        brandExtensions: getArray(data, 'config.nav.brandExtensions').map(l =>
            asLink(l, { isPillar: false }),
        ),
        subNavSections: subnav
            ? {
                  parent: asLink(subnav.parent, { isPillar: false }),
                  links: getArray(subnav, 'links').map(l =>
                      asLink(l, { isPillar: false }),
                  ),
              }
            : undefined,
    };
};
