import { css } from '@emotion/react';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import { withDefault } from '../../../vendor/@guardian/types/index';
import type { EmailSignup } from 'embed';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	embed: EmailSignup;
}

const styles = css`
	margin: ${remSpace[4]} 0;

	iframe {
		min-height: 60px;
	}

	${darkModeCss`
        background: white;
        padding: ${remSpace[3]};
    `}
`;

const captionStyles = css`
	${textSans.xsmall()}
	color: ${neutral[46]};
	padding-bottom: ${remSpace[1]};
`;

const EmailSignupEmbed: FC<Props> = ({ embed }) => (
	<figure css={styles}>
		{maybeRender(embed.caption, (caption) => (
			<figcaption css={captionStyles}>{caption}</figcaption>
		))}
		<iframe
			src={embed.src}
			className="js-email-signup"
			height="60"
			title={withDefault('Email newsletter signup embed')(embed.alt)}
		></iframe>
	</figure>
);

export default EmailSignupEmbed;
