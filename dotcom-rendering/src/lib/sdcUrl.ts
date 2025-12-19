import { getDeviceClass } from '../client/deviceDetection/iPadDetection';

/**
 * Appends the device class query parameter to the SDC URL if detected.
 * This is used for iPad targeting since iPadOS 13+ reports as macOS in User-Agent.
 */
export const appendDeviceClassParam = (baseUrl: string): string => {
	const deviceClass = getDeviceClass();
	if (deviceClass) {
		const separator = baseUrl.includes('?') ? '&' : '?';
		return `${baseUrl}${separator}deviceClass=${deviceClass}`;
	}
	return baseUrl;
};
