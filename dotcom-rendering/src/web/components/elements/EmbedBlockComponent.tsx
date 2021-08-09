import { unescapeData } from '@root/src/lib/escapeData';
import { css } from '@emotion/react';
import { textSans } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';

type Props = {
	html: string;
	alt?: string;
};

const emailCaptionStyle = css`
	${textSans.xxsmall()};
	word-break: break-all;
	color: ${text.supporting};
`;

const embedContainer = css`
	iframe {
		/* Some embeds can hijack the iframe and calculate an incorrect width, which pushes the body out */
		width: 100% !important;
	}
`;

export const EmbedBlockComponent = ({ html, alt }: Props) => {
	// TODO: Email embeds are being turned into atoms, so we can remove this hack when that happens
	const isEmailEmbed = html.includes('email/form');
	return (
		<div data-cy="embed-block" css={embedContainer}>
			<div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />
			{isEmailEmbed && alt && <div css={emailCaptionStyle}>{alt}</div>}
		</div>
	);
};
