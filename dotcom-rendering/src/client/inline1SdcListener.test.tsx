import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import { act, screen, waitFor } from '@testing-library/react';
import {
	props as inline1Props,
	newsletterProps,
} from '../components/marketing/inline1/utils/storybook';
import type { Config } from '../types/configContext';
import { inline1SdcListener } from './inline1SdcListener';
import { getConfig } from './islands/getConfig';

jest.mock('../components/marketing/inline1/SupporterRevenue', () => ({
	SupporterRevenue: () => <div data-testid="supporter-revenue" />,
}));

jest.mock('../components/marketing/inline1/Newsletter', () => ({
	Newsletter: () => <div data-testid="newsletter" />,
}));

jest.mock('../components/marketing/inline1/puzzles/Puzzles', () => ({
	Puzzles: () => <div data-testid="puzzles" />,
}));

jest.mock('./islands/getConfig');

const mockConfig = {
	renderingTarget: 'Web',
	darkModeAvailable: false,
	assetOrigin: '/',
	editionId: 'UK',
} satisfies Config;

const SLOT_ID = 'dfp-ad--inline1';

const puzzlesProps: Inline1Props = {
	...inline1Props,
	variant: {
		name: 'Inline1PuzzlesMessage',
		message: { type: 'Inline1PuzzlesMessage' },
	},
};

const messages = [
	{ name: 'support', props: inline1Props, testId: 'supporter-revenue' },
	{ name: 'newsletter', props: newsletterProps, testId: 'newsletter' },
	{ name: 'puzzles', props: puzzlesProps, testId: 'puzzles' },
];

const addSlot = () => {
	document.body.innerHTML = `<div id="${SLOT_ID}">ad</div>`;
	return document.getElementById(SLOT_ID) as HTMLElement;
};

const dispatch = (slot: HTMLElement, props: Inline1Props) =>
	slot.dispatchEvent(
		new CustomEvent('commercial.sdc-render', {
			bubbles: true,
			detail: { props },
		}),
	);

describe('inline1SdcListener', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		delete window.guardian.commercial?.sdc;
		jest.mocked(getConfig).mockReturnValue(mockConfig);
	});

	it.each(messages)(
		'renders $name requested before listener setup',
		async ({ props, testId }) => {
			addSlot();
			(window.guardian.commercial ??= {}).sdc = {
				inline1: { slotId: SLOT_ID, props },
			};

			await act(() => inline1SdcListener());

			await waitFor(() =>
				expect(screen.getByTestId(testId)).toBeInTheDocument(),
			);
		},
	);

	it.each(messages)(
		'renders $name requested after listener setup',
		async ({ props, testId }) => {
			const slot = addSlot();
			await inline1SdcListener();

			act(() => void dispatch(slot, props));

			await waitFor(() =>
				expect(screen.getByTestId(testId)).toBeInTheDocument(),
			);
		},
	);

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
