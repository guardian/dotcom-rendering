import { escapeData } from '../lib/escapeData';
import type { Guardian } from '../model/guardian';
import type { Config } from '../types/configContext';

interface Props {
	html: string;
	guardian: Guardian;
	scriptTags: string[];
	config: Config;
}

export const htmlCrosswordPageTemplate = (props: Props): string => {
	const { html, guardian, scriptTags, config } = props;

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(JSON.stringify(guardian));

	return `<!doctype html>
        <html lang="en">
            <head>
                <title>Crossword</title>
                <meta name="description" content="" />
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				<meta name="robots" content="noindex">
                <script>
                    window.guardian = ${windowGuardian};
                </script>
                <script type="module">
                    window.guardian.mustardCut = true;
                </script>
                <script nomodule>
                    // Browser fails mustard check
                    window.guardian.mustardCut = false;
                </script>
        <script id="config" type="application/json">
          ${JSON.stringify(config)}
        </script>
                ${scriptTags.join('\n')}
			</head>
			<body >
                ${html}
            </body>
        </html>`;
};
