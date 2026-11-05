import { useEffect, useState } from 'react';
import { getAuthStatus, subscribeToAuthStateChange } from './identity';

interface PuzzleGame {
	slug: string;
	puzzleDate: string | null;
	sourceUrl?: string;
	gameUrl?: string;
	userId?: string;
	hasError: boolean;
}

/** Resolve game URLs through frontend, adding reader authentication when available. */
export const usePuzzleGame = (
	slug: string,
	puzzleDate: string | null,
	sourceUrl?: string,
): {
	gameUrl?: string;
	userId?: string;
	isResolved: boolean;
	hasError: boolean;
} => {
	const [game, setGame] = useState<PuzzleGame>();

	useEffect(() => {
		let generation = 0;
		let controller: AbortController | undefined;
		const refresh = () => {
			const current = ++generation;
			controller?.abort();
			setGame(undefined);
			void (async () => {
				const auth = await getAuthStatus();
				if (current !== generation) return;
				let gameUrl = sourceUrl;
				if (sourceUrl !== undefined && puzzleDate !== null) {
					const headers: Record<string, string> = {
						Accept: 'application/json',
					};
					if (auth.kind === 'SignedIn') {
						headers.Authorization = `Bearer ${auth.accessToken.accessToken}`;
					}
					controller = new AbortController();
					const response = await fetch(
						`${window.guardian.config.page.ajaxUrl}/puzzles-and-games/game/${encodeURIComponent(slug)}/${encodeURIComponent(puzzleDate)}.json`,
						{
							cache: 'no-store',
							credentials: 'same-origin',
							headers,
							signal: controller.signal,
						},
					);
					if (!response.ok) {
						throw new Error('Puzzle game lookup failed');
					}
					const data: unknown = await response.json();
					if (
						typeof data !== 'object' ||
						data === null ||
						!('gameUrl' in data) ||
						typeof data.gameUrl !== 'string'
					) {
						throw new Error('Missing puzzle game URL');
					}
					const url = new URL(data.gameUrl);
					if (url.protocol !== 'https:' && url.protocol !== 'http:') {
						throw new Error('Invalid puzzle game URL');
					}
					gameUrl = data.gameUrl;
				}
				if (current !== generation) return;
				setGame({
					slug,
					puzzleDate,
					sourceUrl,
					gameUrl,
					userId:
						auth.kind === 'SignedIn'
							? auth.idToken.claims.legacy_identity_id
							: undefined,
					hasError: false,
				});
			})().catch(() => {
				if (current !== generation) return;
				setGame({ slug, puzzleDate, sourceUrl, hasError: true });
			});
		};

		refresh();
		const unsubscribe = subscribeToAuthStateChange(refresh);
		return () => {
			generation++;
			controller?.abort();
			unsubscribe();
		};
	}, [slug, puzzleDate, sourceUrl]);

	// A new selection must not briefly load the preceding puzzle's URL.
	const current =
		game?.slug === slug &&
		game.puzzleDate === puzzleDate &&
		game.sourceUrl === sourceUrl
			? game
			: undefined;
	return {
		gameUrl: current?.gameUrl,
		userId: current?.userId,
		isResolved: current !== undefined,
		hasError: current?.hasError ?? false,
	};
};
