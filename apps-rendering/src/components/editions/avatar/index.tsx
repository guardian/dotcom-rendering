// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	map,
	none,
	some,
	withDefault,
} from '../../../../vendor/@guardian/types/index';
import Img from 'components/ImgAlt';
import type { Sizes } from 'image/sizes';
import type { Item } from 'item';
import { getFormat } from 'item';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const imgStyles = css`
	background: none;
	width: 125px;

	${darkModeCss`
		background: none;
	`}
`;

const sizes: Sizes = {
	mediaQueries: [],
	default: '105px',
};

const Avatar: FC<Props> = ({ item }) => {
	const [contributor] = item.contributors;
	const format = getFormat(item);

	return pipe(
		contributor.image,
		map((image) => (
			<Img
				image={image}
				sizes={sizes}
				className={some(imgStyles)}
				format={format}
				lightbox={none}
			/>
		)),
		withDefault<ReactElement | null>(null),
	);
};

// ----- Exports ----- //

export default Avatar;
