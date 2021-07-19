import { render } from '@testing-library/react';
import { Byline } from './Byline';

describe('Byline', () => {
	const guardianBaseURL = 'https://theguardian.com';

	it('should link a single tag by linking name tokens with Contributor tag titles', () => {
		const byline = 'Eva Smith and friends';
		const tags = [
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
		];

		const { container, debug } = render(
			<Byline
				byline={byline}
				guardianBaseURL={guardianBaseURL}
				tags={tags}
			/>,
		);
		debug();

		const links = container.querySelectorAll('a');

		expect(container).toHaveTextContent(byline);
		expect(links.length).toBe(1);
		expect(links.item(0).href).toBe('https://theguardian.com/eva-smith');
	});

	it('should link multiple tags by linking name tokens with Contributor tag titles', () => {
		const byline = 'Eva Smith and Duncan Porter';
		const tags = [
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
			{
				id: 'duncan-porter',
				type: 'Contributor',
				title: 'Duncan Porter',
			},
		];
		const { container } = render(
			<Byline
				byline={byline}
				guardianBaseURL={guardianBaseURL}
				tags={tags}
			/>,
		);

		const links = container.querySelectorAll('a');

		expect(container).toHaveTextContent(byline);
		expect(links.length).toBe(2);
		expect(links.item(0).href).toBe('https://theguardian.com/eva-smith');
		expect(links.item(1).href).toBe(
			'https://theguardian.com/duncan-porter',
		);
	});

	it('should not reuse a contributor tag, to successfully disambiguate identical names', () => {
		const byline = 'Duncan Porter and Duncan Porter';
		const tags = [
			{
				id: 'duncan-porter',
				type: 'Contributor',
				title: 'Duncan Porter',
			},
			{
				id: 'duncan-porter-1',
				type: 'Contributor',
				title: 'Duncan Porter',
			},
		];

		const { container } = render(
			<Byline
				byline={byline}
				guardianBaseURL={guardianBaseURL}
				tags={tags}
			/>,
		);

		const links = container.querySelectorAll('a');

		expect(container).toHaveTextContent(byline);
		expect(links.length).toBe(2);
		expect(links.item(0).href).toBe(
			'https://theguardian.com/duncan-porter',
		);
		expect(links.item(1).href).toBe(
			'https://theguardian.com/duncan-porter-1',
		);
	});
});
