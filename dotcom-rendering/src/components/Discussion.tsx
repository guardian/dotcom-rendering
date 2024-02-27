import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import { space } from '@guardian/source-foundations';
import { SvgPlus } from '@guardian/source-react-components';
import { useEffect } from 'react';
import { useEffectReducer } from '../lib/UseEffectReducer';
import { assertUnreachable } from '../lib/assert-unreachable';
import type {
	CommentFormProps,
	CommentType,
	FilterOptions,
	ReplyType,
	SignedInUser,
} from '../lib/discussion';
import {
	getCommentContext,
	getDiscussion,
	type reportAbuse,
} from '../lib/discussionApi';
import { initFiltersFromLocalStorage } from '../lib/discussionFilters';
import { palette as themePalette } from '../palette';
import { Comments } from './Discussion/Comments';
import { PillarButton } from './Discussion/PillarButton';
import type { Action } from './DispatchContext';
import { DispatchProvider } from './DispatchContext';
import { Hide } from './Hide';
import { SignedInAs } from './SignedInAs';
export type Props = {
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	enableMobileDiscussionAdsSwitch: boolean;
	user?: SignedInUser;
	idApiUrl: string;
	reportAbuseUnauthenticated: ReturnType<typeof reportAbuse>;
};

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${themePalette('--discussion-section-background')},
		${themePalette('--discussion-section-background')} 40%,
		transparent
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

/**
 * Finds the matching comment for which to expand the replies,
 * and replaces its responses with a new list.

 * @example
 * ```txt
 * Comment ID: 1234
 *
 * Before
 * ━━ 1233
 * ━┳ 1234
 *  ┣━ 0001
 *  ┣━ 0002
 *  ┡━ 0003
 *  ┆  (show 4 more replies)
 * ━━ 1235
 *
 * After
 * ━━ 1233
 * ━┳ 1234
 *  ┣━ 0001
 *  ┣━ 0002
 *  ┣━ 0003
 *  ┣━ 0004
 *  ┣━ 0005
 *  ┣━ 0006
 *  ┗━ 0007
 * ━━ 1235
 * ```
 */
export const replaceMatchingCommentResponses =
	(action: Action & { type: 'expandCommentReplies' }) =>
	<T extends CommentType | ReplyType>(comment: T): T =>
		comment.id === action.commentId
			? { ...comment, responses: action.responses }
			: comment;

const getComments = async (
	shortUrlId: string,
	commentPage: number,
	filters: FilterOptions,
	hashCommentId: number | undefined,
): Promise<Action> => {
	const controller = new AbortController();

	return getDiscussion({
		shortUrl: shortUrlId,
		page: commentPage,
		filters: remapToValidFilters(filters, hashCommentId),
		signal: controller.signal,
	})
		.then((result) => {
			if (result.kind === 'error') {
				console.error(`getDiscussion - error: ${result.error}`);
				return { type: 'commentsLoadedFailed' } satisfies Action;
			}

			const { discussion } = result.value;
			controller.abort();
			return {
				type: 'commentsLoaded',
				comments: discussion.comments,
				isClosedForComments: discussion.isClosedForComments,
				topLevelCommentCount: discussion.topLevelCommentCount,
				commentCount: discussion.commentCount,
			} satisfies Action;
		})
		.catch(() => {
			controller.abort();
			return { type: 'commentsLoadedFailed' } satisfies Action;
			// do nothing
		});
};

type State = {
	comments: Array<CommentType | ReplyType>;
	isClosedForComments: boolean;
	isExpanded: boolean;
	commentPage: number;
	commentCount: number | undefined;
	topLevelCommentCount: number;
	filters: FilterOptions;
	hashCommentId: number | undefined;
	pickError: string;
	loading: boolean;
	topForm: CommentFormProps;
	replyForm: CommentFormProps;
	bottomForm: CommentFormProps;
	shortUrlId: string;
};

const initialCommentFormState = {
	isActive: false,
	userNameMissing: false,
	error: '',
	showPreview: false,
	previewBody: '',
	body: '',
};

const initialState: State = {
	comments: [],
	isClosedForComments: false,
	isExpanded: false,
	commentPage: 1,
	commentCount: undefined,
	topLevelCommentCount: 0,
	filters: initFiltersFromLocalStorage(),
	hashCommentId: undefined,
	pickError: '',
	loading: true,
	topForm: initialCommentFormState,
	replyForm: initialCommentFormState,
	bottomForm: initialCommentFormState,
	shortUrlId: '',
};

