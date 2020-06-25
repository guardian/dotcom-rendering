import React, { FC, ReactElement, createElement as h } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { Format } from '@guardian/types/Format';
import { getPillarStyles, PillarStyles } from 'pillarStyles';
import { Option, map, withDefault } from 'types/option';
import { pipe2 } from 'lib';


export interface InteractiveAtomProps {
    html: string;
    styles: string;
    js: Option<string>;
    format: Format;
}

const InteractiveAtomStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    margin: 0;

    a {
        color: ${pillarStyles.kicker};
        text-decoration: none;
        border-bottom: 0.0625rem solid ${neutral[86]};
    }
`;

const InteractiveAtom: FC<InteractiveAtomProps> = (props: InteractiveAtomProps): ReactElement => {
    const { html, styles, js, format } = props;
    const pillarStyles = getPillarStyles(format.pillar);
    const style = h('style', { dangerouslySetInnerHTML: { __html: styles } });
    const script = pipe2(
        js,
        map(jsString => h('script', { dangerouslySetInnerHTML: { __html: jsString } })),
        withDefault<ReactElement | null>(null),
    );
    const markup = styledH('figure', { css: InteractiveAtomStyles(pillarStyles), dangerouslySetInnerHTML: { __html: html } });

    return <>
        {style}
        {script}
        {markup}
    </>
}

export default InteractiveAtom;