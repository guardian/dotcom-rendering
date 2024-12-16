import { css } from '@emotion/react';
import { brandAlt, from, neutral, space } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../lib/useMatchMedia';
import { ThreeTierChoiceCards } from '../../epics/ThreeTierChoiceCards';
import type { SupportTier } from '../../epics/utils/threeTierChoiceCardAmounts';
import type { ReactComponent } from '../../lib/ReactComponent';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import { ThreeTierChoiceCardsV2 } from '../ThreeTierChoiceCardsV2';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerCtas } from './components/DesignableBannerCtas';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import type { BannerTemplateSettings } from './settings';

const DesignableBannerV2: ReactComponent<BannerRenderProps> = ({
	content,
	countryCode,
	onCloseClick,
	articleCounts,
	separateArticleCount, // legacy field
	separateArticleCountSettings,
	submitComponentEvent,
	design,
	onCtaClick,
	onSecondaryCtaClick,
}: BannerRenderProps): JSX.Element => {
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));

	const [iosAppBannerPresent, setIosAppBannerPresent] = useState(false);

	const [
		threeTierChoiceCardSelectedProduct,
		setThreeTierChoiceCardSelectedProduct,
	] = useState<SupportTier>('SupporterPlus');

	const variantOfChoiceCard = 'TWO_TIER_CHOICE_CARDS'; //this may need changed when US involved

	useEffect(() => {
		setIosAppBannerPresent(
			window.innerHeight !== window.document.documentElement.clientHeight,
		);
	}, []);

	useEffect(() => {
		if (iosAppBannerPresent) {
			if (submitComponentEvent) {
				submitComponentEvent({
					component: {
						componentType: 'ACQUISITIONS_OTHER',
						id: 'safari-ios-banner-present',
					},
					action: 'VIEW',
				});
			}
		}
	}, [iosAppBannerPresent, submitComponentEvent]);

	if (!design) {
		return <></>;
	}

	//All config hard coded for the tests - TODO make this configurable in the future
	const templateSettings: BannerTemplateSettings = {
		containerSettings: {
			backgroundColour: neutral[100],
			textColor: neutral[0],
		},
		headerSettings: {
			textColour: neutral[0],
		},
		primaryCtaSettings: {
			default: {
				backgroundColour: brandAlt[400],
				textColour: neutral[0],
			},
			hover: {
				backgroundColour: brandAlt[400],
				textColour: neutral[0],
			},
		},
		//not used in this design but is required to be passed in
		secondaryCtaSettings: {
			default: {
				backgroundColour: brandAlt[400],
				textColour: neutral[0],
			},
			hover: {
				backgroundColour: brandAlt[400],
				textColour: neutral[0],
			},
		},
		closeButtonSettings: {
			default: {
				backgroundColour: neutral[100],
				textColour: neutral[0],
				border: `1px solid ${neutral[38]}`,
			},
			hover: {
				backgroundColour: neutral[100],
				textColour: neutral[0],
				border: `1px solid ${neutral[100]}`,
			},
		},
		highlightedTextSettings: {
			textColour: neutral[0],
			highlightColour: neutral[100], //set to be white as we may want this in the future?
		},
		articleCountTextColour: neutral[0],
		bannerId: 'designable-banner',
	};

	const mainOrMobileContent = isTabletOrAbove
		? content.mainContent
		: content.mobileContent;

	const showAboveArticleCount =
		(separateArticleCountSettings?.type === 'above' ||
			separateArticleCount) &&
		articleCounts.forTargetedWeeks >= 5;

	return (
		<div
			css={styles.outerContainer(
				templateSettings.containerSettings.backgroundColour,
				templateSettings.containerSettings.textColor,
				iosAppBannerPresent,
			)}
		>
			<div css={styles.containerOverrides}>
				<DesignableBannerCloseButton
					onCloseClick={onCloseClick}
					settings={templateSettings.closeButtonSettings}
					styleOverides={styles.closeButtonOverrides}
				/>

				{isTabletOrAbove && (
					<>
						<div css={styles.containerOverrides}>
							<div css={styles.guardianLogoContainer}>
								<SvgGuardianLogo />
							</div>
						</div>
					</>
				)}

				<div css={styles.middleColumnContainer}>
					<DesignableBannerHeader
						heading={content.mainContent.heading}
						mobileHeading={content.mobileContent.heading}
						headerSettings={templateSettings.headerSettings}
						headlineSize={design.fonts?.heading.size ?? 'medium'}
					/>
					<div>
						{showAboveArticleCount && (
							<DesignableBannerArticleCount
								numArticles={articleCounts.forTargetedWeeks}
								settings={templateSettings}
								copy={separateArticleCountSettings?.copy}
							/>
						)}
						<DesignableBannerBody
							mainContent={content.mainContent}
							mobileContent={content.mobileContent}
							highlightedTextSettings={
								templateSettings.highlightedTextSettings
							}
						/>
					</div>
				</div>
				<div css={styles.thirdColumnContainer}>
					<ThreeTierChoiceCardsV2 />
				</div>

				{!isTabletOrAbove && (
					<>
						<div>
							<ThreeTierChoiceCards
								countryCode={countryCode}
								selectedProduct={
									threeTierChoiceCardSelectedProduct
								}
								setSelectedProduct={
									setThreeTierChoiceCardSelectedProduct
								}
								variantOfChoiceCard={variantOfChoiceCard}
							/>
						</div>
						<div css={styles.linkButtonContainer}>
							{/*using this means using the payment icons...*/}
							<DesignableBannerCtas
								mainOrMobileContent={mainOrMobileContent}
								onPrimaryCtaClick={onCtaClick}
								onSecondaryCtaClick={onSecondaryCtaClick}
								primaryCtaSettings={
									templateSettings.primaryCtaSettings
								}
								secondaryCtaSettings={
									templateSettings.secondaryCtaSettings
								}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const styles = {
	outerContainer: (
		background: string,
		textColor: string | undefined,
		limitHeight: boolean,
	) => css`
		background: ${background};
		color: ${textColor};
		${limitHeight ? 'max-height: 70vh;' : ''}
		overflow: auto;

		* {
			box-sizing: border-box;
		}

		${from.tablet} {
			border-top: 1px solid ${neutral[0]};
		}

		b,
		strong {
			font-weight: bold;
		}
	`,
	containerOverrides: css`
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 0 10px;
		overflow: auto;

		${from.tablet} {
			display: grid;
			grid-template-columns: auto 1fr 1fr;
			grid-template-rows: auto 1fr auto;
			width: 100%;
			max-width: 1300px;
			margin: 0 auto;
			align-items: start;
			column-gap: 10px;
		}
	`,
	closeButtonOverrides: css`
		margin-top: ${space[3]}px;
		grid-column: 3;
		grid-row: 1;
		justify-content: end;
	`,
	linkButtonOverrides: css`
		background-color: ${brandAlt[400]};
		color: ${neutral[0]};
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	`,
	linkButtonContainer: css`
		padding-top: ${space[3]}px;
	`,
	guardianLogoContainer: css`
		width: 100px;
		grid-column: 1;
		grid-row: 1;
		justify-self: start;
		align-self: start;
		padding-top: ${space[3]}px;
		padding-left: ${space[3]}px;
	`,
	middleColumnContainer: css`
		${from.tablet} {
			grid-column: 2;
			grid-row: 2;
			column-gap: 20px;
	`,
	thirdColumnContainer: css`
		${from.tablet} {
			grid-column: 3;
			grid-row: 2;
	`,
};

const unvalidated = bannerWrapper(DesignableBannerV2, 'designable-banner');
const validated = validatedBannerWrapper(
	DesignableBannerV2,
	'designable-banner',
);

export {
	validated as DesignableBannerV2,
	unvalidated as DesignableBannerV2Unvalidated,
};
