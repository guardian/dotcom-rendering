import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { storiesOf } from '@storybook/react';
import { useEffect } from 'react';
import { Analysis } from '../../../fixtures/generated/articles/Analysis';
import { Article } from '../../../fixtures/generated/articles/Article';
import { Comment } from '../../../fixtures/generated/articles/Comment';
import { Editorial } from '../../../fixtures/generated/articles/Editorial';
import { Feature } from '../../../fixtures/generated/articles/Feature';
import { Interview } from '../../../fixtures/generated/articles/Interview';
import { Labs } from '../../../fixtures/generated/articles/Labs';
import { Letter } from '../../../fixtures/generated/articles/Letter';
import { Live } from '../../../fixtures/generated/articles/Live';
import { MatchReport } from '../../../fixtures/generated/articles/MatchReport';
import { NumberedList } from '../../../fixtures/generated/articles/NumberedList';
import { PhotoEssay } from '../../../fixtures/generated/articles/PhotoEssay';
import { PrintShop } from '../../../fixtures/generated/articles/PrintShop';
import { Quiz } from '../../../fixtures/generated/articles/Quiz';
import { Recipe } from '../../../fixtures/generated/articles/Recipe';
import { Review } from '../../../fixtures/generated/articles/Review';
import { SpecialReport } from '../../../fixtures/generated/articles/SpecialReport';
import { extractNAV } from '../../model/extract-nav';
import { embedIframe } from '../browser/embedIframe/embedIframe';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { decideFormat } from '../lib/decideFormat';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { DecideLayout } from './DecideLayout';
import { enumEntries } from './lib/enumEntries';

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

for (const [displayName] of enumEntries(ArticleDisplay)) {
	for (const [designName] of enumEntries(ArticleDesign)) {
		for (const [pillarName] of enumEntries(ArticlePillar)) {
			const stories = storiesOf(
				`Layouts/Format variations/${displayName}/${designName}`,
				module,
			).addParameters({
				chromatic: {
					diffThreshold: 0.2,
					pauseAnimationAtEnd: true,
				},
			});

			const fixture = Fixtures[designName] || Fixtures.Article;

			stories.add(pillarName, () => {
				return (
					<HydratedLayout
						ServerCAPI={{
							...fixture,
							format: {
								display: `${displayName}Display`,
								//@ts-expect-error -- StandardDesign uses ArticleDesign fallback
								design: `${designName}Design`,
								theme: `${pillarName}Pillar`,
							},
						}}
					/>
				);
			});
		}

		for (const [specialName] of enumEntries(ArticleSpecial)) {
			const stories = storiesOf(
				`Layouts/Format variations/${displayName}/${designName}`,
				module,
			).addParameters({
				chromatic: {
					diffThreshold: 0.2,
					pauseAnimationAtEnd: true,
				},
			});

			const fixture = Fixtures[designName] || Fixtures.Article;

			stories.add(specialName, () => {
				return (
					<HydratedLayout
						ServerCAPI={{
							...fixture,
							format: {
								display: `${displayName}Display`,
								//@ts-expect-error -- StandardDesign uses ArticleDesign fallback
								design: `${designName}Design`,
								theme:
									specialName === 'Labs'
										? specialName
										: `${specialName}Theme`,
							},
						}}
					/>
				);
			});
		}
	}
}

storiesOf(`Layouts/Liveblog`, module)
	.addParameters({
		chromatic: {
			diffThreshold: 0.2,
			pauseAnimationAtEnd: true,
		},
	})
	.add('With no key events', () => {
		return (
			<HydratedLayout
				ServerCAPI={{
					...Fixtures.LiveBlog,
					keyEvents: [],
				}}
			/>
		);
	});
