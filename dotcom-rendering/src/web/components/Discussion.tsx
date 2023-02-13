import { css } from '@emotion/react';
import { App as Comments } from '@guardian/discussion-rendering';
import { joinUrl } from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import { SvgPlus } from '@guardian/source-react-components';
import { EditorialButton } from '@guardian/source-react-components-development-kitchen';
import { useEffect, useState } from 'react';
import { getCommentContext } from '../lib/getCommentContext';
import { revealStyles } from '../lib/revealStyles';
import { useDiscussion } from '../lib/useDiscussion';

export type Props = {
	format: ArticleFormat;
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	user?: UserProfile;
	idApiUrl: string;
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
	if (!hash.includes('comment')) return;

	const [, commentId] = hash.split('-');
	if (!commentId) return;

	return parseInt(commentId, 10);
};

export const Discussion = ({
	format,
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	user,
	idApiUrl,
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

	const hasCommentsHash =
		typeof window !== 'undefined' && window.location.hash === '#comments';

	const handlePermalink = (commentId: number) => {
		if (typeof window === 'undefined') return false;
		window.location.hash = `#comment-${commentId}`;
		// Put this comment id into the hashCommentId state which will
		// trigger an api call to get the comment context and then expand
		// and reload the discussion based on the results
		setHashCommentId(commentId);
		return false;
	};

	const dispatchCommentsExpandedEvent = () => {
		const event = new CustomEvent('comments-expanded');
		document.dispatchEvent(event);
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
				.catch((e) =>
					console.error(`getCommentContext - error: ${String(e)}`),
				);
		}
	}, [discussionApiUrl, hashCommentId]);

	useEffect(() => {
		if (hasCommentsHash) {
			setIsExpanded(true);
		}
	}, [hasCommentsHash]);

	useEffect(() => {
		const pendingElements = document.querySelectorAll<HTMLElement>(
			'.discussion > .pending',
		);
		pendingElements.forEach((element) => {
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
				<div className="pending" data-cy="discussion">
					<Comments
						user={user}
						baseUrl={discussionApiUrl}
						pillar={format.theme}
						initialPage={commentPage}
						pageSizeOverride={commentPageSize}
						isClosedForComments={
							!!isClosedForComments || !enableDiscussionSwitch
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
						idApiUrl={idApiUrl}
					/>
					{!isExpanded && (
						<div id="discussion-overlay" css={overlayStyles} />
					)}
				</div>
			</div>
			{!isExpanded && (
				<EditorialButton
					format={format}
					onClick={() => {
						setIsExpanded(true);
						dispatchCommentsExpandedEvent();
					}}
					icon={<SvgPlus />}
				>
					View more comments
				</EditorialButton>
			)}
		</>
	);
};
