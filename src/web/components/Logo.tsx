import React from 'react';
import { css } from 'emotion';

import { brandText } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import TheGuardianLogoSVG from '@frontend/static/logos/the-guardian.svg';
import GuardianAnniversaryLogoSVG from '@frontend/static/logos/guardian-anniversary-logo.svg';

import { getZIndex } from '@frontend/web/lib/getZIndex';

const link = css`
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

const style = (isAnniversary?: boolean) => css`
	height: 44px;
	width: 135px;
	${from.mobileMedium} {
		height: 56px;
		width: 175px;
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
		fill: ${isAnniversary ? '' : brandText.primary};
	}
`;

const SVG = ({ isAnniversary }: { isAnniversary?: boolean }) =>
	isAnniversary ? (
		<GuardianAnniversaryLogoSVG className={style(isAnniversary)} />
	) : (
		<TheGuardianLogoSVG className={style(isAnniversary)} />
	);

export const Logo: React.FC<{
	isAnniversary?: boolean;
}> = ({ isAnniversary }) => (
	<a className={link} href="/" data-link-name="nav2 : logo">
		<span
			className={css`
				${visuallyHidden};
			`}
		>
			The Guardian - Back to home
		</span>
		<SVG isAnniversary={isAnniversary} />
	</a>
);
