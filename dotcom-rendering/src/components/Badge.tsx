import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Branding } from '../types/branding';
import { useConfig } from './ConfigContext';

// const imageStyles = css`
// 	display: block;
// 	width: auto;
// 	max-width: 100%;
// 	object-fit: contain;
// `;

const logoImageStyle = css`
	max-height: 60px;
	max-width: 120px;
	margin-left: ${space[3]}px;
	vertical-align: middle;
	height: auto;
	width: auto;
`;

type Props = {
	logo: Branding['logo'];
	logoForDarkBackground?: Branding['logoForDarkBackground'];
	sponsorName?: string;
	ophanComponentLink?: string;
	ophanComponentName?: string;
};

export const Badge = ({
	logo,
	logoForDarkBackground,
	sponsorName,
	ophanComponentLink,
	ophanComponentName,
}: Props) => {
	const { darkModeAvailable } = useConfig();

	return (
		<a
			href={logo.link}
			data-sponsor={sponsorName?.toLowerCase()}
			rel="nofollow"
			aria-label={`Visit the ${sponsorName} website`}
			data-testid="card-branding-logo"
			data-component={ophanComponentName}
			data-link-name={ophanComponentLink}
		>
			<picture>
				{darkModeAvailable && logoForDarkBackground && (
					<source
						width={logoForDarkBackground.dimensions.width}
						height={logoForDarkBackground.dimensions.height}
						srcSet={encodeURI(logoForDarkBackground.src)}
						media={'(prefers-color-scheme: dark)'}
					/>
				)}
				<img
					css={logoImageStyle}
					src={logo.src}
					alt={sponsorName}
					width={logo.dimensions.width}
					height={logo.dimensions.height}
				/>
				{/* <img
					css={[
						imageStyles,
						isInLabsSection
							? labsSectionBadgeSizingStyles
							: frontsSectionBadgeSizingStyles,
						isAdvertisingPartner && imageAdvertisingPartnerStyles,
					]}
					src={logo.src}
					alt={isInLabsSection ? 'Labs sponsor logo' : ''}
				/> */}
			</picture>
		</a>
	);
};
