import { css } from '@emotion/react';
import {
	headlineBold17,
	headlineLight17,
	space,
	textSansBold14,
} from '@guardian/source/foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { ArticleDisplay, type ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import type { TableOfContentsItem } from '../model/enhanceTableOfContents';
import { palette } from '../palette';

interface Props {
	tableOfContents: TableOfContentsItem[];
	format: ArticleFormat;
}

const anchorStyles = css`
	color: ${palette('--table-of-contents')};
	text-decoration: none;
	display: block;
	width: 100%;
`;

const paddingStyles = css`
	padding-bottom: ${space[4]}px;
	padding-top: ${space[1]}px;
`;

const listItemStyles = (format: ArticleFormat) => {
	return css`
		${format.display === ArticleDisplay.Immersive
			? headlineLight17
			: headlineBold17};
		box-sizing: border-box;
		border-top: 1px solid ${palette('--table-of-contents-border')};
		display: flex;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			background-color: ${palette('--table-of-contents')};
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
		border-bottom: 1px solid ${palette('--table-of-contents-border')};
	}
	/* removes toggle triangle from webkit browsers such as Safari */
	summary::-webkit-details-marker {
		display: none;
	}
`;
const stickyStyles = css`
	position: sticky;
	top: -1px;
	background: ${palette('--article-background')};
	z-index: ${getZIndex('tableOfContents')};
	summary {
		z-index: 1;
		background: ${palette('--article-background')};
	}
	ul {
		max-height: 90vh;
		overflow-y: auto;
	}
`;

const summaryStyles = css`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	position: relative;
	list-style: none;

	padding: ${space[1]}px 0;
	border-top: 1px solid ${palette('--table-of-contents-border')};

	&:hover {
		text-decoration: underline;
	}

	path {
		fill: ${palette('--table-of-contents')};
	}
`;

const titleStyle = css`
	${textSansBold14}
	color:${palette('--table-of-contents')};
`;

const indexStyle = css`
	margin-right: 18px;
`;

const verticalStyle = css`
	position: absolute;
	left: ${space[4]}px;
	border-left: 1px solid ${palette('--table-of-contents-border')};
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
	const [open, setOpen] = useState(tableOfContents.length < 5);
	const tocRef = useRef<HTMLDetailsElement>(null);

	// Automatically collapse the ToC when it becomes sticky (i.e. when it reaches the top of the viewport). This
	// approach is inspired by:
	// https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/
	useEffect(() => {
		const tocElement = tocRef.current;

		if (!tocElement) return;

		const observer = new IntersectionObserver(
			([e]) => {
				// Verify whether the ToC is at the top of the viewport or the bottom. It should only collapse when it
				// reaches the top.
				if (e && e.boundingClientRect.top < 0) {
					setOpen(false);
				}
			},
			{ threshold: [1] },
		);

		observer.observe(tocElement);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<details
			ref={tocRef}
			open={open}
			css={[detailsStyles, stickyStyles]}
			data-component="table-of-contents"
		>
			<summary
				onClick={(e): void => {
					e.preventDefault();
					setOpen((state) => !state);
				}}
				onKeyDown={(e): void => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen((state) => !state);
					}
				}}
				data-link-name={
					open ? 'table-of-contents-close' : 'table-of-contents-open'
				}
				css={summaryStyles}
				tabIndex={0}
				role="button"
			>
				<h2 css={titleStyle}>Jump to</h2>
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
						css={listItemStyles(format)}
						data-link-name={`table-of-contents-item-${index}-${item.id}`}
					>
						{format.display === ArticleDisplay.NumberedList && (
							<div css={paddingStyles}>
								<span css={indexStyle}>{index + 1}</span>
								<div css={verticalStyle}></div>
							</div>
						)}

						<a
							href={`#${item.id}`}
							css={[anchorStyles, paddingStyles]}
							onClick={(): void => {
								setOpen((state) => !state);
							}}
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</details>
	);
};
