import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSans12,
	until,
} from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { assertUnreachable } from '../lib/assert-unreachable';
import { palette } from '../palette';
import type { CollectionBranding } from '../types/branding';
import { Badge } from './Badge';

type Props = {
	title: React.ReactNode;
	collectionBranding: CollectionBranding | undefined;
};

const titleStyle = css`
	${until.leftCol} {
		max-width: 74%;
	}
`;

const advertisingPartnerDottedBorder = css`
	border: 1px dotted ${sourcePalette.neutral[86]};
	margin-top: 0.375rem;
`;

const brandingAdvertisingPartnerStyle = css`
	margin-top: 5px;
	padding: 6px;
	border: 1px solid ${palette('--branding-border')};
	width: fit-content;

	${from.desktop} {
		padding: 9px;
		width: 220px;
	}
	${from.leftCol} {
		padding: 5px;
		width: fit-content;
	}
	${from.wide} {
		padding: 9px;
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

export const FrontSectionTitle = ({ title, collectionBranding }: Props) => {
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
			const isAdvertisingPartnerPlaceholder =
				logo.label.toLowerCase() === 'supported by';
			if (isFrontBranding || isContainerBranding) {
				return (
					<div css={titleStyle}>
						{title}
						<div
							css={
								isAdvertisingPartnerPlaceholder &&
								advertisingPartnerDottedBorder
							}
						></div>
						<div
							css={
								isAdvertisingPartnerPlaceholder &&
								brandingAdvertisingPartnerStyle
							}
						>
							<p
								css={[
									labelStyles,
									isAdvertisingPartnerPlaceholder &&
										labelAdvertisingPartnerStyles,
								]}
							>
								{logo.label}
							</p>
							<Badge imageSrc={logo.src} href={logo.link} />
							<a
								href={aboutThisLink}
								css={[
									aboutThisLinkStyles,
									isAdvertisingPartnerPlaceholder &&
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
