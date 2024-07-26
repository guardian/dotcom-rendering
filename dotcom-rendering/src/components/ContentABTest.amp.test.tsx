import { isUndefined } from '@guardian/libs';
import { render } from '@testing-library/react';
import {
	ContentABTestProvider,
	getGroup,
	useContentABTestGroup,
} from './ContentABTest.amp';

describe('getGroup', () => {
	// The follow groups were computed by the SQL query used at the analysis stage
	// They are included here as a test to catch regressions in the implementation of `getGroup`
	test.each([
		['business/2008/jun/03/royalbankofscotlandgroup.barclaysbusiness', 5],
		['world/2012/dec/26/syria-military-police-chief-defects', 1],
		['film/2004/may/12/cannes2004.cannesfilmfestival5', 3],
		['film/2013/jan/10/oscars-2013-nominations-list', 5],
		['technology/2004/may/13/comment.comment', 1],
		['money/2004/may/13/homeimprovements', 10],
		['education/2004/may/12/highereducation.news', 0],
		['technology/2004/may/13/interviews.onlinesupplement', 5],
		['politics/2012/apr/23/tories-third-largest-donor-tax', 4],
		['society/2004/may/12/prisons.crime', 3],
		['world/2012/apr/26/meenakshi-thapar-mumbai-bollywood', 7],
		['world/2012/apr/23/iceland-geir-haarde-found-guilty', 9],
		['politics/2012/apr/24/george-osborne-budget-undermining-tories', 3],
		['world/2012/apr/23/george-zimmerman-trayvon-martin-apology', 6],
		['world/2012/apr/23/obama-crackdown-cyber-oppressors', 5],
		['football/2012/apr/23/chelsea-john-terry-qpr-anton-ferdinand', 3],
		['global-development/2012/apr/24/oecd-urges-eu-aid-message', 2],
		['tv-and-radio/2013/aug/10/the-month-in-soaps', 3],
		['world/2013/aug/11/amnesty-international-media-awards-2014', 1],
		['business/2009/jan/05/credit-crunch-strange-times', 11],
		['lifeandstyle/2008/nov/25/healthandwellbeing-cancer', 7],
		['sustainable-business/gap-alliance-bangladeshi-worker-safety', 1],
		['culture/2013/aug/11/why-were-watching-alexander-taylor', 10],
		['world/2008/nov/25/venezuela-hugo-chavez', 11],
	])('pageId %s gives group %d', (pageId, expectedGroup) =>
		expect(getGroup(pageId)).toEqual(expectedGroup),
	);
});

test('throws error when used outside of provider', () => {
	expect(() => {
		const Component = () => {
			useContentABTestGroup();
			return null;
		};

		render(<Component />);
	}).toThrow(
		'useContentABTestGroup must be used within the ContentABTestProvider',
	);
});

test('returns undefined group when switched off', () => {
	const pageId =
		'food/2022/feb/15/air-fryers-miraculous-kitchen-must-have-or-just-a-load-of-hot-air';

	const Component = () => {
		const { group } = useContentABTestGroup();

		if (isUndefined(group)) {
			return null;
		}

		return <span>{group}</span>;
	};

	const { container } = render(
		<ContentABTestProvider switches={{}} pageId={pageId}>
			<Component />
		</ContentABTestProvider>,
	);

	expect(container).not.toHaveTextContent(/0|1|2|3|4|5|6|7|8|9|10|11/);
});

test('returns a valid group ID when used inside of a provider', () => {
	const pageId =
		'food/2022/feb/15/air-fryers-miraculous-kitchen-must-have-or-just-a-load-of-hot-air';

	const Component = () => {
		const { group } = useContentABTestGroup();

		if (isUndefined(group)) {
			return null;
		}

		return <span>{group}</span>;
	};

	const { container } = render(
		<ContentABTestProvider
			switches={{ ampContentAbTesting: true }}
			pageId={pageId}
		>
			<Component />
		</ContentABTestProvider>,
	);

	// Check content has been placed into one of the possible groups
	expect(container).toHaveTextContent(/0|1|2|3|4|5|6|7|8|9|10|11/);
});
