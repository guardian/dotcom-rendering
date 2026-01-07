/**
 * Detects iPad devices using feature detection.
 * Returns true for iPad devices including iPadOS which reports as MacIntel.
 */
export const isIPad = (): boolean => {
	// iPadOS 13+ reports as MacIntel but has touch support
	if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0) {
		return true;
	}

	// Older iPads or other iPad identifiers
	if (navigator.platform === 'iPad') {
		return true;
	}

	// Exclude iPhone and iPod
	return false;
};

/**
 * Gets the device class dynamically.
 * Returns 'tablet' for iPads, undefined otherwise.
 */
export const getDeviceClass = (): string | undefined => {
	return isIPad() ? 'tablet' : undefined;
};
