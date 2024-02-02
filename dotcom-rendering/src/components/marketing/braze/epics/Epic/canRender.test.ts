import { canRender } from './canRender';
import type { BrazeMessageProps } from './Epic';

describe('canRender', () => {
	it('returns true when data from Braze is valid', () => {
		const dataFromBraze: BrazeMessageProps = {
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			paragraph3: 'Paragraph 3',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(true);
	});

	it('is lenient if paragraphs are not contiguous', () => {
		const dataFromBraze: BrazeMessageProps = {
			paragraph1: 'First paragraph',
			paragraph3: 'Another paragraph',
			heading: 'Example Heading',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(true);
	});

	it('does not care if non-required fields are missing', () => {
		const dataFromBraze: BrazeMessageProps = {
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			paragraph3: 'Paragraph 3',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(true);
	});
	it('returns false when paragraphs missing', () => {
		const dataFromBraze: BrazeMessageProps = {
			heading: 'Example Heading',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(false);
	});

	it('returns false if paragraphs are empty', () => {
		const dataFromBraze: BrazeMessageProps = {
			paragraph1: '',
			paragraph2: '',
			heading: 'Example Heading',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(false);
	});

	it('returns false when the buttonText is missing', () => {
		const dataFromBraze: BrazeMessageProps = {
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonUrl: 'https://www.example.com',
			ophanComponentId: 'epic_123',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(false);
	});

	it('returns false when the buttonUrl is missing', () => {
		const dataFromBraze: BrazeMessageProps = {
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			ophanComponentId: 'epic_123',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(false);
	});

	it('returns false if the ophanComponentId is missing', () => {
		const dataFromBraze: BrazeMessageProps = {
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonText: 'Button',
			buttonUrl: 'https://www.example.com',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(false);
	});

	it('returns false when multiple fields missing', () => {
		const dataFromBraze: BrazeMessageProps = {
			heading: 'Example Heading',
			paragraph1: 'Paragraph 1',
			paragraph2: 'Paragraph 2',
			highlightedText: 'Example highlighted text',
			buttonUrl: 'https://www.example.com',
		};

		const got = canRender(dataFromBraze);

		expect(got).toEqual(false);
	});
});
