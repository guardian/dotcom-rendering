import { css } from '@emotion/react';
import {
	neutral,
	space,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { LinkButton, SvgTickRound } from '@guardian/source/react-components';
import type { NewsletterBannerData } from './NewsletterBannerData';

const successContainerStyles = (iconColor: string) => css`
	display: grid;
	grid-template-columns: 34.5px minmax(0, 1fr);
	color: ${iconColor};
	${until.tablet} {
		padding: 0 10px;
	}

	> svg {
		width: 34.5px;
		height: 34.5px;
		transform: translate(-5.75px, -5.75px);
		fill: currentColor;
	}
`;

const successContentStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
`;

const successTextStyles = (textColor: string) => css`
	${textSans15};
	color: ${textColor};

	strong {
		font-weight: 700;
	}
`;

export const SuccessMessage = ({
	bannerData,
}: {
	bannerData: NewsletterBannerData;
}) => {
	const { name: newsletterName, frequency } = bannerData.newsletter;
	const { successIconColor, browseButtonColor } =
		bannerData.settings.newsletterBanner;
	const bodyText =
		bannerData.settings.containerSettings.textColor ?? neutral[20];
	return (
		<div css={successContainerStyles(successIconColor)}>
			<SvgTickRound />
			<div css={successContentStyles}>
				<span css={successTextStyles(bodyText)} role="alert">
					<strong>You&apos;re signed up!</strong>
					&nbsp;
					<span>
						You will receive {newsletterName}{' '}
						{frequency.toLowerCase()}.
					</span>
				</span>
				<LinkButton
					theme={{
						textTertiary: browseButtonColor,
						borderTertiary: browseButtonColor,
						backgroundTertiaryHover: 'transparent',
					}}
					href="/email-newsletters?INTCMP=DOTCOM_NEWSLETTER_SIGNUP_CARD"
					priority="tertiary"
					data-ignore="global-link-styling"
				>
					Browse more newsletters
				</LinkButton>
			</div>
		</div>
	);
};
