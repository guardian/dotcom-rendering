import { css } from '@emotion/react';
import {
	from,
	textEgyptian15,
	textEgyptian17,
	textEgyptianBold15,
	textEgyptianBold17,
} from '@guardian/source/foundations';
import { createBannerBodyCopy } from '../../components/BannerText';
import { useBanner } from '../useBanner';

const getStyles = (textColour: string, highlightColour?: string) => ({
	container: css`
		p {
			margin: 0 0 0.5em 0;
		}
		${textEgyptian15};
		${from.desktop} {
			${textEgyptian17};
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

		${textEgyptianBold15};
		${from.desktop} {
			${textEgyptianBold17};
		}
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
