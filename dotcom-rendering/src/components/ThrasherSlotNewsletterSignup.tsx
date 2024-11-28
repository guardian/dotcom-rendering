import { css } from '@emotion/react';
import {
	headlineBold24,
	palette,
	space,
	textSans14,
	until,
} from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import type { ColourName } from '../palette';
import { palette as schemePalette } from '../palette';
import type { Newsletter } from '../types/content';
import type { DCRContainerPalette } from '../types/front';
import { ContainerOverrides } from './ContainerOverrides';
import { FrontSection } from './FrontSection';
import { NewsletterBadge } from './NewsletterBadge';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureSignup } from './SecureSignup.importable';
import { NewsletterDetail } from './NewsletterDetail';
import { CardPicture } from './CardPicture';

interface Props {
	newsletter: Newsletter;
	containerPalette?: DCRContainerPalette;
	editionId: EditionId;
	discussionApiUrl: string;
}

const logoContainerStyle = css`
	padding-top: ${space[2]}px;
	max-width: 115px;
	min-width: 115px;
`;

const leftContentStyle = css`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	min-height: 160px;

	${until.leftCol} {
		min-height: unset;
		width: 100%;
		flex-direction: row-reverse;
	}
`;

const mainContentStyle = css`
	display: flex;
	gap: ${space[2]}px;
	${until.desktop} {
		flex-direction: column;
	}
`;

const privacyTextStyle = css`
	flex: 1;
`;

const promotionStyle = (themeText: string) => css`
	flex: 3;
	display: flex;
	background-color: ${schemePalette(getThemeBackgroundColour(themeText))};
	padding: ${space[2]}px;
	border-radius: ${space[2]}px;

	h3 {
		${headlineBold24}
	}

	p {
		${textSans14}
	}

	flex-direction: row;
	gap: ${space[1]}px;

	${until.phablet} {
		flex-direction: column;
	}
`;

const mobileImageWrapperStyle = css`
	display: none;

	${until.phablet} {
		display: block;
	}
`;

const phabletAndHigherImageWrapperStyle = css`
	display: block;
	min-width: 164px;
	min-height: 164px;

	${until.phablet} {
		display: none;
	}

	picture {
		height: 100%;
	}
`;

const getThemeBackgroundColour = (newsletterTheme: string): ColourName => {
	switch (newsletterTheme) {
		case 'culture':
		case 'sport':
		case 'lifestyle':
		case 'opinion':
			return `--email-signup-background-${newsletterTheme}`;
		case 'news':
		default:
			return '--email-signup-background-standard';
	}
};

export const ThrasherSlotNewsletterSignup = ({
	newsletter,
	containerPalette = 'NewsletterSignUpPalette',
	editionId,
	discussionApiUrl,
}: Props) => {
	return (
		<ContainerOverrides containerPalette={containerPalette}>
			<FrontSection
				containerPalette={containerPalette}
				editionId={editionId}
				discussionApiUrl={discussionApiUrl}
				leftContent={
					<section css={leftContentStyle}>
						<div css={logoContainerStyle}>
							<SvgGuardianLogo
								textColor={palette.neutral[100]}
								width={100}
							/>
							<NewsletterBadge />
						</div>
						<NewsletterDetail
							text={newsletter.frequency}
							textColor={palette.neutral[100]}
						/>
					</section>
				}
			>
				<section css={mainContentStyle}>
					<article css={promotionStyle(newsletter.theme)}>
						{newsletter.illustrationCard && (
							<div css={mobileImageWrapperStyle}>
								<CardPicture
									imageSize="small"
									alt=""
									mainImage={newsletter.illustrationCard}
									loading="lazy"
									aspectRatio={'5:3'}
								/>
							</div>
						)}
						{newsletter.illustrationSquare && (
							<div css={phabletAndHigherImageWrapperStyle}>
								<CardPicture
									imageSize="small"
									alt=""
									mainImage={newsletter.illustrationSquare}
									loading="lazy"
									aspectRatio={'1:1'}
								/>
							</div>
						)}
						<div>
							<h3>{newsletter.name}</h3>
							<p>{newsletter.description}</p>
							<SecureSignup
								newsletterId={newsletter.identityName}
								successDescription={
									newsletter.successDescription
								}
							/>
						</div>
					</article>
					<aside css={privacyTextStyle}>
						<NewsletterPrivacyMessage textColor="on-brand" />
					</aside>
				</section>
			</FrontSection>
		</ContainerOverrides>
	);
};
