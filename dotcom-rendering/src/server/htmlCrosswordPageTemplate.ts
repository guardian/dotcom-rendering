interface Props {
	html: string;
	scriptTags: string[];
}

export const htmlCrosswordPageTemplate = (props: Props): string => {
	const { html, scriptTags } = props;

	return `<!doctype html>
        <html lang="en">
            <head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				<meta name="robots" content="noindex">
                ${scriptTags.join('\n')}
			</head>
			<body>
                ${html}
            </body>
        </html>`;
};
