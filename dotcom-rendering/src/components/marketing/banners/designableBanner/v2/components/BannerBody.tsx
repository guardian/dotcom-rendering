import { css } from '@emotion/react';
import { from, space, textSans15 } from '@guardian/source/foundations';
import { createBannerBodyCopy } from '../../components/BannerText';
import type { BannerData } from '../BannerProps';

const getStyles = (textColour: string, highlightColour?: string) => ({
	container: css`
		margin-bottom: ${space[4]}px;

		${from.tablet} {
			margin-bottom: ${space[6]}px;
		}

		p {
			margin: 0 0 0.5em 0;
		}
		${textSans15};
		span {
			${textSans15};
		}
		.rr_banner_highlight > span {
			font-weight: 700;
		}
	`,
	highlightedText: css`
		display: inline;
		color: ${textColour};

		${highlightColour
			? `
            background: ${highlightColour};
            box-shadow: 2px 0 0 ${highlightColour}, -2px 0 0 ${highlightColour};
            box-decoration-break: clone;
        `
			: ''}
	`,
});

export const BannerBody = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	const textColour = bannerData.settings.containerSettings.textColor ?? '';
	const highlightColour =
		bannerData.settings.highlightedTextSettings.highlightColour;

	const styles = getStyles(textColour, highlightColour);

	const mainOrMobileContent = bannerData.isTabletOrAbove
		? bannerData.content.mainContent
		: bannerData.content.mobileContent;

	return (
		<div css={styles.container}>
			{!bannerData.isCollapsed &&
				createBannerBodyCopy(
					mainOrMobileContent.paragraphs,
					mainOrMobileContent.highlightedText,
					styles,
				)}
		</div>
	);
};
