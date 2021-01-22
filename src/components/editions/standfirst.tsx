// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace, text } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import type { Format } from '@guardian/types';
import { Design } from '@guardian/types';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { getThemeStyles } from 'themeStyles';
import { ShareIcon } from './shareIcon';
import { articleWidthStyles, sidePadding } from './styles';

// ----- Component ----- //

const styles = (kickerColor: string): SerializedStyles => css`
	${body.medium({ lineHeight: 'tight' })}
	font-size: 1.125rem;
	display: flex;
	justify-content: space-between;

	${from.mobileMedium} {
		font-size: 1.25rem;
	}

	padding-bottom: ${remSpace[6]};
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

const interviewStyles = css`
	${sidePadding}
`;

interface Props {
	item: Item;
	shareIcon?: boolean;
}

const noLinks = true;

const getStyles = (format: Format): SerializedStyles => {
	const { kicker: kickerColor } = getThemeStyles(format.theme);
	if (format.design === Design.Interview) {
		return css(styles(kickerColor), interviewStyles);
	}
	return styles(kickerColor);
};

const Standfirst: FC<Props> = ({ item, shareIcon }) => {
	return maybeRender(item.standfirst, (standfirst) => (
		<div css={getStyles(item)}>
			{renderStandfirstText(standfirst, item, noLinks)}
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
