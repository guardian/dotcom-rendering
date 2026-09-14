import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { findBySubsection } from './article-sections';

void describe('returns section for each subsection', () => {
	const testCases = [
		[[], 'Guardian'],
		[['books', 'childrens-books-site'], 'Books'],
		[['books', 'childrens-books-site'], 'Books'],
		[
			[
				'business',
				'better-business',
				'business-to-business',
				'working-in-development',
			],
			'Business',
		],
		[['commentisfree'], 'CommentIsFree'],
		[
			[
				'culture',
				'artanddesign',
				'culture-network',
				'culture-professionals-network',
				'games',
				'stage',
			],
			'Culture',
		],
		[
			['education', 'higher-education-network', 'teacher-network'],
			'Education',
		],
		[['environment', 'animals-farmed'], 'Environment'],
		[['fashion'], 'Fashion'],
		[['film'], 'Film'],
		[['lifeandstyle'], 'LifeStyle'],
		[['media'], 'Media'],
		[['money'], 'Money'],
		[['music'], 'Music'],
		[
			[
				'news',
				'australia-news',
				'cardiff',
				'cities',
				'community',
				'edinburgh',
				'global-development',
				'government-computing-network',
				'law',
				'leeds',
				'local',
				'local-government-network',
				'media-network',
				'uk-news',
				'us-news',
				'weather',
				'world',
			],
			'News',
		],
		[['politics'], 'Politics'],
		[
			[
				'guardian-professional',
				'global-development-professionals-network',
				'small-business-network',
			],
			'ProfessionalNetwork',
		],
		[['science'], 'Science'],
		[
			[
				'society',
				'healthcare-network',
				'housing-network',
				'inequality',
				'public-leaders-network',
				'social-care-network',
				'social-enterprise-network',
				'society-professionals',
				'women-in-leadership',
			],
			'Society',
		],
		[['sport', 'football'], 'Sport'],
		[['technology'], 'Technology'],
		[['travel', 'travel/offers'], 'Travel'],
		[['tv-and-radio'], 'TvRadio'],
	] as const;

	void it('returns correct Section for each test case', () => {
		for (const [subsections, section] of testCases) {
			for (const subsection of subsections) {
				assert.equal(findBySubsection(subsection).name, section);
			}
		}
	});
});
