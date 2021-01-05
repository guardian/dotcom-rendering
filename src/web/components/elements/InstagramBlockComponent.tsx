import React from 'react';

import { unescapeData } from '@root/src/lib/escapeData';
import { css } from 'emotion';

const widthOverride = css`
	iframe {
		/* The instagram embed js hijacks the iframe and calculated an incorrect width, which pushed the body out */
		min-width: 300px !important;
	}
`;

export const InstagramBlockComponent: React.FC<{
	element: InstagramBlockElement;
}> = ({ element }) => {
	return (
		<div className={widthOverride}>
			<div
				data-cy="instagram-embed"
				dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
			/>
		</div>
	);
};
