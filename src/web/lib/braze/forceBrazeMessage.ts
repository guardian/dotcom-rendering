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

export const getBrazeMetaFromQueryString = (): Meta | null => {
	if (URLSearchParams) {
		const qsArg = 'force-braze-message';

		const params = new URLSearchParams(window.location.search);
		const value = params.get(qsArg);
		if (value) {
			if (!FORCE_BRAZE_ALLOWLIST.includes(window.location.hostname)) {
				// eslint-disable-next-line no-console
				console.log(`${qsArg} is not supported on this domain`);
				return null;
			}

			try {
				const dataFromBraze = JSON.parse(value);

				return {
					dataFromBraze,
					logImpressionWithBraze: () => {},
					logButtonClickWithBraze: () => {},
				};
			} catch (e) {
				const error = e as Error;
				// Parsing failed. Log a message and fall through.
				// eslint-disable-next-line no-console
				console.log(
					`There was an error with ${qsArg}: `,
					error.message,
				);
			}
		}
	}

	return null;
};
