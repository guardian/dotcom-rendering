import { ABTest } from '../../types.ts';

const uniqueName = (tests: ABTest[]): boolean => {
	return tests.every((test, index) => {
		const duplicate = tests.findIndex((t) => t.name === test.name);
		if (duplicate === -1 || duplicate === index) {
			return true;
		}
		throw new Error(`Duplicate test name found: ${test.name}`);
	});
};

export { uniqueName };
