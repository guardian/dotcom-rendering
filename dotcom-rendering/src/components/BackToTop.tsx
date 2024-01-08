import { css } from '@emotion/react';
import {
	brandBackground,
	brandText,
	palette,
	textSans,
} from '@guardian/source-foundations';

const iconHeight = '42px';

const iconContainer = css`
	position: relative;
	float: right;
	border-radius: 100%;
	background-color: ${brandBackground.ctaPrimary};
	cursor: pointer;
	height: ${iconHeight};
	min-width: ${iconHeight};
`;

const link = css`
	text-decoration: none;
	color: ${brandText.anchorPrimary};
	font-weight: bold;
	line-height: ${iconHeight};

	:hover {
		color: ${palette.brandAlt[400]};

		.icon-container {
			background-color: ${palette.brandAlt[400]};
		}
	}
`;

const icon = css`
	:before {
		position: absolute;
		top: 6px;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		border: 2px solid ${brandText.ctaPrimary};
		border-bottom: 0;
		border-right: 0;
		content: '';
		height: 12px;
		width: 12px;
		transform: rotate(45deg);
	}
`;

const textStyles = css`
	${textSans.small({ fontWeight: 'bold' })};
	padding-right: 5px;
`;

export const BackToTop = () => (
	<a css={link} href="#top" data-link-name="back to top">
		<span css={textStyles}>Back to top</span>
		<span css={iconContainer} className="icon-container">
			<i css={icon} />
		</span>
	</a>
);
