import { css } from '@emotion/react';
import {
	brandAlt,
	from,
	neutral,
	space,
	visuallyHidden,
} from '@guardian/source-foundations';
import {
	SvgGuardianBestWebsiteLogo,
	SvgGuardianLogo,
} from '@guardian/source-react-components';
import type { EditionId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';

const linkStyles = css`
	float: right;
	margin-top: 6px;
	margin-right: 54px;
	margin-bottom: 10px;
	width: 146px;

	${from.mobileMedium} {
		margin-right: 10px;
		width: 195px;
	}
	${from.mobileLandscape} {
		margin-right: 20px;
	}
	${from.tablet} {
		width: 224px;
	}
	${from.desktop} {
		margin-top: 5px;
		margin-bottom: ${space[3]}px;
		position: relative;
		width: 295px;
	}
	${from.wide} {
		margin-right: 96px;
	}

	${getZIndex('TheGuardian')}
`;

type Props = {
	editionId: EditionId;
};

export const Logo = ({ editionId }: Props) => {
	switch (editionId) {
		case 'UK':
			return (
				<a css={linkStyles} href="/" data-link-name="nav3 : logo">
					<span
						css={css`
							${visuallyHidden};
						`}
					>
						The Guardian - Back to home
					</span>
					<SvgGuardianBestWebsiteLogo
						textColor={neutral[100]}
						textAccentColor={brandAlt[400]}
					/>
				</a>
			);

		default:
			return (
				<a css={linkStyles} href="/" data-link-name="nav3 : logo">
					<span
						css={css`
							${visuallyHidden};
						`}
					>
						The Guardian - Back to home
					</span>
					<SvgGuardianLogo textColor={neutral[100]} />
				</a>
			);
	}
};
