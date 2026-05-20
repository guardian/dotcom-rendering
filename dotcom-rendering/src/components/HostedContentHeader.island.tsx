import { css } from '@emotion/react';
import {
	breakpoints,
	calculateHoverColour,
	from,
	palette,
	palette as sourcePalette,
	space,
	textSans12,
	textSansBold12,
	textSansBold14,
	until,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgGuardianLogo,
	SvgInfoRound,
} from '@guardian/source/react-components';
import { Popover } from '@guardian/source-development-kitchen/react-components';
import { useEffect, useState } from 'react';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import {
	customYoutubePauseEventName,
	customYoutubePlayEventName,
} from '../lib/video';
import type { Branding } from '../types/branding';
import { BrandingLabel } from './BrandingLabel';

export type Props = {
	branding: Branding;
};

const headerWrapperStyles = css`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
	padding: 0 10px;
	height: 48px;
	color: ${sourcePalette.neutral[100]};

	${from.mobileLandscape} {
		padding: 0 20px;
	}

	${from.tablet} {
		height: 58px;
	}

	${from.tablet} {
		width: ${breakpoints.tablet}px;
	}

	${from.desktop} {
		width: ${breakpoints.desktop}px;
	}

	${from.leftCol} {
		width: ${breakpoints.leftCol}px;
	}

	${from.wide} {
		width: ${breakpoints.wide}px;
	}
`;

const brandingStyles = css`
	display: flex;
	position: relative;
	width: 132px;
	min-width: 132px;
`;

const advertiserContentStyles = css`
	min-height: 24px;
	width: 100%;
	align-self: flex-end;
	display: flex;
	justify-content: space-around;
	align-items: center;
	${textSans12};
	padding-left: ${space[1]}px;
`;

const logoStyles = css`
	align-self: end;
	display: flex;
	flex-direction: column;
	margin-bottom: 2px;

	${from.mobileMedium} {
		flex-direction: row;
		align-items: flex-end;
		margin-bottom: ${space[1]}px;
	}

	cursor: pointer;
	text-decoration: none;

	svg {
		width: 94px;
		height: auto;

		${from.tablet} {
			width: 120px;
		}
	}
`;

const hostedByStyles = css`
	${textSansBold12};
	display: block;
	color: ${sourcePalette.neutral[97]};
	margin-right: ${space[1]}px;

	${from.tablet} {
		${textSansBold14};
	}
`;

const badgeWrapperStyles = css`
	position: absolute;
	display: block;
	width: 132px;
	height: auto;
	top: 100%;
	text-align: center;
	z-index: 1;
	background-color: ${sourcePalette.neutral[100]};
	opacity: 1;
	transition: opacity 2s ease-in-out;
`;

const badgeWrapperFadeStyles = css`
	${until.wide} {
		opacity: 0;
	}
`;

const POPOVER_WIDTH = '280px';
const popoverOverrides = css`
	${until.tablet} {
		left: calc(-${POPOVER_WIDTH} + ${space[8]}px);
		transform: translateX(50%);
		::after {
			left: calc(50% - ${space[8]}px);
		}
	}
`;

/**
 * Can't reuse general Logo.tsx until we add a new palette to work with hosted.
 * The color doesn't work with palette --masthead-nav-link-text
 */
const GuardianLogo = () => (
	<a
		href="/"
		data-link-name={nestedOphanComponents('hosted-header', 'logo')}
		css={logoStyles}
	>
		<span
			css={css`
				${visuallyHidden};
			`}
		>
			The Guardian - Back to home
		</span>
		<p css={hostedByStyles}>Hosted by</p>

		<SvgGuardianLogo textColor={`${sourcePalette.neutral[100]}`} />
	</a>
);

export const HostedContentHeader = ({ branding }: Props) => {
	const accentColor =
		branding.hostedCampaignColour ?? sourcePalette.neutral[38];
	const [isPopoverExpanded, setIsPopoverExpanded] = useState<boolean>(false);
	const [shouldFadeLogo, setShouldFadeLogo] = useState<boolean>(false);

	const handleButtonClick = () => setIsPopoverExpanded(!isPopoverExpanded);
	// Logo fading is an exclusive feature for hosted video pages at certain breakpoints
	// This component only needs rehydration on the video layout
	const fadeLogo = () => setShouldFadeLogo(true);
	const unfadeLogo = () => setShouldFadeLogo(false);

	useEffect(() => {
		document.addEventListener(customYoutubePlayEventName, fadeLogo);
		document.addEventListener(customYoutubePauseEventName, unfadeLogo);

		return () => {
			document.removeEventListener(customYoutubePlayEventName, fadeLogo);
			document.removeEventListener(
				customYoutubePauseEventName,
				unfadeLogo,
			);
		};
	}, []);

	return (
		<div css={headerWrapperStyles}>
			<div css={brandingStyles}>
				<div
					css={advertiserContentStyles}
					style={{ backgroundColor: accentColor }}
				>
					<p>Advertiser content</p>
					<Popover
						title="Advertiser content"
						content={
							<>
								<span>
									This content is paid for and produced by the
									advertiser. It is regulated by the
									Advertising Standards Authority. Guardian
									staff had no involvement in its creation.
								</span>
								<div
									css={css`
										margin-top: ${space[3]}px;
									`}
								>
									<LinkButton
										priority="primary"
										size="xsmall"
										href="https://www.theguardian.com/info/2016/jan/25/content-funding"
										theme={{
											textPrimary: palette.brand[100],
											backgroundPrimary:
												palette.brand[800],
											backgroundPrimaryHover:
												calculateHoverColour(
													palette.brand[800],
												),
										}}
										aria-label="Learn more about advertiser content"
									>
										Learn more
									</LinkButton>
								</div>
							</>
						}
						position="bottom"
						showPointer={true}
						theme={{
							text: palette.neutral[97],
							background: palette.neutral[10],
							dismissButtonText: palette.neutral[100],
							dismissButtonBackground: palette.neutral[20],
							dismissButtonBackgroundHover: palette.neutral[38],
						}}
						width={POPOVER_WIDTH}
						trigger={
							<Button
								id="info-icon"
								icon={<SvgInfoRound />}
								size="xsmall"
								priority="subdued"
								theme={{
									textSubdued: sourcePalette.neutral[97],
								}}
								hideLabel={true}
								onClick={handleButtonClick}
								aria-label="More information about advertiser content"
								aria-haspopup="dialog"
							/>
						}
						isOpen={isPopoverExpanded}
						handleClose={() => setIsPopoverExpanded(false)}
						cssOverrides={popoverOverrides}
					/>
				</div>

				<div
					css={[
						badgeWrapperStyles,
						shouldFadeLogo && badgeWrapperFadeStyles,
					]}
				>
					<BrandingLabel branding={branding} isHosted={true} />
				</div>
			</div>

			<GuardianLogo />
		</div>
	);
};
