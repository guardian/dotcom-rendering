type MovieGridAction = {
	event: 'copy_game' | 'share_game';
	text: string;
	url: string;
};

const actionOf = (raw: unknown): MovieGridAction | undefined => {
	if (typeof raw !== 'object' || raw === null) return undefined;
	if (
		!('event' in raw) ||
		(raw.event !== 'copy_game' && raw.event !== 'share_game')
	) {
		return undefined;
	}
	if (!('share_text' in raw) || typeof raw.share_text !== 'string') {
		return undefined;
	}
	if (!('share_url' in raw) || typeof raw.share_url !== 'string') {
		return undefined;
	}
	try {
		const url = new URL(raw.share_url);
		if (url.protocol !== 'https:') return undefined;
		return { event: raw.event, text: raw.share_text, url: url.toString() };
	} catch {
		return undefined;
	}
};

/** Called only for messages from the current MovieGrid iframe's origin and window. */
export const handleMovieGridAction = async (raw: unknown): Promise<void> => {
	const action = actionOf(raw);
	if (!action) return;
	const data: ShareData = { text: action.text, url: action.url };
	if (
		action.event === 'share_game' &&
		navigator.share &&
		navigator.canShare?.(data)
	) {
		await navigator.share(data);
	} else if (navigator.clipboard) {
		await navigator.clipboard.writeText(
			`${action.text.trimEnd()}\n${action.url}`,
		);
	}
};
