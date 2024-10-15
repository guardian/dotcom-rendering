// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay } from '../../articleFormat';
import type { Item } from 'item';
import { getFormat } from 'item';
import GalleryTags from './GalleryTags';
import ImmersiveTags from './ImmersiveTags';
import { defaultStyles, DefaultTags } from './Tags.defaults';

// ----- Component ----- //

type Props = {
	item: Item;
};

const Tags = ({ item }: Props) => {
	const format = getFormat(item);

	if (format.display === ArticleDisplay.Immersive) {
		return <ImmersiveTags item={item} />;
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return <GalleryTags item={item} />;
		default:
			return (
				<DefaultTags item={item} css={defaultStyles(getFormat(item))} />
			);
	}
};

// ----- Exports ----- //

export default Tags;
