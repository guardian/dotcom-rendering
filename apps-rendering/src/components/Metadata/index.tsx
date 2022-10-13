// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import GalleryMetadata from './GalleryMetadata';
import ImmersiveMetadata from './ImmersiveMetadata';
import LiveBlogMetadata from './LiveBlogMetadata';
import { DefaultMetadata } from './Metadata.defaults';

// ----- Component ----- //

interface Props {
	item: Item;
}

const Metadata: FC<Props> = (props: Props) => {
	const { display, design } = props.item;

	if (display === ArticleDisplay.Immersive) {
		return (
			<ImmersiveMetadata
				format={getFormat(props.item)}
				publishDate={props.item.publishDate}
				commentCount={props.item.commentCount}
				contributors={props.item.contributors}
				commentable={props.item.commentable}
				edition={props.item.edition}
			/>
		);
	}

	if (design === ArticleDesign.Gallery) {
		return (
			<GalleryMetadata
				format={getFormat(props.item)}
				publishDate={props.item.publishDate}
				commentCount={props.item.commentCount}
				contributors={props.item.contributors}
				commentable={props.item.commentable}
				edition={props.item.edition}
			/>
		);
	} else if (
		design === ArticleDesign.Comment ||
		design === ArticleDesign.Letter ||
		design === ArticleDesign.Editorial ||
		design === ArticleDesign.Analysis
	) {
		return <DefaultMetadata withByline={false} {...props} />;
	} else if (
		design === ArticleDesign.LiveBlog ||
		design === ArticleDesign.DeadBlog
	) {
		return <LiveBlogMetadata {...props} />;
	}

	return <DefaultMetadata withByline={true} {...props} />;
};

// ----- Exports ----- //

export default Metadata;
