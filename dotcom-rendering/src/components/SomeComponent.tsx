import { useBetaAB } from '../lib/useAB';

export const SomeComponent = () => {
	// Example usage of A/B tests
	const abTests = useBetaAB();

	const isInControlGroup =
		abTests?.isUserInTestGroup(
			'commercial-testing-beta-ab-test',
			'control',
		) ?? false;

	const isInVariantGroup =
		abTests?.isUserInTestGroup(
			'commercial-testing-beta-ab-test',
			'variant',
		) ?? false;

	if (isInControlGroup) {
		return <div>You're in the control group</div>;
	} else if (isInVariantGroup) {
		return <div>You're in the variant group</div>;
	} else {
		return <div>You're not in the test</div>;
	}
};
