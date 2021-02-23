import React from 'react';
import { render } from '@testing-library/react';
import { Analytics, AnalyticsModel } from '@root/src/amp/components/Analytics';

const analyticsBase: AnalyticsModel = {
	gaTracker: 'UA-XXXXXXX-X',
	title: 'Foo',
	fbPixelaccount: 'XXXXXXXXXX',
	comscoreID: 'XXXXXXX',
	contentType: 'Article',
	id: 'some/page',
	beacon: `localhost/count/pv.gif`,
	neilsenAPIID: 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX',
	domain: 'amp.theguardian.com',
	permutive: {
		namespace: 'guardian',
		apiKey: '42-2020',
		payload: {
			'properties.content.title': 'article title',
		},
	},
	ipsosSectionName: 'section',
};

describe('AnalyticsComponent', () => {
	it('if section is business then include the MoDI snowplow tag', () => {
		const analytics = {
			...analyticsBase,
			section: 'business',
		};

		const { container } = render(<Analytics analytics={analytics} />);

		const ampAnalyticsSnowplowElement = container.querySelectorAll(
			'amp-analytics[type="snowplow_v2"]',
		);

		expect(ampAnalyticsSnowplowElement.length).toBe(1);

		const script = ampAnalyticsSnowplowElement[0].querySelector('script');

		if (!script) {
			fail('MoDI snowplow tag has no child script');
		} else {
			expect(JSON.parse(script.text)).not.toBeNull();
		}
	});

	it('if section is undefined then do not include the MoDI snowplow tag', () => {
		const analytics = {
			...analyticsBase,
		};
		const { container } = render(<Analytics analytics={analytics} />);

		const ampAnalyticsSnowplowElement = container.querySelector(
			'amp-analytics[type="snowplow_v2"]',
		);

		expect(ampAnalyticsSnowplowElement).toBeNull();
	});

	it('if section is not business then do not include the MoDI snowplow tag', () => {
		const analytics = {
			...analyticsBase,
			section: 'politics',
		};
		const { container } = render(<Analytics analytics={analytics} />);

		const ampAnalyticsSnowplowElement = container.querySelector(
			'amp-analytics[type="snowplow_v2"]',
		);

		expect(ampAnalyticsSnowplowElement).toBeNull();
	});
});
