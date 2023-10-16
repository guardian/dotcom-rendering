export const examplePersonalityQuestions = [
	{
		id: '7fd34318-d273-4399-8fce-c9dc8af01995',
		text: 'Describe your housing situation',
		answers: [
			{
				id: '6d2d7e61-7352-4ff0-a1d1-0e2f3373bc57',
				text: 'I exercised right to buy on my council flat. Thanks, Thatcher!',
				answerBuckets: [
					'ea8fceaa-6b49-4e4e-b433-4047d613df06',
					'3c48359a-064f-46d7-a6d0-5bcd31f792d1',
				],
				isCorrect: false,
			},
			{
				id: 'd169eecf-521e-4db3-85bd-5a542c898d4e',
				text: 'Detached house in the suburbs, garden, two dogs, a pond, some frogs, and a small but growing buy-to-let empire',
				answerBuckets: ['3c48359a-064f-46d7-a6d0-5bcd31f792d1'],
				isCorrect: false,
			},
			{
				id: 'c48aa7d4-f87b-4bef-96f1-fd9458e3e145',
				text: "I live with four or five friends in a shared house. We don't have a living room but we know how to party",
				answerBuckets: ['d9574643-86f6-49e6-a384-7bc9e7cc5454'],
				isCorrect: false,
			},
			{
				id: '527b66cb-56cb-435b-be0c-889b5086d494',
				text: 'I still live with my parents',
				answerBuckets: [
					'403a0e6a-671c-48a3-b4df-2cefd4445b9e',
					'd9574643-86f6-49e6-a384-7bc9e7cc5454',
				],
				isCorrect: false,
			},
			{
				id: '7d389f7d-855f-47bc-95cd-c54d56ff0b62',
				text: 'Renting a house with my partner, hoping to save for a deposit in the next 10 to 20 years',
				answerBuckets: ['48fe5e8d-acc0-4797-a10e-37fd54838ae1'],
				isCorrect: false,
			},
		],
	},
	{
		id: 'd776cb0a-e10a-4ea7-a720-4769958cabc5',
		text: 'How did you meet your significant other?',
		answers: [
			{
				id: '8b3cab92-676e-4983-8d9a-fbcbe8b3a9f4',
				text: "I'm single, which is fine",
				answerBuckets: [
					'd9574643-86f6-49e6-a384-7bc9e7cc5454',
					'403a0e6a-671c-48a3-b4df-2cefd4445b9e',
				],
				isCorrect: false,
			},
			{
				id: '1a9b5b24-021f-4abf-a2ce-0fff1f569103',
				text: 'Our eyes met over a crowded bar. It was magic',
				answerBuckets: [
					'3c48359a-064f-46d7-a6d0-5bcd31f792d1',
					'ea8fceaa-6b49-4e4e-b433-4047d613df06',
				],
				isCorrect: false,
			},
			{
				id: 'f5eb12db-1328-463b-b15e-24a779000376',
				text: 'I slid into their Twitter DMs',
				answerBuckets: ['48fe5e8d-acc0-4797-a10e-37fd54838ae1'],
				isCorrect: false,
			},
			{
				id: 'ad8d9b88-72e1-4844-a35c-27c4483833bc',
				text: 'Tinder',
				answerBuckets: ['d9574643-86f6-49e6-a384-7bc9e7cc5454'],
				isCorrect: false,
			},
		],
	},
	{
		id: 'fe07e26e-deef-4cf7-85df-2cf8a6b4409e',
		text: 'What do you fear most of all?',
		answers: [
			{
				id: '76b6ad00-7aa0-4418-ab1e-087ed1d15006',
				text: 'Trying not to think about it, thanks',
				answerBuckets: [
					'd9574643-86f6-49e6-a384-7bc9e7cc5454',
					'403a0e6a-671c-48a3-b4df-2cefd4445b9e',
				],
				isCorrect: false,
			},
			{
				id: 'd2a44eab-bc98-431f-8046-b622a6e6dd2e',
				text: 'Climate change',
				answerBuckets: [
					'd9574643-86f6-49e6-a384-7bc9e7cc5454',
					'48fe5e8d-acc0-4797-a10e-37fd54838ae1',
				],
				isCorrect: false,
			},
			{
				id: '7bf22e6c-c9d7-45e3-b66f-e02b1a80ca13',
				text: 'Terrorism',
				answerBuckets: [
					'ea8fceaa-6b49-4e4e-b433-4047d613df06',
					'3c48359a-064f-46d7-a6d0-5bcd31f792d1',
				],
				isCorrect: false,
			},
			{
				id: 'd40f66ba-c58c-4035-a4e3-c3c5bcbd6eba',
				text: 'Nuclear war',
				answerBuckets: ['3c48359a-064f-46d7-a6d0-5bcd31f792d1'],
				isCorrect: false,
			},
		],
		imageUrl:
			'https://i.guim.co.uk/img/media/816db2120eb8020529b5882c19be8432acb64741/0_0_1920_1152/master/1920.jpg?width=620&quality=85&auto=format&fit=max&s=0226a9202b9014a60f977f42b319113e',
		imageAlt:
			'The sun coming over the horizon, with the sky & clouds lit up red.',
	},
];

export const exampleResultBuckets = [
	{
		id: 'd9574643-86f6-49e6-a384-7bc9e7cc5454',
		title: 'You are peak millennial',
		description:
			"Congratulations! According to clipboard-wielding scientists, your choices put you right in the middle of millennial habits. You're a walking billboard for Generation Y - people call you lazy and entitled yet are still desperate for you to buy or read their stuff. Speaking of which, go look at our Millennials coverage. You know you want to.",
	},
	{
		id: '403a0e6a-671c-48a3-b4df-2cefd4445b9e',
		title: "You're a teenager",
		description:
			"What are you doing reading the Guardian? Your habits suggest you are so young that trend watchers haven't even come up with a name for your generation yet.",
	},
	{
		id: '48fe5e8d-acc0-4797-a10e-37fd54838ae1',
		title: "You're an older millennial",
		description:
			"You may not be aware you're part of Generation Y, but your answers suggest you must be - although maybe on the 'older' end of the scale.",
	},
	{
		id: '3c48359a-064f-46d7-a6d0-5bcd31f792d1',
		title: "You're a baby boomer",
		description:
			"Millennials may baffle you with their habits and infuriating fashion choices. What's more, they probably resent you somewhat for being the generation that might actually get to retire.",
	},
	{
		id: 'ea8fceaa-6b49-4e4e-b433-4047d613df06',
		title: "You're a Generation Xer with Generation Y tendencies",
		description:
			"You have some millennial tendencies but you're not fooling anyone, grandad.",
	},
];
