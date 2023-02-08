// ----- Imports ----- //

import type { Option } from '@guardian/types';
import { withDefault } from '@guardian/types';
import type { FC } from 'react';

// ----- Functions ----- //

const instagramUrl = (id: string): string =>
	`https://www.instagram.com/p/${id}/embed`;

// ----- Component ----- //

interface Props {
	id: string;
	caption: Option<string>;
}

const Instagram: FC<Props> = ({ id, caption }) => (
	<iframe
		src={instagramUrl(id)}
		height="830"
		title={withDefault('Instagram embed')(caption)}
	/>
);

// ----- Exports ----- //

export default Instagram;
