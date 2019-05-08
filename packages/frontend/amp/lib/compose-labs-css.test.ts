import { composeLabsCSS } from './compose-labs-css';
import { css } from 'emotion';

describe('compose-labs-css', () => {
    it('should compose css if "labs" pillar is passed as first arg', () => {
        const styleBase = css`
            border: 1px solid black;
            display: flex;
            padding-top: 6px;
        `;

        const styleLabs = css`
            border: 1px solid white;
        `;

        const cssStyle = composeLabsCSS('labs', styleBase, styleLabs);

        expect(cssStyle).toEqual(`
        border: 1px solid white;
        display: flex;
        padding-top: 6px;
        `);
    });
    it('should not compose css if non-"labs" pillar is passed as first arg', () => {
        const styleBase = css`
            border: 1px solid black;
            display: flex;
            padding-top: 6px;
        `;

        // Labs / Paid Content CSS
        const styleLabs = css`
            border: 1px solid white;
        `;

        const cssStyle = composeLabsCSS('news', styleBase, styleLabs);

        expect(cssStyle).toEqual(`
        border: 1px solid black;
        display: flex;
        padding-top: 6px;
        `);
    });
});
