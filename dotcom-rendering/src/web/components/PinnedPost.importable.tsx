import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	neutral,
	focusHalo,
	space,
	textSans,
	news,
	from,
} from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { Props, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { timeAgo } from '@guardian/libs';
import { css } from '@emotion/react';
import PinIcon from '../../static/icons/pin.svg';
import { LiveBlock } from './LiveBlock';

const pinnedPostContainer = css`
	border: 3px solid ${news[300]};
	margin-bottom: ${space[6]}px;
	position: relative;
	background: ${neutral[100]};
`;

const pinnedPostRow = css`
	background: ${news[300]};
	height: 2rem;
	display: flex;
	align-items: center;
	svg {
		fill: ${neutral[100]};
		width: 18px;
		height: 24px;
	}
`;

const timeAgoText = css`
	${textSans.small({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	margin-left: 2.6rem;
`;
// const overlay = css`
// 	height: 7rem;
// 	background-image: linear-gradient(
// 		0deg,
// 		#ffffff,
// 		#ffffff,
// 		40%,
// 		rgba(255, 255, 255, 0)
// 	);
// 	z-index: 1;
// `;

const button = css`
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: absolute;
	width: 20%;
	background: ${news[300]};
	cursor: pointer;
	outline: none;
	border: 0;
	border-radius: 1rem;
	height: 2rem;
	bottom: -1rem;
	margin-left: 0.625rem;

	&:focus div {
		${focusHalo};
	}
	&:hover {
		background: ${news[400]};
	}
	${from.tablet} {
		margin-left: 3.75rem;
	}
`;

const expandedBody = css`
	overflow: hidden;
	height: auto;
`;

const collapsedBody = css`
	max-height: 40vh;
	overflow: hidden;
`;

const toggleIcon = css`
	svg {
		fill: ${neutral[100]};
		width: 18px;
		height: 18px;
	}
`;
const toggleLabel = css`
	${textSans.small({ fontWeight: 'bold', lineHeight: 'tight' })};
	color: ${neutral[100]};
`;

export interface PinnedPostProps extends Props {
	pinnedPost: Block;
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
	adTargeting: AdTargeting;
	host?: string;
	ajaxUrl: string;
	isLiveUpdate?: boolean;
}

export const PinnedPost = ({
	pinnedPost,
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
	const [showButton, setShowButton] = useState(false);
	function handleClick() {
		if (expanded) {
			collapse();
		} else {
			expand();
		}
	}

	useEffect(() => {
		if (
			document.documentElement.scrollHeight >
			document.documentElement.clientHeight
		) {
			setShowButton(true);
		}
	}, []);

	useEffect(() => {
		// if js is disabled during time in browser, will this break?
		setIsBrowser(true);
	}, []);

	// const publishedDate = new Date(pinnedPost.blockFirstPublished);

	if (isBrowser) {
		return (
			<div css={pinnedPostContainer}>
				<div css={pinnedPostRow}>
					<PinIcon fill="white" />

					{pinnedPost.blockFirstPublished && (
						<time data-relativeformat="med" css={timeAgoText}>
							From {timeAgo(pinnedPost.blockFirstPublished)}
						</time>
					)}
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
						isPinnedBlock={true}
					/>
				</div>
				{showButton && (
					<button
						type="button"
						aria-expanded={expanded}
						onClick={handleClick}
						css={() => [button, toggleIcon]}
					>
						{expanded ? <SvgMinus /> : <SvgPlus />}
						<span css={toggleLabel}>
							{expanded ? 'Show Less' : 'Show More'}
						</span>
					</button>
				)}
				{/* {!expanded && <div css={overlay} />} */}
			</div>
		);
	}

	return <div>js is disabled</div>;
};
