type Version = {
	major: number;
	minor: number;
	patch: number;
};

const stringToVersion = (versionString: string): Version | undefined => {
	const parts = versionString.split('.');
	if (parts.length !== 3) {
		return undefined;
	}
	const numbers = parts.map((_) => Number(_)) as [number, number, number];
	if (numbers.some((value) => isNaN(value))) {
		return undefined;
	}
	const [major, minor, patch] = numbers;
	return { major, minor, patch };
};

export const isSameOrLaterVersion = (
	actualVersionString: string,
	requiredVersionString: string,
): boolean | undefined => {
	const requiredVersion = stringToVersion(requiredVersionString);
	const actualVersion = stringToVersion(actualVersionString);

	if (!requiredVersion || !actualVersion) {
		return undefined;
	}

	if (actualVersion.major < requiredVersion.major) {
		return false;
	}
	if (actualVersion.major > requiredVersion.major) {
		return true;
	}
	if (actualVersion.minor < requiredVersion.minor) {
		return false;
	}
	if (actualVersion.minor > requiredVersion.minor) {
		return true;
	}
	if (actualVersion.patch < requiredVersion.patch) {
		return false;
	}
	return true;
};


