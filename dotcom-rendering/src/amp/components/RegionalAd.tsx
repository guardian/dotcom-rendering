import { ClassNames } from '@emotion/react';
import { realTimeConfig, BaseAdProps, CommercialConfig, Ad } from './Ad';
import { regionClasses } from '@root/src/amp/lib/region-classes';

type AdRegion = 'US' | 'AU' | 'ROW';

// Array of possible ad regions
const adRegions: AdRegion[] = ['US', 'AU', 'ROW'];

interface RegionalAdProps extends BaseAdProps {
	config: CommercialConfig;
}

/**
 * Determine the Placement ID that is used to look up a given stored bid request
 *
 * Stored bid requests are stored by the prebid server instance and each is
 * keyed by a placement ID. This placement ID corresponds to the tag id parameter
 * provided on the client
 *
 * @param adRegion The advertising region - different regions are covered by different
 * stored bid requests
 * @returns The placement id for an ad, depending on its ad region
 */
const getPlacementIdByAdRegion = (adRegion: AdRegion): number => {
	switch (adRegion) {
		case 'US':
			return 7;
		case 'AU':
			return 6;
		default:
			return 4;
	}
};

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
}: RegionalAdProps) => (
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
							rtcConfig={realTimeConfig(
								config.usePrebid,
								config.usePermutive,
								config.useAmazon,
								getPlacementIdByAdRegion(adRegion),
							)}
						/>
					</div>
				)}
			</ClassNames>
		))}
	</>
);
