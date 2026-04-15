import type { ABParticipations } from '../experiments/lib/beta-ab-tests';

/** A function to check if a URL represents an affiliate link */
export const isSkimlink = (url?: string): boolean => {
	try {
		return !!url && new URL(url).host === 'go.skimresources.com';
	} catch (err: unknown) {
		// If not a valid URL, it won't be an affiliate link
		return false;
	}
};

export const extractAbTestParticipationFromUrl = (
	url: string,
): ABParticipations => {
	try {
		const xcust = new URL(url).searchParams.get('xcust');
		if (!xcust) return {};

		const xcustParts = xcust.split('|');
		const abParticipationIndex = xcustParts.indexOf('abTestParticipations');
		if (abParticipationIndex === -1) return {};

		// Get the abTestParticipations value which should be the value after abTestParticipations key
		const participationValue = xcustParts[abParticipationIndex + 1];
		if (!participationValue) return {};

		const participations: ABParticipations = {};
		for (const entry of participationValue.split(',')) {
			const [testId, variant] = entry.split(':');
			if (testId && variant) {
				participations[testId] = variant;
			}
		}
		return participations;
	} catch (err: unknown) {
		return {};
	}
};

/**  A function to fetch the Skimlinks account ID from the URL to then pass it into the xcust*/
export const getSkimlinksAccountId = (url?: string): string => {
	try {
		if (!url) return '';
		const parsedUrl = new URL(url);
		return parsedUrl.searchParams.get('id') ?? '';
	} catch {
		return '';
	}
};

/**
 * Builds an AB test string by extracting existing participations from the URL set in Frontend,
 * merging them with incoming participations, then serializing as test:variant,test2:variant2.
 */
export const createMergedAbTestString = ({
	url,
	abTestParticipations,
}: {
	url: string;
	abTestParticipations?: ABParticipations;
}): string => {
	const existingAbTestParticipations = extractAbTestParticipationFromUrl(url);
	// Existing URL values take precedence over incoming values.
	const mergedAbTestParticipations = {
		...abTestParticipations,
		...existingAbTestParticipations,
	};

	return serializeAbTestParticipations(mergedAbTestParticipations);
};

const serializeAbTestParticipations = (
	abTestParticipations: ABParticipations,
): string =>
	Object.entries(abTestParticipations)
		.map(([key, value]) => `${key}:${value}`)
		.join(',');

const createXcustValue = ({
	referrerDomain,
	skimlinksAccountId,
	abTestString,
	utmParamsString,
	xcustComponentId,
}: {
	referrerDomain: string;
	skimlinksAccountId: string;
	abTestString: string;
	utmParamsString: string;
	xcustComponentId: string | null;
}): string => {
	const xcustSegments = [
		'referrer',
		referrerDomain,
		'accountId',
		skimlinksAccountId,
	];
	if (abTestString) {
		xcustSegments.push('abTestParticipations', abTestString);
	}
	if (utmParamsString) {
		xcustSegments.push(utmParamsString);
	}
	if (xcustComponentId) {
		xcustSegments.push('componentId', xcustComponentId);
	}

	return xcustSegments.join('|');
};

export const addCustomAttributesToLink = ({
	link,
	abTestParticipations,
	utmParamsString,
	referrerDomain,
}: {
	link: HTMLAnchorElement;
	abTestParticipations?: ABParticipations;
	utmParamsString: string;
	referrerDomain: string;
}): HTMLAnchorElement => {
	let parsedLinkUrl: URL;
	try {
		parsedLinkUrl = new URL(link.href);
	} catch {
		return link;
	}

	if (parsedLinkUrl.host !== 'go.skimresources.com') return link;

	const abTestString = createMergedAbTestString({
		url: parsedLinkUrl.toString(),
		abTestParticipations,
	});
	const skimlinksAccountId = parsedLinkUrl.searchParams.get('id') ?? '';
	const xcustValue = createXcustValue({
		referrerDomain,
		skimlinksAccountId,
		abTestString,
		utmParamsString,
		xcustComponentId: link.getAttribute('data-x-cust-component-id'),
	});
	parsedLinkUrl.searchParams.set('xcust', xcustValue);
	link.href = parsedLinkUrl.toString();

	return link;
};
