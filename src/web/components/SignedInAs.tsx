import { css } from 'emotion';

import { text, border, neutral, news } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import { createAuthenticationEventParams } from '@root/src/lib/identity-component-event';

type Props = {
	commentCount?: number;
	palette: Palette;
	enableDiscussionSwitch: boolean;
	user?: UserProfile;
	isClosedForComments?: boolean;
};

const containerStyles = css`
	padding-top: ${space[1]}px;
	padding-bottom: ${space[1]}px;
`;

const imageStyles = css`
	border-radius: 70px;
	width: 60px;
	height: 60px;
	${until.desktop} {
		width: 36px;
		height: 36px;
	}
`;

const imageWrapper = css`
	padding-bottom: ${space[1]}px;
	padding-right: ${space[2]}px;
`;

const headingStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	padding-bottom: ${space[1]}px;
`;

const textStyles = css`
	${textSans.small()}
	${until.desktop} {
		${textSans.xxsmall()}
	}
	color: ${text.supporting};
	padding-bottom: ${space[1]}px;
`;

const headlineStyles = css`
	${headline.xxxsmall()}
	color: ${text.supporting};
	padding-bottom: ${space[1]}px;
`;

const usernameStyles = css`
	font-weight: 700;
	color: ${text.primary};
`;

const linkStyles = (palette: Palette) => css`
	color: ${palette.text.signInLink};
	text-decoration: none;
	border-bottom: 1px solid ${border.secondary};
	transition: border-color 0.15s ease-out;
	:hover {
		border-color: ${news[300]};
	}
`;

const rowUntilDesktop = css`
	display: flex;
	flex-direction: column;
	${until.desktop} {
		flex-direction: row;
	}
`;

const CommentCount = ({ count }: { count?: number }) => {
	return (
		<h2 className={headingStyles}>
			comments{' '}
			<span
				className={css`
					color: ${neutral[60]};
				`}
			>
				({count || '…'})
			</span>
		</h2>
	);
};

export const SignedInAs = ({
	commentCount,
	palette,
	enableDiscussionSwitch,
	user,
	isClosedForComments,
}: Props) => {
	const isBanned =
		user &&
		user.privateFields &&
		user.privateFields.canPostComment === false;

	if (enableDiscussionSwitch === false) {
		// Discussion is disabled sitewide and user is signed in
		if (user) {
			return (
				<div className={containerStyles}>
					<CommentCount count={commentCount} />
					<span className={headlineStyles}>
						Commenting has been disabled at this time
					</span>
				</div>
			);
		}
		// Discussion disabled sitewide and user logged out
		return (
			<div className={containerStyles}>
				<CommentCount count={commentCount} />
				<span className={headlineStyles}>
					Commenting has been disabled at this time but you can still{' '}
					<a
						href={`https://profile.theguardian.com/signin?INTCMP=DOTCOM_COMMENTS_SIGNIN&${createAuthenticationEventParams(
							'signin_to_comment',
						)}`}
						className={linkStyles(palette)}
					>
						sign in
					</a>{' '}
					or{' '}
					<a
						href={`https://profile.theguardian.com/register?INTCMP=DOTCOM_COMMENTS_REG&${createAuthenticationEventParams(
							'register_to_comment',
						)}`}
						className={linkStyles(palette)}
					>
						create your Guardian account
					</a>{' '}
					to join the discussion when it&apos;s back
				</span>
			</div>
		);
	}

	if (isBanned) {
		// User is banned
		return (
			<div className={containerStyles}>
				<CommentCount count={commentCount} />
				<span className={headlineStyles}>
					Commenting has been disabled for this account (
					<a
						href="https://www.theguardian.com/community-faqs#321a"
						className={linkStyles(palette)}
					>
						why?
					</a>{' '}
					)
				</span>
			</div>
		);
	}

	if (user && isClosedForComments) {
		// The reader is logged in but the discussion is closed
		return (
			<div className={containerStyles}>
				<CommentCount count={commentCount} />
				<span className={headlineStyles}>
					This discussion is closed for comments
				</span>
			</div>
		);
	}

	if (!user && isClosedForComments) {
		// The discussion is closed and the reader is not logged in
		return (
			<div className={containerStyles}>
				<CommentCount count={commentCount} />
				<span className={headlineStyles}>
					This discussion is now closed for comments but you can still{' '}
					<a
						href={`https://profile.theguardian.com/signin?INTCMP=DOTCOM_COMMENTS_SIGNIN&${createAuthenticationEventParams(
							'signin_to_comment',
						)}`}
						className={linkStyles(palette)}
					>
						sign in
					</a>{' '}
					or{' '}
					<a
						href={`https://profile.theguardian.com/register?INTCMP=DOTCOM_COMMENTS_REG&${createAuthenticationEventParams(
							'register_to_comment',
						)}`}
						className={linkStyles(palette)}
					>
						create your Guardian account
					</a>{' '}
					to join the discussion next time
				</span>
			</div>
		);
	}

	if (!user) {
		// The discussion is open but the reader is not logged in
		return (
			<div className={containerStyles}>
				<CommentCount count={commentCount} />
				<span className={headlineStyles}>
					<a
						href={`https://profile.theguardian.com/signin?INTCMP=DOTCOM_COMMENTS_SIGNIN&${createAuthenticationEventParams(
							'signin_to_comment',
						)}`}
						className={linkStyles(palette)}
					>
						Sign in
					</a>{' '}
					or{' '}
					<a
						href={`https://profile.theguardian.com/register?INTCMP=DOTCOM_COMMENTS_REG&${createAuthenticationEventParams(
							'register_to_comment',
						)}`}
						className={linkStyles(palette)}
					>
						create your Guardian account
					</a>{' '}
					to join the discussion
				</span>
			</div>
		);
	}

	// Discussion open and user logged in
	return (
		<div className={containerStyles}>
			<CommentCount count={commentCount} />
			<div className={rowUntilDesktop}>
				<div className={imageWrapper}>
					<img
						src={
							user.secureAvatarUrl ||
							'https://avatar.guim.co.uk/no-user-image.gif'
						}
						alt={user.displayName || 'Guardian User'}
						className={imageStyles}
					/>
				</div>
				<div className={textStyles}>
					Signed in as
					<div className={usernameStyles}>
						{user.displayName || 'Guardian User'}
					</div>
				</div>
			</div>
		</div>
	);
};
