import { ClassNames } from '@emotion/react';
import { adRegions, regionClasses } from '../lib/region-classes.amp.ts';
import type { BaseAdProps } from './Ad.amp.tsx';
import { Ad } from './Ad.amp.tsx';

/**
 * Component for an advert that appears inline in articles / liveblogs
 *
 * To allow for differing the configuration of our advertising based on region,
 * for each region we create an `Ad` component with styling so that only the
 * component for the user's region (as indicated by the AMP geo runtime) are hidden
 *
 * @param {BaseAdProps} props
 * @returns an Ad component per region
 */
export const InlineAd = ({
	id,
	editionId,
	section,
	contentType,
	commercialProperties,
	config,
	adTargeting,
}: BaseAdProps) => (
	<>
		{adRegions.map((adRegion) => (
			<ClassNames key={adRegion}>
				{({ css, cx }) => (
					<div
						className={cx(
							css`
								${regionClasses[adRegion].styles}
							`,
						)}
					>
						<Ad
							id={id}
							editionId={editionId}
							section={section}
							contentType={contentType}
							commercialProperties={commercialProperties}
							config={config}
							adTargeting={adTargeting}
							adType={{ adRegion }}
						/>
					</div>
				)}
			</ClassNames>
		))}
	</>
);
