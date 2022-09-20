// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import GalleryRelatedContent from './GalleryRelatedContent';
import ImmersiveRelatedContent from './ImmersiveRelatedContent';
import DefaultRelatedContent, {
	defaultStyles,
} from './RelatedContent.defaults';

// ----- Component ----- //

interface Props {
	item: Item;
}

const RelatedContent: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	if (format.display === ArticleDisplay.Immersive) {
		return (
			<ImmersiveRelatedContent
				content={item.relatedContent}
				format={format}
			/>
		);
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return (
				<GalleryRelatedContent
					content={item.relatedContent}
					format={format}
				/>
			);
		default:
			return (
				<DefaultRelatedContent
					content={item.relatedContent}
					css={defaultStyles}
				/>
			);
	}
};

// ----- Exports ----- //

export default RelatedContent;
