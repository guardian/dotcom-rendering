import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	editionalisedPages,
	editionList,
	isEditionalisedPage,
	isNetworkFront,
} from './edition';

const everyNetworkFront = editionList.map((edition) => edition.pageId);

const everyEditionalisedPage = editionList
	.map((edition) =>
		editionalisedPages.map((page) => `${edition.pageId}/${page}`),
	)
	.flat();

void describe('is network front', () => {
	void it('returns true if pageId is a network front', () => {
		assert.equal(
			everyNetworkFront.every((page) => isNetworkFront(page)),
			true,
		);
	});
	void it('returns false if pageId is NOT a network front', () => {
		assert.equal(everyEditionalisedPage.every(isNetworkFront), false);
		assert.equal(isNetworkFront('eu'), false);
		assert.equal(isNetworkFront('int'), false);
		assert.equal(isNetworkFront('uk/'), false);
	});
});

void describe('is editionalised page', () => {
	void it('returns true if pageId is editionalised', () => {
		assert.equal(
			everyEditionalisedPage.every((page) => isEditionalisedPage(page)),
			true,
		);
	});
	void it('returns false if pageId is NOT editionalised', () => {
		assert.equal(
			everyNetworkFront.every((page) => isEditionalisedPage(page)),
			false,
		);
		assert.equal(isEditionalisedPage('uk'), false);
		assert.equal(isEditionalisedPage('au'), false);
		assert.equal(isEditionalisedPage('international'), false);
		assert.equal(isEditionalisedPage('travel'), false);
		assert.equal(isEditionalisedPage('culture'), false);
		assert.equal(isEditionalisedPage('lifeandstyle'), false);
		assert.equal(
			isEditionalisedPage('lifeandstyle/health-and-wellbeing'),
			false,
		);
	});
});
