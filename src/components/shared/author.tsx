// ----- Imports ----- //

import { createElement as h } from 'react';

import { renderText } from 'renderer';
import { Pillar } from 'pillar';
import { Option } from 'types/option';


// ----- Component ----- //

interface Props {
    byline: Option<DocumentFragment>;
    pillar: Pillar;
}

const Author = (props: Props): JSX.Element | null =>
    props.byline.fmap<JSX.Element | null>((bylineHtml: DocumentFragment) =>
        h('address', null, renderText(bylineHtml, props.pillar))
    ).withDefault(null);


// ----- Exports ----- //

export default Author;
