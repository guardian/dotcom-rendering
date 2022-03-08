import { AdRegion } from './region-classes';

type Config =
	| { isSticky: true }
	| {
			isSticky?: false;
			adRegion: AdRegion;
	  };

export type RTCParameters = {
	placementId: number;
	tagId: string;
	profileId: string;
	pubId: string;
};

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
const getPlacementId = (config: Config): number => {
	if (config.isSticky) {
		return 9;
	}
	switch (config.adRegion) {
		case 'US':
			return 7;
		case 'AU':
			return 6;
		default:
			return 4;
	}
};

const getTagId = (config: Config): string => {
	if (!config.isSticky) {
		switch (config.adRegion) {
			case 'UK':
				return '6214ca675cf18e70cbaeef37_6214c9a4b73a6613d4aeef2f';
			case 'US':
				return '6214cb381a577cd525aeef3f_6214caacb52b565527aeef39';
			case 'AU':
				return '6214cbe6a24103508faeef45_6214cb50aac9c1160daeef40';
			// Do the same as for sticky
			default:
				break;
		}
	}
	return '6214ca56243f4ff4f5aeef36_6214c723c70856442e4d79f2';
};

const getPubAndProfileIds = ({}: Config): {
	pubId: string;
	profileId: string;
} => {
	return {
		profileId: '6611',
		pubId: '157207',
	};
};

export const getRTCParameters = (config: Config): RTCParameters => ({
	placementId: getPlacementId(config),
	tagId: getTagId(config),
	...getPubAndProfileIds(config),
});

const permutiveURL = 'https://guardian.amp.permutive.com/rtc?type=doubleclick';

const amazonConfig = {
	aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
};

const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;

export const realTimeConfig = ({
	vendors = {},
	url = undefined,
	usePermutive = false,
	useAmazon = false,
	timeoutMillis,
}: {
	vendors?: Record<string, unknown>;
	url?: string;
	usePermutive?: boolean;
	useAmazon?: boolean;
	timeoutMillis?: number;
}): string => {
	const data = {
		urls: [url, usePermutive ? permutiveURL : undefined].filter(
			notUndefined,
		),
		vendors: {
			...vendors,
			...(useAmazon ? amazonConfig : {}),
		},
		...(timeoutMillis ? { timeoutMillis: 1000 } : {}),
	};
	return JSON.stringify(data);
};
