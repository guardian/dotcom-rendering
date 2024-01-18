import { getAgeWarning } from './age-warning';
import { TagType } from '../types/tag';

describe('getAgeWarning', () => {
	const infoTag: TagType = {
		id: 'info/info',
		type: 'info',
		title: 'info',
	};
	const studentsTag: TagType = {
		id: 'education/students',
		type: 'topic',
		title: 'info',
	};

	const today = new Date();
	const oneMonthOld = new Date(
		new Date().setDate(today.getDate() - 31),
	).toDateString();
	const twoMonthsOld = new Date(
		new Date().setDate(today.getDate() - 65),
	).toDateString();
	const oneYearOld = new Date(
		new Date().setDate(today.getDate() - 370),
	).toDateString();
	const twoYearsOld = new Date(
		new Date().setDate(today.getDate() - 750),
	).toDateString();

	it('shows age warning when publication date is more than 1 month ago', () => {
		const testTags = [studentsTag];
		expect(getAgeWarning(testTags, oneMonthOld)).toEqual('1 month old');
	});

	it('shows age warning when publication date is more than 2 months ago', () => {
		const testTags = [studentsTag];
		expect(getAgeWarning(testTags, twoMonthsOld)).toEqual('2 months old');
	});

	it('shows age warning when publication date is more than 1 year ago', () => {
		const testTags = [studentsTag];
		expect(getAgeWarning(testTags, oneYearOld)).toEqual('1 year old');
	});

	it('shows age warning when publication date is more than 2 years ago', () => {
		const testTags = [studentsTag];
		expect(getAgeWarning(testTags, twoYearsOld)).toEqual('2 years old');
	});

	it('is undefined if one of the tags is excluded from age warning', () => {
		const testTags = [studentsTag, infoTag];
		expect(getAgeWarning(testTags, oneMonthOld)).toEqual(undefined);
	});
});
