import { css } from '@emotion/react';
import { from, until, brand, brandAlt } from '@guardian/source-foundations';

import Logo from '../../static/logos/guardian-newsletters-logo.svg';

const bannerStyle = css`
	background-color: ${brand[400]};
	color: ${brandAlt[400]};
	padding: 10px 0;
	font-weight: bold;
`;

const wrapperStyle = css`
	padding-left: 16px;
	display: flex;
	justify-content: flex-end;
	align-items: center;

	${from.wide} {
		width: 250px;
	}

	${until.wide} {
		width: 170px;
	}

	${until.desktop} {
		justify-content: flex-start;
		width: 100%;
	}
`;

export const NewsLetterSignupBanner = () => (
	<div css={bannerStyle}>
		<div css={wrapperStyle}>
			<Logo />
		</div>
	</div>
);
