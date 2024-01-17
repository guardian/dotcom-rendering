import { css } from '@emotion/react';
import { from, palette, textSans, until } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { assertUnreachable } from '../lib/assert-unreachable';
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

const labelStyles = css`
	${textSans.xxsmall()};
	line-height: 1rem;
	color: ${palette.neutral[46]};
	font-weight: bold;
	margin-top: 0.375rem;
	padding-right: 0.625rem;
	padding-bottom: 0.625rem;
	text-align: left;
`;

const aboutThisLinkStyles = css`
	${textSans.xxsmall()};
	line-height: 11px;
	color: ${palette.neutral[46]};
	font-weight: normal;
	text-decoration: none;
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
							<Badge
								imageSrc={logo.src}
								href={logo.link}
								isFrontNonEditorialBadge={true}
							/>
						</Hide>
						<div css={titleStyle}>
							<Hide from="leftCol">
								<Badge
									imageSrc={logo.src}
									href={logo.link}
									isFrontNonEditorialBadge={true}
								/>
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
								border-top: 1px dotted ${palette.neutral[86]};
								${textSans.xxsmall()}
								color: ${palette.neutral[46]};
								font-weight: bold;

								${from.leftCol} {
									width: 100%;
								}
							`}
						>
							Paid for by
							<Badge
								imageSrc={logo.src}
								href={logo.link}
								isFrontNonEditorialBadge={true}
							/>
						</div>
					</div>
				);
			}

			return (
				<>
					<Hide until="leftCol">
						<Badge
							imageSrc={logo.src}
							href={logo.link}
							isFrontNonEditorialBadge={true}
						/>
					</Hide>
					<div css={titleStyle}>
						<Hide from="leftCol">
							<Badge
								imageSrc={logo.src}
								href={logo.link}
								isFrontNonEditorialBadge={true}
							/>
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
			if (isFrontBranding || isContainerBranding) {
				return (
					<div css={titleStyle}>
						{title}
						<>
							<p css={labelStyles}>{logo.label}</p>
							<Badge
								imageSrc={logo.src}
								href={logo.link}
								isFrontNonEditorialBadge={true}
							/>
							<a href={aboutThisLink} css={aboutThisLinkStyles}>
								About this content
							</a>
						</>
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
