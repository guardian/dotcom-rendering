/* eslint-disable no-undef */
/* eslint-disable func-names */
import { disableCMP } from '../../lib/disableCMP';
import { setLocalBaseUrl } from '../../lib/setLocalBaseUrl.js';

const articleUrl =
	'https://www.theguardian.com/commentisfree/2020/dec/11/brexit-conservative-rule-breaking-eu';

const permalink =
	'https://www.theguardian.com/commentisfree/2020/dec/11/brexit-conservative-rule-breaking-eu#comment-145938876';

describe('Discussion', function () {
	beforeEach(function () {
		disableCMP();
		setLocalBaseUrl();
	});

	it('should scroll the page to the comments section and expand it when the comment count link is clicked', function () {
		cy.visit(`/Article?url=${articleUrl}`);
		cy.get('[data-cy=comment-counts]').click();
		cy.contains('Displaying threads');
	});

	it('should show a count of the comments', function () {
		cy.visit(`/Article?url=${articleUrl}`);
		cy.contains(/comments \(\d*\)/);
	});

	// it('should expand the comments when the view more button is clicked', function () {
	//     cy.visit(`/Article?url=${articleUrl}`);
	//     const roughLoadPositionOfComments = 4000;
	//     cy.scrollTo(0, roughLoadPositionOfComments, { duration: 500 });
	//     cy.contains('View more comments').click();
	//     cy.contains('Displaying threads');
	// });

	it('should automatically expand and scroll to a comment if the reader loads a permalink', function () {
		cy.visit(`/Article?url=${permalink}`);
		cy.contains(
			'In the world of human psychology, change is glacially slow',
		);
	});
});
