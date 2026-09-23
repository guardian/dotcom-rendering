export const usPresidential = {
	components: [
		{
			kind: 'progressNumber',
			props: {
				progress: 51,
				total: 51,
				copy: 'states called (includes DC)',
				additionalCopy: 'Latest results',
			},
		},
		{
			kind: 'versus',
			props: {
				left: {
					name: 'Kamala Harris',
					abbreviation: 'Harris',
					value: 226,
					description: 'Electoral college votes',
					image: {
						url: 'https://uploads.guim.co.uk/2024/08/27/kamala-harris-watercolour.png',
						alt: 'Watercolour portrait of Kamala Harris',
					},
					colour: { name: '--us-elections-democrats' },
				},
				right: {
					name: 'Donald Trump',
					abbreviation: 'Trump',
					value: 312,
					description: 'Electoral college votes',
					image: {
						url: 'https://uploads.guim.co.uk/2024/08/27/donald-trump-watercolour.png',
						alt: 'Watercolour portrait of Donald Trump',
					},
					colour: { name: '--us-elections-republicans' },
				},
				colour: 'value',
				faded: false,
				banner: null,
			},
		},
		{
			kind: 'stackedProgress',
			props: {
				total: 538,
				label: 'to win',
				calculateWinner: true,
				excludedCopy: null,
				sections: [
					{
						name: 'Harris',
						colour: { name: '--us-elections-democrats' },
						value: 200,
						align: 'left',
						exclude: false,
					},
					{
						name: 'Trump',
						colour: { name: '--us-elections-republicans' },
						value: 200,
						align: 'right',
						exclude: false,
					},
				],
			},
		},
		{
			kind: 'onwardLink',
			props: {
				text: 'Full US election results',
				link: 'https://www.theguardian.com',
			},
		},
	],
};
