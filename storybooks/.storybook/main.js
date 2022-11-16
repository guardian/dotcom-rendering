module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../test.stories.tsx'],
	features: {
		buildStoriesJson: true,
	},
	refs: () => ({
		'common-rendering': {
			title: 'common-rendering',
			url: 'http://localhost:4001',
		},
		'dotcom-rendering': {
			title: 'dotcom-rendering',
			url: 'http://localhost:4002',
		},
	}),
};
