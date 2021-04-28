// ----- Imports ----- //

import { css } from '@emotion/react';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { map, none, some, withDefault } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';

// ----- Component ----- //

interface Props {
	item: Item;
}

const imgStyles = css`
	background: none;
	width: 125px;
`;

const sizes: Sizes = {
	mediaQueries: [],
	default: '105px',
};

const Avatar: FC<Props> = ({ item }) => {
	const [contributor] = item.contributors;
	const format = getFormat(item);

	if (!contributor) {
		return null;
	}

	return pipe2(
		contributor.image,
		map((image) => (
			<Img
				image={image}
				sizes={sizes}
				className={some(imgStyles)}
				format={format}
				supportsDarkMode={false}
				lightbox={none}
			/>
		)),
		withDefault<ReactElement | null>(null),
	);
};

// ----- Exports ----- //

export default Avatar;
