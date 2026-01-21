import { css } from '@emotion/react';
import {
	between,
	from,
	neutral,
	space,
	until,
} from '@guardian/source/foundations';
import { useEffect, useRef } from 'react';
import {
	bannerWrapper,
	validatedBannerWrapper,
} from '../../common/BannerWrapper';
import type { BannerRenderProps } from '../../common/types';
import { BannerArticleCount } from './components/BannerArticleCount';
import { BannerBody } from './components/BannerBody';
import { BannerChoiceCards } from './components/BannerChoiceCards';
import { BannerCloseButton } from './components/BannerCloseButton';
import { BannerContent } from './components/BannerContent';
import { BannerCtas } from './components/BannerCtas';
import { BannerHeader } from './components/BannerHeader';
import { BannerLogo } from './components/BannerLogo';
import { BannerTicker } from './components/BannerTicker';
import { BannerVisual } from './components/BannerVisual';
import { useDesignableBannerModel } from './useDesignableBannerModel';

const phabletContentMaxWidth = '492px';

const styles = {
	outerContainer: (background: string, textColor: string = 'inherit') => css`
		background: ${background};
		color: ${textColor};
		bottom: 0px;
		max-height: 65vh;
		max-height: 65svh;

		* {
			box-sizing: border-box;
		}
		${from.phablet} {
			border-top: 1px solid ${neutral[0]};
		}
		b,
		strong {
			font-weight: bold;
		}
		padding: 0 auto;
	`,
	layoutOverrides: (cardsImageOrSpaceTemplateString: string) => css`
		display: grid;
		background: inherit;
		position: relative;
		bottom: 0px;

		/* mobile first */
		${until.phablet} {
			max-width: 660px;
			margin: 0 auto;
			padding: ${space[3]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns: auto max(${phabletContentMaxWidth} auto);
			grid-template-areas:
				'.	.									.'
				'.	copy-container						close-button'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}'
				'.	cta-container						cta-container';
		}
		${from.phablet} {
			max-width: 740px;
			margin: 0 auto;
			padding: ${space[3]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns: minmax(0, 0.5fr) ${phabletContentMaxWidth} max-content minmax(
					0,
					0.5fr
				);
			grid-template-rows: auto auto auto;
			grid-template-areas:
				'.	copy-container						close-button			close-button'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}	.'
				'.	cta-container						cta-container						.';
		}
		${from.desktop} {
			max-width: 980px;
			align-self: stretch;
			padding: ${space[3]}px ${space[1]}px 0 ${space[3]}px;
			grid-template-columns: auto 380px auto;
			grid-template-rows: auto auto;

			grid-template-areas:
				'copy-container		${cardsImageOrSpaceTemplateString}	close-button'
				'cta-container		${cardsImageOrSpaceTemplateString}	.';
		}
		${from.leftCol} {
			max-width: 1140px;
			bottom: 0px;
			/* the vertical line aligns with that of standard article */
			grid-column-gap: 10px;
			grid-template-columns: 140px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button'
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
		}
		${from.wide} {
			max-width: 1300px;
			/* the vertical line aligns with that of standard article */
			grid-template-columns: 219px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button'
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
		}
	`,
	collapsedLayoutOverrides: (cardsImageOrSpaceTemplateString: string) => css`
		display: grid;
		background: inherit;
		position: relative;
		bottom: 0px;

		/* mobile first */
		${until.phablet} {
			max-width: 660px;
			margin: 0 auto;
			padding: ${space[2]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns: auto max(${phabletContentMaxWidth} auto);
			grid-template-areas: ${`
				'.	.									.'
				'.	copy-container						close-button'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}'
				'.	cta-container						cta-container'
				`};
		}
		${from.phablet} {
			max-width: 740px;
			margin: 0 auto;
			padding: ${space[2]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns:
				minmax(0, 0.5fr)
				${phabletContentMaxWidth}
				1fr
				0;
			grid-template-rows: auto auto;
			grid-template-areas:
				'.	copy-container						close-button						.'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}	.'
				'.	cta-container						cta-container						.';
		}
		${from.desktop} {
			max-width: 980px;
			padding: ${space[1]}px ${space[1]}px 0 ${space[3]}px;
			grid-template-columns: auto 380px minmax(100px, auto);
			grid-template-rows: auto auto;

			grid-template-areas:
				'copy-container		${cardsImageOrSpaceTemplateString}	close-button'
				'cta-container		${cardsImageOrSpaceTemplateString}	.';
		}
		${from.leftCol} {
			max-width: 1140px;
			bottom: 0px;
			/* the vertical line aligns with that of standard article */
			grid-column-gap: 10px;
			grid-template-columns: 140px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button '
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
		}
		${from.wide} {
			max-width: 1300px;
			/* the vertical line aligns with that of standard article */
			grid-template-columns: 219px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button '
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
		}
	`,
	bannerVisualContainer: css`
		grid-area: main-image;

		margin-left: ${space[2]}px;
		margin-right: ${space[2]}px;

		${from.phablet} {
			max-width: ${phabletContentMaxWidth};
			justify-self: center;
		}
		${from.desktop} {
			margin-top: ${space[6]}px;
			padding-left: ${space[2]}px;
			justify-self: end;
		}
		${between.desktop.and.wide} {
			max-width: 380px;
		}
		${from.wide} {
			max-width: 485px;
			align-self: start;
		}
	`,
	verticalLine: css`
		grid-area: vert-line;
		pointer-events: none;

		${until.leftCol} {
			display: none;
		}
		${from.leftCol} {
			background-color: ${neutral[0]};
			width: 1px;
			opacity: 0.2;
			margin: ${space[6]}px ${space[2]}px 0 ${space[2]}px;
		}
	`,
};

