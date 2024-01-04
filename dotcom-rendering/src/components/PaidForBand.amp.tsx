import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import { from, palette, textSans } from '@guardian/source-foundations';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import ArrowRightIcon from '../static/icons/arrow-right.svg';
import LabsLogo from '../static/logos/the-guardian-labs.svg';

const headerStyle = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 -10px;
	padding: 0 10px;
	height: 58px;
	background-color: ${pillarPalette_DO_NOT_USE[ArticleSpecial.Labs].bright};

	${from.mobileLandscape} {
		padding: 0 20px;
	}
`;

const focusColor = css`
	outline-color: ${palette.brandAlt[400]};
`;

const metaStyle = css`
	height: 100%;
	${textSans.small()};
	font-weight: 700;
`;

const aboutStyle = css`
	display: inline-flex;
	height: 100%;
`;

const aboutButtonStyle = css`
	display: block;
	width: 100%;
	font: inherit;
	font-weight: 400;
	margin-left: 10px;
	padding: 10px;
	border: 0;
	border-left: solid 1px
		${pillarPalette_DO_NOT_USE[ArticleSpecial.Labs].faded};
	border-right: solid 1px
		${pillarPalette_DO_NOT_USE[ArticleSpecial.Labs].faded};
	background: transparent;
	color: inherit;
	cursor: pointer;
`;

const aboutButtonIcon = css`
	:after {
		content: ' ';
		display: inline-block;
		width: 5px;
		height: 5px;
		transform: translateY(-2px) rotate(45deg);
		border: 1px solid currentColor;
		border-left: transparent;
		border-top: transparent;
		margin-left: 6px;
		vertical-align: middle;
	}
`;

const popUpStyle = css`
	position: absolute;
	transform: translate(-15%, 30%);
	width: 266px;
	padding: 16px;
	background-color: ${palette.neutral[7]};
	color: ${palette.neutral[100]};
	font-weight: normal;
	border-radius: 4px;
	z-index: 100;
`;

const logoStyle = css`
	margin: 5px 0;
`;

const aStyle = css`
	display: inline-block;
	color: ${pillarPalette_DO_NOT_USE[ArticleSpecial.Labs].bright};
	text-decoration: none;
	margin-top: 10px;
	&:hover {
		text-decoration: underline;
	}
`;

const iconStyle = css`
	fill: ${pillarPalette_DO_NOT_USE[ArticleSpecial.Labs].bright};
	margin: 0 0;
	padding-right: 3px;
	vertical-align: middle;
	width: 20px;
	height: 20px;
`;

export const PaidForBand = () => (
	<header css={headerStyle}>
		<div css={metaStyle}>
			<span>Paid content</span>
			<div css={aboutStyle}>
				<button
					css={[aboutButtonStyle, aboutButtonIcon, focusColor]}
					on="tap:popup.toggleVisibility"
				>
					About
				</button>
				<div id="popup" css={popUpStyle} hidden={true}>
					<div>
						Paid content is paid for and controlled by an advertiser
						and produced by the Guardian Labs team.
					</div>
					<a
						css={[aStyle, focusColor]}
						href="https://www.theguardian.com/content-funding"
					>
						Learn more about Guardian Labs content{' '}
						<ArrowRightIcon css={iconStyle} role="presentation" />
					</a>
				</div>
			</div>
		</div>
		<LabsLogo css={logoStyle} />
	</header>
);
