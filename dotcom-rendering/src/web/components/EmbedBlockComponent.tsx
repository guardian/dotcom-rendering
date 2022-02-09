import { css } from '@emotion/react';
import { textSans, text } from '@guardian/source-foundations';
import { unescapeData } from '../../lib/escapeData';

type Props = {
	html: string;
	caption?: string;
};

const emailCaptionStyle = css`
	${textSans.xxsmall()};
	word-break: break-all;
	color: ${text.supporting};
`;

const embedContainer = css`
	iframe {
		/* Some embeds can hijack the iframe and calculate an incorrect width, which pushes the body out */
		/* stylelint-disable-next-line declaration-no-important */
		width: 100% !important;
	}
`;

export const EmbedBlockComponent = ({ html, caption }: Props) => {
	// TODO: Email embeds are being turned into atoms, so we can remove this hack when that happens
	const isEmailEmbed = html.includes('email/form');
	return (
		<div data-cy="embed-block" css={embedContainer}>
			<div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />
			{isEmailEmbed && caption && (
				<div css={emailCaptionStyle}>{caption}</div>
			)}
		</div>
	);
};
