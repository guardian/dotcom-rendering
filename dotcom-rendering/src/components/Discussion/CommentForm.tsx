import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	text,
	textSans,
} from '@guardian/source-foundations';
import { useEffect, useRef, useState } from 'react';
import {
	addUserName,
	comment as defaultComment,
	preview as defaultPreview,
	reply as defaultReply,
} from '../../lib/discussionApi';
import { palette as schemedPalette } from '../../palette';
import type {
	CommentResponse,
	CommentType,
	SignedInUser,
} from '../../types/discussion';
import { FirstCommentWelcome } from './FirstCommentWelcome';
import { PillarButton } from './PillarButton';
import { Preview } from './Preview';
import { Row } from './Row';

type Props = {
	shortUrl: string;
	user: SignedInUser;
	onAddComment: (response: CommentType) => void;
	setCommentBeingRepliedTo?: () => void;
	commentBeingRepliedTo?: CommentType;
	onComment?: (shortUrl: string, body: string) => Promise<CommentResponse>;
	onReply?: (
		shortUrl: string,
		body: string,
		parentCommentId: number,
	) => Promise<CommentResponse>;
	onPreview?: (body: string) => Promise<string>;
};

const boldString = (str: string) => `<b>${str}</b>`;
const italicsString = (str: string) => `<i>${str}</i>`;
const strikethroughString = (str: string) => `<del>${str}</del>`;
const codeString = (str: string) => `<code>${str}</code>`;
const quoteString = (str: string) => `<blockquote>${str}</blockquote>`;
const linkStringFunc = (url: string, highlightedText?: string) =>
	`<a href="${url}" rel="nofollow">${
		highlightedText ? highlightedText : url
	}</a>`;

const formWrapper = css`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: ${space[5]}px;
`;

const commentTextArea = css`
	width: 100%;
	margin-bottom: ${space[3]}px;
	padding: 8px 10px 10px 8px;
	${textSans.small()};
	border-color: ${sourcePalette.neutral[86]};
	:focus {
		border-color: ${sourcePalette.neutral[46]};
		outline: none;
	}
	color: inherit;
	background-color: ${schemedPalette('--comment-form-input-background')};
`;

const greyPlaceholder = css`
	::placeholder {
		color: ${sourcePalette.neutral[46]};
	}
`;

// Opacity? See: https://stackoverflow.com/questions/19621306/css-placeholder-text-color-on-firefox
const blackPlaceholder = css`
	::placeholder {
		font-weight: bold;
		opacity: 1;
		color: inherit;
	}
`;

const headerTextStyles = css`
	margin: 0;
	${textSans.xxsmall()};
`;

const errorTextStyles = css`
	margin: 0;
	${textSans.xxsmall()};
	color: ${text.error};
`;

const infoTextStyles = css`
	margin: 0;
	${textSans.xxsmall()};
	color: ${text.supporting};
`;

const msgContainerStyles = css`
	margin-top: 8px;
`;

const linkStyles = css`
	a {
		color: ${schemedPalette('--discussion-link')};
		text-decoration: none;
		:hover,
		:focus {
			text-decoration: underline;
		}
	}
`;

const wrapperHeaderTextStyles = css`
	background-color: ${schemedPalette('--comment-form-header-background')};
	padding: 8px 10px 10px 8px;
	width: 100%;
	margin-top: 8px;
	margin-bottom: 2px;
`;

const commentAddOns = css`
	height: 22px;
	font-size: 13px;
	line-height: 17px;
	border: 1px solid ${schemedPalette('--comment-form-input-background')};
	background-color: ${schemedPalette('--comment-form-addon-button')};
	color: inherit;
	text-align: center;
	cursor: pointer;
	margin-left: 4px;
	padding: 2px 5px 0px 5px;
	min-width: 11px;
	list-style-type: none;
`;

