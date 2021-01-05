import { OphanComponentType } from '@root/src/web/browser/ophan/ophan';
import { constructQuery } from '@root/src/lib/querystring';

type AcquisitionLinkParams = {
	base: string;
	componentType: OphanComponentType;
	componentId: string;
	campaignCode?: string;
	abTest?: { name: string; variant: string };
	pageViewId: string;
	referrerUrl: string;
};

// Adds acquisition tracking codes if it is a support url
export const addTrackingCodesToUrl = ({
	base,
	componentType,
	componentId,
	campaignCode,
	abTest,
	pageViewId,
	referrerUrl,
}: AcquisitionLinkParams): string => {
	const isSupportUrl =
		base.search(
			/(support.theguardian.com)(\/[a-z]*)?\/(contribute|subscribe)/,
		) >= 0;

	if (isSupportUrl) {
		const acquisitionData = {
			source: 'GUARDIAN_WEB',
			componentId,
			componentType,
			campaignCode,
			abTest,
			referrerPageviewId: pageViewId,
			referrerUrl,
		};

		const params = {
			REFPVID: pageViewId,
			INTCMP: campaignCode,
			acquisitionData: JSON.stringify(acquisitionData),
		};

		return `${base}${base.includes('?') ? '&' : '?'}${constructQuery(
			params,
		)}`;
	}

	return base;
};
