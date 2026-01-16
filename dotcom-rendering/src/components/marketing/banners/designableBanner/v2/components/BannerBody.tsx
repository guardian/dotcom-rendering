import { css } from '@emotion/react';
import { from, space, textSans15 } from '@guardian/source/foundations';
import { createBannerBodyCopy } from '../../components/BannerText';
import { useBanner } from '../useBanner';

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

export const BannerBody = (): JSX.Element | null => {
	const { content, settings, isTabletOrAbove, isCollapsed } = useBanner();

	const textColour = settings.containerSettings.textColor ?? '';
	const highlightColour = settings.highlightedTextSettings.highlightColour;

	const styles = getStyles(textColour, highlightColour);

	const mainOrMobileContent = isTabletOrAbove
		? content.mainContent
		: content.mobileContent;

	return (
		<div css={styles.container}>
			{!isCollapsed &&
				createBannerBodyCopy(
					mainOrMobileContent.paragraphs,
					mainOrMobileContent.highlightedText,
					styles,
				)}
		</div>
	);
};
