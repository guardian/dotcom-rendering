// ----- Imports ----- //

import { css } from '@emotion/react';
import Img from '@guardian/common-rendering/src/components/img';
import type { Sizes } from '@guardian/common-rendering/src/sizes';
import { map, none, some, withDefault } from '@guardian/types';
import type { Item } from 'item';
import { getFormat } from 'item';
import { convertFormatToArticleFormat, pipe } from 'lib';
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

	return pipe(
		contributor.image,
		map((image) => (
			<Img
				image={image}
				sizes={sizes}
				className={some(imgStyles)}
				format={convertFormatToArticleFormat(format)}
				supportsDarkMode={false}
				lightbox={none}
			/>
		)),
		withDefault<ReactElement | null>(null),
	);
};

// ----- Exports ----- //

export default Avatar;
