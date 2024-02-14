import { css } from '@emotion/react';
import {
	from,
	remSpace,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Button, Link, SvgIndent } from '@guardian/source-react-components';
import { useState } from 'react';
import type {
	CommentType,
	ResponseType,
	SignedInUser,
	Staff,
} from '../../lib/discussion';
import type { reportAbuse } from '../../lib/discussionApi';
import { createAuthenticationEventParams } from '../../lib/identity-component-event';
import { palette as schemedPalette } from '../../palette';
import { AbuseReportForm } from './AbuseReportForm';
import { Avatar } from './Avatar';
import { GuardianContributor, GuardianPick, GuardianStaff } from './Badges';
import { Column } from './Column';
import { RecommendationCount } from './RecommendationCount';
import { Row } from './Row';
import { Timestamp } from './Timestamp';

type Props = {
	user?: SignedInUser;
	comment: CommentType | ResponseType;
	isClosedForComments: boolean;
	setCommentBeingRepliedTo: (
		commentBeingRepliedTo?: CommentType | ResponseType,
	) => void;
	isReply: boolean;
	wasScrolledTo?: boolean;
	isMuted: boolean;
	toggleMuteStatus: (userId: string) => void;
	onPermalinkClick: (commentId: number) => void;
	pickError: string;
	setPickError: (error: string) => void;
	reportAbuse: ReturnType<typeof reportAbuse>;
};

const commentControlsLink = css`
	margin-top: -2px;

	a {
		${textSans.small({ fontWeight: 'bold' })}
		margin-right: ${space[2]}px;
		color: ${schemedPalette('--discussion-accent-text')};
		/*
      We do not want underline to be applied to SVG
      therefore we override the styles and apply them to the nested <span>
    */
		:hover {
			text-decoration: none;
			text-decoration-color: none;
			span {
				color: ${schemedPalette('--discussion-accent-text')};
				text-decoration: underline;
				text-decoration-color: ${schemedPalette(
					'--discussion-accent-text',
				)};
			}
		}
	}
`;

const spaceBetween = css`
	display: flex;
	justify-content: space-between;
`;

const commentCss = css`
	display: block;
	clear: left;
	${textSans.small()}
	margin-top: ${remSpace[2]};
	margin-bottom: ${remSpace[3]};
	word-break: break-word;

	p {
		margin-top: 0;
		margin-bottom: ${space[3]}px;
	}

	blockquote {
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		margin-left: ${space[5]}px;
		margin-right: ${space[5]}px;
		padding-left: ${space[2]}px;
		color: ${schemedPalette('--discussion-subdued')};
	}

	i {
		font-style: italic;
	}

	b {
		font-weight: bold;
	}

	code {
		/* stylelint-disable-next-line property-disallowed-list -- we do not have a monospace Source font */
		font-family: monospace;
		font-size: 1em;
	}
`;

const blockedCommentStyles = css`
	color: ${schemedPalette('--discussion-subdued')};
	${textSans.xxsmall()}
`;

// to override a tag styles from dangerouslySetInnerHTML
const commentLinkStyling = css`
	a {
		color: ${schemedPalette('--discussion-link')};
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const commentWrapper = css`
	border-top: 1px solid ${schemedPalette('--discussion-border')};
	display: flex;
	padding: ${space[2]}px 0;
`;

const selectedStyles = css`
	background-color: ${schemedPalette('--discussion-selected-background')};
	margin-left: -${space[2]}px;
	padding-left: ${space[2]}px;
	margin-right: -${space[2]}px;
	padding-right: ${space[2]}px;
`;

const avatarMargin = css`
	margin-right: ${space[2]}px;

	${until.mobileLandscape} {
		display: none;
	}
`;

const colourStyles = css`
	a {
		color: ${schemedPalette('--discussion-accent-text')};
		text-decoration-color: ${schemedPalette('--discussion-accent-text')};
		:hover {
			color: ${schemedPalette('--discussion-accent-text')};
			text-decoration-color: ${schemedPalette(
				'--discussion-accent-text',
			)};
		}
	}
`;

const boldFont = css`
	a {
		${textSans.small({ fontWeight: 'bold' })}
	}
`;

const regularFont = css`
	a {
		${textSans.small()}
	}
`;

// TODO: fix using !important
const svgReplyArrow = css`
	svg {
		/* stylelint-disable-next-line declaration-no-important */
		fill: ${schemedPalette('--discussion-subdued')} !important;
	}
