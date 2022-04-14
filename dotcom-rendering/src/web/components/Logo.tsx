import { css } from '@emotion/react';

import {
	brandText,
	from,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';

import TheGuardianLogoSVG from '../../static/logos/the-guardian.svg';

import { getZIndex } from '../lib/getZIndex';

const link = () => css`
	float: right;
	margin-top: 10px;
	margin-right: 54px;
	margin-bottom: 21px;

	${from.mobileMedium} {
		margin-right: 10px;
	}
	${from.mobileLandscape} {
		margin-right: 20px;
	}
	${from.tablet} {
		margin-top: 8px;
	}
	${from.desktop} {
		margin-top: 5px;
		margin-bottom: 15px;
		position: relative;
	}
	${from.wide} {
		margin-right: 96px;
	}

	${getZIndex('TheGuardian')}
`;

const style = () => css`
	height: 44px;
	width: 146px;
	${from.mobileMedium} {
		height: 56px;
		width: 195px;
	}
	${from.tablet} {
		height: 72px;
		width: 224px;
	}
	${from.desktop} {
		height: 95px;
		width: 295px;
	}

	path {
		fill: brandText.primary;
	}
`;

export const Logo: React.FC = () => {
	return (
		<a css={link} href="/" data-link-name="nav2 : logo">
			<span
				css={css`
					${visuallyHidden};
				`}
			>
				The Guardian - Back to home
			</span>
			<TheGuardianLogoSVG css={style} />
		</a>
	);
};
