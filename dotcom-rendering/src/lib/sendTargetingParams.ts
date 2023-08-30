import { isArray } from 'lodash';
import type { EditionCommercialProperties } from '../types/commercial';

export const getTargetingParams = (
	editionCommercialProperties: EditionCommercialProperties,
): Map<string, string> => {
	return new Map(
		editionCommercialProperties.adTargeting
			.filter((adTargetingParam) => adTargetingParam.name !== 'sh')
			.map((adTargetingParam) => [
				adTargetingParam.name,
				isArray(adTargetingParam.value)
					? adTargetingParam.value.join(',')
					: adTargetingParam.value,
			]),
	).set('p', 'app');
};
