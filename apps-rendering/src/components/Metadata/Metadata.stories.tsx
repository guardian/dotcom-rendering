// ----- Imports ----- //

import { css } from '@emotion/react';
import { from, neutral } from '@guardian/source-foundations';
import {
	article,
	articleNoComments,
	articleNoJobTitle,
	comment,
	gallery,
	standardImmersive,
} from 'fixtures/item';
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

const GalleryMetadata: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...gallery }} />
	</div>
);

const ImmersiveMetadata: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...standardImmersive }} />
	</div>
);

const ShortMetadata: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...comment }} />
	</div>
);

const ExtendedMetadata: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...article }} />
	</div>
);

const ExtendedMetadataNoJobTitle: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...articleNoJobTitle }} />
	</div>
);

const ExtendedMetadataNoComments: FC = () => (
	<div css={deadContainerStyles}>
		<Metadata item={{ ...articleNoComments }} />
	</div>
);

// ----- Exports ----- //

export default {
	component: Metadata,
	title: 'AR/Metadata',
};

export {
	DeadBlogMetadata,
	ExtendedMetadata,
	ExtendedMetadataNoComments,
	ExtendedMetadataNoJobTitle,
	GalleryMetadata,
	ImmersiveMetadata,
	LiveblogMetadata,
	ShortMetadata,
};
