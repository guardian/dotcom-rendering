import { ClassNames } from '@emotion/react';
import { getRTCParameters } from '../lib/real-time-config';
import { adRegions, regionClasses } from '../lib/region-classes';
import { BaseAdProps, Ad } from './Ad';

/**
 * Ad slot component whose config differs based on region.
 * For each adRegion, create an Ad component with styling so that all but the component for the
 * user's region are hidden
 * @param RegionalAdProps
 * @returns an Ad component per region
 */
export const RegionalAd = ({
	edition,
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
							isSticky={false}
							edition={edition}
							section={section}
							contentType={contentType}
							commercialProperties={commercialProperties}
							config={config}
							rtcParameters={getRTCParameters({ adRegion })}
							adTargeting={adTargeting}
						/>
					</div>
				)}
			</ClassNames>
		))}
	</>
);
