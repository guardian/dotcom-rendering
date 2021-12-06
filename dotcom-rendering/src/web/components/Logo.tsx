import { css } from '@emotion/react';

import {
	brandText,
	from,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';

import TheGuardianLogoSVG from '@frontend/static/logos/the-guardian.svg';
import GuardianAnniversaryLogoSVG from '@frontend/static/logos/guardian-anniversary-logo.svg';
import GuardianAnniversaryLogoUKSVG from '@frontend/static/logos/guardian-anniversary-logo-uk.svg';

import { getZIndex } from '@frontend/web/lib/getZIndex';

const link = (isAnniversary?: boolean) => css`
	float: right;
	margin-top: 10px;
	margin-right: 54px;
	margin-bottom: 21px;

	${until.mobileMedium} {
		margin-top: ${isAnniversary ? '20px' : ''};
	}

	${from.mobileMedium} {
		margin-right: 10px;
		margin-top: ${isAnniversary ? '14px' : ''};
	}
	${from.mobileLandscape} {
		margin-right: 20px;
	}
	${from.tablet} {
		margin-top: 8px;
	}
	${from.desktop} {
		margin-top: ${isAnniversary ? '8px' : '5px'};
		margin-bottom: 15px;
		position: relative;
	}
	${from.wide} {
		margin-right: 96px;
	}

	${getZIndex('TheGuardian')}
`;

const style = (isAnniversary?: boolean) => css`
	height: ${isAnniversary ? 'auto' : '44px'};
	width: 146px;
	${from.mobileMedium} {
		height: ${isAnniversary ? 'auto' : '56px'};
		width: 195px;
	}
	${from.tablet} {
		height: ${isAnniversary ? 'auto' : '72px'};
		width: 224px;
	}
	${from.desktop} {
		height: ${isAnniversary ? 'auto' : '95px'};
		width: 295px;
	}

	path {
		fill: ${isAnniversary ? '' : brandText.primary};
	}
`;

export const Logo: React.FC<{
	isAnniversary?: boolean;
	edition: Edition;
}> = ({ isAnniversary, edition }) => {
	let svg;
	if (isAnniversary && edition === 'UK') {
		svg = <GuardianAnniversaryLogoUKSVG css={style(isAnniversary)} />;
	} else if (isAnniversary) {
		svg = <GuardianAnniversaryLogoSVG css={style(isAnniversary)} />;
	} else svg = <TheGuardianLogoSVG css={style(isAnniversary)} />;

	return (
		<a css={link(isAnniversary)} href="/" data-link-name="nav2 : logo">
			<span
				css={css`
					${visuallyHidden};
				`}
			>
				The Guardian - Back to home
			</span>
			{svg}
		</a>
	);
};
