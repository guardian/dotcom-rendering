// ----- Imports ----- //

import type { Content } from '@guardian/content-api-models/v1/content';
import { Dpr, Role, src, srcsetWithWidths } from '@guardian/image-rendering';
import type { Option } from '@guardian/types';
import { fromNullable, map, none } from '@guardian/types';
import { articleContributors } from 'capi';
import type { Image } from 'image';
import { pipe2 } from 'lib';

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

const parseContributors = (salt: string, content: Content): Contributor[] =>
	articleContributors(content).map((contributor) => ({
		id: contributor.id,
		apiUrl: contributor.apiUrl,
		name: contributor.webTitle,
		image: pipe2(
			contributor.bylineLargeImageUrl,
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
	}));

// ----- Exports ----- //

export { Contributor, isSingleContributor, parseContributors };
