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
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerCtas } from './components/DesignableBannerCtas';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import type { BannerTemplateSettings } from './settings';
import { templateSpacing } from './styles/templateStyles';

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

	return isTabletOrAbove ? (
		<>
			<div css={styles.guardianLogoContainer}>
				<SvgGuardianLogo />
			</div>
		</>
	) : (
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
				<div>
					<DesignableBannerHeader
						heading={content.mainContent.heading}
						mobileHeading={content.mobileContent.heading}
						headerSettings={templateSettings.headerSettings}
						headlineSize={design.fonts?.heading.size ?? 'medium'}
					/>
				</div>
				<div>
					{showAboveArticleCount && (
						<DesignableBannerArticleCount
							numArticles={articleCounts.forTargetedWeeks}
							settings={templateSettings}
							copy={separateArticleCountSettings?.copy}
						/>
					)}
					<div>
						<DesignableBannerBody
							mainContent={content.mainContent}
							mobileContent={content.mobileContent}
							highlightedTextSettings={
								templateSettings.highlightedTextSettings
							}
						/>
					</div>
				</div>
				<div>
					<ThreeTierChoiceCards
						countryCode={countryCode}
						selectedProduct={threeTierChoiceCardSelectedProduct}
						setSelectedProduct={
							setThreeTierChoiceCardSelectedProduct
						}
						variantOfChoiceCard={variantOfChoiceCard}
					/>
				</div>
				<div css={styles.linkButtonContainer}>
					<DesignableBannerCtas
						mainOrMobileContent={mainOrMobileContent}
						onPrimaryCtaClick={onCtaClick}
						onSecondaryCtaClick={onSecondaryCtaClick}
						primaryCtaSettings={templateSettings.primaryCtaSettings}
						secondaryCtaSettings={
							templateSettings.secondaryCtaSettings
						}
					/>
				</div>
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

		${from.tablet} {
			display: grid;
			grid-template-columns: 1fr 280px;
			grid-template-rows: auto 1fr auto;
			column-gap: ${space[5]}px;
			width: 100%;
			max-width: 1300px;
			margin: 0 auto;
		}

		${from.desktop} {
			column-gap: 60px;
			grid-template-columns: 1fr 460px;
		}

		${from.wide} {
			column-gap: 100px;
		}

		${templateSpacing.bannerContainer};
	`,
	closeButtonOverrides: css`
		margin-top: ${space[3]}px;
		grid-column: 2;
		grid-row: 1;
		justify-content: flex-end;
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
		display: none;
		${from.tablet} {
			display: block;
			width: 100px;
		}
		grid-column: 1;
		grid-row: 1;
		justify-self: start;
		padding-top: ${space[3]}px;
		padding-left: ${space[3]}px;
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
