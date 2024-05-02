import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	headlineBold17,
	headlineLight17,
	remSpace,
	textSans14,
	textSansBold17,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import Anchor from 'components/Anchor';
import ListItem from 'components/ListItem';
import OrderedList from 'components/OrderedList';
import type { Outline } from 'outline';
import { border, text } from 'palette';
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
	display: block;
	${darkModeCss`
		color: ${text.paragraphDark(format)};
	`}
`;

const listStyles: SerializedStyles = css`
	> li::before {
		content: none;
	}
	margin: 0;
`;

const defaultListItemStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.paragraph(format)};
	box-sizing: border-box;
	border-top: 1px solid ${border.tableOfContents(format)};
	padding-bottom: ${remSpace[4]};
	padding-top: ${remSpace[1]};
	display: flex;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		background-color: ${border.tableOfContentsHover(format)};
		width: 100%;
		height: 0;
		transition: height 0.2s ease;
		top: 0;
		left: 0;
	}

	&:hover::after {
		height: ${remSpace[1]};
	}

	${darkModeCss`
		&::after {
			background-color: ${border.tableOfContentsHoverDark(format)};
		}
		color: ${text.paragraphDark(format)};
	`}
`;

const listItemStyles = (format: ArticleFormat): SerializedStyles => {
	if (format.display === ArticleDisplay.Immersive) {
		return css`
			${headlineLight17}
			${defaultListItemStyles(format)}
		`;
	}

	if (format.theme === ArticleSpecial.Labs) {
		return css`
			${textSansBold17}
			${defaultListItemStyles(format)}
		`;
	}

	return css`
		${headlineBold17}
		${defaultListItemStyles(format)}
	`;
};

const detailsStyles = (format: ArticleFormat): SerializedStyles => css`
	margin-bottom: ${remSpace[6]};
	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}
	&:not([open]) {
		border-bottom: 1px solid ${border.tableOfContents(format)};
	}
	summary::-webkit-details-marker {
		display: none;
	}

	${darkModeCss`
		&:not([open]) {
			border-bottom: 1px solid ${border.tableOfContentsDark(format)};
		}
	`}
`;

const summaryStyles = (format: ArticleFormat): SerializedStyles => css`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	position: relative;
	list-style: none;
	padding: ${remSpace[1]} 0;
	border-top: 1px solid ${border.tableOfContents(format)};

	&:hover {
		text-decoration: underline;
	}

	path {
		fill: ${text.tableOfContentsTitle(format)};
	}
	${darkModeCss`
		border-color: ${border.tableOfContentsDark(format)};
		&:hover {
			border-color: ${border.tableOfContentsHoverDark(format)};
		}

		path {
			fill: ${text.tableOfContentsTitleDark(format)};
		}
	`}
`;

const titleStyle = (format: ArticleFormat): SerializedStyles => css`
	${textSans14};
	color: ${text.tableOfContentsTitle(format)};
	${darkModeCss`
		color: ${text.tableOfContentsTitleDark(format)};
	`}
`;

const indexStyle = css`
	margin-right: 18px;
`;

const verticalLineStyle = (format: ArticleFormat): SerializedStyles => css`
	position: absolute;
	left: 1.125rem;
	border-left: 1px solid ${border.tableOfContents(format)};
	height: 1.375rem;
	top: 0;
	transition: 0.3s all ease;
	${darkModeCss`
		border-color: ${border.tableOfContentsDark(format)};
	`}
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
		<details open={outline.length < 5} css={detailsStyles(format)}>
			<summary css={summaryStyles(format)}>
				<h2 css={titleStyle(format)}>Jump to</h2>
				<span className="is-off">
					<SvgChevronDownSingle size="xsmall" />
				</span>
				<span className="is-on">
					<SvgChevronUpSingle size="xsmall" />
				</span>
			</summary>
			<OrderedList className={listStyles}>
				{outline.map((outlineItem, index) => (
					<ListItem
						className={listItemStyles(format)}
						key={outlineItem.id}
					>
						{format.display === ArticleDisplay.NumberedList && (
							<>
								<span css={indexStyle}>{index + 1}</span>
								<div css={verticalLineStyle(format)}></div>
							</>
						)}
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
