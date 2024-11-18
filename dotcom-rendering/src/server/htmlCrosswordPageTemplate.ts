import type { Config } from '../types/configContext';

interface Props {
	html: string;
	scriptTags: string[];
	config: Config;
}

export const htmlCrosswordPageTemplate = (props: Props): string => {
	const { html, scriptTags, config } = props;

	return `<!doctype html>
        <html lang="en">
            <head>
                <title>Crossword</title>
                <meta name="description" content="" />
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				<meta name="robots" content="noindex">
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