type Effect =
	| { type: 'StoreShortUrlId'; shortUrlId: string }
	| {
			type: 'GetDiscussion';
			shortUrlId: string;
			commentPage: number;
			filters: FilterOptions;
			hashCommentId: number | undefined;
	  };

const effectReducer = (effect: Effect): Action | Promise<Action> => {
	switch (effect.type) {
		case 'StoreShortUrlId':
			return { type: 'storeShortUrlId', shortUrlId: effect.shortUrlId };
		case 'GetDiscussion':
			return getComments(
				effect.shortUrlId,
				effect.commentPage,
				effect.filters,
				effect.hashCommentId,
			);
	}
};

const reducer = (
	state: State,
	action: Action,
): { state: State; effect?: Effect } => {
	switch (action.type) {
		case 'commentsLoaded':
			return {
				state: {
					...state,
					comments: action.comments,
					isClosedForComments: action.isClosedForComments,
					commentCount: action.commentCount,
					topLevelCommentCount: action.topLevelCommentCount,
					loading: false,
				},
			};
		case 'addComment':
			return {
				state: {
					...state,
					comments: [action.comment, ...state.comments],
					isExpanded: true,
				},
			};
		case 'addReply':
			return {
				state: {
					...state,
					comments: state.comments.map((comment) =>
						comment.responses &&
						comment.id ===
							Number(action.comment.responseTo.commentId)
							? {
									...comment,
									responses: [
										...comment.responses,
										action.comment,
									],
							  }
							: comment,
					),
					isExpanded: true,
				},
			};
		case 'expandComments':
			return {
				state: {
					...state,
					isExpanded: true,
				},
			};
		case 'updateCommentPage':
			return {
				state: {
					...state,
					commentPage: action.commentPage,
					isExpanded: true,
				},
				effect: {
					type: 'GetDiscussion',
					shortUrlId: state.shortUrlId,
					commentPage: state.commentPage,
					filters: state.filters,
					hashCommentId: state.hashCommentId,
				},
			};
		case 'filterChange':
			return {
				state: {
					...state,
					filters: action.filters,
					hashCommentId: undefined,
					isExpanded: true,
					commentPage: action.commentPage ?? state.commentPage,
				},
				effect: {
					type: 'GetDiscussion',
					shortUrlId: state.shortUrlId,
					commentPage: action.commentPage ?? state.commentPage,
					filters: action.filters,
					hashCommentId: undefined,
				},
			};
		case 'setLoading': {
			return {
				state: {
					...state,
					loading: action.loading,
				},
			};
		}
		case 'updateHashCommentId': {
			return {
				state: {
					...state,
					hashCommentId: action.hashCommentId,
					isExpanded: true,
				},
				effect: {
					type: 'GetDiscussion',
					shortUrlId: state.shortUrlId,
					commentPage: state.commentPage,
					filters: state.filters,
					hashCommentId: action.hashCommentId,
				},
			};
		}
		case 'setPickError': {
			return {
				state: {
					...state,
					pickError: action.error,
				},
			};
		}
		case 'setTopFormUserMissing': {
			return {
				state: {
					...state,
					topForm: {
						...state.topForm,
						userNameMissing: action.userNameMissing,
					},
				},
			};
		}
		case 'setReplyFormUserMissing': {
			return {
				state: {
					...state,
					replyForm: {
						...state.replyForm,
						userNameMissing: action.userNameMissing,
					},
				},
			};
		}
		case 'setBottomFormUserMissing': {
			return {
				state: {
					...state,
					bottomForm: {
						...state.bottomForm,
						userNameMissing: action.userNameMissing,
					},
				},
			};
		}
		case 'setTopFormPreviewBody': {
			return {
				state: {
					...state,
					topForm: {
						...state.topForm,
						previewBody: action.previewBody,
					},
				},
			};
		}
		case 'setReplyFormPreviewBody': {
			return {
				state: {
					...state,
					replyForm: {
						...state.replyForm,
						previewBody: action.previewBody,
					},
				},
			};
		}
		case 'setBottomFormPreviewBody': {
			return {
				state: {
					...state,
					bottomForm: {
						...state.bottomForm,
						previewBody: action.previewBody,
					},
				},
			};
		}
		case 'setTopFormError': {
			return {
				state: {
					...state,
					topForm: {
						...state.topForm,
						error: action.error,
					},
				},
			};
		}
		case 'setReplyFormError': {
			return {
				state: {
					...state,
					replyForm: {
						...state.replyForm,
						error: action.error,
					},
				},
			};
		}
		case 'setBottomFormError': {
			return {
				state: {
					...state,
					bottomForm: {
						...state.bottomForm,
						error: action.error,
					},
				},
			};
		}
		case 'expandCommentReplies': {
			return {
				state: {
					...state,
					isExpanded: true,
					comments: state.comments.map(
						replaceMatchingCommentResponses(action),
					),
				},
			};
		}
		case 'storeShortUrlId': {
			return {
				state: {
					...state,
					shortUrlId: action.shortUrlId,
				},
				effect: {
					type: 'GetDiscussion',
					shortUrlId: action.shortUrlId,
					commentPage: state.commentPage,
					filters: state.filters,
					hashCommentId: undefined,
				},
			};
		}
		case 'commentsLoadedFailed': {
			return { state };
		}

		default:
			assertUnreachable(action);
			return { state };
	}
};

