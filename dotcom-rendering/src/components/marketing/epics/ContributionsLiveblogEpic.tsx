/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/ContributionsLiveblogEpic.tsx
 */
import { css } from '@emotion/react';
import {
	article17,
	from,
	headlineBold34,
	palette,
	space,
} from '@guardian/source/foundations';
import {
	containsNonArticleCountPlaceholder,
	getLocalCurrencySymbol,
	replaceNonArticleCountPlaceholders,
} from '@guardian/support-dotcom-components';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import type { ChoiceCardSelection } from '../lib/choiceCards';
import type { ReactComponent } from '../lib/ReactComponent';
import { replaceArticleCount } from '../lib/replaceArticleCount';
import {
	createInsertEventFromTracking,
	createViewEventFromTracking,
} from '../lib/tracking';
import { logEpicView } from '../lib/viewLog';
import { ContributionsEpicChoiceCards } from './ContributionsEpicChoiceCards';
import { ContributionsEpicCtas } from './ContributionsEpicCtas';
import { ContributionsEpicNewsletterSignup } from './ContributionsEpicNewsletterSignup';
import { ThreeTierChoiceCards } from './ThreeTierChoiceCards';
import { getDefaultThreeTierAmount } from './utils/threeTierChoiceCardAmounts';

const container = (clientName: string) => css`
	padding: 6px 10px 28px 10px;
	border-top: 1px solid ${palette.brandAlt[400]};
	border-bottom: 1px solid ${palette.neutral[86]};
	background: ${palette.neutral[100]};

	border: 1px solid ${palette.neutral[0]};

	* {
		::selection {
			background: ${palette.brandAlt[400]};
		}
	}

	& > * + * {
		margin-top: ${space[3]}px;
	}

	${from.tablet} {
		padding-left: ${clientName === 'dcr' ? '60px' : '80px'};
		padding-right: 20px;

		& > * + * {
			margin-top: ${space[4]}px;
		}
	}
`;

const textContainer = css`
	${article17};

	font-size: 16px;

	p {
		margin: 0;
	}

	& > p + p {
		margin-top: ${space[3]}px;
	}

	${from.tablet} {
		& > p + p {
			margin-top: ${space[4]}px;
		}
	}
`;

const yellowHeading = (clientName: string) => css`
	${headlineBold34};
	font-size: 28px;
	background-color: ${palette.brandAlt[400]};
	border-top: 1px solid ${palette.neutral[0]};
	border-left: 1px solid ${palette.neutral[0]};
	border-right: 1px solid ${palette.neutral[0]};

	padding: 8px 10px 12px 10px;
	${from.tablet} {
		padding-left: ${clientName === 'dcr' ? '60px' : '80px'};
		padding-right: 20px;
	}
`;

interface LiveblogEpicBodyParagraphProps {
	paragraph: string;
	numArticles: number;
}

const LiveblogEpicBodyParagraph: ReactComponent<
	LiveblogEpicBodyParagraphProps
> = ({ paragraph, numArticles }: LiveblogEpicBodyParagraphProps) => {
	const elements = replaceArticleCount(paragraph, numArticles, 'epic');

	return <p>{elements}</p>;
};

interface LiveblogEpicBodyProps {
	paragraphs: string[];
	numArticles: number;
}

const LiveblogEpicBody: ReactComponent<LiveblogEpicBodyProps> = ({
	numArticles,
	paragraphs,
}: LiveblogEpicBodyProps) => {
	return (
		<div css={textContainer}>
			{paragraphs.map((paragraph) => (
				<LiveblogEpicBodyParagraph
					key={paragraph}
					paragraph={paragraph}
					numArticles={numArticles}
				/>
			))}
		</div>
	);
};

export const ContributionsLiveblogEpic: ReactComponent<EpicProps> = ({
	variant,
	countryCode,
	articleCounts,
	tracking,
	submitComponentEvent,
	onReminderOpen,
	fetchEmail,
}: EpicProps): JSX.Element => {
	const { showChoiceCards, choiceCardAmounts } = variant;

	const [choiceCardSelection, setChoiceCardSelection] = useState<
		ChoiceCardSelection | undefined
	>();

	const showThreeTierChoiceCards =
		showChoiceCards && variant.name.includes('THREE_TIER_CHOICE_CARDS');

	useEffect(() => {
		if (showChoiceCards && choiceCardAmounts?.amountsCardData) {
			const localAmounts =
				choiceCardAmounts.amountsCardData[
					choiceCardAmounts.defaultContributionType
				];
			const defaultAmount = localAmounts.defaultAmount;

			setChoiceCardSelection({
				frequency: choiceCardAmounts.defaultContributionType,
				amount: defaultAmount,
			});
		}
	}, [showChoiceCards, choiceCardAmounts]);

	const currencySymbol = getLocalCurrencySymbol(countryCode);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
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
	}, [hasBeenSeen, submitComponentEvent, tracking]);

	useEffect(() => {
		if (submitComponentEvent) {
			submitComponentEvent(
				createInsertEventFromTracking(tracking, tracking.campaignCode),
			);
		}
	}, [submitComponentEvent, tracking]);

	const cleanParagraphs = variant.paragraphs.map((paragraph) =>
		replaceNonArticleCountPlaceholders(paragraph, countryCode),
	);
	const cleanHeading =
		replaceNonArticleCountPlaceholders(variant.heading) ||
		'Support the Guardian';

	const defaultThreeTierAmount = getDefaultThreeTierAmount(countryCode);
	const [
		threeTierChoiceCardSelectedAmount,
		setThreeTierChoiceCardSelectedAmount,
	] = useState<number>(defaultThreeTierAmount);

	if (
		cleanParagraphs.some(containsNonArticleCountPlaceholder) ||
		containsNonArticleCountPlaceholder(cleanHeading)
	) {
		return <></>;
	}

	return (
		<div data-testid="contributions-liveblog-epic" ref={setNode}>
			{!!cleanHeading && (
				<div css={yellowHeading(tracking.clientName)}>
					{cleanHeading}
				</div>
			)}
			<section css={container(tracking.clientName)}>
				<LiveblogEpicBody
					paragraphs={cleanParagraphs}
					numArticles={articleCounts.forTargetedWeeks}
				/>
				{variant.newsletterSignup ? (
					<ContributionsEpicNewsletterSignup
						url={variant.newsletterSignup.url}
					/>
				) : (
					<>
						{choiceCardAmounts && !showThreeTierChoiceCards && (
							<ContributionsEpicChoiceCards
								setSelectionsCallback={setChoiceCardSelection}
								selection={choiceCardSelection}
								submitComponentEvent={submitComponentEvent}
								currencySymbol={currencySymbol}
								amountsTest={choiceCardAmounts}
							/>
						)}
						{showThreeTierChoiceCards && (
							<ThreeTierChoiceCards
								countryCode={countryCode}
								selectedAmount={
									threeTierChoiceCardSelectedAmount
								}
								setSelectedAmount={
									setThreeTierChoiceCardSelectedAmount
								}
							/>
						)}
						<ContributionsEpicCtas
							variant={variant}
							tracking={tracking}
							countryCode={countryCode}
							articleCounts={articleCounts}
							onReminderOpen={onReminderOpen}
							fetchEmail={fetchEmail}
							submitComponentEvent={submitComponentEvent}
							showChoiceCards={showChoiceCards}
							choiceCardSelection={choiceCardSelection}
							threeTierChoiceCardSelectedAmount={
								threeTierChoiceCardSelectedAmount
							}
						/>
					</>
				)}
			</section>
		</div>
	);
};
