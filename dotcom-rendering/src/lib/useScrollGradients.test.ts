import { act, renderHook } from '@testing-library/react';
import { useScrollGradients } from './useScrollGradients';

type Metrics = {
	scrollHeight: number;
	clientHeight: number;
	scrollTop: number;
};

/**
 * jsdom does no layout, so the scroll metrics are stubbed on a plain element
 * and can be changed between events.
 */
const setup = (initial: Metrics) => {
	const element = document.createElement('div');
	const metrics = { ...initial };
	Object.defineProperties(element, {
		scrollHeight: { get: () => metrics.scrollHeight },
		clientHeight: { get: () => metrics.clientHeight },
		scrollTop: { get: () => metrics.scrollTop },
	});
	const ref = { current: element };
	const hook = renderHook(() => useScrollGradients(ref));

	const scrollTo = (scrollTop: number) =>
		act(() => {
			metrics.scrollTop = scrollTop;
			element.dispatchEvent(new Event('scroll'));
		});

	return { element, metrics, scrollTo, ...hook };
};

describe('useScrollGradients', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.restoreAllMocks();
	});

	it('shows only the bottom gradient at the start of a scrollable list', () => {
		const { result } = setup({
			scrollHeight: 1000,
			clientHeight: 400,
			scrollTop: 0,
		});

		expect(result.current).toEqual({
			showTopGradient: false,
			showBottomGradient: true,
		});
	});

	it('shows no gradient when the list does not scroll', () => {
		const { result } = setup({
			scrollHeight: 400,
			clientHeight: 400,
			scrollTop: 0,
		});

		expect(result.current).toEqual({
			showTopGradient: false,
			showBottomGradient: false,
		});
	});

	it('updates both gradients while scrolling, without waiting for a pause', () => {
		const { result, scrollTo } = setup({
			scrollHeight: 1000,
			clientHeight: 400,
			scrollTop: 0,
		});

		// No timers are advanced below, so a debounced update would not show yet.
		scrollTo(200);
		expect(result.current).toEqual({
			showTopGradient: true,
			showBottomGradient: true,
		});

		scrollTo(600);
		expect(result.current).toEqual({
			showTopGradient: true,
			showBottomGradient: false,
		});

		scrollTo(0);
		expect(result.current).toEqual({
			showTopGradient: false,
			showBottomGradient: true,
		});
	});

	it('ignores a scroll of a few pixels from either end', () => {
		const { result, scrollTo } = setup({
			scrollHeight: 1000,
			clientHeight: 400,
			scrollTop: 0,
		});

		scrollTo(10);
		expect(result.current.showTopGradient).toBe(false);

		scrollTo(595);
		expect(result.current.showBottomGradient).toBe(false);
	});

	it('updates when the window is resized', () => {
		const { result, metrics } = setup({
			scrollHeight: 1000,
			clientHeight: 400,
			scrollTop: 0,
		});
		expect(result.current.showBottomGradient).toBe(true);

		act(() => {
			metrics.clientHeight = 1000;
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.showBottomGradient).toBe(false);
	});

	it('registers one handler for the life of the component and removes that same handler on unmount', () => {
		const element = document.createElement('div');
		const ref = { current: element };
		const addElementListener = jest.spyOn(element, 'addEventListener');
		const removeElementListener = jest.spyOn(
			element,
			'removeEventListener',
		);
		const addWindowListener = jest.spyOn(window, 'addEventListener');
		const removeWindowListener = jest.spyOn(window, 'removeEventListener');

		const { rerender, unmount } = renderHook(() => useScrollGradients(ref));
		rerender();

		const scrollCalls = addElementListener.mock.calls.filter(
			([type]) => type === 'scroll',
		);
		const resizeCalls = addWindowListener.mock.calls.filter(
			([type]) => type === 'resize',
		);
		expect(scrollCalls).toHaveLength(1);
		expect(resizeCalls).toHaveLength(1);

		unmount();

		expect(removeElementListener).toHaveBeenCalledWith(
			'scroll',
			scrollCalls[0]?.[1],
		);
		expect(removeWindowListener).toHaveBeenCalledWith(
			'resize',
			resizeCalls[0]?.[1],
		);
	});
});
