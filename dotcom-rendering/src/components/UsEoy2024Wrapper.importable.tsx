import { css } from '@emotion/react';
import { isObject } from '@guardian/libs';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import {
	from,
	headlineMedium24,
	headlineMedium28,
	headlineMedium34,
	palette,
	space,
	textEgyptian17,
	textEgyptianBold17,
} from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { Ticker } from '@guardian/source-development-kitchen/react-components';
import type {
	SelectedAmountsVariant,
	TickerData,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useConfig } from './ConfigContext';
import type { ChoiceCardSettings } from './marketing/banners/designableBanner/components/choiceCards/ChoiceCards';
import { ChoiceCards } from './marketing/banners/designableBanner/components/choiceCards/ChoiceCards';
import { buttonStyles } from './marketing/banners/designableBanner/styles/buttonStyles';
import { useChoiceCards } from './marketing/hooks/useChoiceCards';
import type { ReactComponent } from './marketing/lib/ReactComponent';

const styles = {
	container: css`
		/* stylelint-disable-next-line color-no-hex */
		background: #051d32;
		color: ${palette.neutral[100]};
	`,
	grid: css`
		display: grid;
		flex-direction: column;
		position: relative;
		padding: 0 ${space[3]}px ${space[4]}px ${space[3]}px;
		${from.tablet} {
			display: grid;
			grid-template-columns: 350px 350px;
			padding: 0 ${space[5]}px ${space[4]}px ${space[5]}px;
		}
		${from.desktop} {
			grid-template-columns: 462px 462px;
			column-gap: ${space[4]}px;
		}
		${from.leftCol} {
			grid-template-columns: 148px 482px 482px;
			column-gap: 0;
		}
		${from.wide} {
			grid-template-columns: 228px 482px 482px;
		}
	`,
	logo: css`
		display: none;
		${from.leftCol} {
			display: block;
			grid-column: 1;
			grid-row: 1;
			margin-top: ${space[2]}px;
		}
	`,
	heading: css`
		${from.tablet} {
			grid-column: 1;
			grid-row: 1;
		}
		h2 {
			margin: ${space[2]}px 0 ${space[4]}px;
			color: ${palette.neutral[100]};

			${headlineMedium24}
			${from.tablet} {
				${headlineMedium28}
			}
			${from.leftCol} {
				${headlineMedium34}
			}
		}
		${from.leftCol} {
			grid-column: 2;
			border-left: 1px solid rgba(255, 255, 255, 0.2);
			padding-left: ${space[2]}px;
		}
	`,
	body: css`
		${textEgyptian17};
		strong {
			${textEgyptianBold17};
		}
	`,
	highlight: css`
		background-color: inherit;
		color: inherit;
	`,
	ticker: css`
		margin-bottom: ${space[4]}px;
	`,
	choiceCards: css`
		margin-top: ${space[6]}px;
		${from.tablet} {
			grid-column: 2;
			grid-row: 1;
			align-self: flex-start;
			display: flex;
			justify-content: flex-end;
		}
		${from.leftCol} {
			grid-column: 3;
			margin-right: ${space[3]}px;
		}
	`,
};

const stylesSubCampaign = {
	container: css`
		/* stylelint-disable-next-line color-no-hex */
		background: #edb438;
		color: ${palette.neutral[100]};
	`,
	grid: css`
		display: grid;
		flex-direction: column;
		position: relative;
		padding: 0 ${space[3]}px ${space[4]}px ${space[3]}px;
		${from.tablet} {
			display: grid;
			grid-template-columns: 350px 350px;
			padding: 0 ${space[5]}px ${space[4]}px ${space[5]}px;
		}
		${from.desktop} {
			grid-template-columns: 462px 462px;
			column-gap: ${space[4]}px;
		}
		${from.leftCol} {
			grid-template-columns: 148px 482px 482px;
			column-gap: 0;
		}
		${from.wide} {
			grid-template-columns: 228px 482px 482px;
		}
	`,
	logo: css`
		display: none;
		${from.leftCol} {
			display: block;
			grid-column: 1;
			grid-row: 1;
			margin-top: ${space[2]}px;
		}
	`,
	heading: css`
		${from.tablet} {
			grid-column: 1;
			grid-row: 1;
		}
		h2 {
			margin: ${space[2]}px 0 ${space[4]}px;
			color: ${'#1A2835'};

			${headlineMedium24}
			${from.tablet} {
				${headlineMedium28}
			}
			${from.leftCol} {
				${headlineMedium34}
			}
		}
		${from.leftCol} {
			grid-column: 2;
			border-left: 1px solid rgba(0, 0, 0, 0.2);
			padding-left: ${space[2]}px;
		}
	`,
	body: css`
		${textEgyptian17};
		strong {
			${textEgyptianBold17};
		}
		color: ${'#1A2835'};
	`,
	highlight: css`
		background-color: ${'#670055'};
		color: ${'#F6F6F6'};
		padding-left: 2px;
	`,
	ticker: css`
		margin-bottom: ${space[4]}px;
	`,
	choiceCards: css`
		margin-top: ${space[6]}px;
		${from.tablet} {
			grid-column: 2;
			grid-row: 1;
			align-self: flex-start;
			display: flex;
			justify-content: flex-end;
		}
		${from.leftCol} {
			grid-column: 3;
			margin-right: ${space[3]}px;
		}
	`,
};

