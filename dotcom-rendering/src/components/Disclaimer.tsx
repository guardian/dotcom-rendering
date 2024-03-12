import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';

const disclaimerStyles = css`
	${textSans.medium({ lineHeight: 'regular' })};
	max-width: 540px;

	sup {
		font-size: 85%;
	}

	margin-bottom: 16px;
`;

const disclaimerHTML =
	'\n\n\n\n\n\n\n    <p><sup>\n        The Guardian’s product and service reviews are independent and are\n        in no way influenced by any advertiser or commercial initiative. We\n        will earn a commission from the retailer if you buy something\n        through an affiliate link.\n        <a\n            href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links"\n            data-link-name="in body link"\n            class="u-underline"\n            >Learn more</a\n        >.\n    </sup></p>\n\n';

const Disclaimer = () => (
	<aside
		css={disclaimerStyles}
		data-testid="affiliate-disclaimer"
		dangerouslySetInnerHTML={{
			__html: disclaimerHTML,
		}}
	/>
);

export { Disclaimer };
