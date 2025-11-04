import { parse } from 'valibot';
import { ukNav } from '../../fixtures/manual/appsNav/uk';
import {
	AppsNavSchema,
	deleteSection,
	insertSection,
	moveSection,
	updateSection,
} from './appsNav';
import { okOrThrow } from '../lib/result';

describe('appsNav', () => {
	const sections = parse(AppsNavSchema, ukNav).pillars;

	it('deletes a top-level section', () => {
		const result = okOrThrow(
			deleteSection(sections, [0]),
			'Expected section deletion to be successful',
		);

		expect(result.deleted?.title).toBe('UK');
		expect(result.sections[0]?.title).toEqual('US politics');
	});

	it('deletes a second-level section', () => {
		const result = okOrThrow(
			deleteSection(sections, [0, 2]),
			'Expected section deletion to be successful',
		);

		expect(result.deleted?.title).toBe('Media');
		expect(result.sections?.[0]?.sections?.[2]?.title).toEqual('Society');
	});

	it('inserts sections', () => {
		const section = {
			title: 'Mock Section',
			path: 'mock-section',
		};

		const result = okOrThrow(
			insertSection(sections, [0], section),
			'Expected section insertion to be successful',
		);

		expect(result[0]?.title).toEqual('Mock Section');
		expect(result[1]?.title).toEqual('UK');

		const result2 = okOrThrow(
			insertSection(result, [1, 2], section),
			'Expected section insertion to be successful',
		);

		expect(result2?.[1]?.sections?.[2]?.title).toEqual('Mock Section');
		expect(result2[1]?.title).toEqual('UK');
	});

	it('moves sections', () => {
		const result = okOrThrow(
			moveSection(sections, [0, 2], 3),
			'Expected section move to be successful',
		);

		expect(result[0]?.sections?.length).toBe(8);
		expect(result?.[0]?.sections?.[2]?.title).toEqual('Society');
		expect(result?.[0]?.sections?.[5]?.title).toEqual('Media');

		const result2 = okOrThrow(
			moveSection(sections, [0, 2], -2),
			'Expected section move to be successful',
		);

		expect(result2[0]?.sections?.length).toBe(8);
		expect(result2?.[0]?.sections?.[0]?.title).toEqual('Media');
		expect(result2?.[0]?.sections?.[2]?.title).toEqual('Education');
	});

	it('updates sections', () => {
		const title = 'Mock Section';
		const path = 'mock-section';

		const result = okOrThrow(
			updateSection(sections, [0], title, path),
			'Expected section update to be successful',
		);

		expect(result.from.title).toEqual('UK');
		expect(result.sections[0]?.title).toEqual('Mock Section');
		expect(result.sections[0]?.path).toEqual('mock-section');
	});
});
