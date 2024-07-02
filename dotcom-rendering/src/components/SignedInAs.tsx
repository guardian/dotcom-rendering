import { css } from '@emotion/react';
import { SignInScreenReason } from '@guardian/bridget/SignInScreenReason';
import { SignInScreenReferrer } from '@guardian/bridget/SignInScreenReferrer';
import {
	headlineBold20,
	headlineMedium17,
	palette as sourcePalette,
	space,
	textSans12,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { getUserClient } from '../lib/bridgetApi';
import type { UserProfile } from '../lib/discussion';
import { createAuthenticationEventParams } from '../lib/identity-component-event';
import { palette as themePalette } from '../palette';
import { useConfig } from './ConfigContext';

type Props = {
	commentCount?: number;
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
	${headlineBold20};
	padding-bottom: ${space[1]}px;
`;

const textStyles = css`
	${textSans15}
	${until.desktop} {
		${textSans12}
	}
	color: ${sourcePalette.neutral[46]};
	padding-bottom: ${space[1]}px;
`;

const headlineStyles = css`
	${headlineMedium17}
	color: ${themePalette('--discussion-subdued')};
	padding-bottom: ${space[1]}px;
`;

const usernameStyles = css`
	font-weight: 700;
	color: ${themePalette('--article-text')};
`;

const linkStyles = css`
	color: ${themePalette('--sign-in-link')};
	text-decoration: none;
	border-bottom: 1px solid ${themePalette('--sign-in-link-underline')};
	transition: border-color 0.15s ease-out;
	:hover {
		border-color: ${themePalette('--sign-in-link')};
	}
`;

const rowUntilDesktop = css`
	display: flex;
	flex-direction: column;
	${until.desktop} {
		flex-direction: row;
	}
`;

const Heading = ({ count }: { count?: number }) => {
	return (
		<h2 css={headingStyles}>
			Comments{' '}
			<span
				css={css`
					color: ${themePalette('--discussion-subdued')};
				`}
			>
				({count ?? '…'})
			</span>
		</h2>
	);
};

const signIn = () =>
	void getUserClient()
		.signIn(
			SignInScreenReason.accessDiscussion,
			SignInScreenReferrer.accessDiscussion,
		)
		.catch(() => {
			// do nothing
		});

const appsStylesOverride = css`
	display: inline;
	padding: 0;
	margin: 0;
	text-decoration-color: ${themePalette('--sign-in-link-underline')};
	white-space: inherit;
	/* stylelint-disable -- there’s no Source option for this look */
	font-family: inherit;
	font-weight: inherit;
	font-size: inherit;
	line-height: inherit;
	/* stylelint-enable */
	vertical-align: inherit;
`;

const SignInButton = ({
	children,
	action,
}: {
	children: React.ReactNode;
	action: 'signin_to_comment' | 'register_to_comment';
}) => {
	const { renderingTarget } = useConfig();

	return renderingTarget === 'Web' ? (
		<a
			href={`https://profile.theguardian.com/signin?INTCMP=DOTCOM_COMMENTS_SIGNIN&${createAuthenticationEventParams(
				action,
			)}`}
			css={linkStyles}
		>
			{children}
		</a>
	) : (
		<LinkButton
			priority="subdued"
			theme={{ textSubdued: themePalette('--sign-in-link') }}
			cssOverrides={appsStylesOverride}
			onClick={signIn}
		>
			{children}
		</LinkButton>
	);
};

export const SignedInAs = ({
	commentCount,
	enableDiscussionSwitch,
	user,
	isClosedForComments,
}: Props) => {
	const isBanned = user?.privateFields && !user.privateFields.canPostComment;

	if (!enableDiscussionSwitch) {
		// Discussion is disabled sitewide and user is signed in
		if (user) {
			return (
				<div css={containerStyles}>
					<Heading count={commentCount} />
					<span css={headlineStyles}>
						Commenting has been disabled at this time
					</span>
				</div>
			);
		}
		// Discussion disabled sitewide and user logged out
		return (
			<div css={containerStyles}>
				<Heading count={commentCount} />
				<span css={headlineStyles}>
					Commenting has been disabled at this time but you can still{' '}
					<SignInButton action="signin_to_comment">
						sign in
					</SignInButton>{' '}
					or{' '}
					<SignInButton action="register_to_comment">
						create your Guardian account
					</SignInButton>{' '}
					to join the discussion when it&apos;s back
				</span>
			</div>
		);
	}

	if (isBanned) {
		// User is banned
		return (
			<div css={containerStyles}>
				<Heading count={commentCount} />
				<span css={headlineStyles}>
					Commenting has been disabled for this account (
					<a
						href="https://www.theguardian.com/community-faqs#321a"
						css={linkStyles}
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
			<div css={containerStyles}>
				<Heading count={commentCount} />
				<span css={headlineStyles}>
					This discussion is closed for comments
				</span>
			</div>
		);
	}

	if (!user && isClosedForComments) {
		// The discussion is closed and the reader is not logged in
		return (
			<div css={containerStyles}>
				<Heading count={commentCount} />
				<span css={headlineStyles}>
					This discussion is now closed for comments but you can still{' '}
					<SignInButton action="signin_to_comment">
						sign in
					</SignInButton>{' '}
					or{' '}
					<SignInButton action="register_to_comment">
						create your Guardian account
					</SignInButton>{' '}
					to join the discussion next time
				</span>
			</div>
		);
	}

	if (!user) {
		// The discussion is open but the reader is not logged in
		return (
			<div css={containerStyles}>
				<Heading count={commentCount} />
				<span css={headlineStyles}>
					<SignInButton action="signin_to_comment">
						Sign in
					</SignInButton>{' '}
					or{' '}
					<SignInButton action="register_to_comment">
						create your Guardian account
					</SignInButton>{' '}
					to join the discussion
				</span>
			</div>
		);
	}

	// Discussion open and user logged in
	return (
		<div css={containerStyles}>
			<Heading count={commentCount} />
			<div css={rowUntilDesktop}>
				<div css={imageWrapper}>
					<img
						src={
							user.secureAvatarUrl ||
							'https://avatar.guim.co.uk/no-user-image.gif'
						}
						alt={user.displayName || 'Guardian User'}
						css={imageStyles}
					/>
				</div>
				<div css={textStyles}>
					Signed in as
					<div css={usernameStyles}>
						{user.displayName || 'Guardian User'}
					</div>
				</div>
			</div>
		</div>
	);
};
