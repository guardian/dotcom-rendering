import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';

const disclaimerContainer = css`
	float: left;
	width: 140px;
	padding: 4px;
	padding-bottom: 18px;
	margin: 4px 10px 12px 0;
	background-color: ${palette.neutral[93]};
	border-top: 1px solid ${palette.neutral[86]};
	margin-right: 20px;
`;

const disclaimer = css`
	margin-bottom: ${space[1]}px;
	float: left;
	clear: left;
	width: 8.75rem;
	margin-right: 20px;
	padding-top: 2px;
	padding-right: 5px;
	padding-left: 5px;
	padding-bottom: 5px;
`;

export const Disclaimer = () => (
	<aside css={disclaimerContainer}>
		<p css={disclaimer}>
			<sup>
				The Guardian’s product and service reviews are independent and
				are in no way influenced by any advertiser or commercial
				initiative. We will earn a commission from the retailer if you
				buy something through an affiliate link.&nbsp;
				<a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">
					Learn more.
				</a>
			</sup>
		</p>
	</aside>
);
