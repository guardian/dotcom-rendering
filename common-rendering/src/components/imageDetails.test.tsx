// ----- Imports ----- //

import { matchers } from '@emotion/jest';
import { some } from '@guardian/types';
import ImageDetails from './imageDetails';
import renderer from 'react-test-renderer';

// ----- Setup ----- //

expect.extend(matchers);
const captionId = 'header-image-caption';

// ----- Tests ----- //

describe('HeaderImageCaption component renders as expected', () => {
	it('Formats the Caption correctly', () => {
		const headerImageCaption = renderer.create(
			<ImageDetails
				caption={some('Here is a caption.')}
				credit={some('Photograph: cameraman')}
				supportsDarkMode
				id={captionId}
			/>,
		);

		const header = headerImageCaption.root.findByProps({ id: captionId });
		const headerText = header.children.join('');

		expect(headerText).toBe('Here is a caption. Photograph: cameraman');
	});
});
