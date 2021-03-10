import { matchers } from '@emotion/jest';
import { some } from '@guardian/types';
import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import renderer from 'react-test-renderer';

expect.extend(matchers);

describe('HeaderImageCaption component renders as expected', () => {
	it('Formats the Caption correctly', () => {
		const headerImageCaption = renderer.create(
			<HeaderImageCaption
				caption={some('Here is a caption.')}
				credit={some('Photograph: cameraman')}
			/>,
		);

		const header = headerImageCaption.root.findByProps({ id: captionId });
		const headerText = header.children.join('');

		expect(headerText).toBe('Here is a caption. Photograph: cameraman');
	});
});
