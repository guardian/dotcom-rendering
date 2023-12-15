/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/modules/epics/ContributionsEpicArticleCountAboveWithOptOut.tsx
 */
import React, { useState } from 'react';
import { body, textSans } from '@guardian/source-foundations';
import { palette, space } from '@guardian/source-foundations';
import { css } from '@emotion/react';
import {
	OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_OPEN,
	OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_CLOSE,
	OPHAN_COMPONENT_ARTICLE_COUNT_STAY_IN,
	OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT,
	OPHAN_COMPONENT_ARTICLE_COUNT_STAY_OUT,
	OPHAN_COMPONENT_ARTICLE_COUNT_OPT_IN,
} from './utils/ophan';
import { from, until } from '@guardian/source-foundations';
import { Button, ButtonLink } from '@guardian/source-react-components';
import { ArticleCounts } from '../../../lib/articleCount';
import { ArticleCountType } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { OphanComponentEvent } from '@guardian/libs';
import { ReactComponent } from '../lib/ReactComponent';

export interface ContributionsEpicArticleCountAboveWithOptOutProps {
	articleCounts: ArticleCounts;
	copy?: string;
	countType?: ArticleCountType;
	isArticleCountOn: boolean;
	onArticleCountOptOut: () => void;
	onArticleCountOptIn: () => void;
	openCmp?: () => void;
	submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
}

export const ContributionsEpicArticleCountAboveWithOptOut: ReactComponent<
	ContributionsEpicArticleCountAboveWithOptOutProps
> = ({
	articleCounts,
	copy,
	countType,
	isArticleCountOn,
	onArticleCountOptOut,
	onArticleCountOptIn,
	openCmp,
	submitComponentEvent,
}: ContributionsEpicArticleCountAboveWithOptOutProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const onToggleClick = () => {
		setIsOpen(!isOpen);
		submitComponentEvent &&
			submitComponentEvent(
				isOpen
					? OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_CLOSE
					: OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_OPEN,
			);
	};

	const onStayInClick = () => {
		setIsOpen(false);
		submitComponentEvent &&
			submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_STAY_IN);
	};

	const onOptOutClick = () => {
		setIsOpen(false);
		onArticleCountOptOut();
		submitComponentEvent &&
			submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT);
	};

	const onOptInClick = () => {
		setIsOpen(false);
		onArticleCountOptIn();
		submitComponentEvent &&
			submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_OPT_IN);
	};

	const onStayOutClick = () => {
		setIsOpen(false);
		submitComponentEvent &&
			submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_STAY_OUT);
	};

	const articleCount = articleCounts[countType ?? 'for52Weeks'];

	return (
		<div css={topContainer}>
			<ArticleCountWithToggle
				isArticleCountOn={isArticleCountOn}
				articleCount={articleCount}
				onToggleClick={onToggleClick}
				copy={copy}
			/>

			{isOpen && (
				<div css={articleCountDescriptionTopContainerStyles}>
					<div css={caretStyles}></div>
					<div css={articleCountDescriptionContainer}>
						{isArticleCountOn ? (
							<>
								<div css={articleCountBodyTextStyles}>
									Many readers tell us they enjoy seeing how
									many pieces of Guardian journalism they’ve
									read, watched or listened to. So here’s your
									count. Can we continue showing you this on
									support appeals like this?
								</div>
								<div css={articleCountCtasContainerStyles}>
									<Button
										priority="primary"
										size="xsmall"
										cssOverrides={
											articleCountDefaultCtaStyles
										}
										onClick={onStayInClick}
									>
										Yes, that&apos;s OK
									</Button>
									<Button
										priority="tertiary"
										size="xsmall"
										cssOverrides={
											articleCountOptOutCtaStyles
										}
										onClick={onOptOutClick}
									>
										No, opt me out
									</Button>
								</div>
							</>
						) : (
							<>
								<div css={articleCountBodyTextStyles}>
									Many readers tell us they enjoy seeing how
									many pieces of Guardian journalism they’ve
									read, watched or listened to. Can we start
									showing you your article count on support
									appeals like this?
								</div>
								<div css={articleCountCtasContainerStyles}>
									<Button
										priority="primary"
										size="xsmall"
										cssOverrides={
											articleCountOptInCtaStyles
										}
										onClick={onOptInClick}
									>
										Yes, opt me in
									</Button>
									<Button
										priority="tertiary"
										size="xsmall"
										cssOverrides={
											articleCountOptOutCtaStyles
										}
										onClick={onStayOutClick}
									>
										No, thank you
									</Button>
								</div>
							</>
						)}
					</div>
					<div css={trackingSettingsContainerStyles}>
						To opt out of other tracking activity, manage your{' '}
						<ButtonLink
							priority="secondary"
							cssOverrides={privacySettingsLinkStyles}
							onClick={openCmp}
						>
							Privacy Settings
						</ButtonLink>
					</div>
				</div>
			)}
		</div>
	);
};

