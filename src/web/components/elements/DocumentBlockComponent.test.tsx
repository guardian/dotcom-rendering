import { getDocumentCloudAssetUrl } from './DocumentBlockComponent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
describe('DocumentBlockComponent.getDocumentCloudAssetUrl', () => {
	it('convert the document cloud embed url to the raw asset url', () => {
		expect(
			getDocumentCloudAssetUrl(
				'https://embed.documentcloud.org/documents/20417938-test-pdf',
			),
		).toBe(
			'https://assets.documentcloud.org/documents/20417938/test-pdf.pdf',
		);
	});
	it('leave and unrecognised url unchanged', () => {
		expect(
			getDocumentCloudAssetUrl(
				'https://not-recognised/documents/20417938-test-pdf',
			),
		).toBe('https://not-recognised/documents/20417938-test-pdf');
	});
});
