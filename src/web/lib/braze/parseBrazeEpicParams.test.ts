import {
	EpicDataFromBraze,
	parseBrazeEpicParams,
} from './parseBrazeEpicParams';

describe('parseBrazeEpicParams', () => {
	it('returns a variant when params from Braze are valid', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			paragraph3: 'Paragraph 3',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const expected = {
			heading: 'Example Heading',
			paragraphs: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'],
			highlightedText: 'Example highlighted text',
			cta: { text: 'Button', baseUrl: 'https://www.example.com' },
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toEqual(expected);
	});

	it('is lenient if paragraphs are not contiguous', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			paragraph1: 'First paragraph',
			paragraph3: 'Another paragraph',
			heading: 'Example Heading',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const expected = {
			heading: 'Example Heading',
			paragraphs: ['First paragraph', 'Another paragraph'],
			highlightedText: 'Example highlighted text',
			cta: { text: 'Button', baseUrl: 'https://www.example.com' },
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toEqual(expected);
	});

	it('returns null when the heading is missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toBeNull();
	});

	it('returns null when the paragraphs are missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toBeNull();
	});

	it('returns null when the paragraphs are not truthy', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			paragraph1: '',
			paragraph2: '',
			heading: 'Example Heading',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toBeNull();
	});

	it('returns null when the highlightedText is missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toBeNull();
	});

	it('returns null when the buttonText is missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toBeNull();
	});

	it('returns null when the buttonUrl is missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toBeNull();
	});

	it('returns null when the ophanComponentId is missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toBeNull();
	});
});
