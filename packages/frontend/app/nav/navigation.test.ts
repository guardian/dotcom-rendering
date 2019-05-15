import { makeGuardianNavigation } from './navigation';
import { data } from '@root/fixtures/article';
import { navData } from '@root/fixtures/navData';
import { extract as extractNAV } from '@frontend/model/extract-nav';

test('We can produce a navigator from the raw navdata', async () => {
    const navPosition = extractNAV(data);

    const nav = makeGuardianNavigation(
        navData,
        'uk',
        navPosition.currentUrl,
        undefined,
        navPosition.readerRevenueLinks,
    );

    expect(nav.pillars.map(p => p.title.toLowerCase())).toContain('news');
    expect(nav.pillars.map(p => p.title.toLowerCase())).toContain('opinion');
});
