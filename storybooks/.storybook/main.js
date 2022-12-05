module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../Readme.stories.jsx'],
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
		'apps-rendering': {
			title: 'apps-rendering',
			url: 'http://localhost:4003',
		},
	}),
};
