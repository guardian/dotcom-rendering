import { ok, err } from '@guardian/types';
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

		const expected = ok({
			name: 'CONTROL',
			heading: 'Example Heading',
			paragraphs: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'],
			highlightedText: 'Example highlighted text',
			cta: { text: 'Button', baseUrl: 'https://www.example.com' },
			ophanComponentId: 'epic_123',
		});

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

		const expected = ok({
			name: 'CONTROL',
			heading: 'Example Heading',
			paragraphs: ['First paragraph', 'Another paragraph'],
			highlightedText: 'Example highlighted text',
			cta: { text: 'Button', baseUrl: 'https://www.example.com' },
			ophanComponentId: 'epic_123',
		});

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toEqual(expected);
	});

	it('does not care if non-required fields are missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			paragraph3: 'Paragraph 3',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const expected = ok({
			name: 'CONTROL',
			paragraphs: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'],
			cta: { text: 'Button', baseUrl: 'https://www.example.com' },
			ophanComponentId: 'epic_123',
		});

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toEqual(expected);
	});
	it('returns an error message when the paragraphs are missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toEqual(err('Missing paragraphs'));
	});

	it('returns an error message when the paragraphs are not truthy', () => {
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

		expect(got).toEqual(err('Missing paragraphs'));
	});

	it('returns an error message when the buttonText is missing', () => {
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

		expect(got).toEqual(err('Missing field(s): buttonText'));
	});

	it('returns an error message when the buttonUrl is missing', () => {
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

		expect(got).toEqual(err('Missing field(s): buttonUrl'));
	});

	it('returns an error message when the ophanComponentId is missing', () => {
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

		expect(got).toEqual(err('Missing field(s): ophanComponentId'));
	});

	it('returns the correct error message when multiple fields missing', () => {
		const dataFromBraze: EpicDataFromBraze = {
			componentName: 'Epic',
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonUrl: 'https://www.example.com',
		};

		const got = parseBrazeEpicParams(dataFromBraze);

		expect(got).toEqual(
			err('Missing field(s): buttonText,ophanComponentId'),
		);
	});
});