const tickerSettings = {
	currencySymbol: '$',
	copy: {},
	tickerStylingSettings: {
		filledProgressColour: '#64B7C4',
		progressBarBackgroundColour: 'rgba(34, 75, 95, 1)',
		headlineColour: '#000000',
		totalColour: '#64B7C4',
		goalColour: '#FFFFFF',
	},
};

const tickerSettingsSubCampaign = {
	currencySymbol: '$',
	copy: {},
	tickerStylingSettings: {
		filledProgressColour: '#016D67',
		progressBarBackgroundColour: 'rgba(1, 109, 103, 0.3)',
		headlineColour: '#000000',
		totalColour: '#016D67',
		goalColour: '#1A2835',
	},
};

const heading = (isSubCampaign: boolean) => {
	return isSubCampaign
		? 'Last chance to support us this year'
		: 'Can you help us beat our goal?';
};
const bodyCopy = (isSubCampaign: boolean) => {
	const SubCampaignCopy =
		'We’re funded by readers, not billionaires - which means we can publish factual journalism with no outside influence.';
	const normalCopy =
		'With no billionaire owner or shareholders pulling our strings, reader support keeps us fiercely independent.';
	return isSubCampaign ? SubCampaignCopy : normalCopy;
};

const bodyCopyHighlightedText = (isSubCampaign: boolean) => {
	const SubCampaignCopy = 'Help us keep going in 2025.';
	const normalCopy =
		'Help us raise as much as we can to power our journalism in 2025.';
	return isSubCampaign ? SubCampaignCopy : normalCopy;
};

const getTickerData = async (): Promise<TickerData | undefined> => {
	const data = await fetch(
		'https://support.theguardian.com/ticker/US.json',
	).then((response) => response.json());

	if (isObject(data)) {
		const { total, goal } = data;
		if (typeof total === 'number' && typeof goal === 'number') {
			return {
				total: Math.floor(total),
				goal: Math.floor(goal),
			};
		}
	}
	return;
};

const choiceCardAmounts: SelectedAmountsVariant = {
	testName: 'us-eoy-front-amounts',
	variantName: 'CONTROL',
	defaultContributionType: 'MONTHLY',
	displayContributionType: ['ONE_OFF', 'MONTHLY', 'ANNUAL'],
	amountsCardData: {
		ONE_OFF: {
			amounts: [75, 125],
			defaultAmount: 75,
			hideChooseYourAmount: false,
		},
		MONTHLY: {
			amounts: [5, 15],
			defaultAmount: 15,
			hideChooseYourAmount: false,
		},
		ANNUAL: {
			amounts: [60, 150],
			defaultAmount: 150,
			hideChooseYourAmount: false,
		},
	},
};
const choiceCardSettings: ChoiceCardSettings = {
	buttonColour: '#FFFFFF',
	buttonTextColour: '#000000',
	buttonBorderColour: '#000000',
	buttonSelectColour: '#E3F6FF',
	buttonSelectTextColour: '#000000',
	buttonSelectBorderColour: '#0077B6',
};
const componentId = 'USEOY24_LAUNCH_UPDATED_THRASHER';
const cta = {
	ctaUrl: `https://support.theguardian.com/us/contribute?acquisitionData={"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_THRASHER","componentId":"${componentId}","campaignCode":"USEOY24"}&INTCMP=USEOY24`,
	ctaText: 'Support us',
};

