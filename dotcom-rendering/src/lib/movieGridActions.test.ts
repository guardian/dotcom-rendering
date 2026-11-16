import { handleMovieGridAction } from './movieGridActions';

const action = {
	event: 'copy_game',
	puzzle: 'on_the_ball',
	share_text: 'Film reveal results\n',
	share_url: 'https://guardian.go.link/1oRLv',
};

const original = Object.fromEntries(
	['clipboard', 'share', 'canShare'].map((key) => [
		key,
		Object.getOwnPropertyDescriptor(navigator, key),
	]),
);
const writeText = jest.fn().mockResolvedValue(undefined);
const share = jest.fn().mockResolvedValue(undefined);
const canShare = jest.fn().mockReturnValue(true);

describe('handleMovieGridAction', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		Object.defineProperties(navigator, {
			clipboard: { configurable: true, value: { writeText } },
			share: { configurable: true, value: share },
			canShare: { configurable: true, value: canShare },
		});
	});

	afterAll(() => {
		for (const [key, descriptor] of Object.entries(original)) {
			if (descriptor) Object.defineProperty(navigator, key, descriptor);
			else Reflect.deleteProperty(navigator, key);
		}
	});

	it('copies the results and provider share link', async () => {
		await handleMovieGridAction(action);
		expect(writeText).toHaveBeenCalledWith(
			'Film reveal results\nhttps://guardian.go.link/1oRLv',
		);
		expect(share).not.toHaveBeenCalled();
	});

	it('uses native sharing when supported', async () => {
		await handleMovieGridAction({ ...action, event: 'share_game' });
		expect(share).toHaveBeenCalledWith({
			text: action.share_text,
			url: action.share_url,
		});
		expect(writeText).not.toHaveBeenCalled();
	});

	it('copies results when native sharing is unavailable', async () => {
		Object.defineProperty(navigator, 'share', {
			configurable: true,
			value: undefined,
		});
		await handleMovieGridAction({ ...action, event: 'share_game' });
		expect(writeText).toHaveBeenCalledTimes(1);
	});

	it('does not copy after the reader cancels native sharing', async () => {
		share.mockRejectedValueOnce(
			new DOMException('Cancelled', 'AbortError'),
		);
		await expect(
			handleMovieGridAction({ ...action, event: 'share_game' }),
		).rejects.toThrow('Cancelled');
		expect(writeText).not.toHaveBeenCalled();
	});

	it.each([
		null,
		[],
		'copy_game',
		{ event: 'end_game' },
		{ ...action, share_text: 4 },
		{ ...action, share_url: 'javascript:alert(1)' },
		{ ...action, share_url: 'not-a-url' },
	])('ignores unsupported or malformed messages: %p', async (raw) => {
		await handleMovieGridAction(raw);
		expect(writeText).not.toHaveBeenCalled();
		expect(share).not.toHaveBeenCalled();
	});
});
