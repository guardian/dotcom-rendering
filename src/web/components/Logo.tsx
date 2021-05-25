import { css } from '@emotion/react';

import { brandText } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import TheGuardianLogoSVG from '@frontend/static/logos/the-guardian.svg';
import GuardianAnniversaryLogoSVG from '@frontend/static/logos/guardian-anniversary-logo.svg';

import { getZIndex } from '@frontend/web/lib/getZIndex';

const link = (isAnniversary?: boolean) => css`
	float: right;
	margin-top: 10px;
	margin-right: 54px;
	margin-bottom: 21px;

	${until.mobileMedium} {
		margin-top: ${isAnniversary ? '25px' : ''};
	}

	${from.mobileMedium} {
		margin-right: 10px;
		margin-top: ${isAnniversary ? '14px' : ''};
	}
	${from.mobileLandscape} {
		margin-right: 20px;
	}
	${from.desktop} {
		margin-top: ${isAnniversary ? '10px' : '5px'};
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
	width: 135px;
	${from.mobileMedium} {
		height: ${isAnniversary ? 'auto' : '56px'};
		width: 175px;
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

const SVG = ({ isAnniversary }: { isAnniversary?: boolean }) =>
	isAnniversary ? (
		<GuardianAnniversaryLogoSVG css={style(isAnniversary)} />
	) : (
		<TheGuardianLogoSVG css={style(isAnniversary)} />
	);

export const Logo: React.FC<{
	isAnniversary?: boolean;
}> = ({ isAnniversary }) => (
	<a css={link(isAnniversary)} href="/" data-link-name="nav2 : logo">
		<span
			css={css`
				${visuallyHidden};
			`}
		>
			The Guardian - Back to home
		</span>
		<SVG isAnniversary={isAnniversary} />
	</a>
);
