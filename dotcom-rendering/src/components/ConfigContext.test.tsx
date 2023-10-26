import { render } from '@testing-library/react';
import type { Config } from '../types/configContext';
import { ConfigProvider, useConfig } from './ConfigContext';

const testId = 'testId';
const TestComponent = () => {
	const config = useConfig();
	return (
		<div data-testid={testId}>
			<p>{JSON.stringify(config)}</p>
		</div>
	);
};

describe('ConfigContext', () => {
	describe('without ConfigProvider', () => {
		it('does not allow use of the useConfig hook without being inside ConfigProvider', () => {
			expect(() => TestComponent()).toThrowError();
		});
	});

	describe('with ConfigProvider', () => {
		it.each([
			{ renderingTarget: 'Web' },
			{ renderingTarget: 'Apps', darkModeAvailable: true },
			{ renderingTarget: 'Apps', darkModeAvailable: false },
		] as const satisfies ReadonlyArray<Config>)(
			'useConfig hook provides correct config: "%o"',
			(config) => {
				const Component = () => {
					return (
						<ConfigProvider value={config}>
							<TestComponent />
						</ConfigProvider>
					);
				};
				const { getByTestId, getByText } = render(<Component />);

				expect(getByTestId(testId)).toBeInTheDocument();
				expect(getByText(/renderingTarget/)).toHaveTextContent(
					config.renderingTarget,
				);
			},
		);
	});
});
