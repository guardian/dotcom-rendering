// ----- Imports ----- //
import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import Headline from 'components/Headline';
import MainMedia, { GalleryCaption } from 'components/MainMedia';
import Metadata from 'components/Metadata';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import { grid } from 'grid/grid';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';

// ----- Component ----- //

const headerStyles = css`
	${grid.container}
	background-color: ${neutral[7]};
	border-bottom: 1px solid ${neutral[20]};
`;

const wrapperStyles = css`
	background-color: ${neutral[7]};
`;

type Props = {
	item: Item;
};

const GalleryLayout: FC<Props> = ({ item, children }) => (
	<main>
		<article css={wrapperStyles}>
			<header css={headerStyles}>
				<MainMedia
					mainMedia={item.mainMedia}
					format={getFormat(item)}
				/>
				<Series item={item} />
				<Headline item={item} />
				<Standfirst item={item} />
				<Metadata item={item} />
				<GalleryCaption
					mainMedia={item.mainMedia}
					format={getFormat(item)}
				/>
			</header>
			{children}
		</article>
	</main>
);

// ----- Exports ----- //

export default GalleryLayout;
