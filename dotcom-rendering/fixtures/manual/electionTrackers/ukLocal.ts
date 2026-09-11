export const ukLocal = {
	components: [
		{
			kind: 'changeBars',
			props: {
				changes: [
					{
						name: 'Conservative',
						abbreviation: 'Con',
						change: -635,
						colour: { name: '--uk-elections-conservative' },
					},
					{
						name: 'Labour',
						abbreviation: 'Lab',
						change: -198,
						colour: { name: '--uk-elections-labour' },
					},
					{
						name: 'Liberal Democrat',
						abbreviation: 'Lib Dem',
						change: 146,
						colour: { name: '--uk-elections-liberal-democrat' },
					},
					{
						name: 'Reform UK',
						abbreviation: 'Reform',
						change: 648,
						colour: { name: '--uk-elections-reform-uk' },
					},
					{
						name: 'Other',
						abbreviation: 'Other',
						change: -56,
						colour: { name: '--uk-elections-others' },
					},
				],
			},
		},
		{
			kind: 'progressNumber',
			props: {
				progress: 200,
				total: 200,
				copy: 'councils declared',
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
