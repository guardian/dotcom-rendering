export const exampleKnowledgeQuestions = [
	{
		id: 'b0342160-7678-417d-85c6-67a60ec4994b',
		text: 'Who captained Italy to World Cup success in 1982?',
		answers: [
			{
				id: 'c5c49561-d9df-4fd4-a7bb-47e7e0a88240',
				text: 'Dino Zoff',
				revealText:
					'Goalkeeper Zoff is the oldest player to win the tournament. He was 40 when he lifted the trophy after Italy’s 3-1 victory over West Germanyin the final. He was 21 years and 297 days older than Giuseppe Bergomi, one of his teammates.',
				isCorrect: true,
				answerBuckets: [],
			},
			{
				id: '3bf94d69-9bca-465a-bf51-82d77b305ad8',
				text: 'Claudio Gentile\n',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: '1c3484a2-006a-461a-a737-348275cbdfbc',
				text: 'Marco Tardelli\n',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: '4e1062d0-8743-49a2-8420-6b21f6ffff39',
				text: 'Antonio Cabrini',
				isCorrect: false,
				answerBuckets: [],
			},
		],
	},
	{
		id: '1a335512-22f9-440b-8d51-e2b87d039965',
		text: 'Which of these statements about the 1980 European Championship is true?',
		answers: [
			{
				id: '0d78318b-8707-48e3-92ea-697262bdcbf7',
				text: 'It was the first finals tournament to feature eight teams\n',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: 'eef3f58e-c436-4f66-8f55-dc2c3c5d0ad5',
				text: 'It was the last European Championship to feature a third-fourth play-off match\n',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: 'dff2dbdf-b737-4bbb-8c76-081f915a6757',
				text: 'The top scorer in the tournament scored all his goals in one match\n',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: '4ddeed1e-8dcd-4a4a-8355-2e0be09ef51d',
				text: 'All of the above',
				revealText:
					'The newly expanded tournament was the last to host a third-fourth play-off match, with Czechoslovakia beating hosts Italy 9-8 on penalties. Klaus Allofs scored a hat-trick for West Germany against the Netherlands in a group match and that was enough to make him the top scorer in a less than thrilling tournament.',
				isCorrect: true,
				answerBuckets: [],
			},
		],
	},
	{
		id: 'b4a75142-8e28-4634-b9ac-fe7556aee2cf',
		text: 'At which stadium did Liverpool beat Everton to win the 1984 Milk Cup final – their fourth consecutive League Cup triumph?',
		answers: [
			{
				id: '8c08e076-e124-4411-ac3e-669581824f4d',
				text: 'Old Trafford\n',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: '17a9a626-86b4-46f6-b8f2-a1b66ee6d40d',
				text: 'Villa Park',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: '76244370-f404-4ba6-b8b7-b0b660287e6c',
				text: 'Hillsborough',
				isCorrect: false,
				answerBuckets: [],
			},
			{
				id: '926e7b9f-2365-4c70-9607-98f79244f2e0',
				text: 'Maine Road',
				revealText:
					'After a goalless draw at Wembley, Liverpool won the replay at Maine Road thanks to a goal from Graeme Souness.',
				isCorrect: true,
				answerBuckets: [],
			},
		],
		imageUrl:
			'https://i.guim.co.uk/img/media/9bd896505173dcf4adadd02e5f40a03414c50bdc/172_201_2329_1397/master/2329.jpg?width=620&quality=85&auto=format&fit=max&s=133b7c6ce78a0780e99e605bb3ae7479',
		imageAlt: 'A group of players line up on the field',
	},
];

export const resultGroups = [
	{
		id: 'f878916e-08c0-4a55-9d77-8da45d37162c',
		title: 'Flawless',
		shareText: "I scored 15/15 in the Guardian's football quiz",
		minScore: 15,
	},
	{
		id: 'a60f15e7-28cc-4000-baab-ca84014cf989',
		title: "Don't worry. It was a long time ago",
		shareText: "I scored 0/15 in the Guardian's football quiz",
		minScore: 0,
	},
	{
		id: '3535a0f8-c7ea-4b89-82a3-84f6d0a58d09',
		title: 'Great!',
		shareText: "I scored 3/15 in the Guardian's football quiz",
		minScore: 3,
	},
	{
		id: '89c65806-51f1-4cc5-8069-409092ef98f2',
		title: 'A bit rusty',
		shareText: "I scored 1/15 in the Guardian's football quiz",
		minScore: 1,
	},
	{
		id: 'c038ed66-a421-4eee-8f95-ce102079974c',
		title: 'Reasonable',
		shareText: "I scored 2/15 in the Guardian's football quiz",
		minScore: 2,
	},
];

