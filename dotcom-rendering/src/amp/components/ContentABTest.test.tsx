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
	const shortUrlId = '/abc';

	const Component = () => {
		const { group } = useTestGroup();

		if (group === undefined) {
			return null;
		}

		return <span>{group.toString()}</span>;
	};

	const { container } = render(
		<TestProvider switches={{}} shortUrlId={shortUrlId}>
			<Component />
		</TestProvider>,
	);

	expect(container).not.toHaveTextContent(/0|1|2|3/);
});

test('returns a valid group ID when used inside of a provider', () => {
	const shortUrlId = '/abc';

	const Component = () => {
		const { group } = useTestGroup();

		if (group === undefined) {
			return null;
		}

		return <span>{group.toString()}</span>;
	};

	const { container } = render(
		<TestProvider
			switches={{ ampContentABTesting: true }}
			shortUrlId={shortUrlId}
		>
			<Component />
		</TestProvider>,
	);

	// Check content has been placed into one of the possible groups
	expect(container).toHaveTextContent(/0|1|2|3/);
});
