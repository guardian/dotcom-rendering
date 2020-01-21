import { unwrapHtml } from './unwrapHtml';

describe('unwrapHtml', () => {
    it('Returns unwrapped HTML if prefix and suffix match', () => {
        // Blockquote, elements inside
        const bqUnwrap = {
            html: '<blockquote class="quote"><p>inner</p></blockquote>',
            prefix: '<blockquote class="quote">',
            suffix: '</blockquote>',
        };

        const {
            willUnwrap: bqIsUnwrapped,
            unwrappedHtml: bqUnwrappedHtml,
        } = unwrapHtml(bqUnwrap);

        // Paragraph, no elements inside
        const pUnwrap = {
            html: '<p>inner</p>',
            prefix: '<p>',
            suffix: '</p>',
        };
        const {
            willUnwrap: pIsUnwrapped,
            unwrappedHtml: pUnwrappedHtml,
        } = unwrapHtml(pUnwrap);

        // Testy test
        expect(bqIsUnwrapped).toBeTruthy();
        expect(bqUnwrappedHtml).toBe('<p>inner</p>');
        expect(pIsUnwrapped).toBeTruthy();
        expect(pUnwrappedHtml).toBe('inner');
    });

    it('Returns non-unwrapped HTML if prefix and suffix do not match', () => {
        const bqUnwrap = {
            html: '<blockquote><p>inner</p></blockquote>',
            prefix: '<blockquote class="quote">',
            suffix: '</blockquote>',
        };
        const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml(bqUnwrap);

        expect(isUnwrapped).toBeFalsy();
        expect(unwrappedHtml).toBe(bqUnwrap.html);
    });
});
