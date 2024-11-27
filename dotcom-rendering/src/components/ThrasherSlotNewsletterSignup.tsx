import { css } from '@emotion/react';
import {
	headlineBold24,
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

interface Props {
	newsletter: Newsletter;
	containerPalette?: DCRContainerPalette;
	editionId: EditionId;
	discussionApiUrl: string;
}

const logoContainerStyle = () => css`
	max-width: 115px;
	min-width: 115px;
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
	containerPalette,
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
					<div css={[logoContainerStyle()]}>
						<SvgGuardianLogo
							textColor={schemePalette('--article-section-title')}
							width={100}
						/>
						<NewsletterBadge />
					</div>
				}
			>
				<div
					css={css`
						display: flex;
						gap: ${space[2]}px;
						${until.desktop} {
							flex-direction: column;
						}
					`}
				>
					<div
						css={css`
							background-color: ${schemePalette(
								getThemeBackgroundColour(newsletter.theme),
							)};
							padding: ${space[2]}px;
							border-radius: ${space[2]}px;
							flex: 3;
						`}
					>
						<p
							css={css(`
									${headlineBold24}
								`)}
						>
							{newsletter.name}
						</p>
						<p
							css={css(`
									${textSans14}
								`)}
						>
							{newsletter.description}
						</p>
						<SecureSignup
							newsletterId={newsletter.identityName}
							successDescription={newsletter.successDescription}
						/>
					</div>
					<div
						css={css`
							flex: 1;
						`}
					>
						<NewsletterPrivacyMessage textColor="supporting" />
					</div>
				</div>
			</FrontSection>
		</ContainerOverrides>
	);
};
