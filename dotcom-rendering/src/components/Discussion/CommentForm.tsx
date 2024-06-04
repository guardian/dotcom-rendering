import { css } from '@emotion/react';
import {
	space,
	textSans12,
	textSans15,
	textSansBold12,
	until,
} from '@guardian/source/foundations';
import { Link, TextArea } from '@guardian/source/react-components';
import { InfoSummary } from '@guardian/source-development-kitchen/react-components';
import { useEffect, useState } from 'react';
import type {
	CommentType,
	ReplyType,
	SignedInUser,
	UserProfile,
} from '../../lib/discussion';
import { preview as defaultPreview } from '../../lib/discussionApi';
import { palette as schemedPalette } from '../../palette';
import { FirstCommentWelcome } from './FirstCommentWelcome';
import { PillarButton } from './PillarButton';
import { Preview } from './Preview';
import { Row } from './Row';

type Props = {
	shortUrl: string;
	user: SignedInUser;
	onAddComment: (response: CommentType | ReplyType) => void;
	setCommentBeingRepliedTo?: () => void;
	commentBeingRepliedTo?: CommentType | ReplyType;
	onPreview?: typeof defaultPreview;
	error: string;
	setError: (error: string) => void;
	userNameMissing: boolean;
	setUserNameMissing: (isUserNameMissing: boolean) => void;
	previewBody: string;
	setPreviewBody: (previewBody: string) => void;
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
	${textSans15};
	border-color: ${schemedPalette('--discussion-border')};
	:focus {
		border-color: ${schemedPalette('--discussion-subdued')};
		outline: none;
	}
	color: inherit;
	background-color: ${schemedPalette('--comment-form-input-background')};
`;

const greyPlaceholder = css`
	::placeholder {
		color: ${schemedPalette('--discussion-subdued')};
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
	margin: 0 0 10px 0;
	${textSans12};
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
	border: 1px solid ${schemedPalette('--discussion-background')};
	background-color: ${schemedPalette('--discussion-background')};
	color: inherit;
	text-align: center;
	cursor: pointer;
	margin-left: 4px;
	padding: 2px 5px 0px 5px;
	min-width: 11px;
	list-style-type: none;
`;

const preModMessage = css`
	& div {
		color: inherit;
		${textSansBold12};
		svg {
			fill: ${schemedPalette('--discussion-pre-mod')};
		}
	}
`;

const preModLink = css`
	color: ${schemedPalette('--discussion-pre-mod')};
	${textSansBold12};
`;

const bottomContainer = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	align-content: space-between;
	gap: ${space[3]}px;
	${until.wide} {
		flex-direction: column-reverse;
	}
`;

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		css={css`
			width: ${space[amount]}px;
		`}
	/>
);

/**
 * The returned object below is a simulation of the comment that was created that
 * we add to our local state so that the reader has immediate feedback.
 * We do this because the API has a 1 minute cache expiry so simply refreshing
 * the main list of comments often will not return the comment just added.
 *
 * Edge case: If the user _does_ refresh then this local state will be overridden
 * by the new API response and - if the refresh was within 60 seconds - the
 * reader's comment will not be present. The same edge case exists in frontend.
 */
const simulateNewComment = (
	commentId: string,
	body: string,
	userProfile: UserProfile,
): CommentType => ({
	id: commentId,
	body,
	date: Date(),
	isoDateTime: new Date().toISOString(),
	status: 'visible',
	webUrl: `https://discussion.theguardian.com/comment-permalink/${commentId}`,
	apiUrl: `https://discussion.guardianapis.com/discussion-api/comment/${commentId}`,
	numRecommends: 0,
	isHighlighted: false,
	userProfile,
	responses: [],
});

const simulateNewReply = (
	commentId: string,
	body: string,
	userProfile: UserProfile,
	commentBeingRepliedTo: CommentType | ReplyType,
): ReplyType => ({
	id: commentId,
	body,
	date: Date(),
	isoDateTime: new Date().toISOString(),
	status: 'visible',
	webUrl: `https://discussion.theguardian.com/comment-permalink/${commentId}`,
	apiUrl: `https://discussion.guardianapis.com/discussion-api/comment/${commentId}`,
	numRecommends: 0,
	isHighlighted: false,
	userProfile,
	responseTo: {
		displayName: commentBeingRepliedTo.userProfile.displayName,
		commentApiUrl: `https://discussion.guardianapis.com/discussion-api/comment/${commentBeingRepliedTo.id}`,
		isoDateTime: commentBeingRepliedTo.isoDateTime,
		date: commentBeingRepliedTo.date,
		commentId: String(commentBeingRepliedTo.id),
		commentWebUrl: `https://discussion.theguardian.com/comment-permalink/${commentBeingRepliedTo.id}`,
	},
});

export const CommentForm = ({
	shortUrl,
	onAddComment,
	user,
	setCommentBeingRepliedTo,
	commentBeingRepliedTo,
	onPreview,
	error,
	setError,
	userNameMissing,
	setUserNameMissing,
	previewBody,
	setPreviewBody,
}: Props) => {
	const [isActive, setIsActive] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [selectionStart, setSelectionStart] = useState(0);
	const [selectionEnd, setSelectionEnd] = useState(0);
	const [textValue, setTextValue] = useState('');

	const handleSelect = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSelectionStart(event.target.selectionStart);
		setSelectionEnd(event.target.selectionEnd);
	};

	const handleTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setTextValue(event.target.value);
	};

	const setBody = (body: string) => {
		setTextValue(body);
	};

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
		const value = textValue;

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
		const body = textValue;
		if (!body) return;

		const preview = onPreview ?? defaultPreview;
		const response = await preview(body);

		if (response.kind === 'error') {
			setError('Preview request failed, please try again');
			setPreviewBody('');
			return;
		}

		setPreviewBody(response.value);
	};

	const handleError = (commentError: string) => {
		switch (commentError) {
			// Reader has never posted before and needs to choose a username
			case 'USERNAME_MISSING':
				return setUserNameMissing(true);
			case 'EMPTY_COMMENT_BODY':
				return setError('Please write a comment.');
			case 'COMMENT_TOO_LONG':
				return setError(
					'Your comment must be fewer than 5000 characters long.',
				);
			case 'USER_BANNED':
				return setError(
					'Commenting has been disabled for this account (<a href="/community-faqs#321a">why?</a>).',
				);
			case 'IP_THROTTLED':
				return setError(
					'Commenting has been temporarily blocked for this IP address (<a href="/community-faqs">why?</a>).',
				);
			case 'DISCUSSION_CLOSED':
				return setError(
					'Sorry your comment can not be published as the discussion is now closed for comments.',
				);
			case 'PARENT_COMMENT_MODERATED':
				return setError(
					'Sorry the comment can not be published as the comment you replied to has been moderated since.',
				);
			case 'COMMENT_RATE_LIMIT_EXCEEDED':
				return setError(
					'You can only post one comment every minute. Please try again in a moment.',
				);
			case 'INVALID_PROTOCOL':
				return setError(`Sorry your comment can not be published as it was not sent over
					a secure channel. Please report us this issue using the technical issue link
					in the page footer.`);
			case 'AUTH_COOKIE_INVALID':
				return setError(
					'Sorry, your comment was not published as you are no longer signed in. Please sign in and try again.',
				);
			case 'READ-ONLY-MODE':
				return setError(`Sorry your comment can not currently be published as
					commenting is undergoing maintenance but will be back shortly. Please try
					again in a moment.`);
			case 'API_CORS_BLOCKED':
				return setError(`Could not post due to your internet settings, which might be
				   controlled by your provider. Please contact your administrator
				   or disable any proxy servers or VPNs and try again.`);
			case 'API_ERROR':
				return setError(`Sorry, there was a problem posting your comment. Please try
					another browser or network connection.  Reference code `);
			case 'EMAIL_NOT_VALIDATED':
				// TODO: Support resending verification email
				return setError(`Please confirm your email address to comment.<br />
					If you can't find the email, we can
					<a href="#">
					<strong>resend the verification email</strong></a> to your email
					address.`);
			default:
				return setError(
					'Sorry, there was a problem posting your comment.',
				);
		}
	};

	const resetForm = () => {
		setError('');
		setBody('');
		setPreviewBody('');
		setIsActive(false);
		setCommentBeingRepliedTo?.();
	};

	const submitForm = async () => {
		if (isDisabled) return;
		setIsDisabled(true);
		setError('');

		const body = textValue;

		if (body) {
			const response = commentBeingRepliedTo
				? await user.onReply(shortUrl, body, commentBeingRepliedTo.id)
				: await user.onComment(shortUrl, body);
			// Check response message for error states
			if (response.kind === 'error') {
				handleError(response.error);
			} else {
				onAddComment(
					commentBeingRepliedTo
						? simulateNewReply(
								response.value,
								body,
								user.profile,
								commentBeingRepliedTo,
						  )
						: simulateNewComment(
								response.value,
								body,
								user.profile,
						  ),
				);
				resetForm();
			}
		}
		setIsDisabled(false);
	};

	const submitUserName = async (userName: string) => {
		setError('');
		if (!userName) {
			setError('Username field cannot be empty');
			return;
		}

		const response = await user.addUsername(userName);
		if (response.kind === 'ok') {
			// If we are able to submit userName we should continue with submitting comment
			void submitForm();
			setUserNameMissing(false);
		} else {
			setError(response.error);
		}
	};

	if (isActive && userNameMissing) {
		return (
			<FirstCommentWelcome
				error={error}
				submitForm={submitUserName}
				cancelSubmit={() => setUserNameMissing(false)}
				previewBody={previewBody}
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
							<InfoSummary
								message={
									'Your comments are currently being pre-moderated'
								}
								context={
									<Link
										href="/community-faqs#311"
										target="_blank"
										rel="nofollow"
										cssOverrides={preModLink}
									>
										(why?)
									</Link>
								}
								cssOverrides={preModMessage}
							/>
						)}
					</div>
				)}
				<TextArea
					data-testid="comment-input"
					placeholder={
						!!commentBeingRepliedTo || !isActive
							? 'Join the discussion'
							: ''
					}
					css={[
						commentTextArea,
						commentBeingRepliedTo && isActive && greyPlaceholder,
						!commentBeingRepliedTo && !isActive && blackPlaceholder,
					]}
					style={{ height: isActive ? '132px' : '50px' }}
					onFocus={() => setIsActive(true)}
					value={textValue}
					onChange={handleTextChange}
					onSelect={handleSelect}
					label={''}
					error={error}
				/>
				<div css={bottomContainer}>
					<Row wrap={true}>
						<>
							<PillarButton
								type="submit"
								linkName="post comment"
								size="small"
							>
								Post your comment
							</PillarButton>
							{isActive && (
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
						<Row wrap={true}>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(boldString);
								}}
								css={commentAddOns}
								style={{ fontWeight: 'bold' }}
								data-link-name="formatting-controls-bold"
								type="button"
								title="Bold"
							>
								bold
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(italicsString);
								}}
								css={commentAddOns}
								style={{ fontStyle: 'italic' }}
								data-link-name="formatting-controls-italic"
								type="button"
								title="Italic"
							>
								italic
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(strikethroughString);
								}}
								css={commentAddOns}
								style={{ textDecoration: 'line-through' }}
								data-link-name="formatting-controls-strikethrough"
								type="button"
								title="Strikethrough"
							>
								strikethrough
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(codeString);
								}}
								css={commentAddOns}
								style={{ fontFamily: 'monospace' }}
								data-link-name="formatting-controls-code"
								type="button"
								title="Code"
							>
								{`<code>`}
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformText(quoteString);
								}}
								css={commentAddOns}
								data-link-name="formatting-controls-quote"
								type="button"
								title="Quote"
							>
								"quote"
							</button>
							<button
								onClick={(e) => {
									e.preventDefault();
									transformLink();
								}}
								css={commentAddOns}
								style={{ textDecoration: 'underline' }}
								data-link-name="formatting-controls-link"
								type="button"
								title="Link"
							>
								Link
							</button>
						</Row>
					)}
				</div>
			</form>

			{previewBody.trim() !== '' && (
				<Preview previewHtml={previewBody} showSpout={true} />
			)}
		</>
	);
};
