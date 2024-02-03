import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import { palette, space } from '@guardian/source-foundations';
import { Button, SvgPlus } from '@guardian/source-react-components';
import { useEffect, useReducer } from 'react';
import { assertUnreachable } from '../lib/assert-unreachable';
import { getDiscussion, type reportAbuse } from '../lib/discussionApi';
import {
	getCommentContext,
	initFiltersFromLocalStorage,
} from '../lib/getCommentContext';
import { palette as themePalette } from '../palette';
import type {
	CommentForm,
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
	reportAbuseUnauthenticated: ReturnType<typeof reportAbuse>;
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
	(comment: CommentType): CommentType => {
		const responses =
			comment.id === action.commentId
				? action.responses
				: comment.responses?.map(
						replaceMatchingCommentResponses(action),
				  );
		return { ...comment, responses };
	};

type State = {
	comments: CommentType[];
	isClosedForComments: boolean;
	isExpanded: boolean;
	commentPage: number;
	commentCount: number | undefined;
	topLevelCommentCount: number;
	filters: FilterOptions;
	hashCommentId: number | undefined;
	pickError: string;
	loading: boolean;
	topForm: CommentForm;
	replyForm: CommentForm;
	bottomForm: CommentForm;
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
};

type Action =
	| {
			type: 'commentsLoaded';
			comments: CommentType[];
			isClosedForComments: boolean;
			commentCount: number;
			topLevelCommentCount: number;
	  }
	| { type: 'expandComments' }
	| {
			type: 'expandCommentReplies';
			commentId: number;
			responses: CommentType[];
	  }
	| { type: 'addComment'; comment: CommentType }
	| { type: 'updateCommentPage'; commentPage: number }
	| { type: 'updateHashCommentId'; hashCommentId: number | undefined }
	| { type: 'filterChange'; filters: FilterOptions; commentPage?: number }
	| { type: 'setLoading'; loading: boolean }
	| { type: 'setPickError'; error: string }
	| { type: 'setTopFormActive'; isActive: boolean }
	| { type: 'setReplyFormActive'; isActive: boolean }
	| { type: 'setBottomFormActive'; isActive: boolean }
	| { type: 'setTopFormUserMissing'; userNameMissing: boolean }
	| { type: 'setReplyFormUserMissing'; userNameMissing: boolean }
	| { type: 'setBottomFormUserMissing'; userNameMissing: boolean }
	| { type: 'setTopFormError'; error: string }
	| { type: 'setReplyFormError'; error: string }
	| { type: 'setBottomFormError'; error: string }
	| { type: 'setTopFormShowPreview'; showPreview: boolean }
	| { type: 'setReplyFormShowPreview'; showPreview: boolean }
	| { type: 'setBottomFormShowPreview'; showPreview: boolean }
	| { type: 'setTopFormPreviewBody'; previewBody: string }
	| { type: 'setReplyFormPreviewBody'; previewBody: string }
	| { type: 'setBottomFormPreviewBody'; previewBody: string }
	| { type: 'setTopFormBody'; body: string }
	| { type: 'setReplyFormBody'; body: string }
	| { type: 'setBottomFormBody'; body: string };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'commentsLoaded':
			return {
				...state,
				comments: action.comments,
				isClosedForComments: action.isClosedForComments,
				commentCount: action.commentCount,
				topLevelCommentCount: action.topLevelCommentCount,
				loading: false,
			};
		case 'addComment':
			return {
				...state,
				comments: [action.comment, ...state.comments],
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
				isExpanded: true,
			};
		case 'filterChange':
			return {
				...state,
				filters: action.filters,
				hashCommentId: undefined,
				isExpanded: true,
				commentPage: action.commentPage ?? state.commentPage,
			};
		case 'setLoading': {
			return {
				...state,
				loading: action.loading,
			};
		}
		case 'updateHashCommentId': {
			return {
				...state,
				hashCommentId: action.hashCommentId,
				isExpanded: true,
			};
		}
		case 'setPickError': {
			return {
				...state,
				pickError: action.error,
			};
		}
		case 'setTopFormActive': {
			return {
				...state,
				topForm: { ...state.topForm, isActive: action.isActive },
			};
		}
		case 'setReplyFormActive': {
			return {
				...state,
				replyForm: { ...state.replyForm, isActive: action.isActive },
			};
		}
		case 'setBottomFormActive': {
			return {
				...state,
				bottomForm: { ...state.bottomForm, isActive: action.isActive },
			};
		}
		case 'setTopFormUserMissing': {
			return {
				...state,
				topForm: {
					...state.topForm,
					userNameMissing: action.userNameMissing,
				},
			};
		}
		case 'setReplyFormUserMissing': {
			return {
				...state,
				replyForm: {
					...state.replyForm,
					userNameMissing: action.userNameMissing,
				},
			};
		}
		case 'setBottomFormUserMissing': {
			return {
				...state,
				bottomForm: {
					...state.bottomForm,
					userNameMissing: action.userNameMissing,
				},
			};
		}
		case 'setTopFormShowPreview': {
			return {
				...state,
				topForm: {
					...state.topForm,
					showPreview: action.showPreview,
				},
			};
		}
		case 'setReplyFormShowPreview': {
			return {
				...state,
				replyForm: {
					...state.replyForm,
					showPreview: action.showPreview,
				},
			};
		}
		case 'setBottomFormShowPreview': {
			return {
				...state,
				bottomForm: {
					...state.bottomForm,
					showPreview: action.showPreview,
				},
			};
		}
		case 'setTopFormPreviewBody': {
			return {
				...state,
				topForm: {
					...state.topForm,
					previewBody: action.previewBody,
				},
			};
		}
		case 'setReplyFormPreviewBody': {
			return {
				...state,
				replyForm: {
					...state.replyForm,
					previewBody: action.previewBody,
				},
			};
		}
		case 'setBottomFormPreviewBody': {
			return {
				...state,
				bottomForm: {
					...state.bottomForm,
					previewBody: action.previewBody,
				},
			};
		}
		case 'setTopFormBody': {
			return {
				...state,
				topForm: {
					...state.topForm,
					body: action.body,
				},
			};
		}
		case 'setReplyFormBody': {
			return {
				...state,
				replyForm: {
					...state.replyForm,
					body: action.body,
				},
			};
		}
		case 'setBottomFormBody': {
			return {
				...state,
				bottomForm: {
					...state.bottomForm,
					body: action.body,
				},
			};
		}
		case 'setTopFormError': {
			return {
				...state,
				topForm: {
					...state.topForm,
					error: action.error,
				},
			};
		}
		case 'setReplyFormError': {
			return {
				...state,
				replyForm: {
					...state.replyForm,
					error: action.error,
				},
			};
		}
		case 'setBottomFormError': {
			return {
				...state,
				bottomForm: {
					...state.bottomForm,
					error: action.error,
				},
			};
		}
		case 'expandCommentReplies': {
			return {
				...state,
				isExpanded: true,
				comments: state.comments.map(
					replaceMatchingCommentResponses(action),
				),
			};
		}

		default:
			assertUnreachable(action);
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
	] = useReducer(reducer, initialState);

	useEffect(() => {
		const newHashCommentId = commentIdFromUrl();
		if (newHashCommentId !== undefined) {
			dispatch({
				type: 'updateHashCommentId',
				hashCommentId: newHashCommentId,
			});
		}
	}, []);

	useEffect(() => {
		dispatch({ type: 'setLoading', loading: true });

		void getDiscussion(
			shortUrlId,
			commentPage,
			remapToValidFilters(filters, hashCommentId),
		)
			.then((result) => {
				if (result.kind === 'error') {
					console.error(`getDiscussion - error: ${result.error}`);
					return;
				}

				const { discussion } = result.value;

				dispatch({
					type: 'commentsLoaded',
					comments: discussion.comments,
					isClosedForComments: discussion.isClosedForComments,
					topLevelCommentCount: discussion.topLevelCommentCount,
					commentCount: discussion.commentCount,
				});
			})
			.catch(() => {
				// do nothing
			});
	}, [commentPage, filters, hashCommentId, shortUrlId]);

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
					dispatch({
						type: 'updateCommentPage',
						commentPage: context.page,
					});
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
		console.log({ commentCount });
		// There's no point showing the view more button if there isn't much more to view
		if (commentCount === 0 || commentCount === 1 || commentCount === 2) {
			dispatch({ type: 'expandComments' });
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
					idApiUrl={idApiUrl}
					page={commentPage}
					setPage={(page: number) => {
						dispatch({
							type: 'updateCommentPage',
							commentPage: page,
						});
					}}
					filters={validFilters}
					topLevelCommentCount={topLevelCommentCount}
					loading={loading}
					comments={comments}
					pickError={pickError}
					setPickError={(error) =>
						dispatch({
							type: 'setPickError',
							error,
						})
					}
					setComment={(comment: CommentType) => {
						dispatch({ type: 'addComment', comment });
					}}
					handleFilterChange={(
						newFilters: FilterOptions,
						page?: number,
					) => {
						dispatch({
							type: 'filterChange',
							filters: newFilters,
							commentPage: page,
						});
					}}
					setTopFormActive={(isActive) =>
						dispatch({ type: 'setTopFormActive', isActive })
					}
					setReplyFormActive={(isActive) =>
						dispatch({ type: 'setReplyFormActive', isActive })
					}
					setBottomFormActive={(isActive) =>
						dispatch({ type: 'setBottomFormActive', isActive })
					}
					setTopFormUserMissing={(userNameMissing) =>
						dispatch({
							type: 'setTopFormUserMissing',
							userNameMissing,
						})
					}
					setReplyFormUserMissing={(userNameMissing) =>
						dispatch({
							type: 'setReplyFormUserMissing',
							userNameMissing,
						})
					}
					setBottomFormUserMissing={(userNameMissing) =>
						dispatch({
							type: 'setBottomFormUserMissing',
							userNameMissing,
						})
					}
					setTopFormError={(error) =>
						dispatch({
							type: 'setTopFormError',
							error,
						})
					}
					setReplyFormError={(error) =>
						dispatch({
							type: 'setReplyFormError',
							error,
						})
					}
					setBottomFormError={(error) =>
						dispatch({
							type: 'setBottomFormError',
							error,
						})
					}
					setTopFormShowPreview={(showPreview) =>
						dispatch({
							type: 'setTopFormShowPreview',
							showPreview,
						})
					}
					setReplyFormShowPreview={(showPreview) =>
						dispatch({
							type: 'setReplyFormShowPreview',
							showPreview,
						})
					}
					setBottomFormShowPreview={(showPreview) =>
						dispatch({
							type: 'setBottomFormShowPreview',
							showPreview,
						})
					}
					setTopFormPreviewBody={(previewBody) =>
						dispatch({
							type: 'setTopFormPreviewBody',
							previewBody,
						})
					}
					setReplyFormPreviewBody={(previewBody) =>
						dispatch({
							type: 'setReplyFormPreviewBody',
							previewBody,
						})
					}
					setBottomFormPreviewBody={(previewBody) =>
						dispatch({
							type: 'setBottomFormPreviewBody',
							previewBody,
						})
					}
					setTopFormBody={(body) =>
						dispatch({
							type: 'setTopFormBody',
							body,
						})
					}
					setReplyFormBody={(body) =>
						dispatch({
							type: 'setReplyFormBody',
							body,
						})
					}
					setBottomFormBody={(body) =>
						dispatch({
							type: 'setBottomFormBody',
							body,
						})
					}
					expandCommentReplies={(commentId, responses) =>
						dispatch({
							type: 'expandCommentReplies',
							commentId,
							responses,
						})
					}
					topForm={topForm}
					replyForm={replyForm}
					bottomForm={bottomForm}
					reportAbuse={
						user !== undefined
							? user.reportAbuse
							: reportAbuseUnauthenticated
					}
				/>
				{!isExpanded && (
					<div id="discussion-overlay" css={overlayStyles} />
				)}
			</div>
			{!isExpanded && (
				<Button
					onClick={() => {
						dispatch({ type: 'expandComments' });
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
