// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import {
	headlineMedium17,
	neutral,
	remSpace,
	textSans14,
	textSansItalic14,
} from '@guardian/source/foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { withDefault } from '../../../vendor/@guardian/types/index';
import Anchor from 'components/Anchor';
import { maybeRender } from 'lib';
import { text } from 'palette';
import type { FC, ReactNode } from 'react';
import { getHref, renderTextElement } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Caption Elements ----- //

const headingStyles = css`
	${headlineMedium17};
	color: ${neutral[86]};
	margin: 0 0 ${remSpace[3]};
	display: block;
`;

const emStyles = css`
	${textSansItalic14};
	> span {
		font-style: italic;
	}
`;

const anchorStyles = (format: ArticleFormat): SerializedStyles | undefined =>
	format.design === ArticleDesign.Gallery ||
	format.design === ArticleDesign.Audio ||
	format.design === ArticleDesign.Video ||
	format.design === ArticleDesign.Picture
		? css`
				color: ${neutral[86]};
		  `
		: undefined;

const textStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans14};
	color: ${text.figCaption(format)};
	${darkModeCss`
		color: ${text.figCaptionDark(format)};
	`}
`;

const captionElement =
	(format: ArticleFormat) =>
	// eslint-disable-next-line react/display-name -- not a normal React component
	(node: Node, key: number): ReactNode => {
		const text = node.textContent ?? '';
		const children = Array.from(node.childNodes).map(
			captionElement(format),
		);

		switch (node.nodeName) {
			case 'STRONG':
				return format.design === ArticleDesign.Gallery ? (
					<h2 css={headingStyles} key={key}>
						{children}
					</h2>
				) : (
					children
				);
			case 'BR':
				return null;
			case 'EM':
				return (
					<em css={emStyles} key={key}>
						{children}
					</em>
				);
			case 'A':
				return (
					<Anchor
						href={withDefault('')(getHref(node))}
						className={anchorStyles(format)}
						format={format}
						key={key}
					>
						{children}
					</Anchor>
				);
			case '#text':
				return (
					<span css={textStyles(format)} key={key}>
						{text}
					</span>
				);
			default:
				return renderTextElement(format)(node, key);
		}
	};

// ----- Component ----- //

type Props = {
	caption: Option<DocumentFragment>;
	format: ArticleFormat;
};

const Caption: FC<Props> = ({ caption, format }) =>
	maybeRender(caption, (cap) => (
		<>{Array.from(cap.childNodes).map(captionElement(format))}</>
	));

// ----- Exports ----- //

export default Caption;
