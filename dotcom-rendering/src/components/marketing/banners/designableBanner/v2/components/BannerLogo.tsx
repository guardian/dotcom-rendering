import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { hexColourToString } from '@guardian/support-dotcom-components';
import { useBanner } from '../useBanner';

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

export const BannerLogo = (): JSX.Element | null => {
	const { design } = useBanner();

	if (!design) {
		return null;
	}

	return (
		<div css={styles.guardianLogoContainer}>
			<SvgGuardianLogo
				textColor={hexColourToString(design.colours.basic.logo)}
			/>
		</div>
	);
};
