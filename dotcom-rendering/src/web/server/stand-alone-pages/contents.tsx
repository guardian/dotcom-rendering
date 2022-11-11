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
			<StandAlonePage subscribeUrl="/" editionId="UK">
				<TestContent {...props} />
			</StandAlonePage>
		</CacheProvider>,
	);
};

const buildNewslettersPage: StandAlonePageBuilder = (req, cache) => {
	const props: NewslettersListProps = {
		newsletters: [
			{
				identityName: 'morning-mail',
				name: "Guardian Australia's Morning Mail",
				theme: 'news',
				description:
					'Our Australian morning briefing email breaks down the key national and international stories of the day and why they matter',
				frequency: 'Every weekday',
				listId: 4148,
				group: 'News in depth',
				successDescription:
					"We'll send you Guardian Australia's Morning Mail every weekday",
				regionFocus: 'AU',
			},
			{
				identityName: 'moving-the-goalposts',
				name: 'Moving the Goalposts',
				theme: 'sport',
				description:
					'Informative, passionate, entertaining. Sign up to our weekly round-up of women’s football now.',
				frequency: 'Weekly',
				listId: 6020,
				group: 'Sport',
				successDescription:
					"We'll send you Moving the Goalposts every week",
			},
			{
				listId: 123,
				identityName: 'patriarchy',
				description:
					'Reviewing the most important stories on feminism and sexism and those fighting for equality',
				name: 'The Week in Patriarchy',
				frequency: 'Weekly',
				successDescription:
					'You have signed up, but the newsletter is fake',
				theme: 'opinion',
				group: 'Opinion',
			},
		],
	};

	return renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage subscribeUrl="/" editionId="UK">
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
