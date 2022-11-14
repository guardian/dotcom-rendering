import { environmentClient } from 'native/nativeApi';

function isOnLocal() {
	return window?.location?.host.startsWith('localhost:');
}

const LOCAL_FALLBACK_VERSION = '1.0.0' as const;

export const getBridgetVersion = async () => {
	if (isOnLocal()) {
		return LOCAL_FALLBACK_VERSION;
	} else {
		try {
			return await environmentClient.nativeThriftPackageVersion();
		} catch (error) {
			console.log('nativeThriftPackageVersion', { error });
			return undefined;
		}
	}
};
