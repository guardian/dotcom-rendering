import { render } from '@testing-library/react';
import { TestProvider, useTestGroup } from './ContentABTest';

test('throws error when used outside of provider', () => {
	expect(() => {
		const Component = () => {
			useTestGroup();
			return null;
		};

		render(<Component />);
	}).toThrow('useTestGroup must be used within the TestProvider');
});

test('returns undefined group when switched off', () => {
	const pageId = '/abc';

	const Component = () => {
		const { group } = useTestGroup();

		if (group === undefined) {
			return null;
		}

		return <span>{group}</span>;
	};

	const { container } = render(
		<TestProvider switches={{}} pageId={pageId}>
			<Component />
		</TestProvider>,
	);

	expect(container).not.toHaveTextContent(/0|1|2|3|4|5|6|7|8|9|10|11/);
});

test('returns a valid group ID when used inside of a provider', () => {
	const pageId = '/abc';

	const Component = () => {
		const { group } = useTestGroup();

		if (group === undefined) {
			return null;
		}

		return <span>{group}</span>;
	};

	const { container } = render(
		<TestProvider switches={{ ampContentABTesting: true }} pageId={pageId}>
			<Component />
		</TestProvider>,
	);

	// Check content has been placed into one of the possible groups
	expect(container).toHaveTextContent(/0|1|2|3|4|5|6|7|8|9|10|11/);
});
