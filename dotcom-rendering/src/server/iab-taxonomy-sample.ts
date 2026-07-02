const iabTaxonomyCAPIData = {
	content_id: 'article-12345',
	models: [
		{
			model_id: 'primary',
			model_version: 'v1.0',
			description: 'Primary tags only',
			taxonomies: [
				{
					taxonomy: 'IAB_CONTENT_2_2',
					segtax: 2,
					segments: [{ id: 'IAB1-6', name: 'Movies' }],
				},
				{
					taxonomy: 'IAB_CONTENT_3_0',
					segtax: 6,
					segments: [{ id: 'entertainment.movies', name: 'Movies' }],
				},
			],
		},
		{
			model_id: 'primary_secondary',
			model_version: 'v1.0',
			description: 'Primary + secondary tags',
			taxonomies: [
				{
					taxonomy: 'IAB_CONTENT_2_2',
					segtax: 2,
					segments: [
						{ id: 'IAB1-6', name: 'Movies' },
						{ id: 'IAB1', name: 'Arts & Entertainment' },
					],
				},
				{
					taxonomy: 'IAB_CONTENT_3_0',
					segtax: 6,
					segments: [
						{ id: 'entertainment.movies', name: 'Movies' },
						{ id: 'entertainment', name: 'Entertainment' },
					],
				},
			],
		},
	],
};

export { iabTaxonomyCAPIData };
