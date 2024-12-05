import { css } from '@emotion/react';
import {
	brandAlt,
	from,
	neutral,
	space,
	until,
} from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { ThreeTierChoiceCards } from '../../epics/ThreeTierChoiceCards';
import type { SupportTier } from '../../epics/utils/threeTierChoiceCardAmounts';
import type { ReactComponent } from '../../lib/ReactComponent';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
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
}: BannerRenderProps): JSX.Element => {
	const [iosAppBannerPresent, setIosAppBannerPresent] = useState(false);

	const [
		threeTierChoiceCardSelectedProduct,
		setThreeTierChoiceCardSelectedProduct,
	] = useState<SupportTier>('SupporterPlus');

	const variantOfChoiceCard =
		countryCode === 'US'
			? 'US_THREE_TIER_CHOICE_CARDS'
			: 'THREE_TIER_CHOICE_CARDS';

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
			highlightColour: brandAlt[400],
		},
		articleCountTextColour: neutral[0],
		bannerId: 'designable-banner',
	};

	const showAboveArticleCount =
		(separateArticleCountSettings?.type === 'above' ||
			separateArticleCount) &&
		articleCounts.forTargetedWeeks >= 5;

	return (
		<div>
			<div css={styles.containerOverrides}>
				<DesignableBannerCloseButton
					onCloseClick={onCloseClick}
					settings={templateSettings.closeButtonSettings}
					styleOverides={styles.closeButtonOverrides(true)}
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
					<div css={templateSpacing.bannerBodyCopy}>
						<DesignableBannerBody
							mainContent={content.mainContent}
							mobileContent={content.mobileContent}
							highlightedTextSettings={
								templateSettings.highlightedTextSettings
							}
						/>
					</div>
				</div>
				<ThreeTierChoiceCards
					countryCode={countryCode}
					selectedProduct={threeTierChoiceCardSelectedProduct}
					setSelectedProduct={setThreeTierChoiceCardSelectedProduct}
					variantOfChoiceCard={variantOfChoiceCard}
				/>

				{/*insert guardain logo?*/}
			</div>
		</div>
	);
};

const styles = {
	outerContainer: (limitHeight: boolean) => css`
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
			padding: 0 ${space[5]}px;
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
	closeButtonOverrides: (isGridCell: boolean) => css`
		${until.tablet} {
			position: fixed;
			margin-top: ${space[3]}px;
			padding-right: 10px;
			right: 0;
		}

		${from.tablet} {
			margin-top: ${space[3]}px;

			${isGridCell
				? css`
						grid-column: 2;
						grid-row: 1;
				  `
				: css`
						margin-bottom: ${space[3]}px;
						display: flex;
						justify-content: flex-end;
				  `}
		}
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