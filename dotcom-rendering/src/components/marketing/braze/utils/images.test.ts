/**
 * @jest-environment jsdom
 */
import { isImageUrlAllowed } from './images';

describe('isImageUrlValid', () => {
	it('returns true when the image is hosted on a valid domain', () => {
		const imageUrl =
			'https://media.guim.co.uk/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/930.png';

		const isAllowed = isImageUrlAllowed(imageUrl);

		expect(isAllowed).toEqual(true);
	});

	it('returns false when the image is hosted on an invalid domain', () => {
		const imageUrl = 'https://www.example.com/image.png';

		const isAllowed = isImageUrlAllowed(imageUrl);

		expect(isAllowed).toEqual(false);
	});
});
