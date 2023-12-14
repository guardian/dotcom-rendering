/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/modules/epics/ContributionsEpic.tsx
 */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { body, headline } from '@guardian/source-foundations';
import { palette, space } from '@guardian/source-foundations';
import { from } from '@guardian/source-foundations';
import { BylineWithHeadshot } from './BylineWithHeadshot';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';
import { OphanTracking } from '../shared/ArticleCountOptOutPopup';
import { ContributionsEpicArticleCountAboveWithOptOut } from './ContributionsEpicArticleCountAboveWithOptOut';
import { useArticleCountOptOut } from '../hooks/useArticleCountOptOut';
import { withParsedProps } from '../shared/ModuleWrapper';
import { ContributionsEpicChoiceCards } from './ContributionsEpicChoiceCards';
import { ContributionsEpicSignInCta } from './ContributionsEpicSignInCta';
import ContributionsEpicNewsletterSignup from './ContributionsEpicNewsletterSignup';
import { ContributionsEpicCtas } from './ContributionsEpicCtas';
// TODO - do we need this in DCR?
// import { isValidApplePayWalletSession } from '../utils/applePay';
import { OPHAN_COMPONENT_EVENT_APPLEPAY_AUTHORISED } from './utils/ophan';
import { ReactComponent } from '../lib/ReactComponent';
import { replaceArticleCount } from '../lib/replaceArticleCount';
import { EpicProps } from '@guardian/support-dotcom-components/dist/shared/src/types/props/epic';
import { ChoiceCardSelection } from '../lib/choiceCards';
import {
	ContributionFrequency,
	Stage,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import {
	containsNonArticleCountPlaceholder,
	getLocalCurrencySymbol,
	replaceNonArticleCountPlaceholders,
} from '@guardian/support-dotcom-components';
import { logEpicView } from '../lib/viewLog';
import {
	addTrackingParamsToBodyLinks,
	createInsertEventFromTracking,
	createViewEventFromTracking,
} from '../lib/tracking';
import { isProd } from '../lib/stage';
import { useIsInView } from '../../../lib/useIsInView';

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
	${headline.xxsmall({ fontWeight: 'bold' })}
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
	${body.medium()};
	${linkStyles}
`;

const highlightWrapperStyles = css`
	${body.medium({ fontWeight: 'bold' })}
	${linkStyles}
`;

const highlightStyles = css`
	padding: 2px;
	background-color: ${palette.brandAlt[400]};
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

const articleCountAboveContainerStyles = css`
	margin-bottom: ${space[4]}px;
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
	countryCode?: string;
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
	countryCode?: string;
	numArticles: number;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
};

const EpicBody: ReactComponent<BodyProps> = ({
	countryCode,
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
									countryCode={countryCode}
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

// ContributionsEpic - exported component
// -------------------------------------------
const ContributionsEpic: ReactComponent<EpicProps> = ({
	variant,
	tracking,
	countryCode,
	articleCounts,
	onReminderOpen,
	fetchEmail,
	submitComponentEvent,
	openCmp,
	hasConsentForArticleCount,
	stage,
}: EpicProps) => {
	const {
		image,
		tickerSettings,
		showChoiceCards,
		choiceCardAmounts,
		forceApplePay,
		name,
	} = variant;
	const [showApplePayButton, setShowApplePayButton] =
		useState(
			forceApplePay,
		); /* forceApplePay displays ApplePay button in storybook */

	useEffect(() => {
		const isInApplePayEpicTest = tracking.abTestName.includes('APPLE-PAY');
		if (isInApplePayEpicTest) {
			// isValidApplePayWalletSession().then((validApplePayWalletSession) => {
			// 	if (validApplePayWalletSession) {
			// 		if (submitComponentEvent) {
			// 			submitComponentEvent(OPHAN_COMPONENT_EVENT_APPLEPAY_AUTHORISED);
			// 		}
			// 		setShowApplePayButton(name === 'V1_APPLE_PAY');
			// 	}
			// });
		}
	}, []);

	const [choiceCardSelection, setChoiceCardSelection] = useState<
		ChoiceCardSelection | undefined
	>();

	useEffect(() => {
		if (showChoiceCards && choiceCardAmounts?.amountsCardData) {
			const defaultFrequency: ContributionFrequency =
				choiceCardAmounts.defaultContributionType || 'MONTHLY';
			const localAmounts =
				choiceCardAmounts.amountsCardData[defaultFrequency];
			const defaultAmount =
				localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

			setChoiceCardSelection({
				frequency: defaultFrequency,
				amount: defaultAmount,
			});
		}
	}, [showChoiceCards, choiceCardAmounts]);

	const currencySymbol = getLocalCurrencySymbol(countryCode);

	const { hasOptedOut, onArticleCountOptIn, onArticleCountOptOut } =
		useArticleCountOptOut();

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			// For the event stream
			sendEpicViewEvent(tracking.referrerUrl, countryCode, stage);

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
	}, [hasBeenSeen, submitComponentEvent]);

	useEffect(() => {
		if (submitComponentEvent) {
			submitComponentEvent(
				createInsertEventFromTracking(tracking, tracking.campaignCode),
			);
		}
	}, [submitComponentEvent]);

	const cleanHighlighted = replaceNonArticleCountPlaceholders(
		variant.highlightedText,
		countryCode,
	);

	const sendEpicViewEvent = (
		url: string,
		countryCode?: string,
		stage?: Stage,
	): void => {
		const path = 'events/epic-view';
		const host = isProd(stage)
			? 'https://contributions.guardianapis.com'
			: 'https://contributions.code.dev-guardianapis.com';
		const body = JSON.stringify({
			url,
			countryCode,
		});

		fetch(`${host}/${path}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body,
		}).then((response) => {
			if (!response.ok) {
				console.log('Epic view event request failed', response);
			}
		});
	};

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
						articleCounts={articleCounts}
						isArticleCountOn={!hasOptedOut}
						onArticleCountOptOut={onArticleCountOptOut}
						onArticleCountOptIn={onArticleCountOptIn}
						openCmp={openCmp}
						submitComponentEvent={submitComponentEvent}
						copy={variant.separateArticleCount?.copy}
						countType={variant.separateArticleCount?.countType}
					/>
				</div>
			)}

			{tickerSettings && tickerSettings.tickerData && (
				<ContributionsEpicTicker
					settings={tickerSettings}
					total={tickerSettings.tickerData.total}
					goal={tickerSettings.tickerData.goal}
				/>
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

			{cleanHeading && (
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
				countryCode={countryCode}
				numArticles={articleCounts.forTargetedWeeks}
				tracking={ophanTracking}
				showAboveArticleCount={showAboveArticleCount}
			/>

			{variant.bylineWithImage && (
				<BylineWithHeadshot bylineWithImage={variant.bylineWithImage} />
			)}

			{choiceCardAmounts && (
				<ContributionsEpicChoiceCards
					setSelectionsCallback={setChoiceCardSelection}
					selection={choiceCardSelection}
					submitComponentEvent={submitComponentEvent}
					currencySymbol={currencySymbol}
					amountsTest={choiceCardAmounts}
				/>
			)}

			{variant.newsletterSignup ? (
				<ContributionsEpicNewsletterSignup
					url={variant.newsletterSignup.url}
				/>
			) : (
				<ContributionsEpicCtas
					variant={variant}
					tracking={tracking}
					countryCode={countryCode}
					articleCounts={articleCounts}
					onReminderOpen={onReminderOpen}
					fetchEmail={fetchEmail}
					submitComponentEvent={submitComponentEvent}
					showApplePayButton={showApplePayButton}
					showChoiceCards={showChoiceCards}
					amountsTestName={choiceCardAmounts?.testName}
					amountsVariantName={choiceCardAmounts?.variantName}
					choiceCardSelection={choiceCardSelection}
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

const validatedEpic = withParsedProps(ContributionsEpic, validate);
const unValidatedEpic = ContributionsEpic;
export {
	validatedEpic as ContributionsEpic,
	unValidatedEpic as ContributionsEpicUnvalidated,
};