const bottomContainer = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	align-content: space-between;
`;

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		css={css`
			width: ${space[amount]}px;
		`}
	/>
);

const simulateNewComment = (
	commentId: number,
	body: string,
	user: UserProfile,
	commentBeingRepliedTo?: CommentType,
): CommentType => {
	// The returned object below is a simulation of the comment that was created that
	// we add to our local state so that the reader has immediate feedback. We do
	// this because the api has a 1 minute cache expiry so simply refreshing the
	// main list of comments often won't return the comment just added.
	// Edge case: If the user _does_ refresh then this local state will be overridden
	// by the new api response and - if the refresh was within 60 seconds - the
	// reader's comment will not be present. The same edge case exists in frontend.
	return {
		id: commentId,
		body,
		date: Date(),
		isoDateTime: new Date().toISOString(),
		status: 'visible',
		webUrl: `https://discussion.theguardian.com/comment-permalink/${commentId}`,
		apiUrl: `https://discussion.guardianapis.com/discussion-api/comment/${commentId}`,
		numRecommends: 0,
		isHighlighted: false,
		userProfile: {
			userId: user.userId,
			displayName: user.displayName,
			webUrl: user.webUrl,
			apiUrl: user.apiUrl,
			avatar: user.avatar,
			secureAvatarUrl: user.secureAvatarUrl,
			badge: user.badge,
		},
		...(commentBeingRepliedTo
			? {
					responseTo: {
						displayName:
							commentBeingRepliedTo.userProfile.displayName,
						commentApiUrl: `https://discussion.guardianapis.com/discussion-api/comment/${commentBeingRepliedTo.id}`,
						isoDateTime: commentBeingRepliedTo.isoDateTime,
						date: commentBeingRepliedTo.date,
						commentId: String(commentBeingRepliedTo.id),
						commentWebUrl: `https://discussion.theguardian.com/comment-permalink/${commentBeingRepliedTo.id}`,
					},
			  }
			: {
					responses: [],
			  }),
	};
};

