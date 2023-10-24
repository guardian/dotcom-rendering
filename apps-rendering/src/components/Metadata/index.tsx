// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import ExtendedMetadata from './ExtendedMetadata';
import GalleryMetadata from './GalleryMetadata';
import ImmersiveMetadata from './ImmersiveMetadata';
import LiveBlogMetadata from './LiveBlogMetadata';
import ShortMetadata from './ShortMetadata';

// ----- Component ----- //

interface Props {
	item: Item;
}

const Metadata: FC<Props> = ({ item }: Props) => {
	const { display, design } = item;

	if (display === ArticleDisplay.Immersive) {
		return (
			<ImmersiveMetadata
				format={getFormat(item)}
				publishDate={item.publishDate}
				commentCount={item.commentCount}
				contributors={item.contributors}
				commentable={item.commentable}
				edition={item.edition}
			/>
		);
	}

	if (design === ArticleDesign.Gallery) {
		return (
			<GalleryMetadata
				format={getFormat(item)}
				publishDate={item.publishDate}
				commentCount={item.commentCount}
				contributors={item.contributors}
				commentable={item.commentable}
				edition={item.edition}
			/>
		);
	} else if (
		design === ArticleDesign.Editorial ||
		design === ArticleDesign.Comment ||
		design === ArticleDesign.Letter ||
		design === ArticleDesign.Analysis
	) {
		return <ShortMetadata item={item} />;
	} else if (
		design === ArticleDesign.LiveBlog ||
		design === ArticleDesign.DeadBlog
	) {
		return <LiveBlogMetadata item={item} />;
	}

	return <ExtendedMetadata item={item} />;
};

// ----- Exports ----- //

export default Metadata;
