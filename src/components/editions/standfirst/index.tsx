// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, remSpace, text } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body, headline } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { getThemeStyles } from 'themeStyles';
import ShareIcon from '../shareIcon';
import { articleWidthStyles, sidePadding } from '../styles';

// ----- Template Format Specific Styles ----- //

const interviewStyles = css`
	${sidePadding}
`;
const showcaseStyles = css`
	${headline.xxsmall({ lineHeight: 'tight' })}
	color: ${neutral[20]}
`;

const galleryStyles = css`
	${headline.xxsmall({ lineHeight: 'tight', fontWeight: 'regular' })}
	color: ${neutral[100]};
`;

const greyTextStyles = css`
	${headline.xxxsmall({ lineHeight: 'tight' })}
	${from.mobileMedium} {
		${headline.xxsmall({ lineHeight: 'tight' })}
	}
	color: ${neutral[20]};
`;

const immersiveStyles = `
	${headline.xxxsmall({ lineHeight: 'tight', fontWeight: 'bold' })};
	color: ${neutral[100]};
`;

const analysisStyles = `
	${headline.xxxsmall({ lineHeight: 'tight', fontWeight: 'bold' })};
	color: ${neutral[20]};
`;

// ----- Headline Component Styles ----- //

const styles = (kickerColor: string): SerializedStyles => css`
	${body.medium({ lineHeight: 'tight' })}
	display: flex;
	justify-content: space-between;
	padding-bottom: ${remSpace[4]};
	color: ${text.primary};

	${articleWidthStyles}

	p,
	ul {
		padding-top: ${remSpace[1]};
		margin: 0;
	}

	address {
		font-style: normal;
	}

	svg {
		flex: 0 0 1.875rem;
		margin-top: 0.375rem;
		padding-left: 0.5rem;
		width: 1.875rem;
		height: 1.875rem;

		circle {
			stroke: ${kickerColor};
		}

		path {
			fill: ${kickerColor};
		}
	}
`;

const textContainerStyles = css`
	display: flex;
	flex-direction: column;
`;

const getStyles = (format: Format): SerializedStyles => {
	const { kicker: kickerColor } = getThemeStyles(format.theme);

	// Display.Immersive needs to come before Design.Interview
	if (format.display === Display.Immersive) {
		return css(styles(kickerColor), immersiveStyles);
	}
	if (format.design === Design.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}
	if (format.design === Design.Analysis) {
		return css(styles(kickerColor), analysisStyles);
	}
	if (format.design === Design.Comment || format.design === Design.Letter) {
		return css(styles(kickerColor), greyTextStyles);
	}
	if (format.display === Display.Showcase) {
		return css(styles(kickerColor), showcaseStyles);
	}
	if (format.design === Design.Media) {
		return css(styles(kickerColor), galleryStyles);
	}
	return styles(kickerColor);
};

// ----- Component ----- //
interface Props {
	item: Item;
	shareIcon?: boolean;
}

const noLinks = true;

const Standfirst: FC<Props> = ({ item, shareIcon }) => {
	return maybeRender(item.standfirst, (standfirst) => (
		<div css={getStyles(item)}>
			<div css={textContainerStyles}>
				{renderStandfirstText(standfirst, item, noLinks)}
			</div>
			{shareIcon && (
				<span className="js-share-button" role="button">
					<ShareIcon />
				</span>
			)}
		</div>
	));
};

// ----- Exports ----- //

export default Standfirst;
