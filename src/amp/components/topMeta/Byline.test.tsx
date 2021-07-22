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

		const { container } = render(
			<Byline
				byline={byline}
				guardianBaseURL={guardianBaseURL}
				tags={tags}
			/>,
		);

		const links = container.querySelectorAll('a');

		expect(container).toHaveTextContent(byline);
		expect(links.length).toBe(1);
		expect(links.item(0).href).toBe('https://theguardian.com/eva-smith');
	});

	it('should link multiple tags by linking name tokens with Contributor tag titles', () => {
		const byline = 'Eva Smith and Duncan Campbell';
		const tags = [
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
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
			'https://theguardian.com/duncan-campbell',
		);
	});

	it('should not reuse a contributor tag, to successfully disambiguate identical names', () => {
		const byline = 'Duncan Campbell and Duncan Campbell';
		const tags = [
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
			{
				id: 'duncan-campbell-1',
				type: 'Contributor',
				title: 'Duncan Campbell',
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
			'https://theguardian.com/duncan-campbell',
		);
		expect(links.item(1).href).toBe(
			'https://theguardian.com/duncan-campbell-1',
		);
	});
});
