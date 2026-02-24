import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSansBold12,
	visuallyHidden,
} from '@guardian/source/foundations';
import { decideBrandingLogo } from '../lib/decideLogo';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { Branding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';
import { useConfig } from './ConfigContext';

type Props = {
	branding: Branding;
	alignment?: 'start' | 'end';
	orientation?: 'horizontal' | 'vertical';
	containerPalette?: DCRContainerPalette;
	ophanComponentLink?: string;
	ophanComponentName?: string;
	isLabs?: boolean;
	isAdvertisingPartner?: boolean;
	isHosted?: boolean;
	dataTestId?: string;
};

const logoImageStyle = css`
	max-height: 60px;
	max-width: 120px;
	vertical-align: middle;
	height: auto;
	width: auto;
`;

const labelStyles = css`
	${textSansBold12};
	color: ${palette('--labs-header-label-text')};
`;

const wrapperStyles = css`
	padding-top: ${space[2]}px;
	display: flex;
	justify-content: end;
	gap: ${space[1]}px;
`;

const horizontalStyles = css`
	align-items: center;
	gap: ${space[2]}px;
`;

const verticalStyles = {
	start: css`
		flex-direction: column;
	`,
	end: css`
		align-items: end;
		flex-direction: column;
	`,
};

const linkStyles = css`
	height: 60px;
	/* See: https://css-tricks.com/nested-links/ */
	z-index: ${getZIndex('card-nested-link')};
	/** Vertically center the branding within the link */
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const badgeLink = css`
	text-decoration: none;
`;

const imageStyles = css`
	display: block;
	width: auto;
	max-width: 100%;
	object-fit: contain;
`;

const frontsSectionBadgeSizingStyles = css`
	height: auto;
	width: 120px;

	${from.tablet} {
		width: 140px;
	}

	${from.leftCol} {
		width: 200px;
	}
`;

const imageAdvertisingPartnerStyles = css`
	${between.leftCol.and.wide} {
		max-width: 130px;
	}
`;

const hostedLogoImageStyles = css`
	width: 132px;
	height: auto;
`;

/**
 * Component used to display branding labels with sponsor logos for
 * various types of branded content (paid-content, sponsored, foundation, etc.)
 *
 * This is used for front container level branding and card level branding.
 * It supports both Labs and non-Labs designs. This should eventually replace `Badge`.
 */
export const BrandingLabel = ({
	branding,
	alignment = 'start',
	orientation = 'horizontal',
	containerPalette,
	ophanComponentLink,
	ophanComponentName,
	isLabs = false,
	isAdvertisingPartner = false,
	isHosted = false,
	dataTestId = 'branding-logo',
}: Props) => {
	const { darkModeAvailable } = useConfig();
	const logo = decideBrandingLogo(branding, containerPalette);

	if (isLabs) {
		return (
			<div
				css={[
					wrapperStyles,
					orientation === 'vertical'
						? verticalStyles[alignment]
						: horizontalStyles,
				]}
			>
				<div css={labelStyles}>{logo.label}</div>

				<span
					css={css`
						${visuallyHidden};
					`}
				>
					{branding.sponsorName
						? `This content was paid for by ${branding.sponsorName} and produced by the Guardian Labs team.`
						: 'This content has been paid for by an advertiser and produced by the Guardian Labs team.'}
				</span>
				<a
					css={linkStyles}
					href={logo.link}
					data-sponsor={branding.sponsorName.toLowerCase()}
					rel="nofollow"
					aria-label={`Visit the ${branding.sponsorName} website`}
					data-testid={dataTestId}
					data-component={ophanComponentName}
					data-link-name={ophanComponentLink}
					className="branding-logo"
				>
					<picture>
						{darkModeAvailable &&
							branding.logoForDarkBackground && (
								<source
									width={
										branding.logoForDarkBackground
											.dimensions.width
									}
									height={
										branding.logoForDarkBackground
											.dimensions.height
									}
									srcSet={encodeURI(
										branding.logoForDarkBackground.src,
									)}
									media={'(prefers-color-scheme: dark)'}
								/>
							)}
						<img
							css={logoImageStyle}
							src={logo.src}
							alt={branding.sponsorName}
							width={logo.dimensions.width}
							height={logo.dimensions.height}
						/>
					</picture>
				</a>
			</div>
		);
	}

	if (isHosted) {
		return (
			<a
				href={logo.link}
				data-link-name={ophanComponentLink}
				data-component={ophanComponentName}
			>
				<img
					css={hostedLogoImageStyles}
					src={logo.src}
					alt={branding.sponsorName}
					width={logo.dimensions.width}
					height={logo.dimensions.height}
				/>
			</a>
		);
	}

	return (
		<a
			href={logo.link}
			data-link-name={ophanComponentLink}
			data-component={ophanComponentName}
			css={badgeLink}
		>
			<img
				css={[
					imageStyles,
					frontsSectionBadgeSizingStyles,
					isAdvertisingPartner && imageAdvertisingPartnerStyles,
				]}
				src={logo.src}
				alt={`logo for ${branding.sponsorName}`}
			/>
		</a>
	);
};
