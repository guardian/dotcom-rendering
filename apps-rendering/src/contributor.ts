// ----- Imports ----- //

import {
	Dpr,
	src,
	srcsetWithWidths,
} from '@guardian/common-rendering/src/srcsets';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { Option } from '@guardian/types';
import { fromNullable, map, none, Role } from '@guardian/types';
import { articleContributors } from 'capi';
import type { Image } from 'image';
import { pipe } from 'lib';

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
		image: pipe(
			contributorTag.bylineLargeImageUrl,
			fromNullable,
			map((url) => ({
				srcset: contributorSrcset(url, salt, Dpr.One),
				src: src(salt, url, 64, Dpr.One),
				dpr2Srcset: contributorSrcset(url, salt, Dpr.Two),
				height: 192,
				width: 192,
				credit: none,
				caption: none,
				alt: none,
				role: Role.Standard,
				nativeCaption: none,
			})),
		),
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
