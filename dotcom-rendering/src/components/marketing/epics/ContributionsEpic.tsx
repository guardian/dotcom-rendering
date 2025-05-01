/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/modules/epics/ContributionsEpic.tsx
 */
import { css } from '@emotion/react';
import {
	article17,
	articleBold17,
	from,
	headlineBold20,
	palette,
	space,
} from '@guardian/source/foundations';
import { Ticker } from '@guardian/source-development-kitchen/react-components';
import type { TickerSettings } from '@guardian/source-development-kitchen/react-components';
import {
	containsNonArticleCountPlaceholder,
	epicPropsSchema,
	replaceNonArticleCountPlaceholders,
} from '@guardian/support-dotcom-components';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import { useArticleCountOptOut } from '../hooks/useArticleCountOptOut';
import type { ReactComponent } from '../lib/ReactComponent';
import { replaceArticleCount } from '../lib/replaceArticleCount';
import {
	addTrackingParamsToBodyLinks,
	createInsertEventFromTracking,
	createViewEventFromTracking,
} from '../lib/tracking';
import { logEpicView } from '../lib/viewLog';
import type { OphanTracking } from '../shared/ArticleCountOptOutPopup';
import { BylineWithHeadshot } from './BylineWithHeadshot';
import { ContributionsEpicArticleCountAboveWithOptOut } from './ContributionsEpicArticleCountAboveWithOptOut';
import { ContributionsEpicNewsletterSignup } from './ContributionsEpicNewsletterSignup';
import { ContributionsEpicSignInCta } from './ContributionsEpicSignInCta';
import { ContributionsEpicCtasContainer } from './ctas/ContributionsEpicCtasContainer';

// CSS Styling
// -------------------------------------------
const wrapperStyles = css`
	padding: ${space[1]}px ${space[2]}px ${space[3]}px;
	border-top: 1px solid ${palette.brandAlt[400]};
	background-color: ${palette.neutral[97]};

	* {
		::selection {
			background: ${palette.brandAlt[400]};
		}
		::-moz-selection {
			background: ${palette.brandAlt[400]};
		}
	}

	b,
	strong {
		font-weight: bold;
	}
`;

const headingStyles = css`
	${headlineBold20};
	margin-top: 0;
	margin-bottom: ${space[3]}px;
`;

// Custom styles for <a> tags in the Epic content
const linkStyles = css`
	a {
		color: ${palette.news[400]};
		text-decoration: none;
		border-bottom: 1px solid ${palette.news[400]};
	}
`;

const bodyStyles = css`
	margin: 0 auto ${space[2]}px;
	${article17};
	${linkStyles}
`;

const highlightWrapperStyles = css`
	${articleBold17};
	${linkStyles};
`;

const highlightStyles = css`
	padding: 2px;
	background-color: ${palette.brandAlt[400]};
	color: ${palette.neutral[7]};
`;

const imageWrapperStyles = css`
	margin: ${space[3]}px 0 ${space[2]}px;

	${from.tablet} {
		margin: 10px 0;
	}
`;

const imageStyles = css`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

const defaultTickerStylingSettings: TickerSettings['tickerStylingSettings'] = {
	filledProgressColour: '#5056F5',
	progressBarBackgroundColour: 'rgba(80, 86, 245, 0.35)',
	headlineColour: '#000000',
	totalColour: '#5056F5',
	goalColour: '#000000',
};

const articleCountAboveContainerStyles = css`
	margin-bottom: ${space[4]}px;
`;

const tickerContainerStyles = css`
	padding-bottom: ${space[5]}px;
	padding-top: ${space[1]}px;
