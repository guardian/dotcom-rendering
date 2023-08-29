import { isArray } from 'lodash';
import type { EditionCommercialProperties } from '../types/commercial';

export const getTargetingParams = (
	editionCommercialProperties: EditionCommercialProperties,
): Map<string, string> => {
	const targetingParams = new Map<string, string>();

	for (const adTargetParam of editionCommercialProperties.adTargeting) {
		targetingParams.set(
			adTargetParam.name,
			isArray(adTargetParam.value)
				? adTargetParam.value.join(',')
				: adTargetParam.value,
		);
	}

	targetingParams.delete('sh');
	return targetingParams.set('p', 'app');
};
