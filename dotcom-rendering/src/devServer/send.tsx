import path from 'node:path';
import type { RequestHandler } from 'express';
import type { ReactNode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Doc } from './docs/doc';

export function sendReact(title: string, node: ReactNode): RequestHandler {
	return (req, res) => {
		const element = (
			<Doc title={title} path={path.join(req.baseUrl, req.path, '/')}>
				{node}
			</Doc>
		);

		const { pipe } = renderToPipeableStream(element, {
			onShellReady() {
				res.setHeader('content-type', 'text/html');
				pipe(res);
			},
		});
	};
}
