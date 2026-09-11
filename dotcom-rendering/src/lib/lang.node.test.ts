import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { decideLanguage, decideLanguageDirection } from './lang';

void nodeDescribe('decideLanguage', () => {
	void nodeIt('returns undefined if input is "en"', () => {
		assert.equal(decideLanguage('en'), undefined);
	});

	void nodeIt('returns input if it is not "en"', () => {
		assert.equal(decideLanguage('at'), 'at');
		assert.equal(decideLanguage('fr'), 'fr');
	});
});

void nodeDescribe('describeLanguageDirection', () => {
	void nodeIt('returns rtl if input is true', () => {
		assert.equal(decideLanguageDirection(true), 'rtl');
		assert.equal(decideLanguageDirection(false), undefined);
	});
});