interface Props {
	tickerData: TickerData;
	submitTrackingEvent: (event: ComponentEvent) => void;
	date: Date;
}

export const UsEoy2024: ReactComponent<Props> = ({
	tickerData,
	submitTrackingEvent,
	date,
}: Props): JSX.Element => {
	const {
		choiceCardSelection,
		setChoiceCardSelection,
		getCtaText,
		getCtaUrl,
		currencySymbol,
	} = useChoiceCards(choiceCardAmounts, 'US', cta, cta);

	const isSubCampaign =
		date >= new Date('2024-12-20T00:00:01') &&
		date < new Date('2024-12-31T23:59:59');

	return (
		<div
			css={isSubCampaign ? stylesSubCampaign.container : styles.container}
		>
			<div css={isSubCampaign ? stylesSubCampaign.grid : styles.grid}>
				<div css={isSubCampaign ? stylesSubCampaign.logo : styles.logo}>
					<SvgGuardianLogo
						textColor={isSubCampaign ? '#000000' : '#FFFFFF'}
						width={100}
					/>
				</div>
				<div
					css={
						isSubCampaign
							? stylesSubCampaign.heading
							: styles.heading
					}
				>
					<h2>{heading(isSubCampaign)}</h2>
					<div
						css={
							isSubCampaign ? stylesSubCampaign.body : styles.body
						}
					>
						<div
							css={
								isSubCampaign
									? stylesSubCampaign.ticker
									: styles.ticker
							}
						>
							<Ticker
								currencySymbol={tickerSettings.currencySymbol}
								copy={{}}
								tickerData={tickerData}
								tickerStylingSettings={
									isSubCampaign
										? tickerSettingsSubCampaign.tickerStylingSettings
										: tickerSettings.tickerStylingSettings
								}
								size={'medium'}
							/>
						</div>
						{bodyCopy(isSubCampaign)}
						<strong>
							{' '}
							<span
								css={
									isSubCampaign
										? stylesSubCampaign.highlight
										: styles.highlight
								}
							>
								{bodyCopyHighlightedText(isSubCampaign)}
							</span>
						</strong>
					</div>
				</div>
				<div
					css={
						isSubCampaign
							? stylesSubCampaign.choiceCards
							: styles.choiceCards
					}
				>
					<ChoiceCards
						setSelectionsCallback={setChoiceCardSelection}
						selection={choiceCardSelection}
						submitComponentEvent={submitTrackingEvent}
						currencySymbol={currencySymbol}
						componentId={'thrasher-choice-cards'}
						amountsTest={choiceCardAmounts}
						design={choiceCardSettings}
						getCtaText={getCtaText}
						getCtaUrl={getCtaUrl}
						cssCtaOverides={buttonStyles({
							default: {
								backgroundColour: isSubCampaign
									? '#016D67'
									: '#C41C1C',
								textColour: '#FFFFFF',
							},
							hover: {
								backgroundColour: isSubCampaign
									? '#891414'
									: '#C41C1C',
								textColour: '#FFFFFF',
							},
						})}
						onCtaClick={() => {
							submitTrackingEvent({
								component: {
									componentType: 'ACQUISITIONS_THRASHER',
									id: componentId,
								},
								action: 'CLICK',
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export const UsEoy2024Wrapper = (): JSX.Element => {
	const [tickerData, setTickerData] = useState<TickerData | undefined>();

	const [showSupportMessagingForUser, setShowSupportMessaging] =
		useState<boolean>(false);
	const isSignedIn = useIsSignedIn();

	useEffect(() => {
		if (isSignedIn !== 'Pending') {
			setShowSupportMessaging(
				shouldHideSupportMessaging(isSignedIn) === false,
			);
		}
	}, [isSignedIn]);

	useEffect(() => {
		void getTickerData().then(setTickerData);
	}, []);

	const { renderingTarget } = useConfig();
	const submitTrackingEvent = (event: ComponentEvent) => {
		void submitComponentEvent(event, renderingTarget);
	};
	const now = new Date();

	return (
		<>
			{showSupportMessagingForUser && tickerData && (
				<UsEoy2024
					tickerData={tickerData}
					submitTrackingEvent={submitTrackingEvent}
					date={now}
				/>
			)}
		</>
	);
};
