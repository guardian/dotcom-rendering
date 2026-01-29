import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans12,
	textSans15,
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
	margin: 0;
	padding: 0;
	height: ${HOSTED_CONTENT_HEIGHT_MOBILE}rem;
	background-color: ${sourcePalette.neutral[7]};
	color: ${sourcePalette.neutral[100]};

	${from.tablet} {
		height: ${HOSTED_CONTENT_HEIGHT_DESKTOP}rem;
	}
`;

const hostedByStyles = css`
	${textSans12};
	margin-right: -9px;
	font-weight: 600;
	letter-spacing: 0.03125rem;
	color: rgba(255, 255, 255, 0.5);
`;

const logoStyles = css`
	position: relative;
	display: flex;
	align-self: end;
	margin-right: 0.625rem;
	margin-bottom: 1px;

	svg {
		width: 94px;
		height: auto;
	}
`;

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
		`}
	>
		{children}
	</div>
);

const TitleAndBadge = ({ accentColor, branding }: Props) => (
	<div
		css={css`
			width: 80px;
			align-self: flex-end;

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
				background-color: ${accentColor};
			`}
		>
			Advertiser content
		</p>
		{/* The following div is a placeholder for the badge */}
		<div
			css={css`
				position: absolute;
				display: block;
				width: 80px;
				height: 45px; /* This is temporary, replace with actual badge height */
				top: 100%;
				background-color: ${sourcePalette.neutral[100]};
				z-index: 10;
			`}
		>
			{branding}
		</div>
	</div>
);

const About = () => (
	<div
		css={css`
			${textSans15};
			background-color: ${sourcePalette.neutral[7]};
			color: ${sourcePalette.neutral[100]};
			margin-top: 1.25rem;
			padding: 0;

			${from.desktop} {
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
		`}
	>
		{children}
	</div>
);

{
	/* The following was copied from Logo.tsx because of the logo textColor doesn't work with palette --masthead-nav-link-text */
}
const Logo = () => (
	<a
		href="/"
		data-link-name={nestedOphanComponents('header', 'logo')}
		css={css`
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
