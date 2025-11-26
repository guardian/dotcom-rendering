import { createHash } from 'node:crypto';
import { isString } from '@guardian/libs';
import { type RequestHandler } from 'express';
import { renderToString } from 'react-dom/server';
import { generateScriptTags, getPathFromManifest } from '../lib/assets';
import {
	type FontDisplay,
	fontList,
	rawFontsCssWithClassNames,
} from '../lib/fonts-css';

export const handleAppsAssets: RequestHandler = (req, res) => {
	const clientScripts = [
		getPathFromManifest('client.apps', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags([...clientScripts]);
	const html = buildHtml(scriptTags);
	res.status(200).send(html);
};

type Props = {
	fontList: FontDisplay[];
};

export const buildHtml = (scriptTags: string[]) => {
	const body = renderToString(<AssetsPage fontList={fontList} />);

	return `<!doctype html>
		<html lang='en'>
			<head>
				<title>The Guardian Rendered Items Assets Html</title>
				<meta charset='utf-8'>

				<style>
					${rawFontsCssWithClassNames}
				</style>

				<meta http-equiv='Content-Security-Policy' content="style-src 'sha256-${assetHash(
					rawFontsCssWithClassNames,
				)}';">

				${scriptTags.join('\n')}

				<body>
					${body}
				</body>
		</html>`;
};

const assetHash = (asset: string) =>
	createHash('sha256').update(asset).digest('base64');

export const AssetsPage = ({ fontList: fonts }: Props) => {
	return (
		<>
			{fonts.map((font) => (
				<div key={font.uniqueName} className={font.uniqueName}>
					.
				</div>
			))}
		</>
	);
};
