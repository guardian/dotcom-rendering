import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';

interface Props {
	/** The already-resolved iframe src URL (with `{slug}` substituted). */
	src: string;
	title: string;
}

const frameStyles = css`
	width: 100%;
	min-height: 500px;
	border: none;
`;

/**
 * The shape posted to the puzzle iframe once it has loaded, carrying the
 * current Guardian user's identity so puzzle providers (AmuseLabs,
 * Wordiply) can personalise / save progress against a real account rather
 * than an anonymous session.
 *
 * `userId` is the reader's `idToken.claims.legacy_identity_id` (their
 * Guardian "identity ID", the same identifier already used to build
 * MyAccount links elsewhere in DCR - see `TopBarMyAccount.tsx`) - not the
 * OIDC `sub` claim some newer API integrations elsewhere in DCR use
 * instead. `undefined` when the reader is signed out (or the auth check
 * hasn't resolved yet).
 *
 * Whether `legacy_identity_id` is actually the ID format AmuseLabs/Wordiply
 * expect has not been confirmed with those providers - see the "Open
 * questions" section of docs/puzzle-page.md.
 */
export interface PuzzleUserMessage {
	type: 'guardian-puzzle-user';
	userId: string | undefined;
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
 * Appends `userId` as a query parameter to `src`, preserving any existing
 * query parameters (e.g. AmuseLabs' `?set=...&embed=1&idx=1`). Returns
 * `src` unchanged when there is no signed-in user, or if `src` cannot be
 * parsed as an absolute URL.
 */
export const buildPuzzleIframeSrc = (
	src: string,
	userId: string | undefined,
): string => {
	if (!userId) return src;

	try {
		const url = new URL(src);
		url.searchParams.set('userId', userId);
		return url.toString();
	} catch {
		return src;
	}
};

const postUserMessage = (
	iframe: HTMLIFrameElement,
	userId: string | undefined,
) => {
	const message: PuzzleUserMessage = {
		type: 'guardian-puzzle-user',
		userId,
	};
	iframe.contentWindow?.postMessage(message, '*');
};

/**
 * Generic sandboxed iframe wrapper for third-party (or in-house, non-React)
 * puzzle providers, such as AmuseLabs-hosted puzzles or bespoke providers
 * like wordiply.com. Used for every `PuzzleConfig` entry (all iframe-based).
 *
 * Passes the current signed-in user's identity to the puzzle provider two
 * ways: as a `userId` query parameter on the iframe `src` (so it is present
 * from the very first request the iframe makes), and via `postMessage` once
 * the iframe has loaded (`{ type: 'guardian-puzzle-user', userId }` - see
 * `PuzzleUserMessage`). Because `src` is derived from the reactive
 * `usePuzzleUserId()` result, the iframe is automatically reloaded by the
 * browser (a fresh `src` triggers a new navigation) whenever the reader's
 * sign-in state changes while on the page - no manual reload/`postMessage`
 * fallback is needed for that case, though the `onLoad` `postMessage` still
 * fires again after each such reload too.
 */
export const PuzzleIframe = ({ src, title }: Props) => {
	const userId = usePuzzleUserId();
	const iframeSrc = buildPuzzleIframeSrc(src, userId);

	return (
		<iframe
			css={frameStyles}
			src={iframeSrc}
			title={title}
			loading="lazy"
			sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
			onLoad={(event) => postUserMessage(event.currentTarget, userId)}
		/>
	);
};
