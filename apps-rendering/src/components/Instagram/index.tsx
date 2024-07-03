// ----- Imports ----- //

import type { Option } from '../../../vendor/@guardian/types/index';
import { withDefault } from '../../../vendor/@guardian/types/index';

// ----- Functions ----- //

const instagramUrl = (id: string): string =>
	`https://www.instagram.com/p/${id}/embed`;

// ----- Component ----- //

interface Props {
	id: string;
	caption: Option<string>;
}

const Instagram = ({ id, caption }: Props) => (
	<iframe
		src={instagramUrl(id)}
		height="830"
		title={withDefault('Instagram embed')(caption)}
	/>
);

// ----- Exports ----- //

export default Instagram;
