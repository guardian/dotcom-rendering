import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	line,
	neutral,
	remSpace,
	// text,
	textSans,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import type { TOCType } from 'src/types/frontend';

interface Props {
	tableOfContents: TOCType[];
}

// const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
// 	color: ${text.paragraph(format)};
// 	border-bottom: none;
// 	:hover {
// 		border-bottom: 0.0625rem solid ${neutral[86]};
// 	}
// `;

// const listStyles: SerializedStyles = css`
// 	> li::before {
// 		content: none;
// 	}
// 	margin: 0;
// 	> li {
// 		padding-left: ${remSpace[3]};
// 	}
// `;

// const listItemStyles: SerializedStyles = css`
// 	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'regular' })}
// 	border-bottom: ${line.primary} 1px solid;
// 	padding-top: ${remSpace[2]};
// `;

const detailsStyles: SerializedStyles = css`
	margin-bottom: 1.25rem;
	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
`;

const summaryStyles: SerializedStyles = css`
	cursor: pointer;
	position: relative;
	list-style: none;
	align-items: center;
	padding-left: ${remSpace[3]};
	padding-top: 0.44rem;
	padding-bottom: 0.375rem;
	border-bottom: ${line.primary} 1px solid;
	border-top: ${line.primary} 1px solid;
	path {
		fill: ${neutral[46]};
	}
	svg {
		height: 2rem;
	}
`;

const titleStyle: SerializedStyles = css`
	${textSans.xsmall({ lineHeight: 'regular' })}
	color: ${neutral[46]};
`;

const arrowPosition: SerializedStyles = css`
	position: absolute;
	right: ${remSpace[1]};
	top: 0;
`;

export const TableOfContents = ({ tableOfContents }: Props) => {
	return (
		<details open={tableOfContents.length < 5} css={detailsStyles}>
			<summary css={summaryStyles}>
				<h2 css={titleStyle}>Jump to...</h2>
				<span className="is-off" css={arrowPosition}>
					<SvgChevronDownSingle size="xsmall" />
				</span>
				<span className="is-on" css={arrowPosition}>
					<SvgChevronUpSingle size="xsmall" />
				</span>
				{tableOfContents.map((item) => (
					<li>
						<a href={`#${item.id}`}>{item.title}</a>
					</li>
				))}
			</summary>
		</details>
	);
};
