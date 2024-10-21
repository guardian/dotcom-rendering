import { css } from '@emotion/react';
import { isObject } from '@guardian/libs';
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
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useIsSignedIn } from '../lib/useAuthStatus';
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
		padding: 0 10px 30px 10px;
		${from.tablet} {
			display: grid;
			grid-template-columns: 350px 350px;
			padding: 0 ${space[5]}px 30px ${space[5]}px;
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
			margin: ${space[2]}px 0 ${space[3]}px;
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
const cta = {
	ctaUrl: 'https://support.theguardian.com/us/contribute?acquisitionData={"source":"GUARDIAN_WEB","componentType":"ACQUISITIONS_THRASHER","componentId":"USEOY24_LAUNCH_UPDATED_THRASHER","campaignCode":"USEOY24"}&INTCMP=USEOY24',
	ctaText: 'Support us',
};

interface Props {
	tickerData: TickerData;
}

export const UsEoy2024: ReactComponent<Props> = ({
	tickerData,
}: Props): JSX.Element => {
	const {
		choiceCardSelection,
		setChoiceCardSelection,
		getCtaText,
		getCtaUrl,
		currencySymbol,
	} = useChoiceCards(choiceCardAmounts, 'US', cta, cta);

	return (
		<div css={styles.container}>
			<div css={styles.grid}>
				<div css={styles.logo}>
					<SvgGuardianLogo textColor={'#FFFFFF'} width={100} />
				</div>
				<div css={styles.heading}>
					<h2>Can you help us hit our goal?</h2>
					<div css={styles.body}>
						<div css={styles.ticker}>
							<Ticker
								currencySymbol={tickerSettings.currencySymbol}
								copy={{}}
								tickerData={tickerData}
								tickerStylingSettings={
									tickerSettings.tickerStylingSettings
								}
								size={'medium'}
							/>
						</div>
						With no billionaire owner or shareholders pulling our
						strings, reader support keeps us fiercely independent.
						<strong>
							{' '}
							Help us hit our most important annual fundraising
							goal so we can keep going.
						</strong>
					</div>
				</div>
				<div css={styles.choiceCards}>
					<ChoiceCards
						setSelectionsCallback={setChoiceCardSelection}
						selection={choiceCardSelection}
						submitComponentEvent={() => {}}
						currencySymbol={currencySymbol}
						componentId={'contributions-banner-choice-cards'}
						amountsTest={choiceCardAmounts}
						design={choiceCardSettings}
						getCtaText={getCtaText}
						getCtaUrl={getCtaUrl}
						cssCtaOverides={buttonStyles({
							default: {
								backgroundColour: '#C41C1C',
								textColour: '#FFFFFF',
							},
							hover: {
								backgroundColour: '#C41C1C',
								textColour: '#FFFFFF',
							},
						})}
						onCtaClick={() => {}}
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

	return (
		<>
			{showSupportMessagingForUser && tickerData && (
				<UsEoy2024 tickerData={tickerData} />
			)}
		</>
	);
};
