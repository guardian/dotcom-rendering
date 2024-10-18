import { css } from '@emotion/react';
import {
	from,
	headlineMedium24,
	headlineMedium28,
	headlineMedium34,
	space,
	textEgyptian17,
	textEgyptianBold17,
} from '@guardian/source/foundations';
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
import { useChoiceCards } from './marketing/hooks/useChoiceCards';
import type { ReactComponent } from './marketing/lib/ReactComponent';
import { buttonStyles } from './marketing/banners/designableBanner/styles/buttonStyles';
import { SvgGuardianLogo } from '@guardian/source/react-components';

const styles = {
	container: css`
		background: #051d32;
		color: #ffffff;
	`,
	grid: css`
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 0 10px 30px 10px;
		${from.tablet} {
			display: grid;
			grid-template-columns: 220px 1fr 280px;
			grid-template-rows: auto 1fr auto;
			column-gap: ${space[1]}px;
			width: 100%;
			max-width: 1300px;
			margin: 0 auto;
			padding: 0 ${space[5]}px 30px ${space[5]}px;
		}
		${from.desktop} {
			grid-template-columns: 145px 480px 480px;
		}
		${from.wide} {
			grid-template-columns: 226px 480px 480px;
		}
	`,
	logo: css`
		grid-column: 1;
		grid-row: 1;
		margin-top: ${space[2]}px;
	`,
	heading: css`
		order: 2;

		${from.tablet} {
			grid-column: 2;
			grid-row: 1;
		}
		h2 {
			margin: ${space[2]}px 0 ${space[3]}px;
			color: #ffffff;

			${headlineMedium24}
			${from.tablet} {
				${headlineMedium28}
			}
			${from.leftCol} {
				${headlineMedium34}
			}
		}
		border-left: 1px solid rgba(255, 255, 255, 0.2);
		padding-left: ${space[2]}px;
	`,
	body: css`
		order: 2;
		${from.tablet} {
			grid-column: 1;
			grid-row: 2 / span 2;
		}
		${textEgyptian17};
		strong {
			${textEgyptianBold17};
		}
	`,
	ticker: css`
		margin-bottom: ${space[4]}px;
	`,
	choiceCards: css`
		order: 3;
		margin-top: ${space[6]}px;
		${from.tablet} {
			grid-column: 3;
			grid-row: 1;
			align-self: flex-start;
			display: flex;
			justify-content: flex-end;
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

const getTickerData = async () => {
	const data = await fetch(
		'https://support.code.dev-theguardian.com/ticker/US.json',
	).then((response) => response.json());
	const total = Math.floor(data.total);
	const goal = Math.floor(data.goal);
	return {
		total,
		goal,
	};
};

// TODO - correct amounts?
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
	ctaUrl: 'https://support.theguardian.com/contribute',
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
