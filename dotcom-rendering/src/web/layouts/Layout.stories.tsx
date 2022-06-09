import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { storiesOf } from '@storybook/react';
import { useEffect } from 'react';
import { Analysis } from '../../../fixtures/generated/articles/Analysis';
import { Audio } from '../../../fixtures/generated/articles/Audio';
import { Comment } from '../../../fixtures/generated/articles/Comment';
import { Editorial } from '../../../fixtures/generated/articles/Editorial';
import { Feature } from '../../../fixtures/generated/articles/Feature';
import { Gallery } from '../../../fixtures/generated/articles/Gallery';
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
import { Standard } from '../../../fixtures/generated/articles/Standard';
import { Video } from '../../../fixtures/generated/articles/Video';
import { extractNAV } from '../../model/extract-nav';
import { embedIframe } from '../browser/embedIframe/embedIframe';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { decideFormat } from '../lib/decideFormat';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { DecideLayout } from './DecideLayout';

const Fixtures: { [key: string]: CAPIArticleType } = {
	Standard,
	Gallery,
	Audio,
	Video,
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
							Fixtures[designName] || Fixtures.Standard;

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
							Fixtures[designName] || Fixtures.Standard;

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
