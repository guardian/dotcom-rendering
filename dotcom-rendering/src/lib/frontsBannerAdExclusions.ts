import type { FrontsBannerAdCollections } from '../types/commercial';

/**
 * When inserting advert slots into fronts pages, there are some containers in which
 * we do not want to insert slots above to ensure good page aesthetics. An example is
 * when multiple consecutive containers are used for the same piece of news. E.g. In 2020,
 * three consecutive containers on '/uk' were used for Covid. It would not be desirable
 * to insert an ad between these sections.
 *
 * If this file is frequently updated, it may be worth considering an alternative solution.
 * We could use a checkbox in the fronts config tool that editors can use to
 * indicate that an advert should not be placed above a certain container, instead of a
 * hardcoded list of containers.
 *
 * Contact the Commercial dev team for more information.
 */

export const frontsBannerExcludedCollections: FrontsBannerAdCollections = {
	uk: ['Headlines', 'Ukraine invasion'],
	us: ['Headlines', 'Ukraine invasion'],
	au: ['Headlines', 'Ukraine invasion'],
	international: ['Headlines', 'Ukraine invasion'],
	europe: ['Headlines', 'Ukraine invasion'],
};
