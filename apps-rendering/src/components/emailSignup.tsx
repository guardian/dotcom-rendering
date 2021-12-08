import { css } from '@emotion/react';
import {
	background,
	remSpace,
	text,
	textSans,
} from '@guardian/source-foundations';
import type { EmailSignup } from 'embed';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	embed: EmailSignup;
}

const styles = css`
	margin: ${remSpace[4]} 0;

	${darkModeCss`
        background: ${background.inverse};
        padding: ${remSpace[3]};
    `}
`;

const captionStyles = css`
	${textSans.xsmall()}
	color: ${text.supporting};
`;

const EmailSignupEmbed: FC<Props> = ({ embed }) => (
	<figure css={styles}>
		<div
			className="js-email-signup"
			dangerouslySetInnerHTML={{ __html: embed.html }}
		></div>
		{maybeRender(embed.alt, (alt) => (
			<figcaption css={captionStyles}>{alt}</figcaption>
		))}
	</figure>
);

export default EmailSignupEmbed;
