// ----- Imports ----- //

import type { FC } from 'react';
import DefaultRelatedContent, { defaultStyles } from './RelatedContent.defaults';
import { ArticleDisplay } from '@guardian/libs';
import ImmersiveRelatedContent from './ImmersiveRelatedContent';
import { getFormat, Item } from 'item';

// ----- Component ----- //

interface Props {
	item: Item;
}

const RelatedContent: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	if (format.display === ArticleDisplay.Immersive) {
		return <ImmersiveRelatedContent content={item.relatedContent} />
	}

	return (
		<DefaultRelatedContent
			content={item.relatedContent}
			css={defaultStyles}
		/>
	);
}

// ----- Exports ----- //

export default RelatedContent;
