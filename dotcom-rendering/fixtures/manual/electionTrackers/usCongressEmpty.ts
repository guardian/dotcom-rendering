export const usCongressEmpty = {
	components: [
		{
			kind: 'sideBySide',
			left: {
				heading: 'Senate',
				children: [
					{
						kind: 'versus',
						props: {
							left: {
								name: 'Democrats',
								abbreviation: 'Democrats',
								value: 28,
								change: 0,
								colour: {
									name: '--us-elections-democrats',
								},
								image: null,
							},
							right: {
								name: 'Republicans',
								abbreviation: 'Republicans',
								value: 38,
								change: 0,
								colour: {
									name: '--us-elections-republicans',
								},
								image: null,
							},
							colour: 'none',
							faded: false,
							banner: null,
						},
					},
					{
						kind: 'stackedProgress',
						props: {
							total: 34,
							label: '50',
							calculateWinner: false,
							excludedCopy: 'No election',
							sections: [
								{
									name: 'Democrats',
									colour: {
										name: '--us-elections-democrats-alt',
									},
									value: 28,
									align: 'left',
									exclude: true,
								},
								{
									name: 'Democrats',
									colour: {
										name: '--us-elections-democrats',
									},
									value: 0,
									align: 'left',
									exclude: false,
								},
								{
									name: 'Others',
									colour: {
										name: '--us-elections-others',
									},
									value: 0,
									align: 'left',
									exclude: true,
								},
								{
									name: 'Others',
									colour: {
										name: '--us-elections-others',
									},
									value: 0,
									align: 'left',
									exclude: false,
								},
								{
									name: 'Republicans',
									colour: {
										name: '--us-elections-republicans-alt',
									},
									value: 38,
									align: 'right',
									exclude: true,
								},
								{
									name: 'Republicans',
									colour: {
										name: '--us-elections-republicans',
									},
									value: 0,
									align: 'right',
									exclude: false,
								},
							],
						},
					},
					{
						kind: 'progressNumber',
						props: {
							additionalCopy: null,
							copy: 'races called',
							progress: 0,
							total: 34,
						},
					},
				],
			},
			right: {
				heading: 'House',
				children: [
					{
						kind: 'versus',
						props: {
							left: {
								name: 'Democrats',
								abbreviation: 'Democrats',
								value: 0,
								change: 0,
								colour: {
									name: '--us-elections-democrats',
								},
								image: null,
							},
							right: {
								name: 'Republicans',
								abbreviation: 'Republicans',
								value: 0,
								change: 0,
								colour: {
									name: '--us-elections-republicans',
								},
								image: null,
							},
							colour: 'none',
							faded: false,
							banner: null,
						},
					},
					{
						kind: 'stackedProgress',
						props: {
							total: 435,
							label: 'to win',
							calculateWinner: true,
							excludedCopy: null,
							sections: [
								{
									name: 'Democrats',
									colour: {
										name: '--us-elections-democrats',
									},
									value: 0,
									align: 'left',
									exclude: false,
								},
								{
									name: 'Others',
									colour: {
										name: '--us-elections-others',
									},
									value: 0,
									align: 'left',
									exclude: false,
								},
								{
									name: 'Republicans',
									colour: {
										name: '--us-elections-republicans',
									},
									value: 0,
									align: 'right',
									exclude: false,
								},
							],
						},
					},
					{
						kind: 'progressNumber',
						props: {
							additionalCopy: null,
							copy: 'races called',
							progress: 0,
							total: 435,
						},
					},
				],
			},
		},
		{
			kind: 'onwardLink',
			props: {
				text: 'Full results',
				link: 'https://www.theguardian.com',
			},
		},
	],
};
