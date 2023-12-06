import type { SerializedStyles } from '@emotion/react';
import { css, jsx as styledH } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { map, withDefault } from '../../../vendor/@guardian/types/index';
import { pipe } from 'lib';
import { border, text } from 'palette';
import type { FC, ReactElement } from 'react';
import { createElement as h } from 'react';
import { pageFonts } from 'styles';

export interface InteractiveAtomProps {
	html: string;
	styles: string;
	js: Option<string>;
	format: ArticleFormat;
}

const InteractiveAtomStyles = (format: ArticleFormat): SerializedStyles => css`
	margin: 0;

	a {
		color: ${text.interactiveAtomLink(format)};
		text-decoration: none;
		border-bottom: 0.0625rem solid ${border.interactiveAtomLink(format)};
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

const InteractiveAtom: FC<InteractiveAtomProps> = ({
	html,
	styles,
	js,
	format,
}): ReactElement => {
	const style = h('style', { dangerouslySetInnerHTML: { __html: styles } });
	const script = pipe(
		js,
		map((jsString) =>
			h('script', { dangerouslySetInnerHTML: { __html: jsString } }),
		),
		withDefault<ReactElement | null>(null),
	);
	const markup = styledH('figure', {
		css: InteractiveAtomStyles(format),
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
