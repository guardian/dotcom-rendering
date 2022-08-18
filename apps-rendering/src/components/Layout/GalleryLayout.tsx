// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { border } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import MainMedia, { GalleryCaption } from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import Tags from 'components/Tags';
import { grid } from 'grid/grid';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';

// ----- Component ----- //

const headerStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${neutral[7]};
	border-bottom: 1px solid ${border.galleryImage(format)};
`;

const wrapperStyles = css`
	background-color: ${neutral[7]};
`;

type Props = {
	item: Item;
	edition: Edition;
};

const GalleryLayout: FC<Props> = ({ item, children, edition }) => {
	const format = getFormat(item);

	return (
		<>
			<main>
				<article css={wrapperStyles}>
					<header css={headerStyles(format)}>
						<MainMedia
							mainMedia={item.mainMedia}
							format={getFormat(item)}
						/>
						<Series item={item} />
						<Headline item={item} />
						<Standfirst item={item} />
						<Metadata item={item} edition={edition} />
						<GalleryCaption
							mainMedia={item.mainMedia}
							format={getFormat(item)}
						/>
					</header>
					{children}
					<Tags item={item} />
				</article>
			</main>
			<RelatedContent item={item} />
			<Footer isCcpa={false} format={item} />
		</>
	);
};

// ----- Exports ----- //

export default GalleryLayout;
