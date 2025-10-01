import { css } from '@emotion/react';
import {
	between,
	from,
	palette as sourcePalette,
	textSans12,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { assertUnreachable } from '../lib/assert-unreachable';
import { decideBrandingLogo } from '../lib/decideLogo';
import { palette } from '../palette';
import type { CollectionBranding } from '../types/branding';
import type { DCRContainerPalette } from '../types/front';
import { Badge } from './Badge';

type Props = {
	title: React.ReactNode;
	collectionBranding: CollectionBranding | undefined;
	containerPalette?: DCRContainerPalette;
};

const titleStyle = css`
	${until.leftCol} {
		max-width: 74%;
	}
`;

const advertisingPartnerDottedBorder = css`
	border-top: 1px dotted ${sourcePalette.neutral[86]};
	border-bottom: none;
	margin-top: 0.375rem;
`;

const brandingAdvertisingPartnerStyle = css`
	margin: 4px 0 20px;
	padding: 4px;
	border: 1px solid ${palette('--branding-border')};
	width: fit-content;

	${from.desktop} {
		padding: 8px;
		width: 220px;
	}
	${from.leftCol} {
		padding: 4px;
		width: fit-content;
	}
	${from.wide} {
		padding: 8px;
		width: auto;
	}

	img {
		${between.leftCol.and.wide} {
			max-width: 130px;
		}
	}
`;

const labelAdvertisingPartnerStyles = css`
	margin-top: 0;
	border-top: 0;
`;

const labelStyles = css`
	${textSans12};
	line-height: 1rem;
	color: ${sourcePalette.neutral[46]};
	font-weight: bold;
	margin-top: 0.375rem;
	padding-right: 0.625rem;
	padding-bottom: 0.625rem;
	text-align: left;
	border-top: 1px dotted ${sourcePalette.neutral[86]};
`;

const aboutThisLinkStyles = css`
	${textSans12};
	line-height: 11px;
	color: ${sourcePalette.neutral[46]};
	font-weight: normal;
	text-decoration: none;
`;

const aboutThisLinkAdvertisingPartnerStyles = css`
	color: ${sourcePalette.news[400]};
`;

export const FrontSectionTitle = ({
	title,
	collectionBranding,
	containerPalette,
}: Props) => {
	switch (collectionBranding?.kind) {
		case 'foundation': {
			const {
				branding: { logoForDarkBackground, sponsorName, aboutThisLink },
				isFrontBranding,
				isContainerBranding,
			} = collectionBranding;
			const logo = decideBrandingLogo(
				collectionBranding.branding,
				containerPalette,
			);

			if (isFrontBranding || isContainerBranding) {
				return (
					<>
						<Hide until="leftCol">
							<p css={labelStyles}>{logo.label}</p>
							<Badge
								logo={logo}
								logoForDarkBackground={logoForDarkBackground}
								sponsorName={sponsorName}
							/>
						</Hide>
						<div css={titleStyle}>
							<Hide from="leftCol">
								<p css={labelStyles}>{logo.label}</p>
								<Badge
									logo={logo}
									logoForDarkBackground={
										logoForDarkBackground
									}
									sponsorName={sponsorName}
								/>
							</Hide>
							{title}
							<a
								href={
									// Sanitise URL before use as href attribute
									new URL(aboutThisLink).href
								}
								css={aboutThisLinkStyles}
							>
								About this content
							</a>
						</div>
					</>
				);
			}

			return <div css={titleStyle}>{title}</div>;
		}
		case 'paid-content': {
			const {
				branding: { logoForDarkBackground, sponsorName },
				isFrontBranding,
				isContainerBranding,
			} = collectionBranding;
			const logo = decideBrandingLogo(
				collectionBranding.branding,
				containerPalette,
			);

			if (isFrontBranding || isContainerBranding) {
				return (
					<div css={titleStyle}>
						{title}
						<div
							css={css`
								display: inline-block;
								border-top: 1px dotted
									${sourcePalette.neutral[86]};
								${textSans12}
								color: ${sourcePalette.neutral[46]};
								font-weight: bold;

								${from.leftCol} {
									width: 100%;
								}
							`}
						>
							Paid for by
							<Badge
								logo={logo}
								logoForDarkBackground={logoForDarkBackground}
								sponsorName={sponsorName}
							/>
						</div>
					</div>
				);
			}

			return (
				<>
					<Hide until="leftCol">
						<Badge
							logo={logo}
							logoForDarkBackground={logoForDarkBackground}
							sponsorName={sponsorName}
						/>
					</Hide>
					<div css={titleStyle}>
						<Hide from="leftCol">
							<Badge
								logo={logo}
								logoForDarkBackground={logoForDarkBackground}
								sponsorName={sponsorName}
							/>
						</Hide>
						{title}
					</div>
				</>
			);
		}
		case 'sponsored': {
			const {
				branding: { logoForDarkBackground, sponsorName, aboutThisLink },
				isFrontBranding,
				isContainerBranding,
			} = collectionBranding;
			const logo = decideBrandingLogo(
				collectionBranding.branding,
				containerPalette,
			);
			const isAdvertisingPartnerOrExclusive =
				logo.label.toLowerCase() === 'advertising partner' ||
				logo.label.toLowerCase() === 'exclusive advertising partner';

			if (isFrontBranding || isContainerBranding) {
				return (
					<div css={titleStyle}>
						{title}
						{isAdvertisingPartnerOrExclusive ? (
							<hr css={advertisingPartnerDottedBorder} />
						) : null}
						<div
							css={
								isAdvertisingPartnerOrExclusive &&
								brandingAdvertisingPartnerStyle
							}
						>
							<p
								css={[
									labelStyles,
									isAdvertisingPartnerOrExclusive &&
										labelAdvertisingPartnerStyles,
								]}
							>
								{logo.label}
							</p>
							<Badge
								logo={logo}
								logoForDarkBackground={logoForDarkBackground}
								sponsorName={sponsorName}
							/>
							<a
								href={aboutThisLink}
								css={[
									aboutThisLinkStyles,
									isAdvertisingPartnerOrExclusive &&
										aboutThisLinkAdvertisingPartnerStyles,
								]}
							>
								About this content
							</a>
						</div>
					</div>
				);
			}
			return <div css={titleStyle}>{title}</div>;
		}
		case undefined: {
			return <div css={titleStyle}>{title}</div>;
		}
		default: {
			assertUnreachable(collectionBranding);
			return null;
		}
	}
};
