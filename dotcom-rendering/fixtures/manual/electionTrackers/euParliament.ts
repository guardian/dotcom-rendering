export const euParliament = {
	components: [
		{
			kind: 'stackedProgress',
			props: {
				total: 720,
				label: null,
				calculateWinner: false,
				excludedCopy: null,
				sections: [
					{
						colour: { name: '--eu-parliament-theleft' },
						name: 'Left',
						value: 40,
						align: 'left',
						exclude: false,
					},
					{
						name: 'S&D',
						colour: { name: '--eu-parliament-sd' },
						value: 100,
						align: 'left',
						exclude: false,
					},
					{
						name: 'Grn/EFA',
						colour: { name: '--eu-parliament-greensefa' },
						value: 40,
						align: 'left',
						exclude: false,
					},
					{
						name: 'Renew',
						colour: { name: '--eu-parliament-renew' },
						value: 60,
						align: 'left',
						exclude: false,
					},
					{
						name: 'EPP',
						colour: { name: '--eu-parliament-epp' },
						value: 150,
						align: 'left',
						exclude: false,
					},
					{
						name: 'ECR',
						colour: { name: '--eu-parliament-ecr' },
						value: 60,
						align: 'left',
						exclude: false,
					},
					{
						name: 'NI',
						colour: { name: '--eu-parliament-ni' },
						value: 30,
						align: 'left',
						exclude: false,
					},
					{
						name: 'PfE',
						colour: { name: '--eu-parliament-unknown' },
						value: 70,
						align: 'left',
						exclude: false,
					},
					{
						name: 'ESN',
						colour: { name: '--eu-parliament-unknown' },
						value: 20,
						align: 'left',
						exclude: false,
					},
				],
			},
		},
		{
			kind: 'valuesWithChange',
			props: {
				valueDescription: 'Seats',
				changeDescription: 'Change in seats',
				values: [
					{
						name: 'Left',
						value: 46,
						change: 9,
						colour: { name: '--eu-parliament-theleft' },
					},
					{
						name: 'S&D',
						value: 100,
						change: -3,
						colour: { name: '--eu-parliament-sd' },
					},
					{
						name: 'Grn/EFA',
						value: 40,
						change: -19,
						colour: { name: '--eu-parliament-greensefa' },
					},
					{
						name: 'Renew',
						value: 60,
						change: -25,
						colour: { name: '--eu-parliament-renew' },
					},
					{
						name: 'EPP',
						value: 150,
						change: 12,
						colour: { name: '--eu-parliament-epp' },
					},
					{
						name: 'ECR',
						value: 60,
						change: 9,
						colour: { name: '--eu-parliament-ecr' },
					},
					{
						name: 'NI',
						value: 30,
						change: 0,
						colour: { name: '--eu-parliament-ni' },
					},
					{
						name: 'PfE',
						value: 70,
						change: 0,
						colour: { name: '--eu-parliament-unknown' },
					},
					{
						name: 'ESN',
						value: 20,
						change: 0,
						colour: { name: '--eu-parliament-unknown' },
					},
				],
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
