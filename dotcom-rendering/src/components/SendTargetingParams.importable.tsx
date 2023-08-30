import { log } from '@guardian/libs';
import { useEffect } from 'react';
import { getAnalyticsClient } from '../lib/bridgetApi';
import { isServer } from '../lib/isServer';
import { getTargetingParams } from '../lib/sendTargetingParams';
import type { EditionCommercialProperties } from '../types/commercial';

type Props = {
	editionCommercialProperties: EditionCommercialProperties;
};

export const SendTargetingParams = ({ editionCommercialProperties }: Props) => {
	if (isServer) {
		throw new Error('SendTargetingParams is client only');
	}

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
