import { environmentClient } from 'native/nativeApi';

function isOnLocal() {
	return window?.location?.host.startsWith('localhost:');
}


/**
 * Calls the environment native API to check which version
 * or Bridget the client is running.
 *
 * @returns The version of Briget the client is running, or
 * undefined when running locally or if the native API does
 * not return a value.
 */
export const getBridgetVersion = async () => {
	// Calls to the API will hang and timeout when running
	// AR locally.
	if (isOnLocal()) {
		return undefined;
	} else {
		try {
			return await environmentClient.nativeThriftPackageVersion();
		} catch (error) {
			console.log('nativeThriftPackageVersion', { error });
			return undefined;
		}
	}
};
