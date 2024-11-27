import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans14,
	until,
} from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
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
}

const logoContainerStyle = () => css`
	max-width: 115px;
	min-width: 115px;
`;

export const ThrasherSlotNewsletterSignup = ({
	newsletter,
	containerPalette,
}: Props) => {
	return (
		<ContainerOverrides containerPalette={containerPalette}>
			<FrontSection
				containerPalette={containerPalette}
				editionId="UK"
				discussionApiUrl="/"
				title={newsletter.name}
				leftContent={
					<div css={[logoContainerStyle()]}>
						<SvgGuardianLogo
							textColor={palette.neutral[0]}
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
							background-color: ${palette.news[400]};
							border: 2px dashed ${palette.neutral[100]};
							padding: ${space[1]}px;
							flex: 3;
						`}
					>
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
