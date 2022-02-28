import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	neutral,
	focusHalo,
	remSpace,
	space,
	textSans,
	transitions,
	until,
	visuallyHidden,
	news,
} from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { Props, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { timeAgo } from '@guardian/libs';
import { css } from '@emotion/react';
import PlusIcon from '../../static/icons/plus.svg';
import { LiveBlock } from './LiveBlock';

const pinnedPostContainer = css`
	border: 1px solid ${news[300]};
	margin-bottom: ${space[6]}px;
	position: relative;
`;

const pinnedPostRow = css`
	background: ${news[300]};
	height: 2rem;
	display: flex;
	align-items: center;
`;

const button = css`
	position: absolute;
	width: 20%;
	justify-content: space-between;
	align-items: center;
	background: ${news[300]};
	padding: ${remSpace[2]} 0 ${remSpace[6]} 0;
	cursor: pointer;
	z-index: 999999;
	outline: none;
	border: 0;
	border-radius: 1rem;
	text-align: left;
	font-weight: bold;
	font-size: 15px;
	color: white;
	height: 2rem;
	display: flex;
	bottom: -1rem;

	&:focus div {
		${focusHalo};
	}
`;

// const labelText = css`
// 	${headline.xxxsmall({ fontWeight: 'bold' })};
// 	margin-right: ${remSpace[4]};
// `;

const expandedBodyStyles = css`
	/*
	TODO:
	Hardcoded max-height because auto is invalid.
	If content is longer, we'll need to set overflow: auto
	but only after max-height has been reached.
	Otherwise, for short content we'll always see a flash
	of a scrollbar as the row height is transitioning
	*/
	transition: max-height ${transitions.medium};
	overflow: hidden;
	height: auto;
`;

const expandedBody = css`
	${expandedBodyStyles};
`;

const collapsedBodyStyles = css`
	min-height: 50px;
	max-height: 50px;

	/*
	TODO:
	This transition is being ignored as the hidden
	attribute is applied immediately
	transition: max-height ${transitions.short};
	*/
	overflow: hidden;
`;
const collapsedBody = css`
	${collapsedBodyStyles};
`;

// const noJsInput = css`
// 	${visuallyHidden};
// 	&:focus + [data-target='label'] > [data-target='toggle'] {
// 		${focusHalo};
// 	}
// 	&:not(:checked) ~ [data-target='body'] {
// 		${collapsedBodyStyles};
// 		display: none;
// 	}
// 	&:checked ~ [data-target='body'] {
// 		${expandedBodyStyles};
// 	}
// 	&:not(:checked) + [data-target='label'] [data-target='toggle-label-hide'] {
// 		display: none;
// 	}
// 	&:checked + [data-target='label'] [data-target='toggle-label-show'] {
// 		display: none;
// 	}
// `;

const toggle = css`
	width: auto;
	display: flex;
	align-items: center;
`;

const toggleLabel = css`
	${textSans.small({ fontWeight: 'bold' })};
	${until.tablet} {
		${visuallyHidden}
	}
`;

const toggleIconWithLabel = css`
	svg {
		width: 18px;
		height: 18px;
	}
`;

export interface PinnedPostProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>,
		Props {
	pinnedPost: Block;
	/**
	 * A line of text to summarise the information that lies within the expanded state.
	 * Appears in the collapsed state, as well as prominently at the top of the expanded state.
	 */
	label?: string;

	/**
	 * @ignore passed down by the parent <Accordion />
	 */
	hideToggleLabel?: boolean;
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
	adTargeting: AdTargeting;
	host?: string;
	ajaxUrl: string;
	isLiveUpdate?: boolean;
}

/**
 * [Storybook](https://guardian.github.io/source/?path=/docs/packages-source-react-components-accordion--playground) •
 * [Design System](https://theguardian.design/2a1e5182b/p/38c5aa-accordion/b/92b71e) •
 * [GitHub](https://github.com/guardian/source/blob/main/packages/@guardian/source-react-components/src/accordion/AccordionRow.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 */
export const PinnedPost = ({
	pinnedPost,
	hideToggleLabel = false,
	format,
	pageId,
	webTitle,
	adTargeting,
	host,
	ajaxUrl,
	isLiveUpdate,
}: PinnedPostProps): EmotionJSX.Element => {
	const [expanded, setExpanded] = useState(false);
	const collapse = () => setExpanded(false);
	const expand = () => setExpanded(true);
	const [isBrowser, setIsBrowser] = useState(false);
	function handleClick() {
		if (expanded) {
			console.log('collapsed');
			collapse();
		} else {
			console.log('expanded');
			expand();
		}
	}

	useEffect(() => {
		setIsBrowser(true);
	});

	// const publishedDate = new Date(pinnedPost.blockFirstPublished);

	if (isBrowser) {
		return (
			<div css={pinnedPostContainer}>
				<div css={pinnedPostRow}>
					<PlusIcon height="2rem" width="2rem" fill="white" />

					<time
						data-relativeformat="med"
						css={css`
							color: ${neutral[46]};
							font-weight: bold;
							margin: 0 ${space[6]}px;
						`}
					>
						{pinnedPost.blockFirstPublished && (
							<p>
								from {timeAgo(pinnedPost.blockFirstPublished)}
							</p>
						)}
					</time>
				</div>

				<div css={expanded ? expandedBody : collapsedBody}>
					<LiveBlock
						format={format}
						block={pinnedPost}
						pageId={pageId}
						webTitle={webTitle}
						adTargeting={adTargeting}
						host={host}
						ajaxUrl={ajaxUrl}
						isLiveUpdate={isLiveUpdate}
					/>
				</div>

				<button
					type="button"
					aria-expanded={expanded}
					onClick={handleClick}
					css={() => [
						button,
						!hideToggleLabel ? toggleIconWithLabel : '',
					]}
				>
					<div css={toggle}>
						{expanded ? <SvgPlus /> : <SvgMinus />}
						<span css={toggleLabel}>
							{expanded ? 'Show Less' : 'Show More'}
						</span>
					</div>
				</button>
			</div>
		);
	}

	return <div>no js</div>;
};
