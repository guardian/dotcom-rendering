import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { ArticleElementRole } from '@guardian/libs';
import type { Option } from '../../vendor/@guardian/types/index';
import { none, some } from '../../vendor/@guardian/types/index';
import { ImageSubtype } from 'image/image';
import type { ResizedRelatedContent } from 'item';
import { Optional } from 'optional';

// ----- Fixture ----- //

const relatedContent: Option<ResizedRelatedContent> = some({
	resizedImages: [
		some({
			src: 'https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=500&quality=85&fit=bounds&s=5801705b9400ba021aa8ac7a05e14ff3',
			srcset: 'https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=140&quality=85&fit=bounds&s=b19e658c9c3b61949c7c26ed59b33c82 140w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=500&quality=85&fit=bounds&s=5801705b9400ba021aa8ac7a05e14ff3 500w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=1000&quality=85&fit=bounds&s=fa893324004661c14d4773218189acdf 1000w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=1500&quality=85&fit=bounds&s=006be69d76f1e32148e617075f013a8d 1500w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=2000&quality=85&fit=bounds&s=675da6451807d9f6574b2c5e8d250165 2000w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=2500&quality=85&fit=bounds&s=f6339f2f915cf7191a7bb399cfb393da 2500w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=3000&quality=85&fit=bounds&s=c492f149d18b676ababc1a71029828fa 3000w',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=140&quality=45&fit=bounds&s=7e3a407bcd12694d2cf15a6cc3a5281d 140w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=500&quality=45&fit=bounds&s=a623f919d4b1bb26907233d5b4e449d7 500w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=1000&quality=45&fit=bounds&s=510afe89db5d282dac16a2f077d382c0 1000w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=1500&quality=45&fit=bounds&s=664c92d1f19134398f218220744d4169 1500w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=2000&quality=45&fit=bounds&s=e7371b2dcf3ea8c6015a4cc2c1f48a8a 2000w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=2500&quality=45&fit=bounds&s=d425a2dc54f3b33aea8723c7ac4e8a82 2500w, https://i.guim.co.uk/img/media/68cdb28c511d4a24d399ad445081baeff5a7e2fb/0_83_1319_791/master/1319.jpg?width=3000&quality=45&fit=bounds&s=42756bbaa71b1090624dd34a93ed6a40 3000w',
			alt: some('Central London monorail'),
			width: 1500,
			height: 900,
			caption: none,
			credit: none,
			nativeCaption: none,
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg),
		}),
		some({
			src: 'https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=500&quality=85&fit=bounds&s=8cf1c849c84eff7f4698ceb30f53d3de',
			srcset: 'https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=140&quality=85&fit=bounds&s=2ff244d037773f25d23d0caa59f23a17 140w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=500&quality=85&fit=bounds&s=8cf1c849c84eff7f4698ceb30f53d3de 500w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=1000&quality=85&fit=bounds&s=c7b052db8015b66e64cad6b79a0bd81c 1000w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=1500&quality=85&fit=bounds&s=7370e292248cf00b4280e7b227022c0c 1500w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=2000&quality=85&fit=bounds&s=13cc0c9185d3c19843e4ed7d2e5338e8 2000w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=2500&quality=85&fit=bounds&s=d0ce743c708fe5765b2b9b618fc6a12f 2500w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=3000&quality=85&fit=bounds&s=0a335881de616484a64a2ed4d34a8c68 3000w',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=140&quality=45&fit=bounds&s=c1fadac02a5b988c2f74b3b3368009ab 140w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=500&quality=45&fit=bounds&s=a3f6498c1eac4ebc9f849b58bb4916ed 500w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=1000&quality=45&fit=bounds&s=16f48eb1ac2f7de647e468778009a82e 1000w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=1500&quality=45&fit=bounds&s=7f3485f6de282ae0606f6b5004ded83f 1500w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=2000&quality=45&fit=bounds&s=fd17c5a9c81953dc3bc94bf1fccb288e 2000w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=2500&quality=45&fit=bounds&s=470826f858f1be6535d1a800a87aa49f 2500w, https://i.guim.co.uk/img/media/0a07335a59c78901e928275dd5288425345eb616/552_0_3012_1807/master/3012.jpg?width=3000&quality=45&fit=bounds&s=ed5b5990045fef564078977d9aadd70c 3000w',
			alt: some('Lloyd Wright’s Civic Center, 1925'),
			width: 1500,
			height: 900,
			caption: none,
			credit: none,
			nativeCaption: none,
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg),
		}),
		some({
			src: 'https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=500&quality=85&fit=bounds&s=6213a6cb2ada5e664b5191ecb7ee7f3b',
			srcset: 'https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=140&quality=85&fit=bounds&s=7e1f8e96c513b84eda3ac88910f3ac95 140w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=500&quality=85&fit=bounds&s=6213a6cb2ada5e664b5191ecb7ee7f3b 500w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=1000&quality=85&fit=bounds&s=53ec4d40e89f6ede9e3e1d2a0714bee6 1000w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=1500&quality=85&fit=bounds&s=097a36bf52d09da23b6b9a6fd92e64d6 1500w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=2000&quality=85&fit=bounds&s=f55e61c67d3efe3c8c5d313d633fe808 2000w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=2500&quality=85&fit=bounds&s=32a5ebf305eb86fb8ba9c4214b709a81 2500w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=3000&quality=85&fit=bounds&s=a125f2e90920cfdc2284436d035e4587 3000w',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=140&quality=45&fit=bounds&s=132b24f658c25f49d5b6f81c3d09ef96 140w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=500&quality=45&fit=bounds&s=541c5c29a732af1310127f8750194df0 500w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=1000&quality=45&fit=bounds&s=9e9c7a63c619caa2bcf41996536cc503 1000w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=1500&quality=45&fit=bounds&s=3b6d25ca02a49c5d443cd464e111cf00 1500w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=2000&quality=45&fit=bounds&s=bd6b8d29fd74f78ff0f50f6b248e7a07 2000w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=2500&quality=45&fit=bounds&s=0a337191930a90763a3c3f6383b802ff 2500w, https://i.guim.co.uk/img/media/d32dd6da3aad3a7e93f0bef8731865fad1655ce6/0_219_3788_2274/master/3788.jpg?width=3000&quality=45&fit=bounds&s=d17da414e91966b9b4b600f6eac0159c 3000w',
			alt: some(
				'Volodymyr Zelenskiy, right, and Olaf Scholz, left, during their talks in Kyiv on 14 February.',
			),
			width: 1500,
			height: 900,
			caption: none,
			credit: none,
			nativeCaption: none,
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg),
		}),
		some({
			src: 'https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=500&quality=85&fit=bounds&s=82a12749eab81ae08041fe7188d44a92',
			srcset: 'https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=140&quality=85&fit=bounds&s=2979f0a931c1103ea85875d7e6b5e8a5 140w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=500&quality=85&fit=bounds&s=82a12749eab81ae08041fe7188d44a92 500w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=1000&quality=85&fit=bounds&s=44aa4c05ecfc050647ebc3b666be782b 1000w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=1500&quality=85&fit=bounds&s=b5289aad07b16d44ae981206e2689cf0 1500w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=2000&quality=85&fit=bounds&s=d557aa46d560476311921212b59628cc 2000w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=2500&quality=85&fit=bounds&s=c6b3389b667e48a8967e33139363f061 2500w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=3000&quality=85&fit=bounds&s=e159a30dc50d53e8f4dd8026bf18c161 3000w',
			dpr2Srcset:
				'https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=140&quality=45&fit=bounds&s=169a1c1b1795fedbf4754737d6daef33 140w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=500&quality=45&fit=bounds&s=3461c7fb503a59a8b9152df99e2413b9 500w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=1000&quality=45&fit=bounds&s=f55db3b4230bb5ddd4d2e8a8a1c7dec4 1000w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=1500&quality=45&fit=bounds&s=9cf28969fdb1918fc84764c7f96f0bf6 1500w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=2000&quality=45&fit=bounds&s=22ab332cee651663703e1cba5cf995c3 2000w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=2500&quality=45&fit=bounds&s=6f1fb5551d293bef878b025da0953dbe 2500w, https://i.guim.co.uk/img/media/2c278b1cbefa1755683ecb71c8fbfb3769300009/207_442_8162_4898/master/8162.jpg?width=3000&quality=45&fit=bounds&s=55502c3fd5ff5427feb06874167a780f 3000w',
			alt: some(
				'‘All of life is here. And it’s too much!’ – Mixing It Up: Painting Today review',
			),
			width: 1500,
			height: 900,
			caption: none,
			credit: none,
			nativeCaption: none,
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg),
		}),
	],
	title: 'More on this story',
	relatedItems: [
		{
			title: 'How London might have looked: from Regent St monorail to a straight Thames',
			link: 'cities/2016/aug/23/unbuilt-london-monorail-straight-river-thames',
			type: RelatedItemType.ARTICLE,
			pillar: {
				id: 'pillar/news',
				name: 'News',
				sectionIds: [],
			},
		},
		{
			title: 'Unbuilt Los Angeles: the city that might have been – in pictures',
			link: 'cities/gallery/2017/jan/12/new-york-never-built-skyscraper-cathedral-pneumatic-railway-in-pictures',
			type: RelatedItemType.GALLERY,
			pillar: {
				id: 'pillar/news',
				name: 'News',
				sectionIds: [],
			},
		},
		{
			title: 'Ukraine crisis live: Putin to decide today on recognising breakaway regions as independent states',
			link: 'world/live/2022/feb/21/russia-ukraine-news-latest-crisis-putin-biden-summit-kyiv-kiev-russian-invasion-threat-live-updates',
			type: RelatedItemType.LIVE,
			pillar: {
				id: 'pillar/news',
				name: 'News',
				sectionIds: [],
			},
		},
		{
			title: '‘All of life is here. And it’s too much!’ – Mixing It Up: Painting Today review',
			link: 'artanddesign/2021/sep/07/mixing-it-up-painting-today-review-hayward-gallery',
			type: RelatedItemType.REVIEW,
			pillar: {
				id: 'pillar/arts',
				name: 'Arts',
				sectionIds: [],
			},
			starRating: '3',
		},
	],
});

// ----- Exports ----- //

export { relatedContent };
