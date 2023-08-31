import { isArray } from 'lodash';
import type { EditionCommercialProperties } from '../types/commercial';

export const getTargetingParams = (
	editionCommercialProperties: EditionCommercialProperties,
): Map<string, string> => {
	return new Map(
		editionCommercialProperties.adTargeting
			// We're filtering this out because the targeting params AR sends
			// does not include this key
			.filter((adTargetingParam) => adTargetingParam.name !== 'sh')
			.map((adTargetingParam) => [
				adTargetingParam.name,
				isArray(adTargetingParam.value)
					? adTargetingParam.value.join(',')
					: adTargetingParam.value,
			]),
	).set('p', 'app');
};