// --- Helper components --- //

interface ArticleCountWithToggleProps {
	articleCount: number;
	isArticleCountOn: boolean;
	onToggleClick: () => void;
	copy?: string;
}

const ArticleCountWithToggle: ReactComponent<ArticleCountWithToggleProps> = ({
	isArticleCountOn,
	articleCount,
	onToggleClick,
	copy,
}: ArticleCountWithToggleProps) => {
	if (isArticleCountOn && articleCount >= 5) {
		return (
			<div css={articleCountOnHeaderContainerStyles}>
				<ArticleCount articleCount={articleCount} copy={copy} />

				<div css={articleCountWrapperStyles}>
					<div css={articleCountTextStyles}>Article count</div>
					<ButtonLink
						priority="secondary"
						onClick={onToggleClick}
						cssOverrides={articleCountCtaStyles}
					>
						on
					</ButtonLink>
				</div>
			</div>
		);
	}

	if (!isArticleCountOn) {
		return (
			<div css={articleCountWrapperStyles}>
				<div css={articleCountTextStyles}>Article count</div>
				<ButtonLink
					priority="secondary"
					onClick={onToggleClick}
					cssOverrides={articleCountCtaStyles}
				>
					off
				</ButtonLink>
			</div>
		);
	}

	return <></>;
};

const ARTICLE_COUNT_TEMPLATE = '%%ARTICLE_COUNT%%';
const containsArticleCountTemplate = (copy: string): boolean =>
	copy.includes(ARTICLE_COUNT_TEMPLATE);

interface CustomArticleCountCopyProps {
	articleCount: number;
	copy: string;
}

const CustomArticleCountCopy: ReactComponent<CustomArticleCountCopyProps> = ({
	articleCount,
	copy,
}) => {
	const [copyHead, copyTail] = copy.split(ARTICLE_COUNT_TEMPLATE);

	return (
		<div css={articleCountAboveContainerStyles}>
			{copyHead}
			<span css={optOutContainer}>{articleCount}&nbsp;articles</span>
			{copyTail.substring(1, 9) === 'articles'
				? copyTail.substring(9)
				: copyTail}
		</div>
	);
};

interface ArticleCountProps {
	articleCount: number;
	copy?: string;
}

const ArticleCount: ReactComponent<ArticleCountProps> = ({
	articleCount,
	copy,
}) => {
	if (copy && containsArticleCountTemplate(copy)) {
		// Custom article count message
		return (
			<CustomArticleCountCopy articleCount={articleCount} copy={copy} />
		);
	} else if (articleCount >= 50) {
		return (
			<div css={articleCountAboveContainerStyles}>
				Congratulations on being one of our top readers globally –
				you&apos;ve read{' '}
				<span css={optOutContainer}>{articleCount} articles</span> in
				the last year
			</div>
		);
	} else {
		return (
			<div css={articleCountAboveContainerStyles}>
				You&apos;ve read{' '}
				<span css={optOutContainer}>{articleCount} articles</span> in
				the last year
			</div>
		);
	}
};

// --- Styles --- //

const topContainer = css`
	display: flex;
	flex-direction: column-reverse;

	${from.tablet} {
		display: block;
		margin-top: 10px;
	}
`;

