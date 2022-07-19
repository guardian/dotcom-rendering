// ----- Imports ----- //

import { ArticleDisplay } from '@guardian/libs';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import ImmersiveTags from './ImmersiveTags';
import { defaultStyles, DefaultTags } from './Tags.defaults';

// ----- Component ----- //

type Props = {
	item: Item;
};

const Tags: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	if (format.display === ArticleDisplay.Immersive) {
		return <ImmersiveTags item={item} />;
	}

	return <DefaultTags item={item} css={defaultStyles(getFormat(item))} />;
};

// ----- Exports ----- //

export default Tags;
