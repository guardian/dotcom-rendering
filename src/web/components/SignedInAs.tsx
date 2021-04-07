import React from 'react';
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
		${textSans.xsmall()}
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

	return (
		<div className={containerStyles}>
			<h2 className={headingStyles}>
				comments{' '}
				<span
					className={css`
						color: ${neutral[60]};
					`}
				>
					({commentCount || '…'})
				</span>
			</h2>

			{/* User is banned */}
			{enableDiscussionSwitch && isBanned && (
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
			)}

			{/* Discussion is disabled sitewide */}
			{user && enableDiscussionSwitch === false && (
				<span className={headlineStyles}>
					Commenting has been disabled at this time
				</span>
			)}

			{/* Discussion open and user logged in */}
			{enableDiscussionSwitch &&
				user &&
				!isBanned &&
				!isClosedForComments && (
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
				)}

			{/* User is logged out (show this even if the discussion is closed) */}
			{!user && (
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
					to join the discussion.
				</span>
			)}

			{/* The discussion is closed (only appears for logged in users) */}
			{enableDiscussionSwitch && user && isClosedForComments && (
				<span className={headlineStyles}>
					This discussion is closed for comments
				</span>
			)}
		</div>
	);
};
