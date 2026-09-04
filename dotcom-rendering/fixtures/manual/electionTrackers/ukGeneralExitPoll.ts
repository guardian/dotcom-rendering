export const ukGeneralExitPoll = {
	components: [
		{
			kind: 'versus',
			props: {
				left: {
					name: 'Labour',
					abbreviation: 'Lab',
					image: {
						url: 'https://uploads.guim.co.uk/2024/06/24/Starmer.png',
						alt: 'Watercolour portrait of Sir Keir Starmer',
					},
					colour: { name: '--uk-elections-labour' },
					value: 0,
					description: 'seats declared',
				},
				right: {
					name: 'Conservatives',
					abbreviation: 'Con',
					image: {
						url: 'https://uploads.guim.co.uk/2024/06/24/Sunak.png',
						alt: 'Watercolour portrait of Rishi Sunak',
					},
					colour: { name: '--uk-elections-conservative' },
					value: 0,
					description: 'seats declared',
				},
				colour: 'name',
				faded: true,
				banner: 'Exit poll',
			},
		},
		{
			kind: 'onwardLink',
			props: {
				text: 'View results page',
				link: 'https://www.theguardian.com',
			},
		},
	],
};