const Banner = (props: BannerRenderProps): JSX.Element | null => {
	const bannerRef = useRef<HTMLDivElement>(null);
	const { isOpen, bannerData } = useDesignableBannerModel(props);

	useEffect(() => {
		if (bannerRef.current) {
			bannerRef.current.focus();
		}
	}, []);

	if (!isOpen || !bannerData) {
		return null;
	}

	const contextClassName =
		bannerData.isCollapsible ||
		bannerData.tracking.abTestVariant.includes('COLLAPSABLE_V2_MAYBE_LATER')
			? 'maybe-later'
			: '';

	const cardsImageOrSpaceTemplateString = bannerData.settings
		.choiceCardSettings
		? 'choice-cards-container'
		: bannerData.settings.imageSettings
		? 'main-image'
		: '.';

	return (
		<div
			ref={bannerRef}
			role="alert"
			tabIndex={-1}
			css={styles.outerContainer(
				bannerData.settings.containerSettings.backgroundColour,
				bannerData.settings.containerSettings.textColor ?? 'inherit',
			)}
			className={contextClassName}
		>
			<div
				css={
					bannerData.isCollapsible && bannerData.isCollapsed
						? styles.collapsedLayoutOverrides(
								cardsImageOrSpaceTemplateString,
						  )
						: styles.layoutOverrides(
								cardsImageOrSpaceTemplateString,
						  )
				}
			>
				<div css={styles.verticalLine} />
				<BannerLogo bannerData={bannerData} />
				<BannerContent bannerData={bannerData}>
					<BannerHeader bannerData={bannerData} />
					<BannerArticleCount bannerData={bannerData} />
					<BannerTicker bannerData={bannerData} />
					<BannerBody bannerData={bannerData} />
				</BannerContent>
				<BannerChoiceCards bannerData={bannerData} />
				<BannerCtas bannerData={bannerData} />
				<BannerVisual bannerData={bannerData} />
				<BannerCloseButton bannerData={bannerData} />
			</div>
		</div>
	);
};

const unvalidated = bannerWrapper(Banner, 'designable-banner');
const validated = validatedBannerWrapper(Banner, 'designable-banner');

export {
	Banner as BannerComponent,
	unvalidated as DesignableBannerUnvalidated,
	validated as DesignableBanner,
};
