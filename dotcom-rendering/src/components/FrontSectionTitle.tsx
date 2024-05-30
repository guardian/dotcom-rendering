import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSans12,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { assertUnreachable } from '../lib/assert-unreachable';
import { palette } from '../palette';
import type { CollectionBranding } from '../types/branding';
import { Badge } from './Badge';

type Props = {
	title: React.ReactNode;
	collectionBranding: CollectionBranding | undefined;
	updateLogoAdPartnerSwitch: boolean;
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
	updateLogoAdPartnerSwitch,
}: Props) => {
	switch (collectionBranding?.kind) {
		case 'foundation': {
			const {
				branding: { logo },
				isFrontBranding,
				isContainerBranding,
			} = collectionBranding;
			if (isFrontBranding || isContainerBranding) {
				return (
					<>
						<Hide until="leftCol">
							<Badge imageSrc={logo.src} href={logo.link} />
						</Hide>
						<div css={titleStyle}>
							<Hide from="leftCol">
								<Badge imageSrc={logo.src} href={logo.link} />
							</Hide>
							{title}
						</div>
					</>
				);
			}

			return <div css={titleStyle}>{title}</div>;
		}
		case 'paid-content': {
			const {
				isFrontBranding,
				isContainerBranding,
				branding: { logo },
			} = collectionBranding;

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
							<Badge imageSrc={logo.src} href={logo.link} />
						</div>
					</div>
				);
			}

			return (
				<>
					<Hide until="leftCol">
						<Badge imageSrc={logo.src} href={logo.link} />
					</Hide>
					<div css={titleStyle}>
						<Hide from="leftCol">
							<Badge imageSrc={logo.src} href={logo.link} />
						</Hide>
						{title}
					</div>
				</>
			);
		}
		case 'sponsored': {
			const {
				branding: { logo, aboutThisLink },
				isContainerBranding,
				isFrontBranding,
			} = collectionBranding;
			const isAdvertisingPartnerOrExclusive =
				logo.label.toLowerCase() === 'advertising partner' ||
				logo.label.toLowerCase() === 'exclusive advertising partner';
			if (isFrontBranding || isContainerBranding) {
				return (
					<div css={titleStyle}>
						{title}
						{isAdvertisingPartnerOrExclusive &&
						updateLogoAdPartnerSwitch ? (
							<hr css={advertisingPartnerDottedBorder} />
						) : null}
						<div
							css={
								isAdvertisingPartnerOrExclusive &&
								updateLogoAdPartnerSwitch &&
								brandingAdvertisingPartnerStyle
							}
						>
							<p
								css={[
									labelStyles,
									isAdvertisingPartnerOrExclusive &&
										updateLogoAdPartnerSwitch &&
										labelAdvertisingPartnerStyles,
								]}
							>
								{logo.label}
							</p>
							<Badge
								imageSrc={logo.src}
								href={logo.link}
								isAdvertisingPartner={
									isAdvertisingPartnerOrExclusive
								}
								updateLogoAdPartnerSwitch={
									updateLogoAdPartnerSwitch
								}
							/>
							<a
								href={aboutThisLink}
								css={[
									aboutThisLinkStyles,
									isAdvertisingPartnerOrExclusive &&
										updateLogoAdPartnerSwitch &&
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
