// ----- Imports ----- //

import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { live } from 'fixtures/live';
import type { FC } from 'react';
import Metadata from './metadata';

// ----- Stories ----- //

const containerStyles = css`
	background: rgb(139, 0, 0);

	${from.desktop} {
		background-color: ${neutral[97]};
	}
`;

const LiveblogMetadata: FC = () => (
	<div css={containerStyles}>
		<Metadata item={{ ...live }} />
	</div>
);

// ----- Exports ----- //

export default {
	component: Metadata,
	title: 'AR/Metadata',
};

export { LiveblogMetadata };
