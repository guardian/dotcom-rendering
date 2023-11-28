import type { RequestHandler } from 'express';
import { validateAsNewsletterDetailPageType } from '../model/validate';
import type { DCRNewsletterDetailPageType } from '../types/newsletterDetailPage';

const makeTestHtml = (page: DCRNewsletterDetailPageType) => {
	const { name, description } = page.newsletter;

	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
</head>
<body>
    <h1>${name}</h1>
	<p>${description}</p>
	<div>
		<h2>Raw Data</h2>
		<pre>${JSON.stringify(page, undefined, 3)}</pre>
	</div>
</body>
</html>
`;
};

export const handleNewsletterDetailPage: RequestHandler = ({ body }, res) => {
	const feNewsletterDetailPage = validateAsNewsletterDetailPageType(body);

	// TO DO - there are no enhancements to apply to the FE type to make it a DCR type
	const newsletterDetailPage: DCRNewsletterDetailPageType =
		feNewsletterDetailPage;

	res.status(200).send(makeTestHtml(newsletterDetailPage));
};
