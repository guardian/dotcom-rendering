import { useEffect, useState } from 'react';
import type { GutterAskRenderProps } from './marketing/gutters/GutterAsk';

export const BasicGutterAsk = (props: GutterAskRenderProps) => {
	const [GutterComponent, setGutterComponent] =
		useState<React.ElementType<GutterAskRenderProps>>();

	console.log('rendering BasicGutterAsk');
	useEffect(() => {
		console.log('importing GutterAsk');
		import(`./marketing/gutters/GutterAsk`)
			.then((gutterModule) => {
				setGutterComponent(() => gutterModule.GutterAsk);
			})
			.catch((err) => {
				const msg = `Error importing GutterLiveBlog: ${String(err)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-gutter-liveblog-dynamic-import',
				);
			});
	}, []);

	if (GutterComponent) {
		return <GutterComponent {...props} />;
	}
	return null;
};
