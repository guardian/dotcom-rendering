import React from 'react';

import { unescapeData } from '@root/src/lib/escapeData';
import { css } from 'emotion';

type Props = {
	html: string;
	alt?: string;
};

const embedContainer = css`
	iframe {
		/* Some embeds can hijack the iframe and calculate an incorrect width, which pushes the body out */
		width: 100% !important;
	}
`;

export const EmbedBlockComponent = ({ html, alt }: Props) => {
	return (
		<div data-cy="embed-block" className={embedContainer}>
			<div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />
		</div>
	);
};
