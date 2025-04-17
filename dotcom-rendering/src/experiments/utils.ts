import { bypassCommercialMetricsSampling } from '@guardian/commercial';
import { bypassCoreWebVitalsSampling } from '../lib/cwv/cwv';

export const bypassMetricsSampling = (): void => {
	void bypassCommercialMetricsSampling();
	void bypassCoreWebVitalsSampling();
};
