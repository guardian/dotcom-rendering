import { css } from '@emotion/react';
import { line, neutral, space, textSans } from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import type { TableOfContentsItem } from '../../types/frontend';

interface Props {
	tableOfContents: TableOfContentsItem[];
}

const anchorStyles = css`
	color: black;
	text-decoration: none;
`;

const listItemStyles = css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'regular' })}
	border-bottom: 1px solid ${line.primary};
	padding: 6px 0;
`;

const detailsStyles = css`
	padding: 6px 0;
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
	border-bottom: 1px solid ${line.primary};
	border-top: 1px solid ${line.primary};

	path {
		fill: ${neutral[46]};
	}
	svg {
		height: 32px;
	}
`;

const titleStyle = css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	color: ${neutral[46]};
`;

const chevronPosition = css`
	position: absolute;
	right: ${space[1]}px;
	top: 0;
`;

export const TableOfContents = ({ tableOfContents }: Props) => {
	return (
		<details open={tableOfContents.length < 5} css={detailsStyles}>
			<summary css={summaryStyles}>
				<h2 css={titleStyle}>Jump to...</h2>
				<span className="is-closed" css={chevronPosition}>
					<SvgChevronDownSingle size="xsmall" />
				</span>
				<span className="is-open" css={chevronPosition}>
					<SvgChevronUpSingle size="xsmall" />
				</span>
			</summary>

			<ul>
				{tableOfContents.map((item) => (
					<li css={listItemStyles}>
						<a href={`#${item.id}`} css={anchorStyles}>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</details>
	);
};
