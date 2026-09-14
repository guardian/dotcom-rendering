import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { TagType } from '../types/tag';
import { getAgeWarning } from './age-warning';

void describe('getAgeWarning', () => {
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

	void it('shows age warning when publication date is more than 1 month ago', () => {
		assert.equal(getAgeWarning([studentsTag], oneMonthOld), '1 month old');
	});

	void it('shows age warning when publication date is more than 2 months ago', () => {
		assert.equal(
			getAgeWarning([studentsTag], twoMonthsOld),
			'2 months old',
		);
	});

	void it('shows age warning when publication date is more than 1 year ago', () => {
		assert.equal(getAgeWarning([studentsTag], oneYearOld), '1 year old');
	});

	void it('shows age warning when publication date is more than 2 years ago', () => {
		assert.equal(getAgeWarning([studentsTag], twoYearsOld), '2 years old');
	});

	void it('is undefined if one of the tags is excluded from age warning', () => {
		assert.equal(
			getAgeWarning([studentsTag, infoTag], oneMonthOld),
			undefined,
		);
	});
});
