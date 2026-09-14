import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import { useMatchMedia } from '../lib/useMatchMedia';

interface Props {
	/** The already-resolved iframe src URL (with `{slug}` substituted). */
	src: string;
	title: string;
	/**
	 * Whether dark mode is available for this page/request at all (the
	 * `webx-dark-mode-web` server-side AB test flag, already threaded down
	 * from `PuzzlePage.tsx`/`useConfig()` the same way it reaches
	 * `rootStyles()`). Combined client-side with the reader's real OS/browser
	 * preference (`prefers-color-scheme`) to decide `PuzzleContext.darkMode`.
	 */
	darkModeAvailable: boolean;
}

const frameStyles = css`
	width: 100%;
	min-height: 500px;
	border: none;
`;

/**
 * The context posted to (and encoded in the URL of) the puzzle iframe,
 * carrying enough about the current Guardian reader for puzzle providers
 * (AmuseLabs, Wordiply) to personalise/save progress against a real
 * account and render consistently with the reader's colour scheme, rather
 * than guessing at either.
 */
export interface PuzzleContext {
	/**
	 * The reader's `idToken.claims.legacy_identity_id` (their Guardian
	 * "identity ID", the same identifier already used to build MyAccount
	 * links elsewhere in DCR - see `TopBarMyAccount.tsx`) - not the OIDC
	 * `sub` claim some newer API integrations elsewhere in DCR use instead.
	 * `null` when the reader is signed out (or the auth check hasn't
	 * resolved yet).
	 *
	 * Whether `legacy_identity_id` is actually the ID format
	 * AmuseLabs/Wordiply expect has not been confirmed with those providers
	 * - see the "Open questions" section of docs/puzzle-page.md.
	 */
	userId: string | null;
	/**
	 * Whether dark mode is currently actually active for this reader: both
	 * `darkModeAvailable` (the server-side AB flag for this page/request)
	 * AND the reader's OS/browser actually preferring dark
	 * (`prefers-color-scheme: dark`) must be true. See `usePuzzleDarkMode`.
	 */
	darkMode: boolean;
}

export interface PuzzleContextMessage {
	type: 'guardian-puzzle-context';
	context: PuzzleContext;
}

/**
 * Reactively resolves the current signed-in user's Guardian identity ID (or
 * `undefined` if signed out/unknown), re-checking whenever the underlying
 * identity-auth client reports an auth state change (e.g. the reader signs
 * in or out while already on this page, via a sign-in modal or another
 * tab) - not just once on mount.
 */
const usePuzzleUserId = (): string | undefined => {
	const [userId, setUserId] = useState<string | undefined>(undefined);

	useEffect(() => {
		let isMounted = true;

		const refresh = () => {
			void getAuthStatus().then((authStatus) => {
				if (!isMounted) return;
				setUserId(
					authStatus.kind === 'SignedIn'
						? authStatus.idToken.claims.legacy_identity_id
						: undefined,
				);
			});
		};

		refresh();
		const unsubscribe = subscribeToAuthStateChange(refresh);

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, []);

	return userId;
};

/**
 * Reactively resolves whether dark mode is currently actually active:
 * returns `false` immediately (without touching `matchMedia` at all) when
 * `darkModeAvailable` is `false` for this page/request; otherwise reuses
 * the existing, generic `useMatchMedia` hook (already used elsewhere in DCR
 * for `prefers-color-scheme` and other media queries) to check - and stay
 * reactively subscribed to - the reader's real OS/browser preference, so
 * this updates live if the reader switches their OS theme while the page
 * is open.
 */
const usePuzzleDarkMode = (darkModeAvailable: boolean): boolean => {
	const prefersDark = useMatchMedia('(prefers-color-scheme: dark)');
	return darkModeAvailable && prefersDark;
};

const buildPuzzleContext = (
	userId: string | undefined,
	darkMode: boolean,
): PuzzleContext => ({
	userId: userId ?? null,
	darkMode,
});

/**
 * Encodes `context` as JSON into a `guardian-puzzle-context` query
 * parameter on `src`, preserving any existing query parameters (e.g.
 * AmuseLabs' `?set=...&embed=1&idx=1`). Always includes the parameter -
 * unlike the previous `userId`-only mechanism, the context shape itself
 * always carries both fields, so there's no "nothing to add" case to omit
 * it for. Returns `src` unchanged if it cannot be parsed as an absolute
 * URL.
 */
export const buildPuzzleIframeSrcWithContext = (
	src: string,
	context: PuzzleContext,
): string => {
	try {
		const url = new URL(src);
		url.searchParams.set(
			'guardian-puzzle-context',
			JSON.stringify(context),
		);
		return url.toString();
	} catch {
		return src;
	}
};

const postContextMessage = (
	iframe: HTMLIFrameElement,
	context: PuzzleContext,
) => {
	const message: PuzzleContextMessage = {
		type: 'guardian-puzzle-context',
		context,
	};
	iframe.contentWindow?.postMessage(message, '*');
};

/**
 * Generic sandboxed iframe wrapper for third-party (or in-house, non-React)
 * puzzle providers, such as AmuseLabs-hosted puzzles or bespoke providers
 * like wordiply.com. Used for every `PuzzleConfig` entry (all iframe-based).
 *
 * Passes a `PuzzleContext` (the current signed-in user's identity, and
 * whether dark mode is currently active) to the puzzle provider two ways:
 * as a `guardian-puzzle-context` query parameter (JSON-encoded) on the
 * iframe `src` (so it is present from the very first request the iframe
 * makes), and via `postMessage` once the iframe has loaded (`{ type:
 * 'guardian-puzzle-context', context }` - see `PuzzleContextMessage`).
 * Because `src` is derived from the reactive `usePuzzleUserId()`/
 * `usePuzzleDarkMode()` results, the iframe is automatically reloaded by
 * the browser (a fresh `src` triggers a new navigation) whenever the
 * reader's sign-in state or OS colour-scheme preference changes while on
 * the page - no manual reload fallback is needed for that case, though the
 * `onLoad` `postMessage` still fires again after each such reload too.
 */
export const PuzzleIframe = ({ src, title, darkModeAvailable }: Props) => {
	const userId = usePuzzleUserId();
	const darkMode = usePuzzleDarkMode(darkModeAvailable);
	const context = buildPuzzleContext(userId, darkMode);
	const iframeSrc = buildPuzzleIframeSrcWithContext(src, context);

	return (
		<iframe
			css={frameStyles}
			src={iframeSrc}
			title={title}
			loading="lazy"
			sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
			onLoad={(event) => postContextMessage(event.currentTarget, context)}
		/>
	);
};
