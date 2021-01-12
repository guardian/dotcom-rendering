import React from 'react';
import { record } from '@root/src/web/browser/ophan/ophan';
import { pickBanner, CanShowResult } from './bannerPicker';

jest.mock('@root/src/web/browser/ophan/ophan', () => ({
	record: jest.fn(),
}));

jest.useFakeTimers();

// Wait for all unsettled promises to complete before finishing the test. Not
// doing this results in a warning from Jest. Note that it's actually expected
// that there may be outstanding promises when a test completes becuase the the
// banner picker returns when the canShow of a banner resolves, even if there
// are lower priority banners still pending.
const flushPromises = () => new Promise(setImmediate);
afterEach(async () => {
	await flushPromises();
});

describe('pickBanner', () => {
	it('resolves with the highest priority banner which can show', async () => {
		const MockComponent = () => <div />;
		const ChosenMockComponent = () => <div />;
		const config = [
			{
				id: 'banner-1',
				canShow: () => Promise.resolve({ result: false }),
				show: () => MockComponent,
				timeoutMillis: null,
			},
			{
				id: 'banner-2',
				canShow: () => Promise.resolve({ result: true }),
				show: () => ChosenMockComponent,
				timeoutMillis: null,
			},
			{
				id: 'banner-3',
				canShow: () => Promise.resolve({ result: true }),
				show: () => MockComponent,
				timeoutMillis: null,
			},
		];

		const got = await pickBanner(config);

		expect(got()).toEqual(ChosenMockComponent);
	});

	it('resolves with null if no banners can show', async () => {
		const MockComponent = () => <div />;

		const config = [
			{
				id: 'banner-1',
				canShow: () => Promise.resolve({ result: false }),
				show: () => MockComponent,
				timeoutMillis: null,
			},
			{
				id: 'banner-2',
				canShow: () => Promise.resolve({ result: false }),
				show: () => MockComponent,
				timeoutMillis: null,
			},
		];

		const got = await pickBanner(config);

		expect(got()).toEqual(null);
	});

	it('falls through to a lower priority banner when a higher one times out', async () => {
		const MockComponent = () => <div />;
		const ChosenMockComponent = () => <div />;
		const config = [
			{
				id: 'banner-1',
				canShow: (): Promise<CanShowResult> =>
					new Promise((resolve) =>
						setTimeout(() => resolve({ result: true }), 500),
					),
				show: () => MockComponent,
				timeoutMillis: 250,
			},
			{
				id: 'banner-2',
				canShow: () => Promise.resolve({ result: true }),
				show: () => ChosenMockComponent,
				timeoutMillis: null,
			},
		];

		const bannerPromise = pickBanner(config);
		jest.advanceTimersByTime(260);
		const got = await bannerPromise;

		expect(got()).toEqual(ChosenMockComponent);
	});

	it('resolves with null if all banners time out', async () => {
		const MockComponent = () => <div />;
		let timer1;
		let timer2;
		const config = [
			{
				id: 'banner-1',
				canShow: (): Promise<CanShowResult> =>
					new Promise((resolve) => {
						timer1 = setTimeout(
							() => resolve({ result: true }),
							500,
						);
					}),
				show: () => MockComponent,
				timeoutMillis: 250,
			},
			{
				id: 'banner-2',
				canShow: (): Promise<CanShowResult> =>
					new Promise((resolve) => {
						timer2 = setTimeout(
							() => resolve({ result: true }),
							500,
						);
					}),
				show: () => MockComponent,
				timeoutMillis: 250,
			},
		];

		const bannerPromise = pickBanner(config);
		jest.advanceTimersByTime(260);
		const got = await bannerPromise;

		expect(got()).toEqual(null);

		clearTimeout(timer1);
		clearTimeout(timer2);
	});

	it('passes metadata returned by canShow to show', async () => {
		const renderComponent = jest.fn(() => () => <div />);
		const meta = { extra: 'info' };
		const config = [
			{
				id: 'banner-1',
				canShow: () =>
					Promise.resolve({
						result: true,
						meta,
					}),
				show: renderComponent,
				timeoutMillis: null,
			},
		];

		const show = await pickBanner(config);
		show();

		expect(renderComponent).toHaveBeenCalledWith(meta);
	});

	it('sends a message to ophan when a banner canShow times out', async () => {
		const MockComponent = () => <div />;
		let timer;
		const config = [
			{
				id: 'example-banner',
				canShow: (): Promise<CanShowResult> =>
					new Promise((resolve) => {
						timer = setTimeout(
							() => resolve({ result: true }),
							300,
						);
					}),
				show: () => MockComponent,
				timeoutMillis: 200,
			},
		];

		const bannerPromise = pickBanner(config);
		jest.advanceTimersByTime(250);
		const got = await bannerPromise;

		expect(got()).toEqual(null);
		expect(record).toHaveBeenCalledWith({
			component: 'banner-picker-timeout-dcr',
			value: config[0].id,
		});

		clearTimeout(timer);
	});
});
