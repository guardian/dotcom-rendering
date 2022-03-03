import { render } from '@testing-library/react';
import { ContentABTestProvider, useContentABTestGroup } from './ContentABTest';

test('throws error when used outside of provider', () => {
	expect(() => {
		const Component = () => {
			useContentABTestGroup();
			return null;
		};

		render(<Component />);
	}).toThrow('useTestGroup must be used within the TestProvider');
});

test('returns undefined group when switched off', () => {
	const pageId =
		'food/2022/feb/15/air-fryers-miraculous-kitchen-must-have-or-just-a-load-of-hot-air';

	const Component = () => {
		const { group } = useContentABTestGroup();

		if (group === undefined) {
			return null;
		}

		return <span>{group}</span>;
	};

	const { container } = render(
		<ContentABTestProvider switches={{}} pageId={pageId}>
			<Component />
		</ContentABTestProvider>,
	);

	expect(container).not.toHaveTextContent(/0|1|2|3|4|5|6|7|8|9|10|11/);
});

test('returns a valid group ID when used inside of a provider', () => {
	const pageId =
		'food/2022/feb/15/air-fryers-miraculous-kitchen-must-have-or-just-a-load-of-hot-air';

	const Component = () => {
		const { group } = useContentABTestGroup();

		if (group === undefined) {
			return null;
		}

		return <span>{group}</span>;
	};

	const { container } = render(
		<ContentABTestProvider
			switches={{ ampContentABTesting: true }}
			pageId={pageId}
		>
			<Component />
		</ContentABTestProvider>,
	);

	// Check content has been placed into one of the possible groups
	expect(container).toHaveTextContent(/0|1|2|3|4|5|6|7|8|9|10|11/);
});
