import type { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import type { Option } from '../../../vendor/@guardian/types/index';
import { none, some } from '../../../vendor/@guardian/types/index';
import type { Item } from 'item';

const tagTitleIsAlreadyInHeadline = (tag: Tag, headline: string): boolean =>
	headline.toLowerCase().includes(tag.webTitle.toLowerCase());

/*
 - Use series tag if we have one
 - Use tone for {"Letters", "Analysis", "Obituaries"}
 - Use tone without the last character for {"Reviews", "Editorials", "Match Reports", "Explainers"}
 - Use byline for "Comment" tone
 - Use top tag if both top and second tag feature in the headline
 - Use second tag if top tag features in the headline
 - Otherwise use top tag
 */
const kickerPicker = (article: Item): Option<string> => {
	const byline = article.byline;
	const seriesTag = article.tags.find((tag) => tag.type === TagType.SERIES);
	const toneTag = article.tags.find((tag) => tag.type === TagType.TONE);

	if (seriesTag) {
		return some(seriesTag.webTitle);
	}

	if (toneTag?.id) {
		if (
			toneTag.id === 'tone/letters' ||
			toneTag.id === 'tone/analysis' ||
			toneTag.id === 'tone/obituaries'
		) {
			return some(toneTag.webTitle);
		}

		if (
			toneTag.id === 'tone/reviews' ||
			toneTag.id === 'tone/editorials' ||
			toneTag.id === 'tone/matchreports' ||
			toneTag.id === 'tone/explainers'
		) {
			return some(toneTag.webTitle.slice(0, -1));
		}

		if (toneTag.id === 'tone/comment') {
			return some(byline);
		}
	}

	const topTag = article.tags[0] as Tag | undefined;
	const secondTag = article.tags[1] as Tag | undefined;

	if (!topTag) {
		return none;
	}

	if (
		!tagTitleIsAlreadyInHeadline(topTag, article.headline) ||
		!secondTag ||
		tagTitleIsAlreadyInHeadline(secondTag, article.headline)
	) {
		return some(topTag.webTitle);
	}

	return some(secondTag.webTitle);
};

export { kickerPicker };