`;

const commentDetails = css`
	flex-grow: 1;
	width: 100%;
`;

const headerStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const iconWrapper = css`
	padding: 2px;
	white-space: nowrap;
`;

const timestampWrapperStyles = css`
	margin-left: ${space[2]}px;
	margin-bottom: -2px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const hideBelowMobileLandscape = css`
	${until.mobileLandscape} {
		display: none;
	}
`;

const hideAboveMobileLandscape = css`
	${from.mobileLandscape} {
		display: none;
	}
`;

const negativeMargin = css`
	margin-top: 0px;
	margin-bottom: -6px;
`;

const cssTextOverflowElip = css`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const cssReplyToWrapper = css`
	${until.mobileLandscape} {
		padding-right: 10px;
		width: calc(100% - 35px);
		box-sizing: border-box;
	}
`;

const buttonLinkPillarBaseStyles = css`
	button {
		color: ${schemedPalette('--discussion-accent-text')};
		background-color: transparent;
		height: 18px;
		min-height: 18px;
		/* Radius 0 is used to style focus halo */
		border-radius: 0;

		:hover {
			text-decoration: underline;
			text-decoration-color: ${schemedPalette(
				'--discussion-accent-text',
			)};
		}
	}
`;

const buttonLinkBaseStyles = css`
	button {
		color: ${schemedPalette('--discussion-subdued')};
		background-color: transparent;
		height: 18px;
		min-height: 18px;
		/* Radius 0 is used to style focus halo */
		border-radius: 0;

		:hover {
			text-decoration: underline;
			text-decoration-color: ${schemedPalette('--discussion-subdued')};
		}
	}
`;

const subdued = css`
	text-decoration: none;
`;

// In order to show as much of the usernames as possible without fixed widths:
// - First label should shrink to contents but be no bigger than 60%
// - Second label should never force first label less than its contents if less than 60%
// - Second label should fill remaining space after above
// - Both labels should truncate with ellipsis if they fill their space
// Test page: https://codepen.io/gtrufitt/pen/LYGKQyY

const cssReplyAlphaDisplayName = css`
	${until.mobileLandscape} {
		${cssTextOverflowElip}
		width: 100%;
		max-width: fit-content;
	}
`;

const cssReplyBetaDisplayName = css`
	${until.mobileLandscape} {
		${cssTextOverflowElip}
		min-width: 40%;
		flex-grow: 1;
	}
