export const ukGeneralFinal = {
	components: [
		{
			kind: 'versus',
			props: {
				left: {
					name: 'Labour',
					abbreviation: 'Lab',
					value: 412,
					change: 214,
					image: {
						url: 'https://uploads.guim.co.uk/2024/06/24/Starmer.png',
						alt: 'Watercolour portrait of Sir Keir Starmer',
					},
					colour: { name: '--uk-elections-labour' },
				},
				right: {
					name: 'Conservatives',
					abbreviation: 'Con',
					value: 121,
					change: -252,
					image: {
						url: 'https://uploads.guim.co.uk/2024/06/24/Sunak.png',
						alt: 'Watercolour portrait of Rishi Sunak',
					},
					colour: { name: '--uk-elections-conservative' },
				},
				colour: 'name',
				faded: false,
				banner: null,
			},
		},
		{
			kind: 'stackedProgress',
			props: {
				total: 650,
				label: 'for majority',
				calculateWinner: true,
				excludedCopy: null,
				sections: [
					{
						name: 'Labour',
						colour: { name: '--uk-elections-labour' },
						value: 400,
						align: 'left',
						exclude: false,
					},
					{
						name: 'Conservative',
						colour: { name: '--uk-elections-conservative' },
						value: 100,
						align: 'right',
						exclude: false,
					},
					{
						name: 'Lib Dem',
						colour: { name: '--uk-elections-liberal-democrat' },
						value: 70,
						align: 'left',
						exclude: false,
					},
					{
						name: 'SNP',
						colour: {
							name: '--uk-elections-scottish-national-party',
						},
						value: 10,
						align: 'left',
						exclude: false,
					},
					{
						name: 'Reform',
						colour: { name: '--uk-elections-reform-uk' },
						value: 5,
						align: 'right',
						exclude: false,
					},
				],
			},
		},
		{
			kind: 'progressNumber',
			props: {
				progress: 650,
				total: 650,
				copy: 'seats declared',
				additionalCopy: null,
			},
		},
		{
			kind: 'onwardLink',
			props: {
				text: 'See full results',
				link: 'https://www.theguardian.com',
			},
		},
	],
};
