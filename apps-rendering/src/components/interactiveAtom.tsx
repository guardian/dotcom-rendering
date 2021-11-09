import type { SerializedStyles } from '@emotion/react';
import { css, jsx as styledH } from '@emotion/react';
import { neutral, remSpace } from '@guardian/source-foundations';
import type { Format, Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { createElement as h } from 'react';
import { pageFonts } from 'styles';
import type { ThemeStyles } from 'themeStyles';
import { getThemeStyles } from 'themeStyles';

export interface InteractiveAtomProps {
	html: string;
	styles: string;
	js: Option<string>;
	format: Format;
}

const InteractiveAtomStyles = (
	themeStyles: ThemeStyles,
): SerializedStyles => css`
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
            background: white;
            padding: ${remSpace[3]} !important;
        } 
    }`;
const atomScript = `
    function resize() {
        window.frameElement.height = document.body.offsetHeight;
    }
    window.addEventListener('resize', resize);
    setTimeout(resize, 1000);
`;

const InteractiveAtom: FC<InteractiveAtomProps> = (
	props: InteractiveAtomProps,
): ReactElement => {
	const { html, styles, js, format } = props;
	const pillarStyles = getThemeStyles(format.theme);
	const style = h('style', { dangerouslySetInnerHTML: { __html: styles } });
	const script = pipe(
		js,
		map((jsString) =>
			h('script', { dangerouslySetInnerHTML: { __html: jsString } }),
		),
		withDefault<ReactElement | null>(null),
	);
	const markup = styledH('figure', {
		css: InteractiveAtomStyles(pillarStyles),
		dangerouslySetInnerHTML: { __html: html },
	});

	return (
		<>
			{style}
			{script}
			{markup}
		</>
	);
};

InteractiveAtom.defaultProps = {
	html: '',
	styles: '',
};

export default InteractiveAtom;
export { atomCss, atomScript };
