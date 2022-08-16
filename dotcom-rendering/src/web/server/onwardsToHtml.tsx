import { renderToString } from 'react-dom/server';
import type { CAPIOnwardsType } from '../../types/onwards';
import type { CAPITrailType, TrailType } from '../../types/trails';
import { Carousel } from '../components/Carousel.importable';
import { decideFormat } from '../lib/decideFormat';
import { decideTrail } from '../lib/decideTrail';

const buildTrails = (
	trails: CAPITrailType[],
	trailLimit: number,
): TrailType[] => {
	return trails.slice(0, trailLimit).map(decideTrail);
};

/**
 * onwardsToHtml is used by the /Onwards endpoint to render the Carousel at the bottom of articles
 * It takes an array of json key-event blocks and returns the resulting html string
 *
 * @returns string (the html)
 */
export const onwardsToHtml = ({
	heading,
	// description,
	// url,
	onwardsType,
	trails,
	format: CAPIFormat,
}: CAPIOnwardsType): string => {
	const format = decideFormat(CAPIFormat);

	const html = renderToString(
		<Carousel
			heading={heading}
			onwardsType={onwardsType}
			trails={buildTrails(trails, 8)}
			format={format}
		/>,
	);

	return html;
};
