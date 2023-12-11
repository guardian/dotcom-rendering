// ----- Imports ----- //

import type { Content } from '@guardian/content-api-models/v1/content';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { ArticleElementRole } from '@guardian/libs';
import type { Option } from '../vendor/@guardian/types/index';
import { none } from '../vendor/@guardian/types/index';
import { articleContributors } from 'capi';
import type { Image } from 'image';
import type { ImageSubtype } from 'image/image';
import { Dpr, src, srcsetWithWidths } from 'image/srcsets';
import { Optional } from 'optional';

// ------ Types ----- //

type Contributor = {
	id: string;
	apiUrl: string;
	name: string;
	image: Option<Image>;
};

// ----- Functions ----- //

const contributorSrcset = srcsetWithWidths([32, 64, 128, 192, 256, 400, 600]);

const isSingleContributor = (cs: Contributor[]): boolean => cs.length === 1;

const tagToContributor =
	(salt: string) =>
	(contributorTag: Tag): Contributor => ({
		id: contributorTag.id,
		apiUrl: contributorTag.apiUrl,
		name: contributorTag.webTitle,
		image: Optional.fromNullable(contributorTag.bylineLargeImageUrl)
			.map((url) => ({
				srcset: contributorSrcset(url, salt, Dpr.One),
				src: src(salt, url, 140, Dpr.One),
				dpr2Srcset: contributorSrcset(url, salt, Dpr.Two),
				height: 192,
				width: 192,
				credit: none,
				caption: none,
				alt: none,
				role: ArticleElementRole.Standard,
				nativeCaption: none,
				imageSubtype: Optional.none<ImageSubtype>(),
			}))
			.toOption(),
	});

const parseContributors = (salt: string, content: Content): Contributor[] =>
	articleContributors(content).map(tagToContributor(salt));

// ----- Exports ----- //

export {
	Contributor,
	isSingleContributor,
	parseContributors,
	tagToContributor,
};
