import { css } from '@emotion/react';
import {
	brandAlt,
	brandText,
	from,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgGuardianBestWebsiteLogo } from '@guardian/source-react-components';
import { getZIndex } from '../lib/getZIndex';

const linkStyles = css`
	float: right;
	margin-top: 10px;
	margin-right: 54px;
	margin-bottom: 21px;
	width: 146px;

	${from.mobileMedium} {
		margin-right: 10px;
		width: 195px;
	}
	${from.mobileLandscape} {
		margin-right: 20px;
	}
	${from.tablet} {
		margin-top: 8px;
		width: 224px;
	}
	${from.desktop} {
		margin-top: 5px;
		margin-bottom: 15px;
		position: relative;
		width: 295px;
	}
	${from.wide} {
		margin-right: 96px;
	}

	${getZIndex('TheGuardian')}
`;

export const Logo: React.FC = () => {
	return (
		<a css={linkStyles} href="/" data-link-name="nav2 : logo">
			<span
				css={css`
					${visuallyHidden};
				`}
			>
				The Guardian - Back to home
			</span>
			<SvgGuardianBestWebsiteLogo
				textColor={brandText.primary}
				textAccentColor={brandAlt[400]}
			/>
		</a>
	);
};
