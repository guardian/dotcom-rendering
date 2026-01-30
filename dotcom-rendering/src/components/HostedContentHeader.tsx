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

type Props = {
	accentColor: string;
	branding: string;
};

const HOSTED_CONTENT_HEIGHT_MOBILE = 3;
const HOSTED_CONTENT_HEIGHT_DESKTOP = 3.625;

const headerWrapperStyles = css`
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
	padding: 0;
	height: ${HOSTED_CONTENT_HEIGHT_MOBILE}rem;
	color: ${sourcePalette.neutral[100]};

	${from.tablet} {
		height: ${HOSTED_CONTENT_HEIGHT_DESKTOP}rem;
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
	margin-right: -9px;
	letter-spacing: 0.03125rem;
	color: ${sourcePalette.neutral[73]};

	${from.tablet} {
		${textSansBold14};
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

export const Left = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
		`}
	>
		{children}
	</div>
);

export const Right = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			padding: ${space[1]}px 10px;

			@media (min-width: 330px) {
				margin-right: 0.625rem;
			}
		`}
	>
		{children}
	</div>
);

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
	<div css={headerWrapperStyles}>{children}</div>
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
			${isFirst ? 'margin-left: 1.25rem;' : 'margin-left: 0.625rem;'}

			${from.desktop} {
				${isFirst ? null : 'margin-left: 1.25rem;'}
			}

			${from.leftCol} {
				${isFirst ? null : 'margin-left: 2rem;'}
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
			<p
				css={css`
					${textSansBold14};
					position: relative;
					height: auto;
					line-height: 0.945rem; /* We shouldn't override this but need to confirm if it's ok for the design to look slighly different */
					padding: 0.3125rem 0.375rem 0.25rem;
					letter-spacing: 0.03125rem;

					${from.desktop} {
						text-align: center;
						margin: 2px 0;
					}
				`}
			>
				Advertiser content
			</p>
		</div>

		{/* The following div is a placeholder for the badge */}
		<div
			css={css`
				position: absolute;
				display: block;
				width: 80px;
				height: 45px; /* This is temporary, replace with actual badge height */
				top: 100%;
				background-color: ${sourcePalette.neutral[60]};
				text-align: center;
				z-index: 10;

				${from.desktop} {
					width: 132px;
					height: 75px;
				}
			`}
		>
			{branding}
		</div>
	</>
);

const About = () => (
	<div
		css={css`
			${textSans15};
			background-color: ${sourcePalette.neutral[7]};
			color: ${sourcePalette.neutral[100]};
			margin-top: 1.25rem;
			padding: 0;

			${from.tablet} {
				margin-top: 1.8rem;
			}

			${from.desktop} {
				${textSans17};
				width: 235px;
			}
		`}
	>
		<p
			css={css`
				padding: 0;
			`}
		>
			About
		</p>
	</div>
);

{
	/* The following was copied from Logo.tsx because of the logo textColor doesn't work with palette --masthead-nav-link-text */
}
const Logo = () => (
	<a href="/" data-link-name={nestedOphanComponents('header', 'logo')}>
		<span
			css={css`
				${visuallyHidden};
			`}
		>
			The Guardian - Back to home
		</span>
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
		{/* The following hosted by is included in the link for logo in frontend */}
		<p css={hostedByStyles}>Hosted by</p>
		<div css={logoStyles}>
			<Logo />
		</div>
	</div>
);

export const HostedContentHeader = ({ accentColor, branding }: Props) => {
	return (
		<HeaderWrapper>
			<Left>
				<HeaderSection isFirst={true}>
					<TitleAndBadge
						accentColor={accentColor}
						branding={branding}
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
