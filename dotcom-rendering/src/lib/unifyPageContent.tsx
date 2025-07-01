import { renderToString } from 'react-dom/server';
import type { RenderingTarget } from '../types/renderingTarget';

export const unifyPageContent = ({
	elementCss,
	elementJs,
	elementHtml,
	renderingTarget,
}: {
	elementCss?: string;
	elementJs?: string;
	elementHtml?: string;
	renderingTarget: RenderingTarget;
}): string =>
	renderToString(
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,minimum-scale=1,initial-scale=1"
				/>
				{!!elementCss && (
					<style dangerouslySetInnerHTML={{ __html: elementCss }} />
				)}
			</head>
			<body className={renderingTarget === 'Apps' ? 'in-app' : undefined}>
				{!!elementHtml && (
					<div dangerouslySetInnerHTML={{ __html: elementHtml }} />
				)}
			</body>
			{/* JS need to load on body render */}
			{!!elementJs && (
				<script dangerouslySetInnerHTML={{ __html: elementJs }} />
			)}
			<script
				dangerouslySetInnerHTML={{
					__html: `
                            function resize() {
                                window.frameElement.height = document.body.offsetHeight;
                            }
                            window.addEventListener('resize', resize);
                            resize();
                        `,
				}}
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: `
                            var fonts = [].slice.apply(window.parent.document.styleSheets)
                                .filter(function (sheet) { return sheet.ownerNode.className.indexOf("webfont") > - 1; })
                                .map(function (sheet) { return sheet.ownerNode.textContent; })
                                .join(' ');
                            var css = document.createElement('style');
                            css.textContent = fonts;
                            document.head.appendChild(css);
                        `,
				}}
			/>
		</html>,
	);
