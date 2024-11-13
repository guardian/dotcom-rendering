import { isString } from '@guardian/libs';
import type { AdTargeting } from '../types/commercial';

export type SharedAdTargeting = Record<string, unknown>;

// TODO: this function already exists in commercial-core, consider exporting it to avoid duplication
const getUrlKeywords = (url: string): string[] => {
	const lastSegment = url
		.split('/')
		.filter(Boolean) // This handles a trailing slash
		.slice(-1)[0];

	return isString(lastSegment) ? lastSegment.split('-').filter(Boolean) : [];
};

export const buildAdTargeting = ({
	isAdFreeUser,
	isSensitive,
	edition,
	section,
	sharedAdTargeting,
	adUnit,
	videoDuration,
}: {
	isAdFreeUser: boolean;
	isSensitive: boolean;
	edition: string;
	section: string;
	sharedAdTargeting: SharedAdTargeting;
	adUnit: string;
	videoDuration?: number;
}): AdTargeting => {
	if (isAdFreeUser) {
		return {
			disableAds: true,
		};
	}
	const customParams = {
		sens: isSensitive ? ('t' as const) : ('f' as const),
		si: 'f',
		vl: videoDuration ?? 0,
		cc: edition,
		s: section,
		inskin: 'f',
		...sharedAdTargeting,
		pa: 'f',
		urlkw: getUrlKeywords(String(sharedAdTargeting.url)),
	};
	return {
		customParams,
		adUnit,
	};
};