const articleCountAboveContainerStyles = css`
	font-style: italic;
	${body.small({ fontWeight: 'bold' })};

	${from.tablet} {
		${body.medium({ fontWeight: 'bold' })};
	}
`;

const optOutContainer = css`
	color: ${palette.opinion[400]};
`;

const articleCountOnHeaderContainerStyles = css`
	display: flex;
	justify-content: space-between;
	flex-direction: column-reverse;
	align-items: flex-start;

	${from.tablet} {
		flex-direction: row;
		align-items: flex-start;
	}
`;

const articleCountWrapperStyles = css`
	flex-shrink: 0;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	margin-right: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	justify-content: start;

	${from.tablet} {
		margin-left: ${space[5]}px;
		margin-bottom: 0;
		justify-content: flex-end;
	}
`;

const articleCountTextStyles = css`
	${textSans.xxsmall()};
	margin-right: ${space[1]}px;

	${from.tablet} {
		${textSans.small()};
	}
`;

const articleCountCtaStyles = css`
	margin-top: 0;

	${textSans.xxsmall({ fontWeight: 'bold' })};

	${from.tablet} {
		${textSans.small({ fontWeight: 'bold' })};
	}
`;

const articleCountDescriptionTopContainerStyles = css`
	border-bottom: 1px solid ${palette.neutral[46]};
	position: relative;
	margin-bottom: ${space[2]}px;

	${from.tablet} {
		margin-top: ${space[4]}px;
		border-top: 1px solid ${palette.neutral[0]};
		border-bottom: 1px solid ${palette.neutral[0]};
	}
`;

const articleCountDescriptionContainer = css`
	align-items: center;
	display: flex;
	flex-direction: column;
	padding: ${space[1]}px ${space[1]}px 0;

	${from.tablet} {
		flex-direction: row;
		padding: ${space[1]}px 0;
		align-items: start;
		margin-top: ${space[1]}px;
	}
`;

const articleCountBodyTextStyles = css`
	${textSans.small()};
	width: 100%;

	${from.tablet} {
		width: 68%;
	}
`;

const articleCountCtasContainerStyles = css`
	display: flex;
	align-self: start;
	margin-top: ${space[4]}px;
	> * + * {
		margin-left: ${space[3]}px;
	}

	${from.tablet} {
		flex-direction: column;
		margin-left: auto;
		margin-top: ${space[2]}px;
		justify-content: space-between;
		> * + * {
			margin-top: ${space[3]}px;
			margin-left: 0;
		}
	}
`;

const articleCountOptInCtaStyles = css`
	background-color: ${palette.neutral[0]};
`;

const articleCountDefaultCtaStyles = css`
	background-color: ${palette.neutral[0]};
	padding: auto ${space[6]}px;

	${from.tablet} {
		padding-left: ${space[5]}px;
	}
`;

const articleCountOptOutCtaStyles = css`
	color: ${palette.neutral[0]};
	border: 1px solid ${palette.neutral[0]};
`;

const trackingSettingsContainerStyles = css`
	margin: ${space[4]}px auto ${space[3]}px;
	${textSans.xxsmall()};

	${from.tablet} {
		${textSans.xsmall()};
	}
`;

const privacySettingsLinkStyles = css`
	${textSans.xxsmall({ fontWeight: 'bold' })};

	${from.tablet} {
		${textSans.xsmall({ fontWeight: 'bold' })};
	}
`;

const caretStyles = css`
	&:before {
		content: '';
		display: block;
		position: absolute;
		bottom: -14px;
		width: 0;
		height: 0;
		border: 7px solid transparent;
		border-top-color: ${palette.neutral[46]};

		${from.tablet} {
			right: 5px;
			bottom: 100%;
			border: 10px solid transparent;
			border-bottom-color: ${palette.neutral[0]};
		}

		${until.tablet} {
			left: 75px;
		}
	}

	&:after {
		content: '';
		display: block;
		position: absolute;
		bottom: -12px;
		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-top-color: ${palette.neutral[97]};

		${from.tablet} {
			right: 6px;
			bottom: 100%;
			border: 9px solid transparent;
			border-bottom-color: ${palette.neutral[97]};
		}

		${until.tablet} {
			left: 76px;
		}
	}
`;
