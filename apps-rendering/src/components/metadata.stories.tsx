// ----- Imports ----- //

import { css } from '@emotion/react';
import { live } from 'fixtures/live';
import type { FC } from 'react';
import Metadata from './metadata';

// ----- Stories ----- //

const containerStyles = css`
	background: rgb(139, 0, 0);
`;

const Default: FC = () => (
	<div css={containerStyles}>
		<Metadata item={{ ...live }} />
	</div>
);

// ----- Exports ----- //

export default {
	component: Metadata,
	title: 'AR/Metadata',
};

export { Default };
