import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	remSpace,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';

interface Props {
	isHidden: boolean;
	isSquare: boolean;
}

const adHeight = '258px';
const wideContentWidth = 620;
// const wideColumnWidth = 220;

const hiddenStyles = css`
	${visuallyHidden}
`;

const adLabelsStyles = css`
	${textSans.xsmall()}
	color: ${palette.neutral[46]};
	padding: ${remSpace[3]};
	float: left;
	// We need to account for padding on both sides
	width: calc(100% - 2 * ${remSpace[3]});

	p {
		margin: 0;
		float: left;
		font-size: 16px;
		font-weight: 400;
	}
`;

const adSlotStyles = css`
	clear: both;
	padding-bottom: ${adHeight};
`;

const adSlotSquareStyles = css`
	${adSlotStyles}
	height: 344px;
	width: 320px;
	margin-left: auto;
	margin-right: auto;
	padding-bottom: 0;
`;

const supportBannerStyles = css`
	padding: ${remSpace[3]};
	background-color: ${palette.brandAlt[400]};

	p {
		${headline.xxxsmall()};
		margin-top: 0;
	}

	button {
		margin-top: ${remSpace[3]};
	}
`;

const styles = css`
	clear: both;
	margin: ${remSpace[4]} 0;
	color: ${palette.neutral[20]};
	background: ${palette.neutral[97]};

	${from.desktop} {
		position: absolute;
		margin-left: calc(${wideContentWidth}px + ${remSpace[4]});
		min-width: 300px;
		margin-bottom: ${remSpace[6]};
	}

	${until.phablet} {
		margin: 1em -${remSpace[3]};
	}

	// This class is applied if the article has fewer than 15 paragraphs.
	&.short:nth-of-type(1) {
		${from.desktop} {
			top: 0;
		}
	}
`;

export const AdPlaceholderSlot = ({ isHidden, isSquare }: Props) => {
	return (
		<aside css={[styles, isHidden && hiddenStyles]}>
			<div css={adLabelsStyles}>
				<p>Advertisement</p>
			</div>
			<div css={isSquare ? adSlotSquareStyles : adSlotStyles}>
				<p>I am an ad placeholder slot</p>
			</div>
			<div css={supportBannerStyles}>
				<p>Support the Guardian and enjoy the app ad-free.</p>
				<button>Support the Guardian</button>
			</div>
		</aside>
	);
};
