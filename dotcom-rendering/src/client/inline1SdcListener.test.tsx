import { act, screen, waitFor } from '@testing-library/react';
import { props as inline1Props } from '../components/marketing/inline1/utils/storybook';
import { inline1SdcListener } from './inline1SdcListener';

jest.mock('../components/marketing/inline1/SupporterRevenue', () => ({
	SupporterRevenue: () => <div data-testid="supporter-revenue" />,
}));

const SLOT_ID = 'dfp-ad--inline1';

const addSlot = () => {
	document.body.innerHTML = `<div id="${SLOT_ID}">ad</div>`;
	return document.getElementById(SLOT_ID) as HTMLElement;
};

const dispatch = (slot: HTMLElement) =>
	slot.dispatchEvent(
		new CustomEvent('commercial.sdc-render', {
			bubbles: true,
			detail: { props: inline1Props },
		}),
	);

describe('inline1SdcListener', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		delete window.guardian.commercial?.sdc;
	});

	it('renders a request made before listener was set up', async () => {
		addSlot();
		(window.guardian.commercial ??= {}).sdc = {
			inline1: { slotId: SLOT_ID, props: inline1Props },
		};

		await act(() => inline1SdcListener());

		await waitFor(() =>
			expect(screen.getByTestId('supporter-revenue')).toBeInTheDocument(),
		);
	});

	it('renders a request made after listener was set up', async () => {
		const slot = addSlot();
		await inline1SdcListener();

		act(() => void dispatch(slot));

		await waitFor(() =>
			expect(screen.getByTestId('supporter-revenue')).toBeInTheDocument(),
		);
	});

	it('renders nothing when no request', async () => {
		addSlot();

		await act(async () => {
			await inline1SdcListener();
		});

		expect(
			screen.queryByTestId('supporter-revenue'),
		).not.toBeInTheDocument();
		expect(document.getElementById(SLOT_ID)).toHaveTextContent('ad');
	});
});
