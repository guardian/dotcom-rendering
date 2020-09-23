import React from 'react';
import renderer from 'react-test-renderer';
import { matchers } from 'jest-emotion';
import { Keyline } from 'components/shared/keyline';
import { Design } from '@guardian/types/Format';

expect.extend(matchers);

describe('Keyline component renders as expected', () => {
    it('Renders styles for liveblogs', () => {
        const article = { design: Design.Live };
        const keyline = renderer.create(<Keyline {...article} />).toJSON();
        expect(keyline).toHaveStyleRule('background-image', 'repeating-linear-gradient(#DCDCDC,#DCDCDC 1px,transparent 1px,transparent 3px)');
        expect(keyline).toHaveStyleRule('opacity', '.4');
    })

    it('Renders styles for comment articles', () => {
        const article = { design: Design.Comment };
        const keyline = renderer.create(<Keyline {...article} />).toJSON();
        expect(keyline).toHaveStyleRule('background-image', 'repeating-linear-gradient(#DCDCDC,#DCDCDC 1px,transparent 1px,transparent 3px)');
        expect(keyline).toHaveStyleRule('height', '24px');
    })

    it('Renders styles for standard articles', () => {
        const article = { design: Design.Article };
        const keyline = renderer.create(<Keyline {...article} />).toJSON();
        expect(keyline).toHaveStyleRule('background-image', 'repeating-linear-gradient(#DCDCDC,#DCDCDC 1px,transparent 1px,transparent 3px)');
    })
});