`;

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		css={css`
			width: ${space[amount]}px;
		`}
	/>
);

export const Comment = ({
	comment,
	isClosedForComments,
	setCommentBeingRepliedTo,
	user,
	isReply,
	wasScrolledTo,
	isMuted,
	toggleMuteStatus,
	onPermalinkClick,
	pickError,
	setPickError,
	reportAbuse,
}: Props) => {
	const [isHighlighted, setIsHighlighted] = useState<boolean>(
		comment.isHighlighted,
	);

	const [showAbuseReportForm, setAbuseReportForm] = useState(false);
	const toggleSetShowForm = () => setAbuseReportForm(!showAbuseReportForm);

	const pick = async (staffUser: Staff) => {
		setPickError('');
		const response = await staffUser.onPick(comment.id);
		if (response.kind === 'error') {
			setPickError(response.error);
		} else {
			setIsHighlighted(response.value);
		}
	};

	const unPick = async (staffUser: Staff) => {
		setPickError('');
		const response = await staffUser.onUnpick(comment.id);
		if (response.kind === 'error') {
			setPickError(response.error);
		} else {
			setIsHighlighted(response.value);
		}
	};

	const showStaffBadge = comment.userProfile.badge.some(
		(obj) => obj['name'] === 'Staff',
	);

	const showPickBadge = comment.status !== 'blocked' && isHighlighted;

	// A contributor could be e.g. a freelancer that commonly comments on articles.
	// In frontend we check/display the Staff badge else we check/display the
	// Contributor - we shouldn't see both Staff & Contributor badges.
	// https://github.com/guardian/frontend/blob/main/discussion/app/views/fragments/commentBadges.scala.html#L8
	const showContributorBadge = comment.userProfile.badge.some(
		(obj) => obj['name'] === 'Contributor',
	);

	return (
		<>
			{!!pickError && (
				<span
					css={css`
						color: red;
					`}
				>
					{pickError}
				</span>
			)}
			<div
				id={`comment-${comment.id}`}
				data-testid={comment.id}
				css={[commentWrapper, wasScrolledTo && selectedStyles]}
			>
				<div css={avatarMargin}>
					<Avatar
						imageUrl={comment.userProfile.avatar}
						displayName={comment.userProfile.displayName}
						size={isReply ? 'small' : 'medium'}
					/>
				</div>

				<div css={commentDetails}>
					<header css={headerStyles}>
						<div css={cssReplyToWrapper}>
							<Column>
								<div
									css={[
										'responseTo' in comment &&
											hideBelowMobileLandscape,
										hideAboveMobileLandscape,
									]}
								>
									<Row>
										<div
											css={css`
												margin-right: ${space[2]}px;
											`}
										>
											<Avatar
												imageUrl={
													comment.userProfile.avatar
												}
												displayName={''}
												size="small"
											/>
										</div>
										<Column>
											<div
												css={[
													colourStyles,
													boldFont,
													negativeMargin,
												]}
											>
												<Link
													href={
														comment.userProfile
															.webUrl
													}
													cssOverrides={subdued}
													rel="nofollow"
												>
													{
														comment.userProfile
															.displayName
													}
												</Link>
											</div>
											<Timestamp
												isoDateTime={
													comment.isoDateTime
												}
												webUrl={comment.webUrl}
												commentId={comment.id}
												onPermalinkClick={
													onPermalinkClick
												}
											/>
										</Column>
									</Row>
								</div>
								<div
									css={[
										!('responseTo' in comment) &&
											hideBelowMobileLandscape,
									]}
								>
									<Row>
										<div
											css={[
												colourStyles,
												boldFont,
												cssReplyAlphaDisplayName,
											]}
										>
											<Link
												href={
													comment.userProfile.webUrl
												}
												cssOverrides={subdued}
												rel="nofollow"
											>
												{
													comment.userProfile
														.displayName
												}
											</Link>
										</div>
										{'responseTo' in comment ? (
											<div
												css={[
													colourStyles,
													regularFont,
													svgReplyArrow,
													cssReplyBetaDisplayName,
												]}
											>
												<Link
													href={`#comment-${comment.responseTo.commentId}`}
													cssOverrides={subdued}
													icon={<SvgIndent />}
													iconSide="left"
													rel="nofollow"
												>
													{
														comment.responseTo
															.displayName
													}
												</Link>
											</div>
										) : (
											<></>
										)}
										<div
											css={[
												timestampWrapperStyles,
												'responseTo' in comment &&
													hideBelowMobileLandscape,
											]}
										>
											<Timestamp
												isoDateTime={
													comment.isoDateTime
												}
												webUrl={comment.webUrl}
												commentId={comment.id}
												onPermalinkClick={
													onPermalinkClick
												}
											/>
										</div>
									</Row>
									<Row>
										{showStaffBadge && (
											<div css={iconWrapper}>
												<GuardianStaff />
											</div>
										)}
										{showContributorBadge &&
											!showStaffBadge && (
												<div css={iconWrapper}>
													<GuardianContributor />
												</div>
											)}
										{showPickBadge && (
											<div css={iconWrapper}>
												<GuardianPick />
											</div>
										)}
									</Row>
								</div>
							</Column>
						</div>
						{comment.status !== 'blocked' && (
							<RecommendationCount
								commentId={comment.id}
								initialCount={comment.numRecommends}
								alreadyRecommended={false}
								user={user}
								userMadeComment={
									user?.profile.userId ===
									comment.userProfile.userId
								}
							/>
						)}
					</header>

					<div
						css={[
							'responseTo' in comment && hideBelowMobileLandscape,
							hideAboveMobileLandscape,
						]}
					>
						<Row>
							{showStaffBadge && (
								<div css={iconWrapper}>
									<GuardianStaff />
								</div>
							)}
							{showContributorBadge && !showStaffBadge && (
								<div css={iconWrapper}>
									<GuardianContributor />
								</div>
							)}
							{showPickBadge && (
								<div css={iconWrapper}>
									<GuardianPick />
								</div>
							)}
						</Row>
					</div>

					{/* MUTED */}
					{isMuted && (
						<p css={blockedCommentStyles}>
							<Row>
								<>
									All posts from this user have been muted on
									this device.
								</>
								<Space amount={1} />
								<div
									css={[
										buttonLinkBaseStyles,
										css`
											button {
												${textSans.xxsmall({
													fontWeight: 'bold',
												})}
											}
										`,
									]}
								>
									<Button
										priority="subdued"
										size="xsmall"
										onClick={() =>
											toggleMuteStatus(
												comment.userProfile.userId,
											)
										}
										data-link-name="unmute-user"
									>
										Unmute?
									</Button>
								</div>
							</Row>
						</p>
					)}

					{/* BLOCKED */}
					{!isMuted && comment.status === 'blocked' && (
						<p
							css={[blockedCommentStyles, commentLinkStyling]}
							dangerouslySetInnerHTML={{ __html: comment.body }}
						/>
					)}

					{/* NORMAL */}
					{!isMuted && comment.status !== 'blocked' && (
						<>
							<div
								css={[commentCss, commentLinkStyling]}
								dangerouslySetInnerHTML={{
									__html: comment.body,
								}}
							/>
							<div css={spaceBetween}>
								<Row>
									{/* When commenting is closed, no reply link shows at all */}
									{!isClosedForComments && (
										<>
											{/* If user is not logged in we link to the login page */}
											{user ? (
												<div
													css={[
														svgReplyArrow,
														buttonLinkPillarBaseStyles,
														css`
															button {
																${textSans.small(
																	{
																		fontWeight:
																			'bold',
																	},
																)}
															}
														`,
													]}
												>
													<Button
														priority="subdued"
														onClick={() =>
															setCommentBeingRepliedTo(
																comment,
															)
														}
														icon={<SvgIndent />}
														iconSide="left"
														data-link-name="reply to comment"
													>
														Reply
													</Button>
												</div>
											) : (
												<div
													css={[
														svgReplyArrow,
														commentControlsLink,
													]}
												>
													<Link
														href={`https://profile.theguardian.com/signin?returnUrl=${
															comment.webUrl
														}&${createAuthenticationEventParams(
															'signin_to_reply_comment',
														)}`}
														cssOverrides={subdued}
														icon={<SvgIndent />}
														iconSide="left"
														rel="nofollow"
													>
														{/* We use this span to scope the styling */}
														<span data-link-name="reply to comment">
															Reply
														</span>
													</Link>
												</div>
											)}
											<Space amount={4} />
										</>
									)}
									<Space amount={4} />
									{/* Only staff can pick, and they cannot pick their own comment */}
									{user?.kind === 'Staff' &&
										user.profile.userId !==
											comment.userProfile.userId && (
											<div
												css={[
													buttonLinkPillarBaseStyles,
													css`
														button {
															${textSans.small({
																fontWeight:
																	'bold',
															})}
														}
													`,
												]}
											>
												<Button
													priority="subdued"
													onClick={
														isHighlighted
															? () => unPick(user)
															: () => pick(user)
													}
													data-link-name={
														isHighlighted
															? 'unpick-comment'
															: 'pick-comment'
													}
												>
													{isHighlighted
														? 'Unpick'
														: 'Pick'}
												</Button>
											</div>
										)}
								</Row>
								<Row>
									{/* You can't mute unless logged in and you can't mute yourself */}
									{user &&
									comment.userProfile.userId !==
										user.profile.userId ? (
										<div
											css={[
												buttonLinkBaseStyles,
												css`
													button {
														${textSans.xxsmall()}
													}
												`,
											]}
										>
											<Button
												priority="subdued"
												size="small"
												onClick={() =>
													toggleMuteStatus(
														comment.userProfile
															.userId,
													)
												}
												data-link-name="mute-user"
											>
												Mute
											</Button>
										</div>
									) : (
										<></>
									)}
									<Space amount={4} />
									<div
										css={[
											buttonLinkBaseStyles,
											css`
												button {
													${textSans.xxsmall()}
												}
											`,
										]}
									>
										<Button
											priority="subdued"
											size="small"
											onClick={toggleSetShowForm}
											data-link-name="Open report abuse"
										>
											Report
										</Button>
									</div>
									{showAbuseReportForm && (
										<div
											css={css`
												position: relative;
											`}
										>
											<AbuseReportForm
												toggleSetShowForm={
													toggleSetShowForm
												}
												commentId={comment.id}
												reportAbuse={reportAbuse}
											/>
										</div>
									)}
								</Row>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};
