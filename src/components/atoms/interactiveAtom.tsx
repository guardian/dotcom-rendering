import React, { FC, ReactElement, createElement as h } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { Format } from '@guardian/types/Format';
import { getThemeStyles, ThemeStyles } from 'themeStyles';
import { Option, map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';
import { pageFonts } from "styles";
import { remSpace } from "@guardian/src-foundations";

export interface InteractiveAtomProps {
    html: string;
    styles: string;
    js: Option<string>;
    format: Format;
}

const InteractiveAtomStyles = (themeStyles: ThemeStyles): SerializedStyles => css`
    margin: 0;

    a {
        color: ${themeStyles.kicker};
        text-decoration: none;
        border-bottom: 0.0625rem solid ${neutral[86]};
    }
`;
const atomCss = `
    ${pageFonts} 
    
    @media (prefers-color-scheme: dark) {
        body {
            background: white !important;
            padding: ${remSpace[2]} !important;
        } 
    }`
const atomScript = `
    function resize() {
        window.frameElement.height = document.body.offsetHeight;
    }
    window.addEventListener('resize', resize);
    setTimeout(resize, 1000);
`

const InteractiveAtom: FC<InteractiveAtomProps> = (props: InteractiveAtomProps): ReactElement => {
    const { html, styles, js, format } = props;
    const pillarStyles = getThemeStyles(format.theme);
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

InteractiveAtom.defaultProps = {
    html: "",
    styles: ""
};

export default InteractiveAtom;
export {
    atomCss,
    atomScript,
}
