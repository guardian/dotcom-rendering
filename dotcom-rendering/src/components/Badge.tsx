import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Branding } from '../types/branding';
import { useConfig } from './ConfigContext';

const logoImageStyle = css`
	max-height: 60px;
	max-width: 120px;
	margin-left: ${space[3]}px;
	vertical-align: middle;
	height: auto;
	width: auto;
`;

const badgeLink = css`
	text-decoration: none;
`;

type Props = {
	logo: Branding['logo'];
	logoForDarkBackground: Branding['logoForDarkBackground'];
	sponsorName: Branding['sponsorName'];
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
			href={new URL(logo.link).href}
			data-sponsor={sponsorName.toLowerCase()}
			rel="nofollow"
			aria-label={`Visit the ${sponsorName} website`}
			data-testid="branding-logo"
			data-component={ophanComponentName}
			data-link-name={ophanComponentLink}
			css={badgeLink}
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
					src={new URL(logo.src).href}
					alt={sponsorName}
					width={logo.dimensions.width}
					height={logo.dimensions.height}
				/>
			</picture>
		</a>
	);
};
