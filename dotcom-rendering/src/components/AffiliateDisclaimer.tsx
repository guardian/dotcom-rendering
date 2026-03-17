import { css } from '@emotion/react';
import { palette, textSans14 } from '@guardian/source/foundations';
import { palette as themePalette } from '../palette';

const disclaimerStyles = css`
	${textSans14};
	text-align: center;
	background-color: ${themePalette('--affiliate-disclaimer-background')};
	padding: 4px 10px 10px 10px;
	color: ${themePalette('--affiliate-disclaimer-text')};
	a {
		color: ${themePalette('--affiliate-disclaimer-text')};
		text-decoration: none;
		border-bottom: 1px solid ${palette.neutral[46]};
	}
`;

const AffiliateDisclaimer = () => (
	<aside
		css={[disclaimerStyles]}
		data-testid={'affiliate-disclaimer'}
		data-component={'affiliate-disclaimer'}
	>
		<p>
			The Guardian’s journalism is independent. We will earn a commission
			if you buy something through an affiliate link.&nbsp;
			<a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">
				Learn more
			</a>
			.
		</p>
	</aside>
);

export { AffiliateDisclaimer };
