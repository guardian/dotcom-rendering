/**
 * This is the response as it's received from Frontend, and includes fields that
 * the DCR types don't know about.
 * Exporting this 'as' FEFrontCard because we know it should be of the right shape.
 */

import type { FEFrontCard } from 'src/types/front';

export const trails = [
	{
		properties: {
			isBreaking: false,
			showMainVideo: false,
			showKickerTag: false,
			showByline: false,
			imageSlideshowReplace: false,
			maybeContent: {
				trail: {
					trailPicture: {
						allImages: [
							{
								index: 3,
								fields: {
									displayCredit: 'true',
									isMaster: 'true',
									altText:
										'Woman stressed about big ladder in her tights',
									mediaId:
										'a85912b00046f8ba0314e9064a0851ea17ef76d2',
									width: '2124',
									source: 'Getty',
									photographer: 'artursfoto',
									height: '1274',
									credit: 'Photograph: artursfoto/Getty',
								},
								mediaType: 'Image',
								url: 'https://media.guim.co.uk/a85912b00046f8ba0314e9064a0851ea17ef76d2/0_12_2124_1274/master/2124.jpg',
							},
						],
					},
					byline: 'Chloe Mac Donnell',
					thumbnailPath:
						'https://i.guim.co.uk/img/media/a85912b00046f8ba0314e9064a0851ea17ef76d2/0_12_2124_1274/500.jpg?quality=85&auto=format&fit=max&s=e6cf84c0603adefcde825d59df704d28',
					webPublicationDate: 1666953304000,
				},
				metadata: {
					id: 'fashion/2022/oct/28/forever-tights-idea-really-have-legs-rip-resistant-fasion',
					webTitle:
						'Forever tights? Now that’s an idea that could really have legs',
					webUrl: 'https://www.theguardian.com/fashion/2022/oct/28/forever-tights-idea-really-have-legs-rip-resistant-fasion',
					type: 'Article',
					pillar: {
						name: 'Lifestyle',
					},
					sectionId: {
						value: 'fashion',
					},
					designType: 'Feature',
					format: {
						design: 'FeatureDesign',
						theme: 'LifestylePillar',
						display: 'StandardDisplay',
					},
				},
				fields: {
					main: '<figure class="element element-image" data-media-id="a85912b00046f8ba0314e9064a0851ea17ef76d2"> <img src="https://media.guim.co.uk/a85912b00046f8ba0314e9064a0851ea17ef76d2/0_12_2124_1274/1000.jpg" alt="Woman stressed about big ladder in her tights" width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">The average woman spends £3,000 on tights in her lifetime.</span> <span class="element-image__credit">Photograph: artursfoto/Getty</span> </figcaption> </figure>',
					body: '<p>Would you pay £62 for a pair of tights? What about if they were guaranteed not to rip, ladder or snag for at least three months? For anyone who frequently screams in frustration as they tear a pair while pulling them on, the world’s toughest tights – as they are being described – could prove tempting.</p><p>To tight or not to tight used to be a subject as divisive as the Conservatives’ economic policy. With energy bills rising, trying to emulate the year round bare-legged lifestyle of the 1% is no longer viable.</p>',
					standfirst:
						'<p>As the UK gets chillier, rip-resistant tights – embraced even by fashion brands – are coming into their own</p>',
				},
				elements: {
					mediaAtoms: [],
				},
				tags: {
					tags: [
						{
							properties: {
								id: 'fashion/tights',
								url: '/fashion/tights',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Tights and socks',
								webUrl: 'https://www.theguardian.com/fashion/tights',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/tights',
												},
												{
													name: 'k',
													value: ['tights'],
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/tights',
												},
												{
													name: 'k',
													value: ['tights'],
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/tights',
												},
												{
													name: 'k',
													value: ['tights'],
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/tights',
												},
												{
													name: 'k',
													value: ['tights'],
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/tights',
												},
												{
													name: 'k',
													value: ['tights'],
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/fashion',
								url: '/fashion/fashion',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion',
								webUrl: 'https://www.theguardian.com/fashion/fashion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'lifeandstyle/lifeandstyle',
								url: '/lifeandstyle/lifeandstyle',
								tagType: 'Keyword',
								sectionId: 'lifeandstyle',
								sectionName: 'Life and style',
								webTitle: 'Life and style',
								webUrl: 'https://www.theguardian.com/lifeandstyle/lifeandstyle',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208242,
										},
										{
											bp: 'M',
											id: 213515,
										},
										{
											bp: 'T',
											id: 215450,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/lingerie',
								url: '/fashion/lingerie',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Lingerie',
								webUrl: 'https://www.theguardian.com/fashion/lingerie',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'k',
													value: ['lingerie'],
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/lingerie',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'k',
													value: ['lingerie'],
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/lingerie',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['lingerie'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/lingerie',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['lingerie'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/lingerie',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'k',
													value: ['lingerie'],
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/lingerie',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'type/article',
								url: '/type/article',
								tagType: 'Type',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Article',
								webUrl: 'https://www.theguardian.com/articles',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tone/news',
								url: '/tone/news',
								tagType: 'Tone',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'News',
								webUrl: 'https://www.theguardian.com/tone/news',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/tone/news',
												},
												{
													name: 'tn',
													value: ['news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/tone/news',
												},
												{
													name: 'tn',
													value: ['news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/tone/news',
												},
												{
													name: 'tn',
													value: ['news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/tone/news',
												},
												{
													name: 'tn',
													value: ['news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/tone/news',
												},
												{
													name: 'tn',
													value: ['news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tone/features',
								url: '/tone/features',
								tagType: 'Tone',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Features',
								webUrl: 'https://www.theguardian.com/tone/features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'profile/chloe-mac-donnell',
								url: '/profile/chloe-mac-donnell',
								tagType: 'Contributor',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Chloe Mac Donnell',
								webUrl: 'https://www.theguardian.com/profile/chloe-mac-donnell',
								twitterHandle: 'tweetchloe',
								bio: '<p>Chloe Mac Donnell is the Guardian\'s deputy fashion and lifestyle editor. Twitter&nbsp;<a href="https://twitter.com/tweetchloe">@tweetchloe</a></p>',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'co',
													value: [
														'chloe-mac-donnell',
													],
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/profile/chloe-mac-donnell',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'co',
													value: [
														'chloe-mac-donnell',
													],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/profile/chloe-mac-donnell',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'co',
													value: [
														'chloe-mac-donnell',
													],
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/profile/chloe-mac-donnell',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'co',
													value: [
														'chloe-mac-donnell',
													],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/profile/chloe-mac-donnell',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'co',
													value: [
														'chloe-mac-donnell',
													],
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/profile/chloe-mac-donnell',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'publication/theguardian',
								url: '/publication/theguardian',
								tagType: 'Publication',
								sectionId: 'theguardian',
								sectionName: 'From the Guardian',
								webTitle: 'The Guardian',
								webUrl: 'https://www.theguardian.com/theguardian/all',
								description:
									"All the latest from the world's leading liberal voice.",
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208213,
										},
										{
											bp: 'M',
											id: 213487,
										},
										{
											bp: 'T',
											id: 215422,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'theguardian/mainsection',
								url: '/theguardian/mainsection',
								tagType: 'NewspaperBook',
								sectionId: 'news',
								sectionName: 'News',
								webTitle: 'Main section',
								webUrl: 'https://www.theguardian.com/theguardian/mainsection',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/theguardian/mainsection',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/theguardian/mainsection',
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/theguardian/mainsection',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/theguardian/mainsection',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/theguardian/mainsection',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208234,
										},
										{
											bp: 'M',
											id: 213507,
										},
										{
											bp: 'T',
											id: 215442,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'theguardian/mainsection/uknews',
								url: '/theguardian/mainsection/uknews',
								tagType: 'NewspaperBookSection',
								sectionId: 'uk-news',
								sectionName: 'UK news',
								webTitle: 'UK news',
								webUrl: 'https://www.theguardian.com/theguardian/mainsection/uknews',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/theguardian/mainsection/uknews',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/theguardian/mainsection/uknews',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/theguardian/mainsection/uknews',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/theguardian/mainsection/uknews',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/theguardian/mainsection/uknews',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208208,
										},
										{
											bp: 'M',
											id: 213482,
										},
										{
											bp: 'T',
											id: 215417,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/uk-fashion',
								url: '/tracking/commissioningdesk/uk-fashion',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'UK Fashion',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/uk-fashion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-fashion',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-fashion',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-fashion',
												},
												{
													name: 'edition',
													value: 'us',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-fashion',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-fashion',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
					],
				},
			},
			maybeContentId:
				'fashion/2022/oct/28/forever-tights-idea-really-have-legs-rip-resistant-fasion',
			isLiveBlog: false,
			isCrossword: false,
			byline: 'Chloe Mac Donnell',
			webTitle:
				'Forever tights? Now that’s an idea that could really have legs',
			linkText:
				'Forever tights? Now that’s an idea that could really have legs',
			maybeFrontPublicationDate: 1666960017000,
			webUrl: 'https://www.theguardian.com/fashion/2022/oct/28/forever-tights-idea-really-have-legs-rip-resistant-fasion',
			editionBrandings: [
				{
					edition: {
						id: 'UK',
					},
				},
				{
					edition: {
						id: 'US',
					},
				},
				{
					edition: {
						id: 'AU',
					},
				},
				{
					edition: {
						id: 'INT',
					},
				},
			],
		},
		header: {
			isVideo: false,
			isComment: false,
			isGallery: false,
			isAudio: false,
			kicker: {
				type: 'FreeHtmlKicker',
				item: {
					properties: {
						kickerText: 'For ever tights? ',
					},
					body: 'For ever tights? ',
				},
			},
			headline: 'Now that’s an idea that could really have legs',
			url: '/fashion/2022/oct/28/forever-tights-idea-really-have-legs-rip-resistant-fasion',
			hasMainVideoElement: false,
		},
		card: {
			id: 'fashion/2022/oct/28/forever-tights-idea-really-have-legs-rip-resistant-fasion',
			cardStyle: {
				type: 'Feature',
			},
			webPublicationDateOption: 1666953304000,
			lastModifiedOption: 1667012469000,
			trailText:
				'As the UK gets chillier, rip-resistant tights – embraced even by fashion brands – are coming into their own',
			shortUrlPath: '/p/mhet4',
			shortUrl: 'https://www.theguardian.com/p/mhet4',
			group: '0',
			isLive: false,
		},
		discussion: {
			isCommentable: false,
			isClosedForComments: true,
			discussionId: '/p/mhet4',
		},
		display: {
			isBoosted: false,
			showBoostedHeadline: false,
			showQuotedHeadline: false,
			imageHide: false,
			showLivePlayable: false,
		},
		format: {
			design: 'FeatureDesign',
			theme: 'LifestylePillar',
			display: 'StandardDisplay',
		},
		enriched: {},
		supportingContent: [],
		cardStyle: {
			type: 'Feature',
		},
		type: 'CuratedContent',
	},
	{
		properties: {
			isBreaking: false,
			showMainVideo: false,
			showKickerTag: false,
			showByline: true,
			imageSlideshowReplace: false,
			maybeContent: {
				trail: {
					trailPicture: {
						allImages: [
							{
								index: 3,
								fields: {
									displayCredit: 'true',
									isMaster: 'true',
									altText:
										'USA. Harris Dickinson in a scene from (C)Neon new film : Triangle of Sadness (2022). Plot: A cruise for the super-rich sinks thus leaving survivors, including a fashion model celebrity couple, trapped on an island. Ref: LMK110-J8273-190822 Supplied by LMKMEDIA. Editorial Only. Landmark Media is not the copyright owner of these Film or TV stills but provides a service only for recognised Media outlets. pictures@lmkmedia.com<br>2JPPN2Y USA. Harris Dickinson in a scene from (C)Neon new film : Triangle of Sadness (2022). Plot: A cruise for the super-rich sinks thus leaving survivors, including a fashion model celebrity couple, trapped on an island. Ref: LMK110-J8273-190822 Supplied by LMKMEDIA. Editorial Only. Landmark Media is not the copyright owner of these Film or TV stills but provides a service only for recognised Media outlets. pictures@lmkmedia.com',
									mediaId:
										'c669f6300e637c6eac5b26fd3c3a0eda4b475126',
									width: '4454',
									source: 'Alamy',
									photographer: 'Landmark Media',
									height: '2674',
									credit: 'Photograph: Landmark Media/Alamy',
								},
								mediaType: 'Image',
								url: 'https://media.guim.co.uk/c669f6300e637c6eac5b26fd3c3a0eda4b475126/473_0_4454_2674/master/4454.jpg',
							},
						],
					},
					byline: 'Morwenna Ferrier',
					thumbnailPath:
						'https://i.guim.co.uk/img/media/c669f6300e637c6eac5b26fd3c3a0eda4b475126/473_0_4454_2674/500.jpg?quality=85&auto=format&fit=max&s=e8979943964b29a8c95f7eef77d67885',
					webPublicationDate: 1666958427000,
				},
				metadata: {
					id: 'commentisfree/2022/oct/28/triangle-of-sadness-fashion-industry-ruben-ostlund-palm-dor',
					webTitle:
						'Rolexes, influencers and H&M grins: Triangle of Sadness nails the fashion industry | Morwenna Ferrier',
					webUrl: 'https://www.theguardian.com/commentisfree/2022/oct/28/triangle-of-sadness-fashion-industry-ruben-ostlund-palm-dor',
					type: 'Article',
					pillar: {
						name: 'Opinion',
					},
					sectionId: {
						value: 'commentisfree',
					},
					designType: 'Comment',
					format: {
						design: 'CommentDesign',
						theme: 'OpinionPillar',
						display: 'StandardDisplay',
					},
				},
				fields: {
					main: '<figure class="element element-image" data-media-id="c669f6300e637c6eac5b26fd3c3a0eda4b475126"> <img src="https://media.guim.co.uk/c669f6300e637c6eac5b26fd3c3a0eda4b475126/473_0_4454_2674/1000.jpg" alt="Harris Dickinson (centre) as Carl in Triangle of Sadness." width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">Harris Dickinson (centre) as Carl in Triangle of Sadness.</span> <span class="element-image__credit">Photograph: Landmark Media/Alamy</span> </figcaption> </figure>',
					body: '<p>The picture painted of the fashion world in <a href="https://www.theguardian.com/film/2022/may/21/the-triangle-of-sadness-review-heavy-handed-satire-on-the-super-rich-loses-its-shape">Triangle of Sadness</a>, <a href="https://www.theguardian.com/film/2018/mar/11/ruben-ostlund-the-square-interview-force-majeure">Ruben Östlund’s</a> Palme d’Or-winning film, is not a kind one. Its title refers to a pair of frown lines that sit between the eyebrows. It’s one of the most Botoxed areas of a person’s face, probably because (as the name suggests) they only appear when you’re unhappy, and no one wants that.</p><p>This particular triangle belongs to Carl (Harris Dickinson), an ageing (he’s 24) male model with soft strawberry hair and a gentle pout. We meet Carl at a casting for an unknown fashion brand; as soon as he’s out of earshot, the panel discuss whether his triangle needs Botox. Old, unhappy Carl is unable to smooth his out.</p>',
					standfirst:
						'<p>As a fashion journalist, I recognised the precarity and cruelty on show in Ruben Östlund’s Palm d’Or winner</p>',
				},
				elements: {
					mediaAtoms: [],
				},
				tags: {
					tags: [
						{
							properties: {
								id: 'commentisfree/commentisfree',
								url: '/commentisfree/commentisfree',
								tagType: 'Blog',
								sectionId: 'commentisfree',
								sectionName: 'Opinion',
								webTitle: 'Opinion',
								webUrl: 'https://www.theguardian.com/commentisfree/commentisfree',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'bl',
													value: ['commentisfree'],
												},
												{
													name: 'url',
													value: '/commentisfree/commentisfree',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'bl',
													value: ['commentisfree'],
												},
												{
													name: 'url',
													value: '/commentisfree/commentisfree',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'bl',
													value: ['commentisfree'],
												},
												{
													name: 'url',
													value: '/commentisfree/commentisfree',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'bl',
													value: ['commentisfree'],
												},
												{
													name: 'url',
													value: '/commentisfree/commentisfree',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'bl',
													value: ['commentisfree'],
												},
												{
													name: 'url',
													value: '/commentisfree/commentisfree',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208274,
										},
										{
											bp: 'M',
											id: 213544,
										},
										{
											bp: 'T',
											id: 215479,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/fashion-industry',
								url: '/fashion/fashion-industry',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion industry',
								webUrl: 'https://www.theguardian.com/fashion/fashion-industry',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/fashion-industry',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion-industry'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/fashion-industry',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['fashion-industry'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/fashion-industry',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion-industry'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/fashion-industry',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion-industry'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/fashion-industry',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion-industry'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/fashion',
								url: '/fashion/fashion',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion',
								webUrl: 'https://www.theguardian.com/fashion/fashion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'lifeandstyle/lifeandstyle',
								url: '/lifeandstyle/lifeandstyle',
								tagType: 'Keyword',
								sectionId: 'lifeandstyle',
								sectionName: 'Life and style',
								webTitle: 'Life and style',
								webUrl: 'https://www.theguardian.com/lifeandstyle/lifeandstyle',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208242,
										},
										{
											bp: 'M',
											id: 213515,
										},
										{
											bp: 'T',
											id: 215450,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'film/film',
								url: '/film/film',
								tagType: 'Keyword',
								sectionId: 'film',
								sectionName: 'Film',
								webTitle: 'Film',
								webUrl: 'https://www.theguardian.com/film/film',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'edition',
													value: 'us',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208260,
										},
										{
											bp: 'M',
											id: 213531,
										},
										{
											bp: 'T',
											id: 215466,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'culture/culture',
								url: '/culture/culture',
								tagType: 'Keyword',
								sectionId: 'culture',
								sectionName: 'Culture',
								webTitle: 'Culture',
								webUrl: 'https://www.theguardian.com/culture/culture',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208270,
										},
										{
											bp: 'M',
											id: 213540,
										},
										{
											bp: 'T',
											id: 215475,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/models',
								url: '/fashion/models',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Models',
								webUrl: 'https://www.theguardian.com/fashion/models',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/models',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'k',
													value: ['models'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/models',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['models'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/models',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['models'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/models',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['models'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/models',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['models'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'type/article',
								url: '/type/article',
								tagType: 'Type',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Article',
								webUrl: 'https://www.theguardian.com/articles',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tone/comment',
								url: '/tone/comment',
								tagType: 'Tone',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Comment',
								webUrl: 'https://www.theguardian.com/tone/comment',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tone/comment',
												},
												{
													name: 'tn',
													value: ['comment'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tone/comment',
												},
												{
													name: 'tn',
													value: ['comment'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tone/comment',
												},
												{
													name: 'tn',
													value: ['comment'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tone/comment',
												},
												{
													name: 'tn',
													value: ['comment'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tone/comment',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'tn',
													value: ['comment'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'profile/morwennaferrier',
								url: '/profile/morwennaferrier',
								tagType: 'Contributor',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Morwenna Ferrier',
								webUrl: 'https://www.theguardian.com/profile/morwennaferrier',
								bio: '<p>Morwenna Ferrier is the Guardian’s fashion and lifestyle editor</p>',
								contributorLargeImagePath:
									'https://uploads.guim.co.uk/2017/10/09/Morwenna-Ferrier,-L.png',
								bylineImageUrl:
									'https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2014/10/15/1413394164362/Morwenna-Ferrier.jpg',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/morwennaferrier',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'co',
													value: ['morwennaferrier'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/morwennaferrier',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'co',
													value: ['morwennaferrier'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/morwennaferrier',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'co',
													value: ['morwennaferrier'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/morwennaferrier',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'co',
													value: ['morwennaferrier'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/morwennaferrier',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'co',
													value: ['morwennaferrier'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'publication/theguardian',
								url: '/publication/theguardian',
								tagType: 'Publication',
								sectionId: 'theguardian',
								sectionName: 'From the Guardian',
								webTitle: 'The Guardian',
								webUrl: 'https://www.theguardian.com/theguardian/all',
								description:
									"All the latest from the world's leading liberal voice.",
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/publication/theguardian',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208213,
										},
										{
											bp: 'M',
											id: 213487,
										},
										{
											bp: 'T',
											id: 215422,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'theguardian/journal',
								url: '/theguardian/journal',
								tagType: 'NewspaperBook',
								sectionId: 'theguardian',
								sectionName: 'From the Guardian',
								webTitle: 'Journal',
								webUrl: 'https://www.theguardian.com/theguardian/journal',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208213,
										},
										{
											bp: 'M',
											id: 213487,
										},
										{
											bp: 'T',
											id: 215422,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'theguardian/journal/opinion',
								url: '/theguardian/journal/opinion',
								tagType: 'NewspaperBookSection',
								sectionId: 'theguardian',
								sectionName: 'From the Guardian',
								webTitle: 'Opinion',
								webUrl: 'https://www.theguardian.com/theguardian/journal/opinion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal/opinion',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal/opinion',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal/opinion',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/theguardian/journal/opinion',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/theguardian/journal/opinion',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208213,
										},
										{
											bp: 'M',
											id: 213487,
										},
										{
											bp: 'T',
											id: 215422,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/uk-opinion',
								url: '/tracking/commissioningdesk/uk-opinion',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'UK Opinion',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/uk-opinion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-opinion',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-opinion',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-opinion',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-opinion',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-opinion',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
					],
				},
			},
			maybeContentId:
				'commentisfree/2022/oct/28/triangle-of-sadness-fashion-industry-ruben-ostlund-palm-dor',
			isLiveBlog: false,
			isCrossword: false,
			byline: 'Morwenna Ferrier',
			image: {
				type: 'Cutout',
				item: {
					imageSrc:
						'https://uploads.guim.co.uk/2017/10/09/Morwenna-Ferrier,-L.png',
				},
			},
			webTitle:
				'Rolexes, influencers and H&M grins: Triangle of Sadness nails the fashion industry | Morwenna Ferrier',
			linkText:
				'Rolexes, influencers and H&M grins: Triangle of Sadness nails the fashion industry | Morwenna Ferrier',
			maybeFrontPublicationDate: 1666950267881,
			webUrl: 'https://www.theguardian.com/commentisfree/2022/oct/28/triangle-of-sadness-fashion-industry-ruben-ostlund-palm-dor',
			editionBrandings: [
				{
					edition: {
						id: 'UK',
					},
				},
				{
					edition: {
						id: 'US',
					},
				},
				{
					edition: {
						id: 'AU',
					},
				},
				{
					edition: {
						id: 'INT',
					},
				},
			],
		},
		header: {
			isVideo: false,
			isComment: true,
			isGallery: false,
			isAudio: false,
			headline:
				'Rolexes, influencers and H&M grins: Triangle of Sadness nails the fashion industry',
			url: '/commentisfree/2022/oct/28/triangle-of-sadness-fashion-industry-ruben-ostlund-palm-dor',
			hasMainVideoElement: false,
		},
		card: {
			id: 'commentisfree/2022/oct/28/triangle-of-sadness-fashion-industry-ruben-ostlund-palm-dor',
			cardStyle: {
				type: 'Comment',
			},
			webPublicationDateOption: 1666958427000,
			lastModifiedOption: 1666990950000,
			trailText:
				'As a fashion journalist, I recognised the cruelty on show in Ruben Östlund’s film, says Morwenna Ferrier, assistant editor on the Guardian’s Saturday magazine',
			shortUrlPath: '/p/mgkpz',
			shortUrl: 'https://www.theguardian.com/p/mgkpz',
			group: '0',
			isLive: false,
		},
		discussion: {
			isCommentable: true,
			isClosedForComments: true,
			discussionId: '/p/mgkpz',
		},
		display: {
			isBoosted: false,
			showBoostedHeadline: false,
			showQuotedHeadline: true,
			imageHide: false,
			showLivePlayable: false,
		},
		format: {
			design: 'CommentDesign',
			theme: 'OpinionPillar',
			display: 'StandardDisplay',
		},
		enriched: {},
		supportingContent: [],
		cardStyle: {
			type: 'Comment',
		},
		type: 'CuratedContent',
	},
	{
		properties: {
			isBreaking: false,
			showMainVideo: false,
			showKickerTag: false,
			showByline: false,
			imageSlideshowReplace: false,
			maybeContent: {
				trail: {
					trailPicture: {
						allImages: [
							{
								index: 12,
								fields: {
									displayCredit: 'true',
									isMaster: 'true',
									altText: 'Fire on the Beach - Dana Scruggs',
									mediaId:
										'ae693a9bf972f379f725722a1aff5cee881cc574',
									width: '2661',
									source: 'Dana Scruggs',
									photographer: 'Dana Scruggs',
									height: '1597',
									credit: 'Photograph: Dana Scruggs',
								},
								mediaType: 'Image',
								url: 'https://media.guim.co.uk/ae693a9bf972f379f725722a1aff5cee881cc574/80_651_2661_1597/master/2661.jpg',
							},
						],
					},
					byline: '',
					thumbnailPath:
						'https://i.guim.co.uk/img/media/ae693a9bf972f379f725722a1aff5cee881cc574/80_651_2661_1597/500.jpg?quality=85&auto=format&fit=max&s=fc54e408eafeadf5c0ed3d1b87902325',
					webPublicationDate: 1667199650000,
				},
				metadata: {
					id: 'fashion/gallery/2022/oct/31/new-black-vanguard-photography-between-art-and-fashion-antwaun-sargent-in-pictures',
					webTitle:
						'At the vanguard: a new aesthetic in Black portraiture – in pictures',
					webUrl: 'https://www.theguardian.com/fashion/gallery/2022/oct/31/new-black-vanguard-photography-between-art-and-fashion-antwaun-sargent-in-pictures',
					type: 'Gallery',
					pillar: {
						name: 'Lifestyle',
					},
					sectionId: {
						value: 'fashion',
					},
					designType: 'Media',
					format: {
						design: 'GalleryDesign',
						theme: 'LifestylePillar',
						display: 'StandardDisplay',
					},
				},
				fields: {
					main: '<figure class="element element-image" data-media-id="ae693a9bf972f379f725722a1aff5cee881cc574"> <img src="https://media.guim.co.uk/ae693a9bf972f379f725722a1aff5cee881cc574/0_365_3000_1883/1000.jpg" alt="Fire on the Beach." width="1000" height="628" class="gu-image" /> <figcaption> <span class="element-image__caption">Fire on the Beach.</span> <span class="element-image__credit">Photograph: Dana Scruggs</span> </figcaption> </figure>',
					body: '',
					standfirst:
						'<p>Curated by the US writer and critic Antwaun Sargent, <a href="https://www.saatchigallery.com/exhibition/the_new_black_vanguard__photography_between_art_and_fashion">an exhibition</a> aims to explore the new aesthetic in portraiture being created by an emerging generation of black models, photographers and stylists.</p><p>The New Black Vanguard: Photography Between Art and Fashion is at the Saatchi Gallery in London until 22 January 2023</p>',
				},
				elements: {
					mediaAtoms: [],
				},
				tags: {
					tags: [
						{
							properties: {
								id: 'fashion/fashion-photography',
								url: '/fashion/fashion-photography',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion photography',
								webUrl: 'https://www.theguardian.com/fashion/fashion-photography',
								description:
									'News, features and galleries showcasing the finest fashion photography',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: [
														'fashion-photography',
													],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/fashion-photography',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: [
														'fashion-photography',
													],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/fashion-photography',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: [
														'fashion-photography',
													],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/fashion-photography',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: [
														'fashion-photography',
													],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/fashion-photography',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: [
														'fashion-photography',
													],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/fashion/fashion-photography',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'artanddesign/photography',
								url: '/artanddesign/photography',
								tagType: 'Keyword',
								sectionId: 'artanddesign',
								sectionName: 'Art and design',
								webTitle: 'Photography',
								webUrl: 'https://www.theguardian.com/artanddesign/photography',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/photography',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'k',
													value: ['photography'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/photography',
												},
												{
													name: 'k',
													value: ['photography'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/photography',
												},
												{
													name: 'k',
													value: ['photography'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/photography',
												},
												{
													name: 'k',
													value: ['photography'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/artanddesign/photography',
												},
												{
													name: 'k',
													value: ['photography'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208282,
										},
										{
											bp: 'M',
											id: 213552,
										},
										{
											bp: 'T',
											id: 215487,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'artanddesign/exhibition',
								url: '/artanddesign/exhibition',
								tagType: 'Keyword',
								sectionId: 'artanddesign',
								sectionName: 'Art and design',
								webTitle: 'Exhibitions',
								webUrl: 'https://www.theguardian.com/artanddesign/exhibition',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['exhibition'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/exhibition',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/exhibition',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['exhibition'],
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['exhibition'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/exhibition',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['exhibition'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/exhibition',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['exhibition'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/artanddesign/exhibition',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208282,
										},
										{
											bp: 'M',
											id: 213552,
										},
										{
											bp: 'T',
											id: 215487,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'artanddesign/artanddesign',
								url: '/artanddesign/artanddesign',
								tagType: 'Keyword',
								sectionId: 'artanddesign',
								sectionName: 'Art and design',
								webTitle: 'Art and design',
								webUrl: 'https://www.theguardian.com/artanddesign/artanddesign',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['artanddesign'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/artanddesign/artanddesign',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['artanddesign'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/artanddesign/artanddesign',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['artanddesign'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/artanddesign/artanddesign',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['artanddesign'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/artanddesign/artanddesign',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'k',
													value: ['artanddesign'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/artanddesign/artanddesign',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208282,
										},
										{
											bp: 'M',
											id: 213552,
										},
										{
											bp: 'T',
											id: 215487,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'culture/culture',
								url: '/culture/culture',
								tagType: 'Keyword',
								sectionId: 'culture',
								sectionName: 'Culture',
								webTitle: 'Culture',
								webUrl: 'https://www.theguardian.com/culture/culture',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208270,
										},
										{
											bp: 'M',
											id: 213540,
										},
										{
											bp: 'T',
											id: 215475,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'artanddesign/saatchi-gallery',
								url: '/artanddesign/saatchi-gallery',
								tagType: 'Keyword',
								sectionId: 'artanddesign',
								sectionName: 'Art and design',
								webTitle: 'Saatchi gallery',
								webUrl: 'https://www.theguardian.com/artanddesign/saatchi-gallery',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['saatchi-gallery'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/saatchi-gallery',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'k',
													value: ['saatchi-gallery'],
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/saatchi-gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/saatchi-gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'k',
													value: ['saatchi-gallery'],
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'k',
													value: ['saatchi-gallery'],
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/saatchi-gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['saatchi-gallery'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/artanddesign/saatchi-gallery',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208282,
										},
										{
											bp: 'M',
											id: 213552,
										},
										{
											bp: 'T',
											id: 215487,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'artanddesign/art',
								url: '/artanddesign/art',
								tagType: 'Keyword',
								sectionId: 'artanddesign',
								sectionName: 'Art and design',
								webTitle: 'Art',
								webUrl: 'https://www.theguardian.com/artanddesign/art',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['art'],
												},
												{
													name: 'url',
													value: '/artanddesign/art',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['art'],
												},
												{
													name: 'url',
													value: '/artanddesign/art',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['art'],
												},
												{
													name: 'url',
													value: '/artanddesign/art',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['art'],
												},
												{
													name: 'url',
													value: '/artanddesign/art',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['art'],
												},
												{
													name: 'url',
													value: '/artanddesign/art',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208282,
										},
										{
											bp: 'M',
											id: 213552,
										},
										{
											bp: 'T',
											id: 215487,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'uk/london',
								url: '/uk/london',
								tagType: 'Keyword',
								sectionId: 'uk-news',
								sectionName: 'UK news',
								webTitle: 'London',
								webUrl: 'https://www.theguardian.com/uk/london',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/uk/london',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['london'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/uk/london',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['london'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/uk/london',
												},
												{
													name: 'k',
													value: ['london'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/uk/london',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['london'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/uk/london',
												},
												{
													name: 'k',
													value: ['london'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208208,
										},
										{
											bp: 'M',
											id: 213482,
										},
										{
											bp: 'T',
											id: 215417,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'us-news/us-news',
								url: '/us-news/us-news',
								tagType: 'Keyword',
								sectionId: 'us-news',
								sectionName: 'US news',
								webTitle: 'US news',
								webUrl: 'https://www.theguardian.com/us-news/us-news',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208206,
										},
										{
											bp: 'M',
											id: 213480,
										},
										{
											bp: 'T',
											id: 215415,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/fashion',
								url: '/fashion/fashion',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion',
								webUrl: 'https://www.theguardian.com/fashion/fashion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'lifeandstyle/lifeandstyle',
								url: '/lifeandstyle/lifeandstyle',
								tagType: 'Keyword',
								sectionId: 'lifeandstyle',
								sectionName: 'Life and style',
								webTitle: 'Life and style',
								webUrl: 'https://www.theguardian.com/lifeandstyle/lifeandstyle',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208242,
										},
										{
											bp: 'M',
											id: 213515,
										},
										{
											bp: 'T',
											id: 215450,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'uk/uk',
								url: '/uk/uk',
								tagType: 'Keyword',
								sectionId: 'uk-news',
								sectionName: 'UK news',
								webTitle: 'UK news',
								webUrl: 'https://www.theguardian.com/uk/uk',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['uk/uk'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/uk/uk',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['uk/uk'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/uk/uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['uk/uk'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/uk/uk',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/uk/uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['uk/uk'],
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['uk/uk'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/uk/uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208208,
										},
										{
											bp: 'M',
											id: 213482,
										},
										{
											bp: 'T',
											id: 215417,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'world/world',
								url: '/world/world',
								tagType: 'Keyword',
								sectionId: 'world',
								sectionName: 'World news',
								webTitle: 'World news',
								webUrl: 'https://www.theguardian.com/world/world',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'k',
													value: ['world'],
												},
												{
													name: 'url',
													value: '/world/world',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['world'],
												},
												{
													name: 'url',
													value: '/world/world',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'k',
													value: ['world'],
												},
												{
													name: 'url',
													value: '/world/world',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'k',
													value: ['world'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/world/world',
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['world'],
												},
												{
													name: 'url',
													value: '/world/world',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 204985,
										},
										{
											bp: 'M',
											id: 213473,
										},
										{
											bp: 'T',
											id: 215408,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'world/race',
								url: '/world/race',
								tagType: 'Keyword',
								sectionId: 'world',
								sectionName: 'World news',
								webTitle: 'Race',
								webUrl: 'https://www.theguardian.com/world/race',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['race'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/world/race',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['race'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/world/race',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'k',
													value: ['race'],
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/world/race',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'k',
													value: ['race'],
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/world/race',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'k',
													value: ['race'],
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/world/race',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 204985,
										},
										{
											bp: 'M',
											id: 213473,
										},
										{
											bp: 'T',
											id: 215408,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'type/gallery',
								url: '/type/gallery',
								tagType: 'Type',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Gallery',
								webUrl: 'https://www.theguardian.com/inpictures',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tone/features',
								url: '/tone/features',
								tagType: 'Tone',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Features',
								webUrl: 'https://www.theguardian.com/tone/features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/uk-pictures-guardian-news',
								url: '/tracking/commissioningdesk/uk-pictures-guardian-news',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'UK Pictures Guardian News',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/uk-pictures-guardian-news',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-pictures-guardian-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-pictures-guardian-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-pictures-guardian-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-pictures-guardian-news',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/uk-pictures-guardian-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
					],
				},
			},
			maybeContentId:
				'fashion/gallery/2022/oct/31/new-black-vanguard-photography-between-art-and-fashion-antwaun-sargent-in-pictures',
			isLiveBlog: false,
			isCrossword: false,
			byline: '',
			webTitle:
				'At the vanguard: a new aesthetic in Black portraiture – in pictures',
			linkText:
				'At the vanguard: a new aesthetic in Black portraiture – in pictures',
			maybeFrontPublicationDate: 1667143073150,
			webUrl: 'https://www.theguardian.com/fashion/gallery/2022/oct/31/new-black-vanguard-photography-between-art-and-fashion-antwaun-sargent-in-pictures',
			editionBrandings: [
				{
					edition: {
						id: 'UK',
					},
				},
				{
					edition: {
						id: 'US',
					},
				},
				{
					edition: {
						id: 'AU',
					},
				},
				{
					edition: {
						id: 'INT',
					},
				},
			],
		},
		header: {
			isVideo: false,
			isComment: false,
			isGallery: true,
			isAudio: false,
			headline:
				'At the vanguard: a new aesthetic in Black portraiture – in pictures',
			url: '/fashion/gallery/2022/oct/31/new-black-vanguard-photography-between-art-and-fashion-antwaun-sargent-in-pictures',
			hasMainVideoElement: false,
		},
		card: {
			id: 'fashion/gallery/2022/oct/31/new-black-vanguard-photography-between-art-and-fashion-antwaun-sargent-in-pictures',
			cardStyle: {
				type: 'Media',
			},
			webPublicationDateOption: 1667199650000,
			lastModifiedOption: 1667199650000,
			trailText:
				'Curated by the US writer and critic Antwaun Sargent, a new exhibition aims to explore the new aesthetic in portraiture being created by an emerging generation of black models, photographers and stylists',
			mediaType: {
				type: 'Gallery',
			},
			shortUrlPath: '/p/mhe94',
			shortUrl: 'https://www.theguardian.com/p/mhe94',
			group: '0',
			isLive: false,
		},
		discussion: {
			isCommentable: false,
			isClosedForComments: true,
			discussionId: '/p/mhe94',
		},
		display: {
			isBoosted: false,
			showBoostedHeadline: false,
			showQuotedHeadline: false,
			imageHide: false,
			showLivePlayable: false,
		},
		format: {
			design: 'GalleryDesign',
			theme: 'LifestylePillar',
			display: 'StandardDisplay',
		},
		enriched: {},
		supportingContent: [],
		cardStyle: {
			type: 'Media',
		},
		type: 'CuratedContent',
	},
	{
		properties: {
			isBreaking: false,
			showMainVideo: false,
			showKickerTag: false,
			showByline: false,
			imageSlideshowReplace: false,
			maybeContent: {
				trail: {
					trailPicture: {
						allImages: [
							{
								index: 4,
								fields: {
									displayCredit: 'true',
									isMaster: 'true',
									altText:
										'Fan Special Screening of "Morbius" at Cinemark Playa Vista and XD in Playa Vista<br>Cast member Jared Leto attends a Fan Special Screening of "Morbius" at Cinemark Playa Vista and XD in Playa Vista, California, U.S., March 30, 2022. REUTERS/Aude Guerrucci',
									mediaId:
										'db676607592f20362cbe6c6dcb9e2416723d7af1',
									width: '3500',
									source: 'Reuters',
									photographer: 'Aude Guerrucci',
									height: '2100',
									credit: 'Photograph: Aude Guerrucci/Reuters',
								},
								mediaType: 'Image',
								url: 'https://media.guim.co.uk/db676607592f20362cbe6c6dcb9e2416723d7af1/0_25_3500_2100/master/3500.jpg',
							},
						],
					},
					byline: 'Alaina Demopoulos in New York',
					thumbnailPath:
						'https://i.guim.co.uk/img/media/db676607592f20362cbe6c6dcb9e2416723d7af1/0_25_3500_2100/500.jpg?quality=85&auto=format&fit=max&s=97c0c4a69484caad6f9da36484795910',
					webPublicationDate: 1666933219000,
				},
				metadata: {
					id: 'fashion/2022/oct/27/jared-leto-skincare-celebrity-men-brad-pitt',
					webTitle:
						'Jared Leto says he’s not interested in skincare – while selling $97 eye cream',
					webUrl: 'https://www.theguardian.com/fashion/2022/oct/27/jared-leto-skincare-celebrity-men-brad-pitt',
					type: 'Article',
					pillar: {
						name: 'Lifestyle',
					},
					sectionId: {
						value: 'fashion',
					},
					designType: 'Feature',
					format: {
						design: 'FeatureDesign',
						theme: 'LifestylePillar',
						display: 'StandardDisplay',
					},
				},
				fields: {
					main: '<figure class="element element-image" data-media-id="db676607592f20362cbe6c6dcb9e2416723d7af1"> <img src="https://media.guim.co.uk/db676607592f20362cbe6c6dcb9e2416723d7af1/0_25_3500_2100/1000.jpg" alt="leto flashes peace sign" width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">Jared Leto is launching a line of skin, body and hair care products.</span> <span class="element-image__credit">Photograph: Aude Guerrucci/Reuters</span> </figcaption> </figure>',
					body: '<p>In 2022, it seems you’re more likely to see a celebrity announce a new beauty line than promote their next project. This year alone, Hailey Bieber, Gwen Stefani, Halsey, Ciara and Winnie Harlow all dropped new brands. But it’s not just a woman’s game – now men want a piece of the <a href="https://commonthreadco.com/blogs/coachs-corner/beauty-industry-cosmetics-marketing-ecommerce">$5bn market</a>, too.</p><p>Last week, Jared Leto <a href="https://www.vogue.com/article/jared-leto-beauty-twentynine-palms">announced</a> Twentynine Palms, “an 11-piece range of gender-neutral skin care, body care and hair care products”, per Vogue. Though the 50-year-old told the glossy he’s “never been really interested in beauty products”, he unveiled items like $47 hand wash and $97 eye cream. Each product is made from “desert botanicals” like prickly pear extract.</p>',
					standfirst:
						'<p>The actor has joined Brad Pitt – another self-described newbie – in hawking pricey products. Will anyone shell out?</p>',
				},
				elements: {
					mediaAtoms: [],
				},
				tags: {
					tags: [
						{
							properties: {
								id: 'fashion/fashion',
								url: '/fashion/fashion',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion',
								webUrl: 'https://www.theguardian.com/fashion/fashion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'film/jared-leto',
								url: '/film/jared-leto',
								tagType: 'Keyword',
								sectionId: 'film',
								sectionName: 'Film',
								webTitle: 'Jared Leto',
								webUrl: 'https://www.theguardian.com/film/jared-leto',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/film/jared-leto',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['jared-leto'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/jared-leto',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'k',
													value: ['jared-leto'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/film/jared-leto',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['jared-leto'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/jared-leto',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['jared-leto'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/film/jared-leto',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['jared-leto'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208260,
										},
										{
											bp: 'M',
											id: 213531,
										},
										{
											bp: 'T',
											id: 215466,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'film/film',
								url: '/film/film',
								tagType: 'Keyword',
								sectionId: 'film',
								sectionName: 'Film',
								webTitle: 'Film',
								webUrl: 'https://www.theguardian.com/film/film',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'edition',
													value: 'us',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/film',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['film'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208260,
										},
										{
											bp: 'M',
											id: 213531,
										},
										{
											bp: 'T',
											id: 215466,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'lifeandstyle/lifeandstyle',
								url: '/lifeandstyle/lifeandstyle',
								tagType: 'Keyword',
								sectionId: 'lifeandstyle',
								sectionName: 'Life and style',
								webTitle: 'Life and style',
								webUrl: 'https://www.theguardian.com/lifeandstyle/lifeandstyle',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208242,
										},
										{
											bp: 'M',
											id: 213515,
										},
										{
											bp: 'T',
											id: 215450,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'culture/culture',
								url: '/culture/culture',
								tagType: 'Keyword',
								sectionId: 'culture',
								sectionName: 'Culture',
								webTitle: 'Culture',
								webUrl: 'https://www.theguardian.com/culture/culture',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/culture/culture',
												},
												{
													name: 'k',
													value: ['culture'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208270,
										},
										{
											bp: 'M',
											id: 213540,
										},
										{
											bp: 'T',
											id: 215475,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/skincare',
								url: '/fashion/skincare',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Skincare',
								webUrl: 'https://www.theguardian.com/fashion/skincare',
								description:
									'Skincare news, reviews and advice from the Guardian and Observer',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/skincare',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['skincare'],
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/skincare',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['skincare'],
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/skincare',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['skincare'],
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/skincare',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['skincare'],
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/skincare',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['skincare'],
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'film/bradpitt',
								url: '/film/bradpitt',
								tagType: 'Keyword',
								sectionId: 'film',
								sectionName: 'Film',
								webTitle: 'Brad Pitt',
								webUrl: 'https://www.theguardian.com/film/bradpitt',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/bradpitt',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['bradpitt'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/bradpitt',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['bradpitt'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/bradpitt',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['bradpitt'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/bradpitt',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['bradpitt'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/film/bradpitt',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['bradpitt'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208260,
										},
										{
											bp: 'M',
											id: 213531,
										},
										{
											bp: 'T',
											id: 215466,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/beauty',
								url: '/fashion/beauty',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Beauty',
								webUrl: 'https://www.theguardian.com/fashion/beauty',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/beauty',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'k',
													value: ['beauty'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/beauty',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['beauty'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/beauty',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'k',
													value: ['beauty'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/beauty',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['beauty'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/fashion/beauty',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['beauty'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'type/article',
								url: '/type/article',
								tagType: 'Type',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Article',
								webUrl: 'https://www.theguardian.com/articles',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tone/features',
								url: '/tone/features',
								tagType: 'Tone',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Features',
								webUrl: 'https://www.theguardian.com/tone/features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'profile/alaina-demopoulos',
								url: '/profile/alaina-demopoulos',
								tagType: 'Contributor',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Alaina Demopoulos',
								webUrl: 'https://www.theguardian.com/profile/alaina-demopoulos',
								bio: '<p>Alaina Demopoulos is a daily features writer for the Guardian</p>',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/east-coast-features',
								url: '/tracking/commissioningdesk/east-coast-features',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'East coast features',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/east-coast-features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/us-features',
								url: '/tracking/commissioningdesk/us-features',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'US Features',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/us-features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
					],
				},
			},
			maybeContentId:
				'fashion/2022/oct/27/jared-leto-skincare-celebrity-men-brad-pitt',
			isLiveBlog: false,
			isCrossword: false,
			byline: 'Alaina Demopoulos in New York',
			webTitle:
				'Jared Leto says he’s not interested in skincare – while selling $97 eye cream',
			linkText:
				'Jared Leto says he’s not interested in skincare – while selling $97 eye cream',
			maybeFrontPublicationDate: 1666960017000,
			webUrl: 'https://www.theguardian.com/fashion/2022/oct/27/jared-leto-skincare-celebrity-men-brad-pitt',
			editionBrandings: [
				{
					edition: {
						id: 'UK',
					},
				},
				{
					edition: {
						id: 'US',
					},
				},
				{
					edition: {
						id: 'AU',
					},
				},
				{
					edition: {
						id: 'INT',
					},
				},
			],
		},
		header: {
			isVideo: false,
			isComment: false,
			isGallery: false,
			isAudio: false,
			kicker: {
				type: 'FreeHtmlKicker',
				item: {
					properties: {
						kickerText: 'Jared Leto',
					},
					body: 'Jared Leto',
				},
			},
			headline:
				'Actor says he’s not interested in skincare – while selling $97 eye cream',
			url: '/fashion/2022/oct/27/jared-leto-skincare-celebrity-men-brad-pitt',
			hasMainVideoElement: false,
		},
		card: {
			id: 'fashion/2022/oct/27/jared-leto-skincare-celebrity-men-brad-pitt',
			cardStyle: {
				type: 'Feature',
			},
			webPublicationDateOption: 1666933219000,
			lastModifiedOption: 1666966902000,
			trailText:
				'The actor has joined Brad Pitt – another self-described newbie – in hawking pricey products. Will anyone shell out?',
			shortUrlPath: '/p/mh28e',
			shortUrl: 'https://www.theguardian.com/p/mh28e',
			group: '0',
			isLive: false,
		},
		discussion: {
			isCommentable: false,
			isClosedForComments: true,
			discussionId: '/p/mh28e',
		},
		display: {
			isBoosted: false,
			showBoostedHeadline: false,
			showQuotedHeadline: false,
			imageHide: false,
			showLivePlayable: false,
		},
		format: {
			design: 'FeatureDesign',
			theme: 'LifestylePillar',
			display: 'StandardDisplay',
		},
		enriched: {},
		supportingContent: [],
		cardStyle: {
			type: 'Feature',
		},
		type: 'CuratedContent',
	},
	{
		properties: {
			isBreaking: false,
			showMainVideo: false,
			showKickerTag: false,
			showByline: false,
			imageSlideshowReplace: false,
			maybeContent: {
				trail: {
					trailPicture: {
						allImages: [
							{
								index: 20,
								fields: {
									displayCredit: 'true',
									source: 'REX/Shutterstock',
									isMaster: 'true',
									altText: 'Winter coats',
									mediaId:
										'11f672598753a0604016f1d79e9ea57d22773e44',
									width: '2560',
									height: '1536',
									credit: 'Composite: REX/Shutterstock',
								},
								mediaType: 'Image',
								url: 'https://media.guim.co.uk/11f672598753a0604016f1d79e9ea57d22773e44/0_0_2560_1536/master/2560.jpg',
							},
						],
					},
					byline: 'by Jo Jones',
					thumbnailPath:
						'https://i.guim.co.uk/img/media/11f672598753a0604016f1d79e9ea57d22773e44/0_0_2560_1536/500.jpg?quality=85&auto=format&fit=max&s=18a365bbe36ec46533d68addc35b39e4',
					webPublicationDate: 1667083509000,
				},
				metadata: {
					id: 'fashion/gallery/2022/oct/29/20-of-the-best-winter-coats-to-wear-now-in-pictures',
					webTitle:
						' 20 of the best winter coats to wear now - in pictures ',
					webUrl: 'https://www.theguardian.com/fashion/gallery/2022/oct/29/20-of-the-best-winter-coats-to-wear-now-in-pictures',
					type: 'Gallery',
					pillar: {
						name: 'Lifestyle',
					},
					sectionId: {
						value: 'fashion',
					},
					designType: 'Media',
					format: {
						design: 'GalleryDesign',
						theme: 'LifestylePillar',
						display: 'StandardDisplay',
					},
				},
				fields: {
					main: '<figure class="element element-image" data-media-id="11f672598753a0604016f1d79e9ea57d22773e44"> <img src="https://media.guim.co.uk/11f672598753a0604016f1d79e9ea57d22773e44/0_0_2560_1536/1000.jpg" alt="L-R: Ghospell, Cos, Street Style PFW, La Redoute, Monki" width="1000" height="600" class="gu-image" /> <figcaption> <span class="element-image__caption">L-R: Ghospell, Cos, Street Style PFW, <a href="https://www.laredoute.co.uk/">La Redoute</a>, Monki</span> <span class="element-image__credit">Composite: REX/Shutterstock</span> </figcaption> </figure>',
					body: '',
					standfirst:
						'<p>A pop of colour, a classic camel or a cuddly teddy? Choose the coat that best suits your personality</p>',
				},
				elements: {
					mediaAtoms: [],
				},
				tags: {
					tags: [
						{
							properties: {
								id: 'fashion/fashion',
								url: '/fashion/fashion',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion',
								webUrl: 'https://www.theguardian.com/fashion/fashion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/womens-coats',
								url: '/fashion/womens-coats',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: "Women's coats and jackets",
								webUrl: 'https://www.theguardian.com/fashion/womens-coats',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/womens-coats',
												},
												{
													name: 'k',
													value: ['womens-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/womens-coats',
												},
												{
													name: 'k',
													value: ['womens-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/womens-coats',
												},
												{
													name: 'k',
													value: ['womens-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/womens-coats',
												},
												{
													name: 'k',
													value: ['womens-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/womens-coats',
												},
												{
													name: 'k',
													value: ['womens-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/winter-coats',
								url: '/fashion/winter-coats',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Winter coats',
								webUrl: 'https://www.theguardian.com/fashion/winter-coats',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'k',
													value: ['winter-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/winter-coats',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['winter-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/winter-coats',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'k',
													value: ['winter-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/winter-coats',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'k',
													value: ['winter-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/winter-coats',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['winter-coats'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/fashion/winter-coats',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'lifeandstyle/lifeandstyle',
								url: '/lifeandstyle/lifeandstyle',
								tagType: 'Keyword',
								sectionId: 'lifeandstyle',
								sectionName: 'Life and style',
								webTitle: 'Life and style',
								webUrl: 'https://www.theguardian.com/lifeandstyle/lifeandstyle',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208242,
										},
										{
											bp: 'M',
											id: 213515,
										},
										{
											bp: 'T',
											id: 215450,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'type/gallery',
								url: '/type/gallery',
								tagType: 'Type',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Gallery',
								webUrl: 'https://www.theguardian.com/inpictures',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/type/gallery',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'profile/jojones',
								url: '/profile/jojones',
								tagType: 'Contributor',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Jo Jones',
								webUrl: 'https://www.theguardian.com/profile/jojones',
								bio: '<p>Jo Jones is <a href="http://www.guardian.co.uk/lifeandstyle/fashion">fashion </a>editor for the <a href="http://observer.guardian.co.uk/">Observer</a></p>',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/jojones',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: ['jojones'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: ['jojones'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/profile/jojones',
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/jojones',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: ['jojones'],
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/jojones',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: ['jojones'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/jojones',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: ['jojones'],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/observer-magazine',
								url: '/tracking/commissioningdesk/observer-magazine',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Observer Magazine',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/observer-magazine',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/observer-magazine',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/observer-magazine',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/observer-magazine',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/observer-magazine',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tracking/commissioningdesk/observer-magazine',
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
					],
				},
			},
			maybeContentId:
				'fashion/gallery/2022/oct/29/20-of-the-best-winter-coats-to-wear-now-in-pictures',
			isLiveBlog: false,
			isCrossword: false,
			byline: 'by Jo Jones',
			webTitle: ' 20 of the best winter coats to wear now - in pictures ',
			linkText: ' 20 of the best winter coats to wear now - in pictures ',
			maybeFrontPublicationDate: 1666950267881,
			webUrl: 'https://www.theguardian.com/fashion/gallery/2022/oct/29/20-of-the-best-winter-coats-to-wear-now-in-pictures',
			editionBrandings: [
				{
					edition: {
						id: 'UK',
					},
				},
				{
					edition: {
						id: 'US',
					},
				},
				{
					edition: {
						id: 'AU',
					},
				},
				{
					edition: {
						id: 'INT',
					},
				},
			],
		},
		header: {
			isVideo: false,
			isComment: false,
			isGallery: true,
			isAudio: false,
			kicker: {
				type: 'FreeHtmlKicker',
				item: {
					properties: {
						kickerText: 'Winter is coming',
					},
					body: 'Winter is coming',
				},
			},
			headline: ' 20 of the best winter coats to wear now',
			url: '/fashion/gallery/2022/oct/29/20-of-the-best-winter-coats-to-wear-now-in-pictures',
			hasMainVideoElement: false,
		},
		card: {
			id: 'fashion/gallery/2022/oct/29/20-of-the-best-winter-coats-to-wear-now-in-pictures',
			cardStyle: {
				type: 'Media',
			},
			webPublicationDateOption: 1667083509000,
			lastModifiedOption: 1667083509000,
			trailText:
				'A pop of colour, a classic camel or a cuddly teddy? Choose the coat that best suits your personality',
			mediaType: {
				type: 'Gallery',
			},
			shortUrlPath: '/p/mgmvx',
			shortUrl: 'https://www.theguardian.com/p/mgmvx',
			group: '0',
			isLive: false,
		},
		discussion: {
			isCommentable: false,
			isClosedForComments: true,
			discussionId: '/p/mgmvx',
		},
		display: {
			isBoosted: false,
			showBoostedHeadline: false,
			showQuotedHeadline: false,
			imageHide: false,
			showLivePlayable: false,
		},
		format: {
			design: 'GalleryDesign',
			theme: 'LifestylePillar',
			display: 'StandardDisplay',
		},
		enriched: {},
		supportingContent: [],
		cardStyle: {
			type: 'Media',
		},
		type: 'CuratedContent',
	},
	{
		properties: {
			isBreaking: false,
			showMainVideo: false,
			showKickerTag: false,
			showByline: false,
			imageSlideshowReplace: false,
			maybeContent: {
				trail: {
					trailPicture: {
						allImages: [
							{
								index: 4,
								fields: {
									displayCredit: 'true',
									source: 'TikTok',
									isMaster: 'true',
									altText: 'IMG 0740',
									mediaId:
										'dd9d8bd4f8805a0ddd3dabbb1ddb5add71fb8cc9',
									width: '1170',
									height: '702',
									credit: 'Photograph: TikTok',
								},
								mediaType: 'Image',
								url: 'https://media.guim.co.uk/dd9d8bd4f8805a0ddd3dabbb1ddb5add71fb8cc9/0_335_1170_702/master/1170.jpg',
							},
						],
					},
					byline: 'Alaina Demopoulos',
					thumbnailPath:
						'https://i.guim.co.uk/img/media/dd9d8bd4f8805a0ddd3dabbb1ddb5add71fb8cc9/0_335_1170_702/500.jpg?quality=85&auto=format&fit=max&s=d58b9663df81f862f6756209122cb7ef',
					webPublicationDate: 1667192447000,
				},
				metadata: {
					id: 'lifeandstyle/2022/oct/30/sadness-is-a-trend-why-tiktok-loves-crying-makeup',
					webTitle:
						'‘Sadness is a trend’: why TikTok loves ‘crying makeup’',
					webUrl: 'https://www.theguardian.com/lifeandstyle/2022/oct/30/sadness-is-a-trend-why-tiktok-loves-crying-makeup',
					type: 'Article',
					pillar: {
						name: 'Lifestyle',
					},
					sectionId: {
						value: 'lifeandstyle',
					},
					designType: 'Feature',
					format: {
						design: 'FeatureDesign',
						theme: 'LifestylePillar',
						display: 'StandardDisplay',
					},
				},
				fields: {
					main: '<figure class="element element-image" data-media-id="dd9d8bd4f8805a0ddd3dabbb1ddb5add71fb8cc9"> <img src="https://media.guim.co.uk/dd9d8bd4f8805a0ddd3dabbb1ddb5add71fb8cc9/0_287_1170_837/1000.jpg" alt="close up of Kenealy - she looks like she\'s been crying" width="1000" height="715" class="gu-image" /> <figcaption> <span class="element-image__caption">Zoe Kim Kenealy on TikTok.</span> <span class="element-image__credit">Photograph: Screengrab/TikTok</span> </figcaption> </figure>',
					body: '<p>Beauty magazines once taught readers how to use makeup to conceal a recent sobbing sesh. But now, one TikTok trend encourages us to embrace those misty eyes and rosy noses. “Crying makeup,” it seems, is in.</p><p><a href="https://www.tiktok.com/@zoekimkenealy/video/7154109460179438891">In a clip</a> that has gained over 507,000 likes, the Boston-based content creator Zoe Kim Kenealy offers a tutorial “for the unstable girlies” to achieve the look of a fresh sob even “if you’re not in the mood to cry”.</p>',
					standfirst:
						'<p>From #sadgirlwalk to dazed stares, misery – or the performance of it – is all over the platform in what some see as a bid for belonging</p>',
				},
				elements: {
					mediaAtoms: [],
				},
				tags: {
					tags: [
						{
							properties: {
								id: 'lifeandstyle/lifeandstyle',
								url: '/lifeandstyle/lifeandstyle',
								tagType: 'Keyword',
								sectionId: 'lifeandstyle',
								sectionName: 'Life and style',
								webTitle: 'Life and style',
								webUrl: 'https://www.theguardian.com/lifeandstyle/lifeandstyle',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/lifeandstyle/lifeandstyle',
												},
												{
													name: 'k',
													value: ['lifeandstyle'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208242,
										},
										{
											bp: 'M',
											id: 213515,
										},
										{
											bp: 'T',
											id: 215450,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'us-news/us-news',
								url: '/us-news/us-news',
								tagType: 'Keyword',
								sectionId: 'us-news',
								sectionName: 'US news',
								webTitle: 'US news',
								webUrl: 'https://www.theguardian.com/us-news/us-news',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['us-news'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'url',
													value: '/us-news/us-news',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208206,
										},
										{
											bp: 'M',
											id: 213480,
										},
										{
											bp: 'T',
											id: 215415,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'technology/tiktok',
								url: '/technology/tiktok',
								tagType: 'Keyword',
								sectionId: 'technology',
								sectionName: 'Technology',
								webTitle: 'TikTok',
								webUrl: 'https://www.theguardian.com/technology/tiktok',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'k',
													value: ['tiktok'],
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/technology/tiktok',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'k',
													value: ['tiktok'],
												},
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/technology/tiktok',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'k',
													value: ['tiktok'],
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/technology/tiktok',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'k',
													value: ['tiktok'],
												},
												{
													name: 'url',
													value: '/technology/tiktok',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'k',
													value: ['tiktok'],
												},
												{
													name: 'url',
													value: '/technology/tiktok',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208214,
										},
										{
											bp: 'M',
											id: 213488,
										},
										{
											bp: 'T',
											id: 215423,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'fashion/fashion',
								url: '/fashion/fashion',
								tagType: 'Keyword',
								sectionId: 'fashion',
								sectionName: 'Fashion',
								webTitle: 'Fashion',
								webUrl: 'https://www.theguardian.com/fashion/fashion',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'k',
													value: ['fashion'],
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/fashion/fashion',
												},
											],
										},
									],
									prebidIndexSites: [
										{
											bp: 'D',
											id: 208261,
										},
										{
											bp: 'M',
											id: 213532,
										},
										{
											bp: 'T',
											id: 215467,
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'type/article',
								url: '/type/article',
								tagType: 'Type',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Article',
								webUrl: 'https://www.theguardian.com/articles',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'au',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/type/article',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tone/features',
								url: '/tone/features',
								tagType: 'Tone',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Features',
								webUrl: 'https://www.theguardian.com/tone/features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/tone/features',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'tn',
													value: ['features'],
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'profile/alaina-demopoulos',
								url: '/profile/alaina-demopoulos',
								tagType: 'Contributor',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'Alaina Demopoulos',
								webUrl: 'https://www.theguardian.com/profile/alaina-demopoulos',
								bio: '<p>Alaina Demopoulos is a daily features writer for the Guardian</p>',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'url',
													value: '/profile/alaina-demopoulos',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'co',
													value: [
														'alaina-demopoulos',
													],
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/east-coast-features',
								url: '/tracking/commissioningdesk/east-coast-features',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'East coast features',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/east-coast-features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/east-coast-features',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
						{
							properties: {
								id: 'tracking/commissioningdesk/us-features',
								url: '/tracking/commissioningdesk/us-features',
								tagType: 'Tracking',
								sectionId: 'global',
								sectionName: 'global',
								webTitle: 'US Features',
								webUrl: 'https://www.theguardian.com/tracking/commissioningdesk/us-features',
								references: [],
								commercial: {
									editionBrandings: [
										{
											edition: {
												id: 'US',
											},
										},
										{
											edition: {
												id: 'INT',
											},
										},
										{
											edition: {
												id: 'UK',
											},
										},
										{
											edition: {
												id: 'EUR',
											},
										},
										{
											edition: {
												id: 'AU',
											},
										},
									],
									editionAdTargetings: [
										{
											edition: {
												id: 'UK',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'uk',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'AU',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'au',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'INT',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'int',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'EUR',
											},
											paramSet: [
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'edition',
													value: 'eur',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
										{
											edition: {
												id: 'US',
											},
											paramSet: [
												{
													name: 'edition',
													value: 'us',
												},
												{
													name: 'ct',
													value: 'tag',
												},
												{
													name: 'url',
													value: '/tracking/commissioningdesk/us-features',
												},
												{
													name: 'p',
													value: 'ng',
												},
											],
										},
									],
								},
							},
						},
					],
				},
			},
			maybeContentId:
				'lifeandstyle/2022/oct/30/sadness-is-a-trend-why-tiktok-loves-crying-makeup',
			isLiveBlog: false,
			isCrossword: false,
			byline: 'Alaina Demopoulos',
			webTitle: '‘Sadness is a trend’: why TikTok loves ‘crying makeup’',
			linkText: '‘Sadness is a trend’: why TikTok loves ‘crying makeup’',
			webUrl: 'https://www.theguardian.com/lifeandstyle/2022/oct/30/sadness-is-a-trend-why-tiktok-loves-crying-makeup',
			editionBrandings: [
				{
					edition: {
						id: 'UK',
					},
				},
				{
					edition: {
						id: 'US',
					},
				},
				{
					edition: {
						id: 'AU',
					},
				},
				{
					edition: {
						id: 'INT',
					},
				},
			],
		},
		header: {
			isVideo: false,
			isComment: false,
			isGallery: false,
			isAudio: false,
			headline: '‘Sadness is a trend’: why TikTok loves ‘crying makeup’',
			url: '/lifeandstyle/2022/oct/30/sadness-is-a-trend-why-tiktok-loves-crying-makeup',
			hasMainVideoElement: false,
		},
		card: {
			id: 'lifeandstyle/2022/oct/30/sadness-is-a-trend-why-tiktok-loves-crying-makeup',
			cardStyle: {
				type: 'Feature',
			},
			webPublicationDateOption: 1667192447000,
			lastModifiedOption: 1667228583000,
			trailText:
				'From #sadgirlwalk to dazed stares, misery – or the performance of it – is all over the platform in what some see as a bid for belonging',
			shortUrlPath: '/p/mhgkn',
			shortUrl: 'https://www.theguardian.com/p/mhgkn',
			group: '0',
			isLive: false,
		},
		discussion: {
			isCommentable: false,
			isClosedForComments: true,
			discussionId: '/p/mhgkn',
		},
		display: {
			isBoosted: false,
			showBoostedHeadline: false,
			showQuotedHeadline: false,
			imageHide: false,
			showLivePlayable: false,
		},
		format: {
			design: 'FeatureDesign',
			theme: 'LifestylePillar',
			display: 'StandardDisplay',
		},
		enriched: {},
		supportingContent: [],
		cardStyle: {
			type: 'Feature',
		},
		type: 'CuratedContent',
	},
] as FEFrontCard[];
