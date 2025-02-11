import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSans12,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import {
	Hide,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { assertUnreachable } from '../lib/assert-unreachable';
import { palette } from '../palette';
import type { CollectionBranding } from '../types/branding';
import { Badge } from './Badge';
import { Details } from './Details';

type Props = {
	title: React.ReactNode;
	collectionBranding: CollectionBranding | undefined;
	isLabsSection?: boolean;
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
	isLabsSection,
}: Props) => {
	switch (collectionBranding?.kind) {
		case 'foundation': {
			const {
				branding: { logo, aboutThisLink },
				isFrontBranding,
				isContainerBranding,
			} = collectionBranding;
			if (isFrontBranding || isContainerBranding) {
				return (
					<>
						<Hide until="leftCol">
							<p css={[labelStyles]}>{logo.label}</p>
							<Badge imageSrc={logo.src} href={logo.link} />
						</Hide>
						<div css={titleStyle}>
							<Hide from="leftCol">
								<p css={[labelStyles]}>{logo.label}</p>
								<Badge imageSrc={logo.src} href={logo.link} />
							</Hide>
							{title}
							<a href={aboutThisLink} css={[aboutThisLinkStyles]}>
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
								imageSrc={logo.src}
								href={logo.link}
								isAdvertisingPartner={
									isAdvertisingPartnerOrExclusive
								}
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
			if (isLabsSection) {
				return (
					<>
						<div
							css={css`
								display: flex;
							`}
						>
							<div
								css={css`
									${textSansBold14};
									padding-right: 16px;
								`}
							>
								Paid content
							</div>
							<Details
								label={'About'}
								labelSize="xsmall"
								positionStyles={css`
									${until.mobileLandscape} {
										left: -107px;
									}
								`}
							>
								<div
									css={css`
										background-color: ${sourcePalette
											.neutral[0]};
										color: ${sourcePalette.neutral[97]};
										padding: 20px;
									`}
								>
									<p>
										Paid content is paid for and controlled
										by an advertiser and produced by the
										Guardian Labs team.
									</p>
									<br />
									<LinkButton
										iconSide="right"
										size="xsmall"
										priority="subdued"
										icon={<SvgArrowRightStraight />}
										href="https://www.theguardian.com/info/2016/jan/25/content-funding"
										theme={{
											textSubdued:
												sourcePalette.labs[400],
										}}
										cssOverrides={css`
											${textSans14};
										`}
									>
										Learn more about Guardian Labs content
									</LinkButton>
								</div>
							</Details>
						</div>
						{title}
					</>
				);
			}

			return <div css={titleStyle}>{title}</div>;
		}
		default: {
			assertUnreachable(collectionBranding);
			return null;
		}
	}
};
