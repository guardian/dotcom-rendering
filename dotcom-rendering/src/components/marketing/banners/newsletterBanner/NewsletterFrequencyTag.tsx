import { css } from '@emotion/react';
import { space, textSansBold15, until } from '@guardian/source/foundations';
import { SvgNewsletterFilled } from '@guardian/source/react-components';
import type { NewsletterBannerData } from './NewsletterBannerData';

const frequencyTagStyles = (actionColor: string) => css`
	display: flex;
	align-items: center;
	gap: 6px;
	color: ${actionColor};
	${textSansBold15};
	padding: ${space[2]}px 0;
	${until.desktop} {
		padding: ${space[3]}px 0 ${space[2]}px;
	}
	${until.tablet} {
		padding: 18px 68px 14px 10px;
	}
`;

const frequencyTextStyles = css`
	display: flex;
	flex-wrap: wrap;
	column-gap: ${space[1]}px;
`;

const frequencyLabelStyles = css`
	white-space: nowrap;
`;

const badgeStyles = (actionColor: string, iconColor: string) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: ${actionColor};

	svg {
		fill: ${iconColor};
		height: 18px;
		width: 18px;
	}
`;

export const NewsletterFrequencyTag = ({
	bannerData,
	hideFrequency = false,
}: {
	bannerData: NewsletterBannerData;
	hideFrequency?: boolean;
}) => {
	const { actionColor, frequencyIconColor } =
		bannerData.settings.newsletterBanner;
	const { frequency } = bannerData.newsletter;
	return (
		<div css={frequencyTagStyles(actionColor)}>
			<span css={badgeStyles(actionColor, frequencyIconColor)}>
				<SvgNewsletterFilled />
			</span>
			<span css={frequencyTextStyles}>
				<span css={frequencyLabelStyles}>Free newsletter</span>
				{!hideFrequency && (
					<span css={frequencyLabelStyles}>| {frequency}</span>
				)}
			</span>
		</div>
	);
};
