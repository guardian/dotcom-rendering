import { CAPI } from '@root/fixtures/CAPI/CAPI';
import { ga } from '@root/fixtures/ga';
import { extract as extractNAV } from '@root/src/model/extract-nav';
import { document } from './document';

const linkedData = [{}];
const result = document({
    data: {
        linkedData,
        CAPI,
        page: 'article',
        site: 'site',
        NAV: extractNAV(CAPI.nav),
        GA: ga,
    },
});

test('that all the required meta SEO fields exist', () => {
    const names = ['description', 'viewport'];

    names.map(name =>
        expect(result).toEqual(expect.stringContaining(`<meta name="${name}"`)),
    );
});

test('that all the required links exist', () => {
    const names = ['amphtml'];

    names.map(name =>
        expect(result).toEqual(
            expect.stringContaining(`<link rel="${name}" href="`),
        ),
    );
});

test('Subnav ophan data-link-name exists with correct value', () => {
    expect(result).toEqual(
        expect.stringContaining(`data-link-name="nav2 : subnav : money/debt"`),
    );

    expect(result).toEqual(
        expect.not.stringContaining(
            `data-link-name="nav2 : subnav : /money/debt"`,
        ),
    );
});

test('Meta ophan data-attributes exist', () => {
    expect(result).toEqual(
        expect.stringContaining(`data-component="meta-byline"`),
    );

    expect(result).toEqual(expect.stringContaining(`data-link-name="byline"`));
});
