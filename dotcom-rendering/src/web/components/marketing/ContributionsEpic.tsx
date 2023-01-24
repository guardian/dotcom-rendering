import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { body, headline } from '@guardian/source-foundations';
import { palette, space } from '@guardian/source-foundations';
import { from } from '@guardian/source-foundations';
import { BylineWithHeadshot } from './BylineWithHeadshot';
import { ChoiceCardSelection, ContributionsEpicChoiceCards } from './ContributionsEpicChoiceCards';
import { ContributionsEpicSignInCta } from './ContributionsEpicSignInCta';
import { ContributionsEpicCtas } from './ContributionsEpicCtas';
import {EpicProps} from "./types/props/epic";
import {ContributionFrequency} from "./types/abTests/epic";
import {OphanTracking} from "./ArticleCountOptOutPopup";
import {replaceArticleCount} from "./lib/replaceArticleCount";
import {countryCodeToCountryGroupId} from "./types/geolocation";
import {containsNonArticleCountPlaceholder, replaceNonArticleCountPlaceholders} from "./lib/placeholders";

// const sendEpicViewEvent = (url: string, countryCode?: string, stage?: Stage): void => {
	// const path = 'events/epic-view';
	// const host = isProd(stage)
	// 	? 'https://contributions.guardianapis.com'
	// 	: 'https://contributions.code.dev-guardianapis.com';
	// const body = JSON.stringify({
	// 	url,
	// 	countryCode,
	// });
	//
	// fetch(`${host}/${path}`, {
	// 	method: 'POST',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body,
	// }).then(response => {
	// 	if (!response.ok) {
	// 		console.log('Epic view event request failed', response);
	// 	}
	// });
// };

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

type HighlightedProps = {
	highlightedText: string;
	countryCode?: string;
	numArticles: number;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
};

type BodyProps = {
	paragraphs: string[];
	highlightedText?: string;
	countryCode?: string;
	numArticles: number;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
};

interface EpicHeaderProps {
	text: string;
	numArticles: number;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
}

