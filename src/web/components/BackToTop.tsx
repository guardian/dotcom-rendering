import React from 'react';
import { css, cx } from 'emotion';
import {
	brandBackground,
	brandText,
	brandAlt,
} from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

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
		color: ${brandAlt[400]};

		.icon-container {
			background-color: ${brandAlt[400]};
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

export const BackToTop: React.FC = () => (
	<a className={link} href="#top">
		<span className={textStyles}>Back to top</span>
		<span className={cx('icon-container', iconContainer)}>
			<i className={icon} />
		</span>
	</a>
);
