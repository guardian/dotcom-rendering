import { useEffect, useRef, useState } from 'react';
import { useAuthStatus } from '../lib/useAuthStatus';

type Props = {
	src: string;
	title: string;
	height?: string;
	mobileMargin?: string;
};

type PuzzleMeConfig = {
	basePath: string;
	scriptSrc: string;
	set: string;
	page?: string;
	id?: string;
	puzzleType?: string;
};

type PMConfig = {
	PM_BasePath?: string;
	getUID?: () => string | undefined;
};

declare global {
	interface Window {
		PM_Config?: PMConfig;
	}
}

const parsePuzzleMeUrl = (src: string): PuzzleMeConfig | undefined => {
	const url = new URL(src);

	if (!url.hostname.endsWith('amuselabs.com')) return;

	const pathParts = url.pathname.split('/').filter(Boolean);
	const [publisherPath, page] = pathParts;
	const sets = url.searchParams.getAll('set');
	const set = sets.length === 1 ? sets[0] : undefined;

	if (!publisherPath || !set) return;

	return {
		basePath: `${url.origin}/${publisherPath}/`,
		scriptSrc: `${url.origin}/${publisherPath}/js/puzzleme-embed.js`,
		set,
		page: page ?? undefined,
		id: url.searchParams.get('id') ?? undefined,
		puzzleType: url.searchParams.get('puzzleType') ?? undefined,
	};
};

const loadScript = (scriptSrc: string): Promise<void> =>
	new Promise((resolve, reject) => {
		const existingScript = document.querySelector<HTMLScriptElement>(
			`script[src="${scriptSrc}"]`,
		);

		if (existingScript) {
			resolve();
			return;
		}

		const script = document.createElement('script');
		script.id = 'pm-script';
		script.src = scriptSrc;
		script.async = true;
		script.addEventListener('load', () => resolve(), { once: true });
		script.addEventListener(
			'error',
			() =>
				reject(
					new Error(`Unable to load PuzzleMe script: ${scriptSrc}`),
				),
			{ once: true },
		);
		document.head.append(script);
	});

export const PuzzleMeEmbed = ({
	src,
	title,
	height = '900px',
	mobileMargin = '10px',
}: Props) => {
	const authStatus = useAuthStatus();
	const embedRef = useRef<HTMLDivElement>(null);
	const [config] = useState(() => parsePuzzleMeUrl(src));
	const [scriptLoaded, setScriptLoaded] = useState(false);

	useEffect(() => {
		if (!config || authStatus.kind === 'Pending') return;

		let cancelled = false;

		const initialise = async () => {
			window.PM_Config = window.PM_Config ?? {};
			window.PM_Config.PM_BasePath = config.basePath;

			if (authStatus.kind === 'SignedIn') {
				const guardianUserId =
					authStatus.idToken.claims.legacy_identity_id ??
					authStatus.idToken.claims.sub;

				if (guardianUserId) {
					embedRef.current?.setAttribute('data-uid', guardianUserId);
					window.PM_Config.getUID = () => guardianUserId;
				}
			}

			if (!cancelled) {
				await loadScript(config.scriptSrc);
				setScriptLoaded(true);
			}
		};

		void initialise();

		return () => {
			cancelled = true;
		};
	}, [authStatus, config]);

	if (!config) {
		return (
			<iframe
				allow="clipboard-write; fullscreen"
				src={src}
				title={title}
			/>
		);
	}

	return (
		<div className="puzzle-me-embed">
			<div
				ref={embedRef}
				className="pm-embed-div"
				data-id={config.id}
				data-set={config.set}
				data-page={config.page}
				data-puzzletype={config.puzzleType}
				data-height={height}
				data-mobilemargin={mobileMargin}
			/>
			{!scriptLoaded && (
				<iframe
					allow="clipboard-write; fullscreen"
					src={src}
					title={title}
				/>
			)}
		</div>
	);
};
