import { getBrazeUuid } from '../getBrazeUuid';
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

const buildDependencies = (isSignedIn: boolean): DependencyResult[] => {
	return [
		{
			name: 'apiKey',
			value: Promise.resolve(window.guardian.config.page.brazeApiKey),
		},
		{
			name: 'brazeSwitch',
			value: Promise.resolve(window.guardian.config.switches.brazeSwitch),
		},
		{
			name: 'brazeUuid',
			value: isSignedIn ? getBrazeUuid() : Promise.resolve(null),
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
): Promise<DependenciesResult> => {
	const dependencies = buildDependencies(isSignedIn);

	const data: ResultData = {};

	// I think we could possibly clean this up a bit when we can use
	// Promise.allSettled reliably (it's not available in our current Node
	// version and polyfill.io doesn't have a polyfill yet).
	for (const { name, value } of dependencies) {
		try {
			const result = await value;

			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- TODO: Complex types, look into this further
			if (result) {
				data[name] = result;
			} else {
				return buildFailureResponse(name, result, data);
			}
		} catch (e) {
			return buildFailureResponse(
				name,
				e instanceof Error ? e.message : e,
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