`;

// EpicHeader - local component
// -------------------------------------------
interface EpicHeaderProps {
	text: string;
	numArticles: number;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
}

const EpicHeader: ReactComponent<EpicHeaderProps> = ({
	text,
	numArticles,
	tracking,
	showAboveArticleCount,
}: EpicHeaderProps) => {
	const elements = replaceArticleCount(
		text,
		numArticles,
		'epic',
		tracking,
		!showAboveArticleCount,
	);
	return <h2 css={headingStyles}>{elements}</h2>;
};

// Highlighted - local component
// -------------------------------------------
type HighlightedProps = {
	highlightedText: string;
	numArticles: number;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
};

const Highlighted: ReactComponent<HighlightedProps> = ({
	highlightedText,
	numArticles,
	tracking,
	showAboveArticleCount,
}: HighlightedProps) => {
	const elements = replaceArticleCount(
		highlightedText,
		numArticles,
		'epic',
		tracking,
		!showAboveArticleCount,
	);

	return (
		<strong css={highlightWrapperStyles}>
			{' '}
			<span css={highlightStyles}>{elements}</span>
		</strong>
	);
};

// EpicBodyParagraph - local component
// -------------------------------------------
interface EpicBodyParagraphProps {
	paragraph: string;
	numArticles: number;
	highlighted: JSX.Element | null;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
}

const EpicBodyParagraph: ReactComponent<EpicBodyParagraphProps> = ({
	paragraph,
	numArticles,
	highlighted,
	tracking,
	showAboveArticleCount,
}: EpicBodyParagraphProps) => {
	const elements = replaceArticleCount(
		paragraph,
		numArticles,
		'epic',
		tracking,
		!showAboveArticleCount,
	);

	return (
		<p css={bodyStyles}>
			{elements}
			{highlighted ? highlighted : null}
		</p>
	);
};

// EpicBody - local component
// -------------------------------------------
type BodyProps = {
	paragraphs: string[];
	highlightedText?: string;
	numArticles: number;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
};

const EpicBody: ReactComponent<BodyProps> = ({
	numArticles,
	paragraphs,
	highlightedText,
	tracking,
	showAboveArticleCount,
}: BodyProps) => {
	return (
		<>
			{paragraphs.map((paragraph, idx) => {
				const paragraphElement = (
					<EpicBodyParagraph
						key={idx}
						paragraph={paragraph}
						numArticles={numArticles}
						highlighted={
							highlightedText && idx === paragraphs.length - 1 ? (
								<Highlighted
									highlightedText={highlightedText}
									numArticles={numArticles}
									showAboveArticleCount={
										showAboveArticleCount
									}
								/>
							) : null
						}
						tracking={tracking}
						showAboveArticleCount={showAboveArticleCount}
					/>
				);
				return paragraphElement;
			})}
		</>
	);
};

const ContributionsEpic: ReactComponent<EpicProps> = ({
	variant,
	tracking,
	countryCode,
	articleCounts,
	fetchEmail,
	submitComponentEvent,
	openCmp,
	hasConsentForArticleCount,
}: EpicProps) => {
	const { image, tickerSettings, choiceCardAmounts, newsletterSignup } =
		variant;

	const { hasOptedOut, onArticleCountOptIn, onArticleCountOptOut } =
		useArticleCountOptOut();

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			// For epic view count
			logEpicView(tracking.abTestName);

			// For ophan
			if (submitComponentEvent) {
				submitComponentEvent(
					createViewEventFromTracking(
						tracking,
						tracking.campaignCode,
					),
				);
			}
		}
	}, [hasBeenSeen, submitComponentEvent, countryCode, tracking]);

	useEffect(() => {
		if (submitComponentEvent) {
			submitComponentEvent(
				createInsertEventFromTracking(tracking, tracking.campaignCode),
			);
		}
	}, [submitComponentEvent, tracking]);

	const cleanHighlighted = replaceNonArticleCountPlaceholders(
		variant.highlightedText,
		countryCode,
	);

	const cleanHeading = replaceNonArticleCountPlaceholders(
		variant.heading,
		countryCode,
	);

	const cleanParagraphs = variant.paragraphs
		.map((paragraph) =>
			replaceNonArticleCountPlaceholders(paragraph, countryCode),
		)
		.map((paragraph) =>
			addTrackingParamsToBodyLinks(
				paragraph,
				tracking,
				articleCounts.for52Weeks,
				countryCode,
			),
		);

	if (
		[cleanHighlighted, cleanHeading, ...cleanParagraphs].some(
			containsNonArticleCountPlaceholder,
		)
	) {
		return <></>; // quick exit if something goes wrong. Ideally we'd throw and caller would catch/log but TODO that separately
	}

	const ophanTracking: OphanTracking | undefined = submitComponentEvent && {
		submitComponentEvent,
		componentType: 'ACQUISITIONS_EPIC',
	};

	const showAboveArticleCount = !!(
		variant.separateArticleCount?.type === 'above' &&
		hasConsentForArticleCount
	);

	return (
		<section ref={setNode} css={wrapperStyles}>
			{showAboveArticleCount && (
				<div css={articleCountAboveContainerStyles}>
					<ContributionsEpicArticleCountAboveWithOptOut
						articleCount={articleCounts.forTargetedWeeks}
						isArticleCountOn={!hasOptedOut}
						onArticleCountOptOut={onArticleCountOptOut}
						onArticleCountOptIn={onArticleCountOptIn}
						openCmp={openCmp}
						submitComponentEvent={submitComponentEvent}
						copy={variant.separateArticleCount?.copy}
					/>
				</div>
			)}

			{tickerSettings?.tickerData && (
				<div css={tickerContainerStyles}>
					<Ticker
						currencySymbol={tickerSettings.currencySymbol}
						copy={{
							headline: tickerSettings.copy.countLabel,
							goalCopy: tickerSettings.copy.goalCopy,
						}}
						tickerData={tickerSettings.tickerData}
						tickerStylingSettings={defaultTickerStylingSettings}
						size={'medium'}
					/>
				</div>
			)}

			{image && (
				<div css={imageWrapperStyles}>
					<img
						src={image.mainUrl}
						css={imageStyles}
						alt={image.altText}
					/>
				</div>
			)}

			{!!cleanHeading && (
				<EpicHeader
					text={cleanHeading}
					numArticles={articleCounts.forTargetedWeeks}
					tracking={ophanTracking}
					showAboveArticleCount={showAboveArticleCount}
				/>
			)}

			<EpicBody
				paragraphs={cleanParagraphs}
				highlightedText={cleanHighlighted}
				numArticles={articleCounts.forTargetedWeeks}
				tracking={ophanTracking}
				showAboveArticleCount={showAboveArticleCount}
			/>

			{variant.bylineWithImage && (
				<BylineWithHeadshot bylineWithImage={variant.bylineWithImage} />
			)}

			{newsletterSignup ? (
				<ContributionsEpicNewsletterSignup
					newsletterId={newsletterSignup.newsletterId}
					successDescription={newsletterSignup.successDescription}
					tracking={tracking}
				/>
			) : (
				<ContributionsEpicCtasContainer
					variant={variant}
					tracking={tracking}
					countryCode={countryCode}
					articleCounts={articleCounts}
					fetchEmail={fetchEmail}
					submitComponentEvent={submitComponentEvent}
					amountsTestName={choiceCardAmounts?.testName}
					amountsVariantName={choiceCardAmounts?.variantName}
				/>
			)}

			{variant.showSignInLink && <ContributionsEpicSignInCta />}
		</section>
	);
};

export const validate = (props: unknown): props is EpicProps => {
	const result = epicPropsSchema.safeParse(props);
	return result.success;
};

export const validatedEpic: ReactComponent<EpicProps> = (props) => {
	if (validate(props)) {
		return <ContributionsEpic {...props} />;
	}
	return <></>;
};

const unValidatedEpic = ContributionsEpic;
export {
	validatedEpic as ContributionsEpic,
	unValidatedEpic as ContributionsEpicUnvalidated,
};
