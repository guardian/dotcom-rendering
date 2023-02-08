module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../Readme.stories.jsx'],
	features: {
		buildStoriesJson: true,
	},
	refs: () => ({
		'apps-rendering': {
			title: 'apps-rendering',
			url: 'http://localhost:4003',
		},
	}),
};
