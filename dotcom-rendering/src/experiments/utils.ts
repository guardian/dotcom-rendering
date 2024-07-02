import { bypassCommercialMetricsSampling } from '@guardian/commercial';
import { bypassCoreWebVitalsSampling } from '@guardian/core-web-vitals';
import { bypassCoreWebVitalsSampling as bypassCoreWebVitalsSamplingAttribution } from '@guardian/core-web-vitals-attribution';

export const bypassMetricsSampling = (): void => {
	void bypassCommercialMetricsSampling();
	void bypassCoreWebVitalsSampling();
	void bypassCoreWebVitalsSamplingAttribution();
};
