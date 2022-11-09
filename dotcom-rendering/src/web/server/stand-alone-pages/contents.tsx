import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { Request } from 'express';
import { renderToString } from 'react-dom/server';
import type { NewslettersListProps } from '../../components/stand-alone/NewslettersList';
import { NewslettersList } from '../../components/stand-alone/NewslettersList';
import { TestContent } from '../../components/stand-alone/TestContent';
import type { TestContentProps } from '../../components/stand-alone/TestContent';
import { StandAlonePage } from '../../components/StandAlonePage';

type StandAlonePageBuilder = { (req: Request, cache: EmotionCache): string };

const buildTestPageContent: StandAlonePageBuilder = (req, cache) => {
	const props: TestContentProps = {
		message: `the app is called ${req.app.name}`,
	};

	return renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage subscribeLink="/" editionId="UK">
				<TestContent {...props} />
			</StandAlonePage>
		</CacheProvider>,
	);
};

const buildNewslettersPage: StandAlonePageBuilder = (req, cache) => {
	const props: NewslettersListProps = {
		newsletters: [],
	};

	return renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage subscribeLink="/" editionId="UK">
				<NewslettersList {...props} />
			</StandAlonePage>
		</CacheProvider>,
	);
};

export const getStandAloneContent = (
	pageName: string,
	req: Request,
	cache: EmotionCache,
): string | undefined => {
	switch (pageName) {
		case 'test-page': {
			return buildTestPageContent(req, cache);
		}
		case 'email-newsletters': {
			return buildNewslettersPage(req, cache);
		}
		default: {
			return undefined;
		}
	}
};
