import { AssetType } from '@guardian/content-api-models/v1/assetType';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { AtomType } from '@guardian/content-atom-model/atomType';
import { DisplayType } from '@guardian/content-atom-model/explainer/displayType';
import { none } from '@guardian/types';
import { parseVideo } from 'video';

describe('parseVideo', () => {
	const blockElement = {
		type: ElementType.VIDEO,
		assets: [
			{
				type: AssetType.VIDEO,
			},
		],
	};
	test('returns none given no atoms', () => {
		expect(parseVideo(blockElement)).toEqual(none);
	});

	const atoms = {
		media: [
			{
				id: 'atomId',
				atomType: AtomType.EXPLAINER,
				labels: ['someLabel'],
				defaultHtml: 'someHtml',
				data: {
					kind: 'explainer',
					media: {
						title: 'explainerTitle',
						body: 'explainerBody',
						displayType: DisplayType.EXPANDABLE,
					},
				},
				contentChangeDetails: {},
				commissioningDesks: ['someDesk'],
			},
		],
	};
	test('returns none given no atom', () => {
		expect(parseVideo(blockElement)).toEqual(none);
	});
});
