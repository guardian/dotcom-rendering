/* eslint-disable jsx-a11y/no-static-element-interactions -- TODO https://github.com/guardian/dotcom-rendering/issues/8161 */
/* eslint-disable jsx-a11y/click-events-have-key-events -- TODO https://github.com/guardian/dotcom-rendering/issues/8161 */
import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';
import {
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import { useState } from 'react';
import { decidePalette } from '../lib/decidePalette';
import type { TableOfContentsItem } from '../types/frontend';
import type { Palette } from '../types/palette';

interface Props {
	tableOfContents: TableOfContentsItem[];
	format: ArticleFormat;
}

const anchorStyles = (palette: Palette) => css`
	color: ${palette.text.tableOfContents};
	text-decoration: none;
	display: block;
`;

const listItemStyles = (format: ArticleFormat, palette: Palette) => {
	const fontWeight =
		format.display === ArticleDisplay.Immersive ? 'light' : 'bold';
	return css`
		${headline.xxxsmall({ fontWeight })};
		box-sizing: border-box;
		border-top: 1px solid ${neutral[86]};
		padding-bottom: ${space[4]}px;
		padding-top: ${space[1]}px;
		display: flex;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			background-color: ${palette.text.tableOfContents};
			width: 100%;
			height: 0;
			transition: height 0.2s ease;
			top: 0;
			left: 0;
		}

		&:hover::before {
			height: ${space[1]}px;
		}
	`;
};

const detailsStyles = css`
	margin: ${space[4]}px 0 ${space[6]}px 0;
	&:not([open]) .is-open,
	&[open] .is-closed {
		display: none;
	}
	&:not([open]) {
		border-bottom: 1px solid ${neutral[86]};
	}
	/* removes toggle triangle from webkit browsers such as Safari */
	summary::-webkit-details-marker {
		display: none;
	}
`;

const summaryStyles = (palette: Palette) => css`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	position: relative;
	list-style: none;

	padding: ${space[1]}px 0;
	border-top: 1px solid ${neutral[86]};

	&:hover {
		text-decoration: underline;
	}

	path {
		fill: ${palette.text.tableOfContents};
	}
`;

const titleStyle = (palette: Palette) => css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	color: ${palette.text.tableOfContents};
`;

const indexStyle = css`
	margin-right: 18px;
`;

const verticalStyle = css`
	position: absolute;
	left: ${space[4]}px;
	border-left: 1px solid ${neutral[86]};
	height: 22px;
	top: 0;
	transition: 0.3s all ease;
`;

/**
 * A table of contents, shown at the top of an article
 * to allow readers to quickly navigate though articles.
 *
 * ## Why does this need to be an Island?
 *
 * We are responding to user interactions on the page.
 *
 */

export const TableOfContents = ({ tableOfContents, format }: Props) => {
	const palette = decidePalette(format);
	const [open, setOpen] = useState(tableOfContents.length < 5);

	return (
		<details
			open={open}
			css={detailsStyles}
			data-component="table-of-contents"
		>
			<summary
				onClick={(e): void => {
					e.preventDefault();
					setOpen(!open);
				}}
				data-link-name={
					open ? 'table-of-contents-close' : 'table-of-contents-open'
				}
				css={summaryStyles(palette)}
			>
				<h2 css={titleStyle(palette)}>Jump to</h2>
				<span className="is-closed">
					<SvgChevronDownSingle size="xsmall" />
				</span>
				<span className="is-open">
					<SvgChevronUpSingle size="xsmall" />
				</span>
			</summary>

			<ul>
				{tableOfContents.map((item, index) => (
					<li
						key={item.id}
						css={listItemStyles(format, palette)}
						data-link-name={`table-of-contents-item-${index}-${item.id}`}
					>
						{format.display === ArticleDisplay.NumberedList && (
							<>
								<span css={indexStyle}>{index + 1}</span>
								<div css={verticalStyle}></div>
							</>
						)}

						<a href={`#${item.id}`} css={anchorStyles(palette)}>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</details>
	);
};
