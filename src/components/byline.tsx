// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, palette } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Design, map, Special, withDefault } from '@guardian/types';
import type { Format, Option } from '@guardian/types';
import { pipe2 } from 'lib';
import type { FC, ReactElement, ReactNode } from 'react';
import { getHref } from 'renderer';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props extends Format {
	bylineHtml: Option<DocumentFragment>;
}

const styles = (kicker: string): SerializedStyles => css`
	${headline.xxxsmall()}
	color: ${kicker};

	${darkModeCss`
        color: ${neutral[60]};
    `}
`;

const anchorStyles = (
	kicker: string,
	inverted: string,
): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	font-style: normal;
	color: ${kicker};
	text-decoration: none;

	${darkModeCss`
        color: ${inverted};
    `}
`;

const commentStyles = (kicker: string): SerializedStyles => css`
	color: ${kicker};
	width: 75%;
	${headline.medium({ fontWeight: 'light', fontStyle: 'italic' })}
`;

const commentAnchorStyles = (
	kicker: string,
	inverted: string,
): SerializedStyles => css`
	color: ${kicker};
	text-decoration: none;

	${darkModeCss`
        color: ${inverted};
    `}
`;

const labsStyles = css`
	${textSans.medium({ lineHeight: 'regular' })}
	color: ${palette.labs[300]};

	${darkModeCss`
        color: ${palette.labs[400]};
    `}
`;

const labsAnchorStyles = css`
	font-weight: bold;
	color: ${palette.labs[300]};
	font-style: normal;
	text-decoration: none;

	${darkModeCss`
        color: ${palette.labs[400]};
    `}
`;

const getStyles = (format: Format): SerializedStyles => {
	const { kicker } = getThemeStyles(format.theme);

	if (format.theme === Special.Labs) {
		return labsStyles;
	}

	switch (format.design) {
		case Design.Comment:
			return commentStyles(kicker);

		default:
			return styles(kicker);
	}
};

const getAnchorStyles = (format: Format): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(format.theme);
	if (format.theme === Special.Labs) {
		return labsAnchorStyles;
	}
	switch (format.design) {
		case Design.Comment:
			return commentAnchorStyles(kicker, inverted);

		default:
			return anchorStyles(kicker, inverted);
	}
};

const toReact = (format: Format) => (node: Node, index: number): ReactNode => {
	switch (node.nodeName) {
		case 'A':
			return (
				<a
					href={withDefault('')(getHref(node))}
					css={getAnchorStyles(format)}
					key={`anchor-${index}`}
				>
					{node.textContent ?? ''}
				</a>
			);
		case 'SPAN':
			return Array.from(node.childNodes).map(toReact(format));
		case '#text':
			return node.textContent;
	}
};

const renderText = (format: Format, byline: DocumentFragment): ReactNode =>
	Array.from(byline.childNodes).map((node, i) => toReact(format)(node, i));

const Byline: FC<Props> = ({ bylineHtml, ...format }) =>
	pipe2(
		bylineHtml,
		map((byline) => (
			<address css={getStyles(format)}>
				{renderText(format, byline)}
			</address>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Byline;
