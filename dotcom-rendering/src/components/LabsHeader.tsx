import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Link,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import LabsLogo from '../static/logos/the-guardian-labs.svg';
import { Details } from './Details';

const FlexWrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			position: relative;
			height: ${LABS_HEADER_HEIGHT}px;
			display: flex;
			justify-content: space-between;
		`}
	>
		{children}
	</div>
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
			border-right: 1px solid ${palette.neutral[60]};
			height: 100%;
			display: flex;
			align-items: center;

			${isFirst ? null : 'padding-left: 10px;'}
			padding-right: 10px;
			${from.mobileLandscape} {
				${isFirst ? null : 'padding-left: 20px;'}
				padding-right: 20px;
			}
		`}
	>
		{children}
	</div>
);

const Title = () => (
	<div
		css={css`
			${textSans.small({ fontWeight: 'bold' })};
			margin-bottom: 4px;
		`}
	>
		Paid content
	</div>
);

const About = () => (
	<div
		css={css`
			${textSans.small()};
			background-color: ${palette.labs[400]};
			border-top: 1px solid ${palette.neutral[60]};

			width: 100vw;
			${from.desktop} {
				width: 235px;
			}

			margin-left: -10px;
			${from.mobileLandscape} {
				margin-left: -20px;
			}
			padding: ${space[2]}px 10px;
			${from.mobileLandscape} {
				padding: ${space[3]}px 20px;
			}

			> a {
				color: black;
			}
		`}
	>
		<p>
			Paid content is paid for and controlled by an advertiser and
			produced by the Guardian Labs team.
		</p>
		<br />
		<LinkButton
			iconSide="right"
			size="xsmall"
			priority="subdued"
			icon={<SvgArrowRightStraight />}
			href="https://www.theguardian.com/info/2016/jan/25/content-funding"
		>
			Learn more
		</LinkButton>
	</div>
);

const Logo = () => (
	<Link href="https://www.theguardian.com/guardian-labs">
		<LabsLogo />
	</Link>
);

export const LabsHeader = () => (
	<FlexWrapper>
		<Left>
			<HeaderSection isFirst={true}>
				<Title />
			</HeaderSection>
			<HeaderSection>
				<Details
					label="About"
					labelSize="small"
					positionStyles={css`
						top: 40px;
						left: -75px;

						${from.mobile} {
							left: -108px;
						}

						${from.mobileLandscape} {
							left: -128px;
						}
					`}
				>
					<About />
				</Details>
			</HeaderSection>
		</Left>
		<Right>
			<Logo />
		</Right>
	</FlexWrapper>
);
