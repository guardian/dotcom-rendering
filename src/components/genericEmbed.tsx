// ----- Imports ----- //

import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { withDefault } from '@guardian/types';
import type { EmailSignup, Generic, TikTok } from 'embed';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = css`
	margin: ${remSpace[4]} 0;

	${darkModeCss`
        background: white;
        padding: ${remSpace[3]};
    `}
`;

const captionStyles = css`
	${textSans.xsmall()}
	color: ${text.supporting};
`;

interface Props {
	embed: Generic | EmailSignup | TikTok;
}

const GenericEmbed: FC<Props> = ({ embed }) => (
	<figure css={styles}>
		<iframe
			srcDoc={embed.html}
			title={withDefault('Embed')(embed.alt)}
			// Prevents scrollbars: covers body margin and random extra 6px
			height={embed.height + 22}
		/>
		{maybeRender(embed.alt, (alt) => (
			<figcaption css={captionStyles}>{alt}</figcaption>
		))}
	</figure>
);

// ----- Exports ----- //

export default GenericEmbed;
