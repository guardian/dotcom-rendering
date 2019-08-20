import { document } from './document';
import { CAPI } from '@root/fixtures/CAPI';
import { ga } from '@root/fixtures/ga';
import { extract as extractNAV } from '@frontend/model/extract-nav';

const linkedData = [{}];
const result = document({
    data: {
        linkedData,
        CAPI,
        page: 'article',
        site: 'site',
        NAV: extractNAV(CAPI.nav),
        config: CAPI.config,
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
