import { renderToString } from 'react-dom/server';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { ConfigProvider } from './ConfigContext';
import { RichLinkComponent } from './RichLinkComponent.importable';

describe('RichLinkComponent', () => {
	it('does not fail on the server with an empty URL', () => {
		const format = {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReport,
		};
		expect(() =>
			renderToString(
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						assetOrigin: '/',
						editionId: 'UK',
					}}
				>
					<RichLinkComponent
						element={{
							_type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
							elementId: '',
							url: '',
							text: '',
							prefix: '',
						}}
						ajaxUrl={''}
						richLinkIndex={0}
						format={format}
					/>
				</ConfigProvider>,
			),
		).not.toThrow();
	});
});
