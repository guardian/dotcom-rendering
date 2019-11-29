import { CAPI } from '@root/fixtures/CAPI';
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

test('that all the required meta SEO fields exist', async () => {
    const names = ['description', 'viewport'];

    names.map(name =>
        expect(result.includes(`<meta name="${name}"`)).toBe(true),
    );
});

test('that all the required links exist', async () => {
    const names = ['amphtml'];

    names.map(name =>
        expect(result.includes(`<link rel="${name}" href="`)).toBe(true),
    );
});
