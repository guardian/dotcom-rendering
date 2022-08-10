// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { border } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral } from '@guardian/source-foundations';
import { grid } from 'grid/grid';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { defaultStyles, DefaultTags } from './Tags.defaults';

// ----- Component ----- //

const containerStyles = css`
	${grid.container}
`;

const leftColStyles = css`
	position: relative;

	${from.leftCol} {
		grid-row: 4;
		${grid.column.left}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${neutral[20]};
			left: -10px;
		}
	}
`;

const rightColStyles = css`
	position: relative;

	${from.leftCol} {
		grid-row: 4;
		${grid.column.right}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${neutral[20]};
			right: -10px;
		}
	}
`;

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	position: relative;

	${from.leftCol} {
		grid-row: 4;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${border.galleryImage(format)};
			left: -10px;
		}
	}
`;

type Props = {
	item: Item;
};

const GalleryTags: FC<Props> = ({ item }) => (
	<section css={containerStyles}>
		<div css={leftColStyles} />
		<div css={styles(getFormat(item))}>
			<DefaultTags item={item} css={defaultStyles(getFormat(item))} />
		</div>
		<div css={rightColStyles} />
	</section>
);

// ----- Exports ----- //

export default GalleryTags;
