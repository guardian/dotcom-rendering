import { useEffect } from 'react';

import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { storiesOf } from '@storybook/react';

import { decideFormat } from '../lib/decideFormat';

import { Article } from '../../../fixtures/generated/articles/Article';
import { PhotoEssay } from '../../../fixtures/generated/articles/PhotoEssay';
import { Review } from '../../../fixtures/generated/articles/Review';
import { PrintShop } from '../../../fixtures/generated/articles/PrintShop';
import { Analysis } from '../../../fixtures/generated/articles/Analysis';
import { Feature } from '../../../fixtures/generated/articles/Feature';
import { Live } from '../../../fixtures/generated/articles/Live';
import { Editorial } from '../../../fixtures/generated/articles/Editorial';
import { Letter } from '../../../fixtures/generated/articles/Letter';
import { Interview } from '../../../fixtures/generated/articles/Interview';
import { Quiz } from '../../../fixtures/generated/articles/Quiz';
import { Recipe } from '../../../fixtures/generated/articles/Recipe';
import { Comment } from '../../../fixtures/generated/articles/Comment';
import { MatchReport } from '../../../fixtures/generated/articles/MatchReport';
import { Labs } from '../../../fixtures/generated/articles/Labs';
import { SpecialReport } from '../../../fixtures/generated/articles/SpecialReport';
import { NumberedList } from '../../../fixtures/generated/articles/NumberedList';

import { embedIframe } from '../browser/embedIframe/embedIframe';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';

import { extractNAV } from '../../model/extract-nav';
import { DecideLayout } from './DecideLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

const Fixtures: { [key: string]: CAPIArticleType } = {
	Article,
	PhotoEssay,
	Review,
	PrintShop,
	Analysis,
	Feature,
	LiveBlog: Live,
	DeadBlog: Live,
	Editorial,
	Letter,
	Interview,
	Quiz,
	Recipe,
	Comment,
	MatchReport,
	Labs,
	SpecialReport,
	NumberedList,
};

mockRESTCalls();

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({
	ServerCAPI,
	modifyPage,
}: {
	ServerCAPI: CAPIArticleType;
	modifyPage?: () => void;
}) => {
	const NAV = extractNAV(ServerCAPI.nav);
	const format: ArticleFormat = decideFormat(ServerCAPI.format);

	useEffect(() => {
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${e}`),
		);
		// Manually updates the footer DOM because it's not hydrated
		injectPrivacySettingsLink();
		doStorybookHydration();
	}, [ServerCAPI]);
	if (modifyPage) {
		modifyPage();
	}
	return <DecideLayout CAPIArticle={ServerCAPI} NAV={NAV} format={format} />;
};

for (const [displayName] of Object.entries(ArticleDisplay)) {
	if (Number.isNaN(Number(displayName))) {
		for (const [designName] of Object.entries(ArticleDesign)) {
			if (Number.isNaN(Number(designName))) {
				for (const [pillarName] of Object.entries(ArticlePillar)) {
					if (Number.isNaN(Number(pillarName))) {
						const stories = storiesOf(
							`Layouts/Format variations/${displayName}/${designName}`,
							module,
						).addParameters({
							chromatic: {
								diffThreshold: 0.2,
								pauseAnimationAtEnd: true,
							},
						});

						const fixture =
							Fixtures[designName] || Fixtures.Article;

						stories.add(pillarName, () => {
							return (
								<HydratedLayout
									ServerCAPI={{
										...fixture,
										format: {
											display:
												`${displayName}Display` as CAPIDisplay,
											design: `${designName}Design` as CAPIDesign,
											theme: `${pillarName}Pillar` as CAPITheme,
										},
									}}
								/>
							);
						});
					}
				}

				for (const [specialName] of Object.entries(ArticleSpecial)) {
					if (Number.isNaN(Number(specialName))) {
						const stories = storiesOf(
							`Layouts/Format variations/${displayName}/${designName}`,
							module,
						).addParameters({
							chromatic: {
								diffThreshold: 0.2,
								pauseAnimationAtEnd: true,
							},
						});

						const fixture =
							Fixtures[designName] || Fixtures.Article;

						stories.add(specialName, () => {
							return (
								<HydratedLayout
									ServerCAPI={{
										...fixture,
										format: {
											display:
												`${displayName}Display` as CAPIDisplay,
											design: `${designName}Design` as CAPIDesign,
											theme:
												specialName === 'Labs'
													? specialName
													: (`${specialName}Theme` as CAPITheme),
										},
									}}
								/>
							);
						});
					}
				}
			}
		}
	}
}

storiesOf(`Layouts/Liveblog`, module)
	.add('With no key events', () => {
		return (
			<HydratedLayout
				ServerCAPI={{
					...Fixtures.LiveBlog,
					keyEvents: [],
				}}
			/>
		);
	})
	.addParameters({
		chromatic: {
			diffThreshold: 0.2,
			pauseAnimationAtEnd: true,
		},
	});
