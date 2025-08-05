import { render } from '@testing-library/react';
import { Island } from './Island';

describe('IslandContext tracks nesting of islands', () => {
	test('Single island', () => {
		const { container } = render(
			<Island priority="feature" defer={{ until: 'visible' }}>
				<span>🏝️</span>
			</Island>,
		);
		const islands = container.querySelectorAll('gu-island');
		expect(islands.length).toBe(1);
	});

	test('Nested island', () => {
		const { container } = render(
			<Island priority="feature" defer={{ until: 'visible' }}>
				<div>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<span>🏝️</span>
					</Island>
				</div>
			</Island>,
		);
		const islands = container.querySelectorAll('gu-island');
		expect(islands.length).toBe(1);
	});

	test('Multiple nested islands', () => {
		const { container } = render(
			<Island priority="critical">
				<div>
					<Island priority="critical">
						<div>
							<Island priority="critical">
								<span>🏝️</span>
							</Island>
							<Island priority="critical">
								<span>🏝️</span>
							</Island>
						</div>
					</Island>
				</div>
			</Island>,
		);
		const islands = container.querySelectorAll('gu-island');
		expect(islands.length).toBe(1);
	});

	test('Parent island includes props for child islands', () => {
		const { container } = render(
			<Island priority="feature" defer={{ until: 'visible' }}>
				<div>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<span className="archipelago">🏝️</span>
					</Island>
				</div>
			</Island>,
		);
		const island = container.querySelector('gu-island');
		expect(island).toHaveAttribute(
			'props',
			expect.stringContaining(
				'"props":{"className":"archipelago","children":"🏝️"}',
			),
		);
	});
});
