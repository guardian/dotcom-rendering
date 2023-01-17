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
import type { TableOfContentsItem } from '../../types/frontend';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

interface Props {
	tableOfContents: TableOfContentsItem[];
	format: ArticleFormat;
}

const anchorStyles = (palette: Palette) => css`
	color: ${palette.text.tableOfContents};
	text-decoration: none;
	display: block;
`;

const defaultListItemStyles = (palette: Palette) => css`
	box-sizing: border-box;
	border-top: 1px solid ${neutral[86]};
	padding-bottom: ${space[4]}px;
	padding-top: ${space[1]}px;

	&:hover {
		padding-top: 1px;
		border-top: ${space[1]}px solid ${palette.text.tableOfContents};
		cursor: pointer;
	}
`;

const listItemStyles = (format: ArticleFormat, palette: Palette) => {
	if (format.display === ArticleDisplay.Immersive) {
		return css`
			${headline.xxxsmall({ fontWeight: 'light' })}
			${defaultListItemStyles(palette)}
		`;
	}

	return css`
		${headline.xxxsmall({ fontWeight: 'bold' })}
		${defaultListItemStyles(palette)}
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
		border-top: ${space[1]}px solid ${palette.text.tableOfContents};
		padding-top: 1px;
		cursor: pointer;
	}

	path {
		fill: ${palette.text.tableOfContents};
	}
`;

const titleStyle = (palette: Palette) => css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	color: ${palette.text.tableOfContents};
`;

export const TableOfContents = ({ tableOfContents, format }: Props) => {
	const palette = decidePalette(format);
	const [open, setOpen] = useState(tableOfContents.length < 5);

	// The value for data-link-name is evaluated at the time when the component renders,
	// So at the time when user clicks the table (onToggle is triggered),
	// the old value of open(before the click event) is used. As a result we need to
	// use toc-close for when open is true and toc-expand for when it's false
	return (
		<details
			open={open}
			css={detailsStyles}
			data-component="table-of-contents"
		>
			<summary
				onClick={() => {
					setOpen(!open);
				}}
				data-link-name={
					open
						? 'table-of-contents-close'
						: 'table-of-contents-expand'
				}
				css={summaryStyles(palette)}
			>
				<h2 css={titleStyle(palette)}>Jump to...</h2>
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
						<a href={`#${item.id}`} css={anchorStyles(palette)}>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</details>
	);
};
