import { css } from '@emotion/react';
import {
	headline,
	line,
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

interface Props {
	tableOfContents: TableOfContentsItem[];
}

const anchorStyles = css`
	color: ${neutral[7]};
	text-decoration: none;
`;

const listItemStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	border-top: 1px solid ${line.primary};
	padding: 6px 0;
	&:hover {
		border-top: 1px solid ${neutral[7]};
		cursor: pointer;
	}
`;

const detailsStyles = css`
	padding: ${space[4]}px 0 ${space[6]}px 0;
	&:not([open]) .is-open,
	&[open] .is-closed {
		display: none;
	}
	/* removes toggle triangle from webkit browsers such as Safari */
	summary::-webkit-details-marker {
		display: none;
	}
`;

const summaryStyles = css`
	cursor: pointer;
	position: relative;
	list-style: none;
	align-items: center;
	padding: 6px 0;
	border-top: 1px solid ${line.primary};

	&:hover {
		border-top: 1px solid ${neutral[7]};
		cursor: pointer;
	}

	path {
		fill: ${neutral[7]};
	}
	svg {
		height: 32px;
	}
`;

const titleStyle = css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	color: ${neutral[7]};
`;

const chevronPosition = css`
	position: absolute;
	right: ${space[1]}px;
	top: 0;
`;

export const TableOfContents = ({ tableOfContents }: Props) => {
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
				css={summaryStyles}
			>
				<h2 css={titleStyle}>Jump to...</h2>
				<span className="is-closed" css={chevronPosition}>
					<SvgChevronDownSingle size="xsmall" />
				</span>
				<span className="is-open" css={chevronPosition}>
					<SvgChevronUpSingle size="xsmall" />
				</span>
			</summary>

			<ul>
				{tableOfContents.map((item, index) => (
					<li
						key={item.id}
						css={listItemStyles}
						data-link-name={`table-of-contents-item-${index}-${item.id}`}
					>
						<a href={`#${item.id}`} css={anchorStyles}>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</details>
	);
};
