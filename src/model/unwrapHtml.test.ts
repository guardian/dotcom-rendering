import { unwrapHtml } from './unwrapHtml';

describe('unwrapHtml', () => {
    it('Returns unwrapped HTML if prefix and suffix match', () => {
        // Blockquote, elements inside
        const bqHtml = '<blockquote class="quote"><p>inner</p></blockquote>';
        const bqPrefix = '<blockquote class="quote">';
        const bqSuffix = '</blockquote>';
        const {
            willUnwrap: bqIsUnwrapped,
            unwrappedHtml: bqUnwrappedHtml,
        } = unwrapHtml(bqPrefix, bqSuffix, bqHtml);

        // Paragraph, no elements inside
        const pHtml = '<p>inner</p>';
        const pPrefix = '<p>';
        const pSuffix = '</p>';
        const {
            willUnwrap: pIsUnwrapped,
            unwrappedHtml: pUnwrappedHtml,
        } = unwrapHtml(pPrefix, pSuffix, pHtml);

        // Testy test
        expect(bqIsUnwrapped).toBeTruthy();
        expect(bqUnwrappedHtml).toBe('<p>inner</p>');
        expect(pIsUnwrapped).toBeTruthy();
        expect(pUnwrappedHtml).toBe('inner');
    });

    it('Returns non-unwrapped HTML if prefix and suffix do not match', () => {
        const html = '<blockquote><p>inner</p></blockquote>';
        const prefix = '<blockquote class="quote">';
        const suffix = '</blockquote>';
        const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml(
            prefix,
            suffix,
            html,
        );

        expect(isUnwrapped).toBeFalsy();
        expect(unwrappedHtml).toBe(html);
    });
});
