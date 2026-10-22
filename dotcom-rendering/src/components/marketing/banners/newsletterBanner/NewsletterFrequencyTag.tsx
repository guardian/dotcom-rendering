import { css } from '@emotion/react';
import { space, textSansBold15, until } from '@guardian/source/foundations';
import { SvgNewsletterFilled } from '@guardian/source/react-components';
import { palette as themePalette } from '../../../../palette';

const frequencyTagStyles = css`
	display: flex;
	align-items: center;
	gap: 6px;
	color: ${themePalette('--newsletter-card-frequency-tag')};
	${textSansBold15};
	padding: ${space[2]}px 0;
	${until.desktop} {
		padding: ${space[3]}px 0 ${space[2]}px;
	}
	${until.tablet} {
		padding: 18px 10px 14px 10px;
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

const badgeStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: ${themePalette('--newsletter-card-badge-background')};

	svg {
		fill: ${themePalette('--newsletter-card-badge-icon')};
		height: 18px;
		width: 18px;
	}
`;

export const NewsletterFrequencyTag = ({
	frequency,
}: {
	frequency: string;
}) => (
	<div css={frequencyTagStyles}>
		<span css={badgeStyles}>
			<SvgNewsletterFilled />
		</span>
		<span css={frequencyTextStyles}>
			<span css={frequencyLabelStyles}>Free newsletter |</span>
			<span css={frequencyLabelStyles}>{frequency}</span>
		</span>
	</div>
);
