import { render } from '@testing-library/react';
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
		it.each(['Web', 'Apps'] as const)(
			'provides correct context through useConfig hook with renderingTarget: "%s"',
			(renderingTarget) => {
				const config = { renderingTarget };
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
					renderingTarget,
				);
			},
		);
	});
});
