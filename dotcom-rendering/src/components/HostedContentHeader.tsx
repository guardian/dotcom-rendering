import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSans15,
	textSansBold14,
} from '@guardian/source/foundations';
import { Left, Right } from './LabsHeader';

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
				align-self: flex-end;
				padding: 5px 6px 4px;
				letter-spacing: 0.03125rem;
				line-height: 0.9375; /* We shouldn't override this but need to confirm if it's ok for the design to look slighly different */
				background-color: ${accentColor};
			`}
		>
			Advertiser content
		</p>
		{/* The following div is a placeholder for the badge */}
		<div
			css={css`
				position: absolute;
				bottom: -50px;
				left: 20px;
				height: 46px;
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
			align-self: end;
			width: 100vw;
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
				<div>logo</div>
			</Right>
		</HeaderWrapper>
	);
};
