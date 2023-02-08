// ----- Imports ----- //

import { css } from '@emotion/react';
import { from, neutral } from '@guardian/source-foundations';
import { comment } from 'fixtures/item';
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
		<Metadata item={{ ...live }} />
	</div>
);

const DeadBlogMetadata: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...deadBlog }} />
	</div>
);

const ShortMetadata: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...comment }} />
	</div>
);

// ----- Exports ----- //

export default {
	component: Metadata,
	title: 'AR/Metadata',
};

export { LiveblogMetadata, DeadBlogMetadata, ShortMetadata };
