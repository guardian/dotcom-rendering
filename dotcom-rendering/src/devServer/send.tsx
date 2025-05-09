import path from 'node:path';
import type { RequestHandler } from 'express';
import type { FunctionComponent } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Doc } from './docs/doc';

export const sendReact =
	(title: string, Component: FunctionComponent): RequestHandler =>
	(req, res) => {
		const element = (
			<Doc title={title} path={path.join(req.baseUrl, req.path, '/')}>
				<Component />
			</Doc>
		);

		const { pipe } = renderToPipeableStream(element, {
			onShellReady() {
				res.setHeader('content-type', 'text/html');
				pipe(res);
			},
		});
	};
