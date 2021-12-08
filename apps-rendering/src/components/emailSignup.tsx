import type { EmailSignup } from 'embed'
import type { FC } from 'react'
import { darkModeCss } from 'styles';
import { css } from '@emotion/react';
import { remSpace, text, textSans, background } from '@guardian/source-foundations';
import { maybeRender } from 'lib';

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

const EmailSignupEmbed: FC<Props> = ({embed}) => (
	<figure css={styles}>
		<div className='js-email-signup' dangerouslySetInnerHTML={{__html: embed.html}}></div>
		{maybeRender(embed.alt, (alt) => (
			<figcaption css={captionStyles}>{alt}</figcaption>
		))}
	</figure>
);

export default EmailSignupEmbed
