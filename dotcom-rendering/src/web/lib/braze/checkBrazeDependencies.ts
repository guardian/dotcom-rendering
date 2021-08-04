import { getBrazeUuid } from '@root/src/web/lib/getBrazeUuid';
import { hasRequiredConsents } from './hasRequiredConsents';

type SuccessResult = {
	isSuccessful: true;
	data: ResultData;
};

type FailureResult = {
	isSuccessful: false;
	failure: {
		field: string;
		data: any;
	};
	data: ResultData;
};

type DependenciesResult = SuccessResult | FailureResult;

type ResultData = { [key: string]: string | boolean };

type DependencyResult = {
	name: string;
	value: Promise<string | boolean | null | undefined | void>;
};
const buildFailureResponse = (name: string, value: any, data: ResultData) => ({
	isSuccessful: false,
	failure: {
		field: name,
		data: value,
	},
	data,
});

const buildDependencies = (
	isSignedIn: boolean,
	idApiUrl: string,
): DependencyResult[] => {
	return [
		{
			name: 'brazeSwitch',
			value: Promise.resolve(window.guardian.config.switches.brazeSwitch),
		},
		{
			name: 'apiKey',
			value: Promise.resolve(window.guardian.config.page.brazeApiKey),
		},
		{
			name: 'brazeUuid',
			value: isSignedIn ? getBrazeUuid(idApiUrl) : Promise.resolve(null),
		},
		{
			name: 'consent',
			value: hasRequiredConsents(),
		},
		{
			name: 'isNotPaidContent',
			value: Promise.resolve(!window.guardian.config.page.isPaidContent),
		},
	];
};

const checkBrazeDependencies = async (
	isSignedIn: boolean,
	idApiUrl: string,
): Promise<DependenciesResult> => {
	const dependencies = buildDependencies(isSignedIn, idApiUrl);

	const data: ResultData = {};

	// I think we could possibly clean this up a bit when we can use
	// Promise.allSettled reliably (it's not available in our current Node
	// version and polyfill.io doesn't have a polyfill yet).
	for (const { name, value } of dependencies) {
		try {
			// eslint-disable-next-line no-await-in-loop
			const result = await value;

			if (result) {
				data[name] = result;
			} else {
				return buildFailureResponse(name, result, data);
			}
		} catch (e) {
			const error = e as Error;
			return buildFailureResponse(
				name,
				error && error.message ? error.message : error,
				data,
			);
		}
	}

	return {
		isSuccessful: true,
		data,
	};
};

export { checkBrazeDependencies };
