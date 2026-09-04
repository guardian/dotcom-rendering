import { render } from '@testing-library/react';
import { ConfigProvider } from '../components/ConfigContext';
import { InteractiveAtom } from '../components/InteractiveAtom';
import { InteractiveLayoutAtom } from '../components/InteractiveLayoutAtom';

const mockCustomData = JSON.stringify({ key: 'value' });

describe('Interactive atom custom data attributes', () => {
	it('should inject custom data into srcDoc for InteractiveAtom on web', () => {
		const { container } = render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: true,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<InteractiveAtom
					id="test-id"
					title="Test Title"
					customData={mockCustomData}
				/>
			</ConfigProvider>,
		);
		const iframe = container.querySelector('iframe');
		expect(iframe?.srcdoc).toContain(
			`window.__atomCustomData = ${mockCustomData}`,
		);
	});

	it('should inject custom data into srcDoc for InteractiveAtom on apps', () => {
		const { container } = render(
			<ConfigProvider
				value={{
					renderingTarget: 'Apps',
					darkModeAvailable: true,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<InteractiveAtom
					id="test-id"
					title="Test Title"
					customData={mockCustomData}
				/>
			</ConfigProvider>,
		);
		const iframe = container.querySelector('iframe');
		expect(iframe?.srcdoc).toContain(
			`window.__atomCustomData = ${mockCustomData}`,
		);
	});

	it('should add custom data attribute to InteractiveLayoutAtom', () => {
		const { container } = render(
			<InteractiveLayoutAtom id="test-id" customData={mockCustomData} />,
		);
		const el = container.querySelector(
			`[data-atom-custom-data='${mockCustomData}']`,
		);
		expect(el).toBeInTheDocument();
	});
});
