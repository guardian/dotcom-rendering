// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import type { Option } from '../../../vendor/@guardian/types/index';
import { parse } from 'client/parser';
import HeadlineByline from './';

// ----- Setup ----- //

const parser = new DOMParser();
const parseByline = parse(parser);

const mockBylineHtml = (): Option<DocumentFragment> =>
	parseByline(
		`<a href="https://www.theguardian.com/profile/leah-harper">Leah Harper</a>`,
	).toOption();

// ----- Stories ----- //

const Default = () => (
	<HeadlineByline
		format={{
			theme: Pillar.News,
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
		}}
		bylineHtml={mockBylineHtml()}
	/>
);

// ----- Exports ----- //

export default {
	component: HeadlineByline,
	title: 'AR/HeadlineByline',
};

export { Default };
