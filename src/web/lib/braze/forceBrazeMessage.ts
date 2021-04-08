const FORCE_BRAZE_ALLOWLIST = [
	'preview.gutools.co.uk',
	'preview.code.dev-gutools.co.uk',
	'localhost',
	'm.thegulocal.com',
];

type Meta = {
	dataFromBraze: {
		[key: string]: string;
	};
	logImpressionWithBraze: () => void;
	logButtonClickWithBraze: (id: number) => void;
};

export const getBrazeMetaFromUrlFragment = (): Meta | null => {
	if (window.location.hash) {
		// This is intended for use on development domains for preview purposes.
		// It won't run in PROD.

		const key = 'force-braze-message';

		const hashString = window.location.hash;

		if (hashString.includes(key)) {
			if (!FORCE_BRAZE_ALLOWLIST.includes(window.location.hostname)) {
				// eslint-disable-next-line no-console
				console.log(`${key} is not supported on this domain`);
				return null;
			}

			const forcedMessage = hashString.slice(
				hashString.indexOf(`${key}=`) + key.length + 1,
				hashString.length,
			);

			try {
				const dataFromBraze = JSON.parse(
					decodeURIComponent(forcedMessage),
				);

				return {
					dataFromBraze,
					logImpressionWithBraze: () => {},
					logButtonClickWithBraze: () => {},
				};
			} catch (e) {
				const error = e as Error;
				// Parsing failed. Log a message and fall through.
				// eslint-disable-next-line no-console
				console.log(`There was an error with ${key}: `, error.message);
			}
		}
	}

	return null;
};
