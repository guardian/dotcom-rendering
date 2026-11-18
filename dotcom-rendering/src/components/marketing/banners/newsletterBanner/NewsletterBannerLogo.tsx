import { css } from '@emotion/react';
import { from, neutral, until } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';

const styles = css`
	grid-area: logo;

	${until.leftCol} {
		display: none;
	}

	${from.leftCol} {
		justify-self: end;
		width: 128px;
		height: 41px;
		justify-content: end;
		margin-top: 28px;
	}
`;

export const NewsletterBannerLogo = () => (
	<div css={styles}>
		<SvgGuardianLogo textColor={neutral[0]} />
	</div>
);
