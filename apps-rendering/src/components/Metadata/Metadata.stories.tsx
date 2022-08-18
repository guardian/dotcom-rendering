// ----- Imports ----- //

import { css } from '@emotion/react';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { from, neutral } from '@guardian/source-foundations';
import { deadBlog, live } from 'fixtures/live';
import type { FC } from 'react';
import Metadata from './';

// ----- Stories ----- //

const liveContainerStyles = css`
	background: rgb(139, 0, 0);

	${from.desktop} {
		background-color: ${neutral[97]};
	}
`;

const deadContainerStyles = css`
	background: ${neutral[93]};

	${from.desktop} {
		background-color: ${neutral[97]};
	}
`;

const LiveblogMetadata: FC = () => (
	<div css={liveContainerStyles}>
		<Metadata item={{ ...live }} edition={Edition.UK} />
	</div>
);

const DeadBlogMetadata: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...deadBlog }} edition={Edition.UK} />
	</div>
);

// ----- Exports ----- //

export default {
	component: Metadata,
	title: 'AR/Metadata',
};

export { LiveblogMetadata, DeadBlogMetadata };