export const CommentForm = ({
	shortUrl,
	onAddComment,
	user,
	setCommentBeingRepliedTo,
	commentBeingRepliedTo,
	onComment,
	onReply,
	onPreview,
}: Props) => {
	const [isActive, setIsActive] = useState<boolean>(
		commentBeingRepliedTo ? true : false,
	);
	const [userNameMissing, setUserNameMissing] = useState<boolean>(false);
	const [body, setBody] = useState<string>('');
	const [previewBody, setPreviewBody] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [info, setInfo] = useState<string>('');
	const [showPreview, setShowPreview] = useState<boolean>(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (commentBeingRepliedTo) {
			document
				.getElementById(`comment-${commentBeingRepliedTo.id}`)
				?.scrollIntoView();
			document
				.querySelector<HTMLTextAreaElement>(
					`#comment-reply-form-${commentBeingRepliedTo.id} textarea`,
				)
				?.focus();
		}
	}, [commentBeingRepliedTo]);

	const getHighlightedString = ():
		| {
				highlightedString: string;
				startString: string;
				endString: string;
		  }
		| undefined => {
		if (!textAreaRef.current) return;
		const selectionStart = textAreaRef.current.selectionStart;
		const selectionEnd = textAreaRef.current.selectionEnd;
		const value = textAreaRef.current.value;

		const startString = value.substring(0, selectionStart);
		const highlightedString = value.substring(selectionStart, selectionEnd);
		const endString = value.substring(selectionEnd, value.length);
		return { startString, highlightedString, endString };
	};

	const transformText = (
		transfromFunc: (highlightedString: string) => string,
	) => {
		const textAreaStrings = getHighlightedString();
		if (!textAreaStrings) return;
		const { startString, highlightedString, endString } = textAreaStrings;
		setBody(
			startString.concat(transfromFunc(highlightedString), endString),
		);
	};

	const transformLink = () => {
		const url = prompt('Your URL:', 'http://www.');
		if (url === null) return;
		const textAreaStrings = getHighlightedString();
		if (!textAreaStrings) return;
		const { startString, highlightedString, endString } = textAreaStrings;
		setBody(
			startString.concat(
				linkStringFunc(url, highlightedString),
				endString,
			),
		);
	};

	const fetchShowPreview = async () => {
		if (!body) return;

		try {
			const preview = onPreview ?? defaultPreview;
			const response = await preview(body);
			setPreviewBody(response);
			setShowPreview(true);
		} catch (e) {
			setError('Preview request failed, please try again');
			setPreviewBody('');
			setShowPreview(false);
		}
	};

	const resetForm = () => {
		setError('');
		setInfo('');
		setBody('');
		setShowPreview(false);
		setIsActive(false);
		if (setCommentBeingRepliedTo) {
			setCommentBeingRepliedTo();
		}
	};

	const submitForm = async () => {
		setError('');
		setInfo('');

		if (body) {
			const comment = onComment ?? defaultComment(user.authStatus);
			const reply = onReply ?? defaultReply(user.authStatus);
			const response: CommentResponse = commentBeingRepliedTo
				? await reply(shortUrl, body, commentBeingRepliedTo.id)
				: await comment(shortUrl, body);
			// Check response message for error states
			if (response.errorCode === 'USERNAME_MISSING') {
				// Reader has never posted before and needs to choose a username
				setUserNameMissing(true);
			} else if (response.errorCode === 'EMPTY_COMMENT_BODY') {
				setError('Please write a comment.');
			} else if (response.errorCode === 'COMMENT_TOO_LONG') {
				setError(
					'Your comment must be fewer than 5000 characters long.',
				);
			} else if (response.errorCode === 'USER_BANNED') {
				setError(
					'Commenting has been disabled for this account (<a href="/community-faqs#321a">why?</a>).',
				);
			} else if (response.errorCode === 'IP_THROTTLED') {
				setError(
					'Commenting has been temporarily blocked for this IP address (<a href="/community-faqs">why?</a>).',
				);
			} else if (response.errorCode === 'DISCUSSION_CLOSED') {
				setError(
					'Sorry your comment can not be published as the discussion is now closed for comments.',
				);
			} else if (response.errorCode === 'PARENT_COMMENT_MODERATED') {
				setError(
					'Sorry the comment can not be published as the comment you replied to has been moderated since.',
				);
			} else if (response.errorCode === 'COMMENT_RATE_LIMIT_EXCEEDED') {
				setError(
					'You can only post one comment every minute. Please try again in a moment.',
				);
			} else if (response.errorCode === 'INVALID_PROTOCOL') {
				setError(`Sorry your comment can not be published as it was not sent over
                  a secure channel. Please report us this issue using the technical issue link
                  in the page footer.`);
			} else if (response.errorCode === 'AUTH_COOKIE_INVALID') {
				setError(
					'Sorry, your comment was not published as you are no longer signed in. Please sign in and try again.',
				);
			} else if (response.errorCode === 'READ-ONLY-MODE') {
				setError(`Sorry your comment can not currently be published as
                  commenting is undergoing maintenance but will be back shortly. Please try
                  again in a moment.`);
			} else if (response.errorCode === 'API_CORS_BLOCKED') {
				setError(`Could not post due to your internet settings, which might be
                 controlled by your provider. Please contact your administrator
                 or disable any proxy servers or VPNs and try again.`);
			} else if (response.errorCode === 'API_ERROR') {
				setError(`Sorry, there was a problem posting your comment. Please try
                  another browser or network connection.  Reference code `);
			} else if (response.errorCode === 'EMAIL_VERIFIED') {
				setInfo(
					'Sent. Please check your email to verify your email address. Once verified post your comment.',
				);
			} else if (response.errorCode === 'EMAIL_VERIFIED_FAIL') {
				// TODO: Support resending verification email
				setError(`We are having technical difficulties. Please try again later or
            <a href="#">
            <strong>resend the verification</strong></a>.`);
			} else if (response.errorCode === 'EMAIL_NOT_VALIDATED') {
				// TODO: Support resending verification email
				setError(`Please confirm your email address to comment.<br />
            If you can't find the email, we can
            <a href="#">
            <strong>resend the verification email</strong></a> to your email
            address.`);
			} else if (response.status === 'ok') {
				onAddComment(
					simulateNewComment(
						// response.errorCode is the id of the comment that was created on the server
						// it is returned as a string, so we need to cast to an number to be compatable
						parseInt(response.message),
						body,
						user.profile,
						commentBeingRepliedTo,
					),
				);
				resetForm();
			} else {
				setError('Sorry, there was a problem posting your comment.');
			}
		}
	};

	const submitUserName = async (userName: string) => {
		setError('');
		if (!userName) {
			setError('Username field cannot be empty');
			return;
		}

		const response = await addUserName(user.authStatus, userName);
		if (response.status === 'ok') {
			// If we are able to submit userName we should continue with submitting comment
			void submitForm();
			setUserNameMissing(false);
		} else {
			response.errors &&
				setError(response.errors[0]?.message ?? 'unknown error');
		}
	};

	if (userNameMissing && body) {
		return (
			<FirstCommentWelcome
				body={body}
				error={error}
				submitForm={submitUserName}
				cancelSubmit={() => setUserNameMissing(false)}
				onPreview={onPreview}
			/>
		);
	}

	return (
		<>
			<form
				css={formWrapper}
				onSubmit={(e) => {
					e.preventDefault();
					void submitForm();
				}}
			>
				{!!error && (
					<div css={msgContainerStyles}>
						<p
							css={[errorTextStyles, linkStyles]}
							dangerouslySetInnerHTML={{ __html: error }}
						/>
					</div>
				)}
				{!!info && (
					<div css={msgContainerStyles}>
						<p css={[infoTextStyles, linkStyles]}>{info}</p>
					</div>
				)}
				{isActive && (
					<div css={wrapperHeaderTextStyles}>
						<p css={[headerTextStyles, linkStyles]}>
							Please keep comments respectful and abide by the{' '}
							<a href="/community-standards">
								community guidelines
							</a>
							.
						</p>

						{user.profile.privateFields?.isPremoderated && (
							<p css={[errorTextStyles, linkStyles]}>
								Your comments are currently being pre-moderated
								(
								<a
									href="/community-faqs#311"
									target="_blank"
									rel="nofollow"
								>
									why?
								</a>
								)
							</p>
						)}
					</div>
				)}
				<textarea
					data-testid="comment-input"
					placeholder={
						commentBeingRepliedTo || !isActive
							? 'Join the discussion'
							: ''
					}
					css={[
						commentTextArea,
						commentBeingRepliedTo && isActive && greyPlaceholder,
						!commentBeingRepliedTo && !isActive && blackPlaceholder,
					]}
					ref={textAreaRef}
					style={{ height: isActive ? '132px' : '50px' }}
					onChange={(e) => {
						setBody(e.target.value || '');
					}}
					value={body}
					onFocus={() => setIsActive(true)}
				/>
				<div css={bottomContainer}>
					<Row>
						<>
							<PillarButton
								type="submit"
								linkName="post comment"
								size="small"
							>
								Post your comment
							</PillarButton>
							{(isActive || !!body) && (
								<>
									<Space amount={3} />
									<PillarButton
										onClick={fetchShowPreview}
										priority="secondary"
										linkName="preview-comment"
										size="small"
									>
										Preview
									</PillarButton>
									<Space amount={3} />

									<PillarButton
										onClick={resetForm}
										priority="subdued"
										linkName="cancel-post-comment"
										size="small"
									>
										Cancel
									</PillarButton>
								</>
							)}
						</>
					</Row>
					{isActive && (
						<Row>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(boldString);
								}}
								css={commentAddOns}
								data-link-name="formatting-controls-bold"
								type="button"
							>
								B
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(italicsString);
								}}
								css={commentAddOns}
								data-link-name="formatting-controls-italic"
								type="button"
							>
								i
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(strikethroughString);
								}}
								css={commentAddOns}
								data-link-name="formatting-controls-strikethrough"
								type="button"
							>
								{`S̶`}
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(codeString);
								}}
								css={commentAddOns}
								data-link-name="formatting-controls-code"
								type="button"
							>
								{`<>`}
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(quoteString);
								}}
								css={commentAddOns}
								data-link-name="formatting-controls-quote"
								type="button"
							>
								"
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformLink();
								}}
								css={commentAddOns}
								data-link-name="formatting-controls-link"
								type="button"
							>
								Link
							</button>
						</Row>
					)}
				</div>
			</form>

			{showPreview && <Preview previewHtml={previewBody} />}
		</>
	);
};
