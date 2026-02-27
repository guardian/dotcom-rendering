import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
	headlineMedium24,
	headlineMedium28,
	headlineMedium34,
	headlineMedium42,
	neutral,
	space,
	until,
} from '@guardian/source/foundations';
import type { JSX } from 'react';
import type { BannerData } from '../BannerProps';
import { BannerVisual } from './BannerVisual';

const getStyles = (
	textColour: string | undefined,
	backgroundColour: string,
	headlineSize: 'small' | 'medium' | 'large',
	isCollapsed: boolean,
	hasHeaderImage: boolean,
	hasMainImage: boolean,
) => {
	const color = textColour ?? neutral[0];
	const copyTopMargin = hasHeaderImage ? space[1] : space[1];
	const containerMargin =
		isCollapsed || hasHeaderImage ? `${space[6]}px` : '0';

	const mobileHeadlineSize =
		headlineSize === 'small' || isCollapsed
			? `${headlineMedium17}`
			: `${headlineMedium28}`;

	const phabletHeadline = isCollapsed
		? `${headlineMedium24}`
		: `${headlineMedium34}`;

	const leftColHeadline = isCollapsed
		? `${headlineMedium24}`
		: `${headlineMedium42}`;

	const phabletContentMaxWidth = '492px';

	return {
		container: css`
			position: relative;
			margin-bottom: ${containerMargin};
		`,
		header: css`
			h2 {
				color: ${color};
				margin: ${copyTopMargin}px 0 ${space[2]}px 0;

				${until.phablet} {
					${mobileHeadlineSize};
				}

				${from.phablet} {
					${phabletHeadline};
				}

				${from.leftCol} {
					${leftColHeadline};
				}
			}
		`,
		headerContainer: css`
			align-self: stretch;
			justify-self: stretch;

			${until.phablet} {
				${hasMainImage
					? ''
					: `max-width: calc(100% - 40px - ${space[3]}px);`}
			}

			${from.phablet} {
				background: ${backgroundColour};
				max-width: ${phabletContentMaxWidth};
			}

			${from.desktop} {
				padding-top: ${space[3]}px;
				padding-right: ${space[5]}px;
			}
		`,
		headerWithImageContainer: css`
			max-width: 100%;

			${from.tablet} {
				max-width: ${phabletContentMaxWidth};
			}

			${from.desktop} {
				background: ${backgroundColour};
				padding-top: ${space[3]}px;
			}
		`,
	};
};

export const BannerHeader = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	if (!bannerData.design) {
		return null;
	}

	const headlineSize = bannerData.design.fonts?.heading.size ?? 'medium';
	const styles = getStyles(
		bannerData.settings.headerSettings?.textColour,
		bannerData.settings.containerSettings.backgroundColour,
		headlineSize,
		bannerData.isCollapsed,
		bannerData.selectors.showHeaderImage,
		!!bannerData.settings.imageSettings,
	);

	const containerCss = bannerData.selectors.showHeaderImage
		? styles.headerWithImageContainer
		: styles.headerContainer;
	const { headingCopy } = bannerData.selectors;
	const headerImage = bannerData.settings.headerSettings?.headerImage;

	return (
		<div css={containerCss}>
			<div css={styles.container}>
				<header css={styles.header}>
					{bannerData.selectors.showHeaderImage && headerImage && (
						<BannerVisual
							bannerData={bannerData}
							settings={headerImage}
							isHeaderImage={true}
						/>
					)}
					{headingCopy.heading && <h2>{headingCopy.heading}</h2>}
				</header>
			</div>
		</div>
	);
};
