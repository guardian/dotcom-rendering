import { css } from '@emotion/react';
import { palette, space, until } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import type { Newsletter } from '../types/content';
import type { DCRContainerType } from '../types/front';
import { NewsletterBadge } from './NewsletterBadge';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureSignup } from './SecureSignup.importable';

interface Props {
	newsletter: Newsletter;
	containerType?: DCRContainerType;
}

const cellStyle = css`
	padding: ${space[2]}px;
`;

const mainStyle = css`
	margin-right: 0;
	flex: 1;
	display: flex;
	justify-content: stretch;
	align-items: 'center';
`;

const logoContainerStyle = () => css`
	max-width: 215px;
	min-width: 215px;
	padding-left: 0;
`;

const rightDivStyle = (leftGoesToBottom?: boolean) => css`
	max-width: 310px;
	padding-right: 80px;
	${until.wide} {
		padding-right: 0;
		max-width: 220px;
	}
	${until.desktop} {
		max-width: unset;
		padding-right: ${space[2]}px;
		padding-top: 0;
		padding-bottom: ${!leftGoesToBottom ? `${space[3]}px` : '0'};
	}
`;

export const FrontNewsletterSignup = ({ newsletter, containerType }: Props) => {
	if (containerType === 'fixed/thrasher') {
		return (
			<section
				css={{
					backgroundColor: palette.brand[400],
					color: palette.neutral[100],
				}}
			>
				<div
					css={css`
						display: flex;
					`}
				>
					<div css={[cellStyle, logoContainerStyle()]}>
						<SvgGuardianLogo
							textColor={palette.neutral[100]}
							width={200}
						/>
						<NewsletterBadge />
					</div>
					<div css={[cellStyle, mainStyle]}>
						<div
							css={{
								backgroundColor: palette.news[400],
								border: `2px dashed ${palette.neutral[100]}`,
								padding: space[3],
								flex: 1,
							}}
						>
							<p>{newsletter.name}</p>
							<p>{newsletter.description}</p>
							<SecureSignup
								newsletterId={newsletter.identityName}
								successDescription={
									newsletter.successDescription
								}
							/>
						</div>
					</div>
					<div css={[cellStyle, rightDivStyle(false)]}>
						<NewsletterPrivacyMessage textColor="supporting" />
					</div>
				</div>
			</section>
		);
	}

	return (
		<div>
			<p>newsletter: {newsletter.name}</p>
			<p>containerType: {containerType}</p>
			<SecureSignup
				newsletterId={newsletter.identityName}
				successDescription={newsletter.successDescription}
			/>
		</div>
	);
};
