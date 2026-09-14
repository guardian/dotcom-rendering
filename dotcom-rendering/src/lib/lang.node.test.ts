import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { decideLanguage, decideLanguageDirection } from './lang';

void describe('decideLanguage', () => {
	void it('returns undefined if input is "en"', () => {
		assert.equal(decideLanguage('en'), undefined);
	});

	void it('returns input if it is not "en"', () => {
		assert.equal(decideLanguage('at'), 'at');
		assert.equal(decideLanguage('fr'), 'fr');
	});
});

void describe('describeLanguageDirection', () => {
	void it('returns rtl if input is true', () => {
		assert.equal(decideLanguageDirection(true), 'rtl');
		assert.equal(decideLanguageDirection(false), undefined);
	});
});