export const Discussion = ({
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	enableMobileDiscussionAdsSwitch,
	user,
	idApiUrl,
	reportAbuseUnauthenticated,
}: Props) => {
	const [
		{
			comments,
			isClosedForComments,
			isExpanded,
			commentPage,
			filters,
			hashCommentId,
			loading,
			topForm,
			replyForm,
			bottomForm,
			topLevelCommentCount,
			commentCount,
			pickError,
		},
		dispatch,
	] = useEffectReducer(reducer, effectReducer, initialState, {
		type: 'StoreShortUrlId',
		shortUrlId,
	});

	useEffect(() => {
		const newHashCommentId = commentIdFromUrl();
		if (newHashCommentId !== undefined) {
			dispatch({
				type: 'updateHashCommentId',
				hashCommentId: newHashCommentId,
			});
		}
	}, []);

	const validFilters = remapToValidFilters(filters, hashCommentId);

	useEffect(() => {
		rememberFilters(filters);
	}, [filters]);

	const handlePermalink = (commentId: number) => {
		window.location.hash = `#comment-${commentId}`;
		// Put this comment id into the hashCommentId state which will
		// trigger an api call to get the comment context and then expand
		// and reload the discussion based on the resuts
		dispatch({ type: 'updateHashCommentId', hashCommentId: commentId });
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
			getCommentContext(
				discussionApiUrl,
				hashCommentId,
				remapToValidFilters(filters, hashCommentId),
			)
				.then((context) => {
					if (context.kind === 'ok') {
						dispatch({
							type: 'updateCommentPage',
							commentPage: context.value.page,
						});
					} else {
						console.error(
							`getCommentContext - error: ${context.error}`,
						);
					}
				})
				.catch((e) =>
					console.error(`getCommentContext - error: ${String(e)}`),
				);
		}
	}, [filters, discussionApiUrl, hashCommentId]);

	useEffect(() => {
		if (window.location.hash === '#comments') {
			dispatch({ type: 'expandComments' });
		}
	}, []);

	useEffect(() => {
		// There's no point showing the view more button if there isn't much more to view
		if (commentCount === 0 || commentCount === 1 || commentCount === 2) {
			dispatch({ type: 'expandComments' });
		}
	}, [commentCount]);

	return (
		<DispatchProvider value={dispatch}>
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
					idApiUrl={idApiUrl}
					page={commentPage}
					filters={validFilters}
					topLevelCommentCount={topLevelCommentCount}
					loading={loading}
					comments={comments}
					pickError={pickError}
					topForm={topForm}
					replyForm={replyForm}
					bottomForm={bottomForm}
					reportAbuse={
						user !== undefined
							? user.reportAbuse
							: reportAbuseUnauthenticated
					}
					enableMobileDiscussionAdsSwitch={
						enableMobileDiscussionAdsSwitch
					}
				/>
				{!isExpanded && (
					<div id="discussion-overlay" css={overlayStyles} />
				)}
			</div>
			{!isExpanded && (
				<PillarButton
					onClick={() => {
						dispatch({ type: 'expandComments' });
						dispatchCommentsExpandedEvent();
					}}
					icon={<SvgPlus />}
					linkName="view-more-comments"
				>
					View more comments
				</PillarButton>
			)}
		</DispatchProvider>
	);
};
