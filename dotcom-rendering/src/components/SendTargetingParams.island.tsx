import { log } from '@guardian/libs';
import { useEffect } from 'react';
import { getAnalyticsClient } from '../lib/bridgetApi';
import { getTargetingParams } from '../lib/sendTargetingParams.apps';
import type { EditionCommercialProperties } from '../types/commercial';

type Props = {
	editionCommercialProperties: EditionCommercialProperties;
};

export const SendTargetingParams = ({ editionCommercialProperties }: Props) => {
	useEffect(() => {
		void getAnalyticsClient()
			.sendTargetingParams(
				getTargetingParams(editionCommercialProperties),
			)
			.catch(() => undefined);

		log('commercial', '🎯 Targeting Params', editionCommercialProperties);
	}, [editionCommercialProperties]);

	return null;
};
