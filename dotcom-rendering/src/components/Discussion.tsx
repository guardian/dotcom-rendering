import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import { palette, space } from '@guardian/source-foundations';
import { Button, SvgPlus } from '@guardian/source-react-components';
import { useEffect, useReducer, useState } from 'react';
import { getDiscussion } from '../lib/discussionApi';
import {
	getCommentContext,
	initFiltersFromLocalStorage,
} from '../lib/getCommentContext';
import { useCommentCount } from '../lib/useCommentCount';
import { palette as themePalette } from '../palette';
import type {
	CommentType,
	FilterOptions,
	SignedInUser,
} from '../types/discussion';
import { Comments } from './Discussion/Comments';
import { Hide } from './Hide';
import { SignedInAs } from './SignedInAs';

export type Props = {
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	user?: SignedInUser;
	idApiUrl: string;
};

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${themePalette('--article-section-background')},
		${themePalette('--article-section-background')} 40%,
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

const rememberFilters = ({ threads, pageSize, orderBy }: FilterOptions) => {
	storage.local.set('gu.prefs.discussion.threading', threads);
	storage.local.set('gu.prefs.discussion.pagesize', pageSize);
	storage.local.set('gu.prefs.discussion.order', orderBy);
};

const commentIdFromUrl = () => {
	const { hash } = window.location;
	if (!hash.includes('comment')) return;

	const [, commentId] = hash.split('-');
	if (!commentId) return;

	return parseInt(commentId, 10);
};

/**
 * If a permalink is used and the threading is set to collapsed, this function remaps the threading filter to expanded.
 * We do this to ensure that threads are expanded in the UI while respecting the user's local preference.
 */
const remapToValidFilters = (
	filters: FilterOptions,
	hashCommentId: number | undefined,
) => {
	const permalinkBeingUsed =
		hashCommentId !== undefined && !Number.isNaN(hashCommentId);

	if (!permalinkBeingUsed) return filters;
	if (filters.threads !== 'collapsed') return filters;
	return {
		...filters,
		threads: 'expanded',
	} satisfies FilterOptions;
};

type State = {
	comments: CommentType[];
	isClosedForComments: boolean;
	isExpanded: boolean;
	commentPage: number;
	filters: FilterOptions;
	hashCommentId: number | undefined;
};

const initialState: State = {
	comments: [],
	isClosedForComments: false,
	isExpanded: false,
	commentPage: 1,
	filters: initFiltersFromLocalStorage(),
	hashCommentId: commentIdFromUrl(),
};

type Action =
	| {
			type: 'commentsLoaded';
			comments: CommentType[];
			isClosedForComments: boolean;
	  }
	| { type: 'expandComments' }
	| { type: 'addComment'; comment: CommentType }
	| { type: 'updateCommentPage'; commentPage: number; isExpanded: boolean }
	| {
			type: 'updateFilters';
			filters: FilterOptions;
	  }
	| { type: 'updateHashCommentId'; hashCommentId: number | undefined };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'commentsLoaded':
			return {
				...state,
				comments: action.comments,
				isClosedForComments: action.isClosedForComments,
			};
		case 'addComment':
			return {
				...state,
				comments: [action.comment, ...state.comments.slice(0, -1)],
				isExpanded: true,
			};
		case 'expandComments':
			return {
				...state,
				isExpanded: true,
			};
		case 'updateCommentPage':
			return {
				...state,
				commentPage: action.commentPage,
				isExpanded: action.isExpanded,
			};
		case 'updateFilters':
			return {
				...state,
				filters: action.filters,
				hashCommentId: undefined,
			};
		default:
			return state;
	}
};

export const Discussion = ({
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	user,
	idApiUrl,
}: Props) => {
	const [commentPage, setCommentPage] = useState(1);
	const [comments, setComments] = useState<CommentType[]>([]);
	const [isClosedForComments, setIsClosedForComments] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [hashCommentId, setHashCommentId] = useState<number | undefined>(
		commentIdFromUrl(),
	);
	const [filters, setFilters] = useState<FilterOptions>(
		initFiltersFromLocalStorage(),
	);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);

	const commentCount = useCommentCount(discussionApiUrl, shortUrlId);

	useEffect(() => {
		setLoading(true);
		void getDiscussion(shortUrlId, { ...filters, page: commentPage })
			.then((result) => {
				if (result.kind === 'error') {
					console.error(`getDiscussion - error: ${result.error}`);
					return;
				}

				setLoading(false);
				const { pages, discussion } = result.value;
				setComments(discussion.comments);
				setIsClosedForComments(discussion.isClosedForComments);
				setTotalPages(pages);
			})
			.catch(() => {
				// do nothing
			});
	}, [filters, commentPage, shortUrlId]);

	const validFilters = remapToValidFilters(filters, hashCommentId);

	useEffect(() => {
		rememberFilters(filters);
	}, [filters]);

	const handlePermalink = (commentId: number) => {
		window.location.hash = `#comment-${commentId}`;
		// Put this comment id into the hashCommentId state which will
		// trigger an api call to get the comment context and then expand
		// and reload the discussion based on the resuts
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
		if (hashCommentId !== undefined) {
			getCommentContext(discussionApiUrl, hashCommentId)
				.then((context) => {
					setCommentPage(context.page);
					setIsExpanded(true);
				})
				.catch((e) =>
					console.error(`getCommentContext - error: ${String(e)}`),
				);
		}
	}, [discussionApiUrl, hashCommentId]);

	useEffect(() => {
		if (window.location.hash === '#comments') {
			setIsExpanded(true);
		}
	}, []);

	useEffect(() => {
		// There's no point showing the view more button if there isn't much more to view
		if (commentCount === 0 || commentCount === 1 || commentCount === 2) {
			setIsExpanded(true);
		}
	}, [commentCount]);

	return (
		<>
			<div css={[positionRelative, !isExpanded && fixHeight]}>
				<Hide when="above" breakpoint="leftCol">
					<div
						data-testid="discussion"
						css={css`
							padding-bottom: ${space[2]}px;
						`}
					>
						<SignedInAs
							enableDiscussionSwitch={enableDiscussionSwitch}
							user={user?.profile}
							commentCount={commentCount}
							isClosedForComments={isClosedForComments}
						/>
					</div>
				</Hide>
				<Comments
					user={user}
					baseUrl={discussionApiUrl}
					isClosedForComments={
						!!isClosedForComments || !enableDiscussionSwitch
					}
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
					page={commentPage}
					setPage={setCommentPage}
					filters={validFilters}
					setFilters={(newFilters) => {
						setHashCommentId(undefined);
						setFilters(newFilters);
					}}
					commentCount={commentCount ?? 0}
					loading={loading}
					totalPages={totalPages}
					comments={comments}
					setComments={setComments}
				/>
				{!isExpanded && (
					<div id="discussion-overlay" css={overlayStyles} />
				)}
			</div>
			{!isExpanded && (
				<Button
					onClick={() => {
						setIsExpanded(true);
						dispatchCommentsExpandedEvent();
					}}
					icon={<SvgPlus />}
					cssOverrides={css`
						background-color: ${themePalette(
							'--discussion-primary-button-background',
						)};
						border: 1px solid currentColor;
						:hover {
							background-color: ${themePalette(
								'--discussion-button-hover',
							)};
							border: 1px solid
								${themePalette('--discussion-button-hover')};
							color: ${palette.neutral[100]};
						}
					`}
				>
					View more comments
				</Button>
			)}
		</>
	);
};
