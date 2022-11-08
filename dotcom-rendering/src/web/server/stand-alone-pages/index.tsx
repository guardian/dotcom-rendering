import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { StandAlonePage } from '../../components/StandAlonePage';
import { TestContent } from './TestContent';
import type { TestContentProps } from './TestContent';

type StandAlonePageBuilder = { (req: Request, cache: EmotionCache): string };

const buildTestPageContent: StandAlonePageBuilder = (req, cache) => {
	const props: TestContentProps = {
		message: `the app is called ${req.app.name}`,
	};

	return renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage>
				<TestContent {...props} />
			</StandAlonePage>
		</CacheProvider>,
	);
};

const wrapContent = (content: string): string => `
<!DOCTYPE html>
<body>
	<style>
		body {
			background-color: skyblue;
			font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		}
	</style>
	${content}
</body>
</html>
`;

const getStandAloneContent = (
	pageName: string,
	req: Request,
	cache: EmotionCache,
): string | undefined => {
	switch (pageName) {
		case 'test-page': {
			return buildTestPageContent(req, cache);
		}
		default: {
			return undefined;
		}
	}
};

export const buildStandAlonePage = (req: Request): string | undefined => {
	const key = 'dcr';
	const cache = createCache({ key });

	const query = req.query as Record<string, string | undefined>;
	const { page: pageName } = query;

	const html = pageName
		? getStandAloneContent(pageName, req, cache)
		: undefined;

	if (!html) {
		return undefined;
	}

	return wrapContent(html);
};
