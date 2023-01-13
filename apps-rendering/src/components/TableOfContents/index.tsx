import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	headline,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import Anchor from 'components/Anchor';
import ListItem from 'components/ListItem';
import OrderedList from 'components/OrderedList';
import type { Outline } from 'outline';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	format: ArticleFormat;
	outline: Outline;
}

interface TextElementProps {
	node: Node;
	key: string;
}

const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.paragraph(format)};
	border-bottom: none;
`;

const listStyles: SerializedStyles = css`
	> li::before {
		content: none;
	}

	margin: 0;
`;

const defaultListItemStyles: SerializedStyles = css`
	border-top: 1px solid ${neutral[86]};
	padding: ${remSpace[1]} 0 ${remSpace[2]} 0;
	&:last-child {
		border-bottom: 1px solid ${neutral[86]};
	}
	&:hover {
		border-top: 1px solid ${neutral[20]};
		cursor: pointer;
	}
	${darkModeCss`
		border-color: ${neutral[20]};
		&:last-child {
			border-bottom-color: ${neutral[20]};
		}
		&:hover {
			border-color: ${neutral[86]};
			&:last-child {
				border-bottom-color: ${neutral[20]};
			}
		}
	`}
`;

const listItemStyles = (format: ArticleFormat): SerializedStyles => {
	if (format.display === ArticleDisplay.Immersive) {
		return css`
			${headline.xxxsmall({ fontWeight: 'light' })}
			${defaultListItemStyles}
		`;
	}

	if (format.theme === ArticleSpecial.Labs) {
		return css`
			${textSans.medium({ fontWeight: 'bold' })}
			${defaultListItemStyles}
		`;
	}

	return css`
		${headline.xxxsmall({ fontWeight: 'bold' })}
		${defaultListItemStyles}
	`;
};

const detailsStyles: SerializedStyles = css`
	margin-bottom: ${remSpace[6]};
	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
`;

const summaryStyles = (format: ArticleFormat): SerializedStyles => css`
	cursor: pointer;
	position: relative;
	list-style: none;
	padding: ${remSpace[1]} 0 ${remSpace[2]} 0;
	border-top: 1px solid ${neutral[86]};

	&:hover {
		border-top: 1px solid ${neutral[20]};
		cursor: pointer;
	}

	path {
		fill: ${neutral[7]};
	}
	svg {
		height: 2rem;
	}
	${darkModeCss`
		border-color: ${neutral[20]};
		&:hover {
			border-color: ${neutral[86]};
		}

		path {
			fill: ${text.tableOfContentsTitleDark(format)};
		}
	`}
`;

const titleStyle = (format: ArticleFormat): SerializedStyles => css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	color: ${text.tableOfContentsTitle(format)};
	${darkModeCss`
		color: ${text.tableOfContentsTitleDark(format)};
	`}
`;

const arrowPosition: SerializedStyles = css`
	position: absolute;
	right: ${remSpace[1]};
	top: 0;
`;

const TocTextElement: React.FC<TextElementProps> = ({
	node,
	key,
}): ReactElement => {
	const text = node.textContent ?? '';
	const children = Array.from(node.childNodes).map((item, i) => {
		return <TocTextElement node={item} key={i.toString()} />;
	});

	switch (node.nodeName) {
		case 'H2':
			return <>{children}</>;
		case 'EM':
			return <em key={key}>{children}</em>;
		case 'SUB': {
			return (
				<sub
					css={css`
						font-size: smaller;
						vertical-align: sub;
					`}
					key={key}
				>
					{children}
				</sub>
			);
		}
		case 'SUP': {
			return (
				<sup
					css={css`
						font-size: smaller;
						vertical-align: super;
					`}
					key={key}
				>
					{children}
				</sup>
			);
		}
		case 'STRONG':
			return (
				<strong
					css={css`
						font-weight: bold;
					`}
					key={key}
				>
					{children}
				</strong>
			);
		case '#text':
		default:
			return <>{text}</>;
	}
};

const TableOfContents: FC<Props> = ({ format, outline }) => {
	return (
		<details open={outline.length < 5} css={detailsStyles}>
			<summary css={summaryStyles(format)}>
				<h2 css={titleStyle(format)}>Jump to...</h2>
				<span className="is-off" css={arrowPosition}>
					<SvgChevronDownSingle size="xsmall" />
				</span>
				<span className="is-on" css={arrowPosition}>
					<SvgChevronUpSingle size="xsmall" />
				</span>
			</summary>
			<OrderedList className={listStyles}>
				{outline.map((outlineItem) => (
					<ListItem
						className={listItemStyles(format)}
						key={outlineItem.id}
					>
						<Anchor
							format={format}
							href={`#${outlineItem.id}`}
							className={anchorStyles(format)}
						>
							<TocTextElement
								node={outlineItem.doc}
								key={outlineItem.id}
							/>
						</Anchor>
					</ListItem>
				))}
			</OrderedList>
		</details>
	);
};

export default TableOfContents;
