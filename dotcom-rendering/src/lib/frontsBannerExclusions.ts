import type { FrontsBannerAdCollections } from '../types/commercial';

/**
 * This file is temporary.
 *
 * When inserting advert slots into fronts pages, there are some containers in which
 * we do not want to insert slots above, to ensure good page aesthetics. An example is
 * when multiple consecutive containers are used for the same piece of news. E.g. In 2020,
 * three consecutive containers on '/uk' were used for Covid. It would be inappropriate
 * to insert an ad between these sections.
 *
 * Our solution is to use a checkbox in the fronts config tool, that editors can use to
 * indicate that an advert should not be placed above a certain slot. This checkbox will
 * have the highest importance in deciding where to place fronts-banner ads on the page.
 *
 * Contact Dominik Lander or the commercial dev team for more information.
 */

export const frontsBannerAdCollections: FrontsBannerAdCollections = {};
