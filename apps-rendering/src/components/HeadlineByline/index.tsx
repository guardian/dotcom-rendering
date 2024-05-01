import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import {
	from,
	headline,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { withDefault } from '../../../vendor/@guardian/types/index';
import { maybeRender } from 'lib';
import { background } from 'palette';
import type { FC, ReactNode } from 'react';
import { getHref } from 'renderer';
import { darkModeCss } from 'styles';

const toReact = (format: ArticleFormat) => {
	return function getReactNode(node: Node, index: number): ReactNode {
		switch (node.nodeName) {
			case 'A':
				return (
					<a
						href={withDefault('')(getHref(node))}
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
};

const renderText = (
	format: ArticleFormat,
	byline: DocumentFragment,
): ReactNode =>
	Array.from(byline.childNodes).map((node, i) => toReact(format)(node, i));

const headlineBox = (format: ArticleFormat): SerializedStyles => css`
	${format.theme === ArticleSpecial.Labs
		? textSans.large({ lineHeight: 'regular' })
		: headline.xxsmall({
				fontWeight: 'medium',
				lineHeight: 'loose',
		  })}
	font-style: italic;

	a {
		color: inherit;
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const addressStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.headlineByline(format)};
	padding: 0 ${remSpace[3]};
	width: fit-content;

	${from.wide} {
		padding: 0 ${remSpace[2]};
	}

	${darkModeCss`
		background-color: ${background.headlineBylineDark(format)};
	`}
`;

type Props = {
	format: ArticleFormat;
	bylineHtml: Option<DocumentFragment>;
};

const HeadlineByline: FC<Props> = ({ format, bylineHtml }) =>
	maybeRender(bylineHtml, (byline) => (
		<div css={headlineBox(format)}>
			<address css={addressStyles(format)}>
				{renderText(format, byline)}
			</address>
		</div>
	));

// ----- Exports ----- //

export default HeadlineByline;
