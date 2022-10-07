// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { NewsletterBadge } from '@guardian/common-rendering/src/components/NewsletterBadge';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace } from '@guardian/source-foundations';
import { SvgGuardianLogo } from '@guardian/source-react-components';
import type { FC } from 'react';

// ----- Styles ----- //
const outerFrame = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.newsletterSignUpBanner(format)};
	padding: ${remSpace[2]} 0 ${remSpace[9]};
`;

const figureStyle: SerializedStyles = css`
	display: block;
	width: 11rem;
	position: relative;
`;

const logoWrapper: SerializedStyles = css`
	display: flex;
	width: 65%;
	margin-bottom: ${remSpace[1]};
`;

const badgeWrapper: SerializedStyles = css`
	font-size: 1rem;
	display: flex;
	width: 100%;
`;

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	innerCss: SerializedStyles;
}

const NewsletterSignUpPageBanner: FC<Props> = ({ format, innerCss }: Props) => (
	<div css={outerFrame(format)}>
		<div css={innerCss}>
			<figure
				css={figureStyle}
				role="figure"
				aria-label="The Guardian Newsletters"
			>
				<span css={logoWrapper}>
					<SvgGuardianLogo textColor={neutral[100]} width={200} />
				</span>
				<span css={badgeWrapper}>
					<NewsletterBadge />
				</span>
			</figure>
		</div>
	</div>
);

// ----- Exports ----- //

export default NewsletterSignUpPageBanner;