const EpicHeader: React.FC<EpicHeaderProps> = ({
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

const Highlighted: React.FC<HighlightedProps> = ({
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

interface EpicBodyParagraphProps {
	paragraph: string;
	numArticles: number;
	highlighted: JSX.Element | null;
	tracking?: OphanTracking;
	showAboveArticleCount: boolean;
}

const EpicBodyParagraph: React.FC<EpicBodyParagraphProps> = ({
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

const EpicBody: React.FC<BodyProps> = ({
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
									showAboveArticleCount={showAboveArticleCount}
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

export const ContributionsEpic: React.FC<EpicProps> = ({
	variant,
	tracking,
	countryCode,
	articleCounts,
	onReminderOpen,
	email,
	fetchEmail,
	submitComponentEvent,
	openCmp,
	hasConsentForArticleCount,
	stage,
}: EpicProps) => {
	const countryGroupId = countryCodeToCountryGroupId(countryCode || 'GBPCountries');
	const defaultFrequency: ContributionFrequency = variant.defaultChoiceCardFrequency || 'MONTHLY';
	const [choiceCardSelection, setChoiceCardSelection] = useState<ChoiceCardSelection | undefined>(
		variant.choiceCardAmounts && {
			frequency: defaultFrequency,
			amount:
				variant.choiceCardAmounts[countryGroupId]['control'][defaultFrequency][
					'amounts'
					][1],
		},
	);

	// const { hasOptedOut, onArticleCountOptIn, onArticleCountOptOut } = useArticleCountOptOut();

	const { image, tickerSettings, showChoiceCards, choiceCardAmounts } = variant;

	// const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

	// useEffect(() => {
	// 	if (hasBeenSeen) {
	// 		// For the event stream
	// 		sendEpicViewEvent(tracking.referrerUrl, countryCode, stage);
	//
	// 		// For epic view count
	// 		logEpicView(tracking.abTestName);
	//
	// 		// For ophan
	// 		if (submitComponentEvent) {
	// 			submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
	// 		}
	// 	}
	// }, [hasBeenSeen, submitComponentEvent]);

	// useEffect(() => {
	// 	if (submitComponentEvent) {
	// 		submitComponentEvent(createInsertEventFromTracking(tracking, tracking.campaignCode));
	// 	}
	// }, [submitComponentEvent]);

	const cleanHighlighted = replaceNonArticleCountPlaceholders(
		variant.highlightedText,
		countryCode,
	);

	const cleanHeading = replaceNonArticleCountPlaceholders(variant.heading, countryCode);

	const cleanParagraphs = variant.paragraphs
		.map(paragraph => replaceNonArticleCountPlaceholders(paragraph, countryCode))
		// .map(paragraph =>
		// 	addTrackingParamsToBodyLinks(
		// 		paragraph,
		// 		tracking,
		// 		articleCounts.for52Weeks,
		// 		countryCode,
		// 	),
		// );

	if (
		[cleanHighlighted, cleanHeading, ...cleanParagraphs].some(
			containsNonArticleCountPlaceholder,
		)
	) {
		return null; // quick exit if something goes wrong. Ideally we'd throw and caller would catch/log but TODO that separately
	}

	const ophanTracking: OphanTracking | undefined = submitComponentEvent && {
		submitComponentEvent,
		componentType: 'ACQUISITIONS_EPIC',
	};

	const showAboveArticleCount = !!(
		variant.separateArticleCount?.type === 'above' && hasConsentForArticleCount
	);

	return (
		<section  css={wrapperStyles}>
			{/*{showAboveArticleCount && (*/}
			{/*	<div css={articleCountAboveContainerStyles}>*/}
			{/*		<ContributionsEpicArticleCountAboveWithOptOut*/}
			{/*			articleCounts={articleCounts}*/}
			{/*			isArticleCountOn={!hasOptedOut}*/}
			{/*			onArticleCountOptOut={onArticleCountOptOut}*/}
			{/*			onArticleCountOptIn={onArticleCountOptIn}*/}
			{/*			openCmp={openCmp}*/}
			{/*			submitComponentEvent={submitComponentEvent}*/}
			{/*			copy={variant.separateArticleCount?.copy}*/}
			{/*			countType={variant.separateArticleCount?.countType}*/}
			{/*		/>*/}
			{/*	</div>*/}
			{/*)}*/}

			{/*{tickerSettings && tickerSettings.tickerData && (*/}
			{/*	<ContributionsEpicTicker*/}
			{/*		settings={tickerSettings}*/}
			{/*		total={tickerSettings.tickerData.total}*/}
			{/*		goal={tickerSettings.tickerData.goal}*/}
			{/*	/>*/}
			{/*)}*/}

			{image && (
				<div css={imageWrapperStyles}>
					<img src={image.mainUrl} css={imageStyles} alt={image.altText} />
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

			{variant.showSignInLink && <ContributionsEpicSignInCta />}

			{showChoiceCards && choiceCardSelection && choiceCardAmounts && (
				<ContributionsEpicChoiceCards
					amounts={choiceCardAmounts}
					setSelectionsCallback={setChoiceCardSelection}
					selection={choiceCardSelection}
					countryCode={countryCode}
					submitComponentEvent={submitComponentEvent}
				/>
			)}

			{/*{variant.newsletterSignup ? (*/}
			{/*	<NewsletterSignup url={variant.newsletterSignup.url} />*/}
			{/*) : (*/}
				<ContributionsEpicCtas
					variant={variant}
					tracking={tracking}
					countryCode={countryCode}
					articleCounts={articleCounts}
					onReminderOpen={onReminderOpen}
					email={email}
					fetchEmail={fetchEmail}
					submitComponentEvent={submitComponentEvent}
					showChoiceCards={showChoiceCards}
					choiceCardSelection={choiceCardSelection}
				/>
			{/*)}*/}
		</section>
	);
};
