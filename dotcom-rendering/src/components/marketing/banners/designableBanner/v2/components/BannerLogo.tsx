import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type { BannerData } from '../BannerProps';

const styles = {
	guardianLogoContainer: css`
		grid-area: logo;

		${until.leftCol} {
			display: none;
		}
		${from.leftCol} {
			justify-self: end;
			width: 128px;
			height: 41px;
			justify-content: end;
			margin-top: ${space[5]}px;
		}
	`,
};

export const BannerLogo = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	if (!bannerData.design) {
		return null;
	}

	return (
		<div css={styles.guardianLogoContainer}>
			<SvgGuardianLogo
				textColor={hexColourToString(
					bannerData.design.colours.basic.logo,
				)}
			/>
		</div>
	);
};
