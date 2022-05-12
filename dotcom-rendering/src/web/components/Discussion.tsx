import { useState, useEffect } from 'react';
import { css } from '@emotion/react';

import { joinUrl } from '@guardian/libs';
import { neutral, space } from '@guardian/source-foundations';
import { App as Comments } from '@guardian/discussion-rendering';
import { EditorialButton } from '@guardian/source-react-components-development-kitchen';
import { SvgPlus } from '@guardian/source-react-components';
import { SignedInAs } from './SignedInAs';
import { Hide } from './Hide';
import { getCommentContext } from '../lib/getCommentContext';
import { useDiscussion } from '../lib/useDiscussion';
import { decidePalette } from '../lib/decidePalette';
import { revealStyles } from '../lib/revealStyles';

export type Props = {
	format: ArticleFormat;
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	user?: UserProfile;
};

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${neutral[100]},
		${neutral[100]} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 80px;
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100%;
	display: block;
`;

const fixHeight = css`
	max-height: 280px;
	min-height: 280px;
	overflow: hidden;
`;

const positionRelative = css`
	position: relative;
`;

const commentIdFromUrl = () => {
	if (typeof window === 'undefined') return;
	const { hash } = window.location;
	if (!hash) return;
	if (!hash.includes('comment')) return;
	if (!hash.split('-')[1]) return;
	return parseInt(hash.split('-')[1], 10);
};

export const Discussion = ({
	format,
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	user,
}: Props) => {
	const [commentPage, setCommentPage] = useState<number>();
	const [commentPageSize, setCommentPageSize] = useState<25 | 50 | 100>();
	const [commentOrderBy, setCommentOrderBy] = useState<
		'newest' | 'oldest' | 'recommendations'
	>();
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [hashCommentId, setHashCommentId] = useState<number | undefined>(
		commentIdFromUrl(),
	);

	const { commentCount, isClosedForComments } = useDiscussion(
		joinUrl(discussionApiUrl, 'discussion', shortUrlId),
	);

	const palette = decidePalette(format);

	const hasCommentsHash =
		typeof window !== 'undefined' &&
		window.location &&
		window.location.hash === '#comments';

	const handlePermalink = (commentId: number) => {
		if (typeof window === 'undefined') return false;

		const newHash = `#comment-${commentId}`

		// If the comment is already on the page, scroll to
		// it directly. (If comment is not loaded, updating the hashCommentId
		// should trigger setCommentPage, which will trigger a page load in
		// discussion rendering.) We're adding scrolling here because React
		// doesn't register a click as a change of state, if the same link is
		// clicked twice. (Problem still persists for edge case of user navigating
		// to a different page of comments without changing the comment id.)
		document.querySelector(newHash)?.scrollIntoView();

		window.location.hash = newHash;

		// Put this comment id into the hashCommentId state which will
		// trigger an api call to get the comment context and then expand
		// and reload the discussion based on the results
		setHashCommentId(commentId);
		return false;
	};

	// Check the url to see if there is a comment hash, e.g. ...crisis#comment-139113120
	// If so, make a call to get the context of this comment so we know what page it is
	// on.
	useEffect(() => {
		if (hashCommentId) {
			getCommentContext(discussionApiUrl, hashCommentId)
				.then((context) => {
					setCommentPage(context.page);
					setCommentPageSize(context.pageSize);
					setCommentOrderBy(context.orderBy);
					setIsExpanded(true);
				})
				.catch((e) => console.error(`getCommentContext - error: ${e}`));
		}
	}, [discussionApiUrl, hashCommentId]);

	useEffect(() => {
		if (hasCommentsHash) {
			setIsExpanded(true);
		}
	}, [hasCommentsHash]);

	useEffect(() => {
		const pendingElements = document?.querySelectorAll<HTMLElement>(
			'.discussion > .pending',
		);
		pendingElements?.forEach((element) => {
			element.classList.add('reveal');
			element.classList.remove('pending');
		});
	}, []);

	useEffect(() => {
		// There's no point showing the view more button if there isn't much more to view
		if (commentCount === 0 || commentCount === 1 || commentCount === 2) {
			setIsExpanded(true);
		}
	}, [commentCount]);

	return (
		<>
			<div
				css={[positionRelative, revealStyles, !isExpanded && fixHeight]}
				className="discussion"
			>
				<div className="pending">
					<Hide when="above" breakpoint="leftCol">
						<div
							data-cy="discussion"
							css={css`
								padding-bottom: ${space[2]}px;
							`}
						>
							<SignedInAs
								palette={palette}
								enableDiscussionSwitch={enableDiscussionSwitch}
								user={user}
								commentCount={commentCount}
								isClosedForComments={isClosedForComments}
							/>
						</div>
					</Hide>
					<Comments
						user={user}
						baseUrl={discussionApiUrl}
						pillar={format.theme}
						initialPage={commentPage}
						pageSizeOverride={commentPageSize}
						isClosedForComments={
							isClosedForComments || !enableDiscussionSwitch
						}
						orderByOverride={commentOrderBy}
						shortUrl={shortUrlId}
						additionalHeaders={{
							'D2-X-UID': discussionD2Uid,
							'GU-Client': discussionApiClientHeader,
						}}
						expanded={isExpanded}
						commentToScrollTo={hashCommentId}
						onPermalinkClick={handlePermalink}
						apiKey="dotcom-rendering"
						onExpand={() => {
							setIsExpanded(true);
						}}
					/>
					{!isExpanded && (
						<div id="discussion-overlay" css={overlayStyles} />
					)}
				</div>
			</div>
			{!isExpanded && (
				<EditorialButton
					format={format}
					onClick={() => setIsExpanded(true)}
					icon={<SvgPlus />}
				>
					View more comments
				</EditorialButton>
			)}
		</>
	);
};
