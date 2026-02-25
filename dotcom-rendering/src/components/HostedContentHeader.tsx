import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans15,
	textSans17,
	textSansBold12,
	textSansBold14,
	visuallyHidden,
} from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { Branding } from '../types/branding';
import { BrandingLabel } from './BrandingLabel';

export type Props = {
	branding: Branding;
	accentColor?: string;
};

const HOSTED_CONTENT_HEIGHT_MOBILE = 48;
const HOSTED_CONTENT_HEIGHT_DESKTOP = 58;

const headerWrapperStyles = css`
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
	padding: 0;
	height: ${HOSTED_CONTENT_HEIGHT_MOBILE}px;
	color: ${sourcePalette.neutral[100]};

	${from.tablet} {
		height: ${HOSTED_CONTENT_HEIGHT_DESKTOP}px;
	}

	${from.desktop} {
		max-width: 61.25rem;
	}

	${from.leftCol} {
		max-width: 71.25rem;
	}

	${from.wide} {
		max-width: 81.25rem;
	}
`;

const hostedByStyles = css`
	${textSansBold12};
	display: block;
	margin-left: -51px;
	margin-bottom: -11px;
	letter-spacing: 0.03125rem;
	color: ${sourcePalette.neutral[73]};

	${from.tablet} {
		${textSansBold14};
		margin-left: -60px;
	}
`;

const logoStyles = css`
	position: relative;
	display: flex;
	align-self: end;
	margin-bottom: 1px;

	svg {
		width: 94px;
		height: auto;

		${from.tablet} {
			width: 120px;
		}
	}
`;

const titleStyles = css`
	${textSansBold14};
	position: relative;
	height: auto;
	line-height: 0.945rem;
	padding: 0.3125rem 0.375rem 0.25rem;
	letter-spacing: 0.03125rem;

	${from.desktop} {
		text-align: center;
		margin: 2px 0;
	}
`;

const badgeWrapperStyles = css`
	position: absolute;
	display: block;
	width: 80px;
	height: auto;
	top: 100%;
	text-align: center;
	z-index: 10;

	${from.desktop} {
		width: 132px;
		height: auto;
	}
`;

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
	<div css={headerWrapperStyles}>{children}</div>
);

const Left = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
		`}
	>
		{children}
	</div>
);

const Right = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			padding: ${space[1]}px 0;
			margin-right: 10px;

			${from.mobileLandscape} {
				margin-right: ${space[5]}px;
			}
		`}
	>
		{children}
	</div>
);

const HeaderSection = ({
	children,
	isFirst,
}: {
	children: React.ReactNode;
	isFirst?: boolean;
}) => (
	<div
		css={css`
			height: 100%;
			display: flex;
			align-items: center;
			margin-left: 10px;

			${from.mobileLandscape} {
				${isFirst
					? `margin-left: ${space[5]}px;`
					: 'margin-left: 10px;'}
			}

			${from.leftCol} {
				${isFirst ? null : `margin-left: ${space[8]}px;`}
			}
		`}
	>
		{children}
	</div>
);

const TitleAndBadge = ({ accentColor, branding }: Props) => (
	<>
		<div
			css={css`
				box-sizing: border-box;
				width: 80px;
				align-self: flex-end;
				background-color: ${accentColor};

				${from.desktop} {
					width: 132px;
				}
			`}
		>
			<p css={titleStyles}>Advertiser content</p>
		</div>

		<div css={badgeWrapperStyles}>
			<BrandingLabel branding={branding} isHosted={true} />
		</div>
	</>
);

{
	/* TODO: waiting for design confirmation so it's just a placeholder for now */
}
const About = () => (
	<div
		css={css`
			color: ${sourcePalette.neutral[100]};
			margin-top: 1.25rem;

			${from.tablet} {
				margin-top: 1.8rem;
			}
		`}
	>
		<p
			css={css`
				${textSans15};

				${from.desktop} {
					${textSans17};
				}
			`}
		>
			About
		</p>
	</div>
);

{
	/* Can't reuse Logo.tsx until we add a new palette to work with hosted. The color doesn't work with palette --masthead-nav-link-text */
}
const Logo = () => (
	<a
		href="/"
		data-link-name={nestedOphanComponents('header', 'logo')}
		css={css`
			cursor: pointer;
			text-decoration: none;
		`}
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

const HostedContentLogo = () => (
	<div
		css={css`
			position: relative;
			display: flex;
		`}
	>
		<div css={logoStyles}>
			<Logo />
		</div>
	</div>
);

export const HostedContentHeader = ({ branding, accentColor }: Props) => {
	return (
		<HeaderWrapper>
			<Left>
				<HeaderSection isFirst={true}>
					<TitleAndBadge
						branding={branding}
						accentColor={accentColor}
					/>
				</HeaderSection>
				<HeaderSection>
					<About />
				</HeaderSection>
			</Left>
			<Right>
				<HostedContentLogo />
			</Right>
		</HeaderWrapper>
	);
};
