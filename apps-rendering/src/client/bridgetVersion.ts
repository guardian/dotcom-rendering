import { environmentClient } from 'native/nativeApi';
import { Optional } from 'optional';

/**
 * Calls the environment native API to check which version
 * or Bridget the client is running.
 *
 * Note - when the running app-rendering client locally, the
 * native APIs are not available. The call will hang and
 * eventually throw a timeout error.
 *
 * @returns The version of Bridget the client is running, or
 * None if the native API does not return a value.
 */
export const getBridgetVersion = async (): Promise<Optional<string>> => {
	try {
		return await environmentClient
			.nativeThriftPackageVersion()
			.then((result) => Optional.some(result));
	} catch (error) {
		console.log('nativeThriftPackageVersion', { error });
		return Optional.none();
	}
};