export const natureQuestions = [
	{
		id: '51027fed-227d-4521-848d-fbf674fc2469',
		text: 'Grampy pig, hardback and curly bug are all common names for what?',
		answers: [
			{
				id: '954d5600-b8e8-412b-b52b-4f54b9963d73',
				text: 'Earwig',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: 'd98a0357-05ec-4c48-9b55-174362c1968d',
				text: 'Woodlouse',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: '45eb40a8-f903-4eb7-9102-e74bcec143d1',
				text: 'Centipede',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: '174aece4-d104-4c18-975f-b0dc35a754ae',
		text: 'Muntjac deer are the size of …',
		answers: [
			{
				id: 'b493720f-2932-421d-8554-b0e08b744859',
				text: 'Domestic cat',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '637e0bd5-424c-4a13-9e8a-5f80978fe47f',
				text: 'Large dog',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: 'bb569cd3-d777-4e93-8d11-757d679e1dae',
				text: 'Cow',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: '35a1225f-6d34-4daf-924b-dee8bd9008ab',
		text: 'Is a slow worm …',
		answers: [
			{
				id: '0d677fa4-f0e2-4261-bccb-699dfdee2ca1',
				text: 'A worm',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: 'ae808ffa-054b-48b0-968d-ad7e4fabc7c5',
				text: 'Snake',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '93d3358c-1ef9-4a51-9bd6-805917d889b2',
				text: 'Lizard',
				answerBuckets: [],
				isCorrect: true,
			},
		],
	},
	{
		id: '522f041d-bbf9-409d-9535-19dcd14df907',
		text: 'Horseshoe, pipistrell and bechstein are all UK species of …',
		answers: [
			{
				id: '8e6a43af-c38c-49a7-b660-1fa5efbf536e',
				text: 'Bat',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: 'cd58dd8a-cac6-417c-8c30-f119c3c2c865',
				text: 'Deer',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: 'f6f07c8e-a1b7-49e3-8ccb-ee2e63a68c3f',
				text: 'Orchid',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: 'd90cfdd4-3839-4ab0-b6de-ca792d717d2b',
		text: 'Which of the following is a visitor to the UK (ie, not resident)?',
		answers: [
			{
				id: 'ed13d7ee-d6dd-42dc-9f41-ee2fcf1a3025',
				text: 'Little tern',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: '9a726714-42a2-4856-becf-d0f2b5d10370',
				text: 'Songthrush',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: 'f35aa907-f2d6-464d-9d94-aa6629b3e1f1',
				text: 'Wren',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: 'adfd41f2-eb88-47f2-b303-9f9ebc424d6e',
		text: 'Dead man’s finger (Xylaria polymorpha) is common in woodlands. Is it a …',
		answers: [
			{
				id: 'e75a1012-b287-422f-97c5-f73e00fe28cb',
				text: 'Fruit',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '6bb20f5c-b74c-4a41-87b7-15a5f8d44f49',
				text: 'Fungus',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: '98d28236-a50d-40b1-982e-ed180b08bca9',
				text: 'Flowering plant',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: 'f135fb73-17fe-43b3-ab7d-0325ba58d1d9',
		text: 'A glowworm is …',
		answers: [
			{
				id: 'ec08c059-d733-40cb-a7d9-b7a34b0234d2',
				text: 'A beetle that can chemically produce green cold light',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: '58b16764-b114-4041-a99d-da5940c5bcbd',
				text: 'A worm that has a glowing tail like a lightbulb',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '97e94d90-ee6e-4b54-96f3-7032e047ec96',
				text: 'A beetle that rubs its wings together to produce sparks',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: 'b1d0b0ca-8a61-4d5b-aa71-d1ff3f00bfbc',
		text: 'You are walking in the countryside and find a deep 15cm conical hole with foul-smelling liquid poo in the bottom. You have found …',
		answers: [
			{
				id: '12538a36-14b0-425c-91c2-6e4b6d7040ff',
				text: 'A rabbit toilet',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: 'e6bb12e2-534b-4f36-ac46-052a89ce36f3',
				text: 'A badger latrine',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: 'b3e1eb87-32b6-4e30-bdfc-169ee4691bc9',
				text: 'Fox poo',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: 'da28176f-049b-4b3f-890f-cbbfe51ce295',
		text: 'How many eggs do long-tailed tits lay?',
		answers: [
			{
				id: '73c7c060-423b-4159-b651-e23cea7ddb06',
				text: '5-8',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '1b81843f-17b1-4a6b-a0bd-73ea0fa353ca',
				text: '8-15',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: '17508e6d-d4ed-45d3-b526-55bd7cda334f',
				text: '16-20',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: 'df87e7de-7d1d-44fa-90ea-0b45e76210e6',
		text: 'Which of the following species is native to the UK?',
		answers: [
			{
				id: '01372331-d6c0-48a4-bd20-432d165a88dd',
				text: 'Sycamore tree',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '059c8437-b7cf-4fc2-b5de-1cb552f45842',
				text: 'Brown hare',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '9236f39a-cabe-4a5d-a530-2b14e2a4fa08',
				text: 'Wildcat',
				answerBuckets: [],
				isCorrect: true,
			},
		],
	},
	{
		id: '63d65f9a-d3b1-41a6-86b2-94abdd13a06d',
		text: 'How do mussels attach to rocks?',
		answers: [
			{
				id: '7d92859f-99af-4688-8c6e-fd1ad3d1e1d3',
				text: 'Strong, sticky threads',
				revealText: 'One of the strongest glues in the world',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: 'b19f6f27-5b9e-4afa-a406-9f3b41cffe8d',
				text: 'Clamp on with their muscles',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '0a594998-cad5-4b55-a53b-2207a82065b0',
				text: 'Small tube feet',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: '11337957-0415-488a-9878-d3629ab7dae8',
		text: 'The once common turtle dove has declined by 93% since the 1970s. The main reason for this is …',
		answers: [
			{
				id: 'e488ed61-cf6d-4540-96bb-44845fbde784',
				text: 'Hunting by humans',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '2379d26e-8226-4d21-be9e-922e5193f6ed',
				text: 'Predation from other animals',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '3acbf7cf-c808-4a1f-86a2-c2fc20c4a51c',
				text: 'Loss of habitat',
				answerBuckets: [],
				isCorrect: true,
			},
		],
	},
	{
		id: 'c00a4f49-d91e-4aa9-9839-f799678b8f1f',
		text: 'Is this butterfly …',
		answers: [
			{
				id: 'b4770f2a-390c-4135-9f49-bd4d5131a086',
				text: 'Speckled wood',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: '0f89951c-04aa-48f9-acf6-81d7dd2b80b2',
				text: 'Gatekeeper',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: 'feb17b0f-5629-44c8-afce-ce466dfd8fd9',
				text: 'Brown argus',
				answerBuckets: [],
				isCorrect: false,
			},
		],
		imageUrl:
			'https://i.guim.co.uk/img/media/cf44ae3573ee2b617f76021c6599f49316837e09/56_581_4045_2427/master/4045.jpg?width=620&quality=85&auto=format&fit=max&s=afb7e45cc2a3873745cb5bcb620d8291',
		imageAlt:
			'Brown winged butterfly with white spots, some of which have black spots with white eyes within them',
	},
	{
		id: '4339cc24-d597-43d0-9efd-2dd9d8f4982f',
		text: 'How fast does a gannet hit the surface of the sea when diving for fish?',
		answers: [
			{
				id: 'ced71c4a-31d0-4464-9962-0cf3f6696d42',
				text: '20mph',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '7f5b5c8d-cb0b-4dfb-a7ea-d8d32fde11a5',
				text: '60mph',
				answerBuckets: [],
				isCorrect: true,
			},
			{
				id: '07d221d0-b0bb-4a96-9909-61802e633cf5',
				text: '100mph',
				answerBuckets: [],
				isCorrect: false,
			},
		],
	},
	{
		id: '1e0f2850-77e8-4d69-97e8-61fd3e9db39c',
		text: 'How many different species of beetle are there in the UK?',
		answers: [
			{
				id: '4ac7728c-0ab9-4c86-bb27-d099e0246606',
				text: '150',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: 'e7e63d12-8358-4616-8a18-77c58cb83be3',
				text: '1,300',
				answerBuckets: [],
				isCorrect: false,
			},
			{
				id: '3eab5a27-e32e-4345-b207-e0db823d54c4',
				text: '4,200',
				answerBuckets: [],
				isCorrect: true,
			},
		],
	},
];

export const natureResultGroups = [
	{
		id: '08fc32ee-8d45-4d99-ad8e-eda0142cc427',
		title: 'Couch potato',
		shareText: 'I got _0/5_ in <quiz title>',
		minScore: 0,
	},
	{
		id: '8f5fb810-fb26-46c9-8b3a-b66530c4db1b',
		title: 'Nature nerd!',
		shareText: 'I got _11/15_ in <quiz title>',
		minScore: 11,
	},
	{
		id: 'd17fc181-0d48-4bcb-8c3c-6cd31832defa',
		title: 'Could do better',
		shareText: 'I got _/_ in <quiz title>',
		minScore: 6,
	},
];
