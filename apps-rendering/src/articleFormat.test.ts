// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { formatToString } from 'articleFormat';

// ----- Tests ----- //

describe('formatToString', () => {
    it('creates a string describing ArticleFormat', () => {
        const format = formatToString({
            design: ArticleDesign.Standard,
            display: ArticleDisplay.Immersive,
            theme: ArticlePillar.Culture,
        });

        expect(format).toBe('Design: Standard, Display: Immersive, Theme: Culture');
    });
});
