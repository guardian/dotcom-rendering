import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
import { BlockquoteBlockComponent } from './BlockquoteBlockComponent';

const shortQuoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence</p> \n<p>A second paragraph</p> \n</blockquote>';
const blockquoteHtml =
	'<blockquote class="quoted"> \n <p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p> \n<p>A second paragraph</p> \n</blockquote>';

export default {
	component: BlockquoteBlockComponent,
	title: 'Components/BlockquoteComponent',
};

const containerStyles = css`
	max-width: 620px;
	margin: 20px;
`;

export const Unquoted = () => {
	return (
		<div css={containerStyles}>
			<h1>Long</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
				})}
			/>
			<h1>Short</h1>
			<BlockquoteBlockComponent
				html={shortQuoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
				})}
			/>
		</div>
	);
};
Unquoted.storyName = 'Unquoted';

export const Quoted = () => {
	return (
		<div css={containerStyles}>
			<h1>News</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
				})}
				quoted={true}
			/>
			<h1>Sport</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
				})}
				quoted={true}
			/>
			<h1>Culture</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Culture,
				})}
				quoted={true}
			/>
			<h1>Lifestyle</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Lifestyle,
				})}
				quoted={true}
			/>
			<h1>Opinion</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Opinion,
				})}
				quoted={true}
			/>
			<h1>SpecialReport</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.SpecialReport,
				})}
				quoted={true}
			/>
			<h1>Labs</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.Labs,
				})}
				quoted={true}
			/>
			<h1>LiveBlog News</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
				})}
				quoted={true}
			/>
			<h1>DeadBlog News</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.DeadBlog,
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
				})}
				quoted={true}
			/>
			<h1>LiveBlog News</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
				})}
				quoted={true}
			/>
			<h1>DeadBlog Sport</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.DeadBlog,
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
				})}
				quoted={true}
			/>
			<h1>SpecialReportAlt Standard</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.SpecialReportAlt,
				})}
				quoted={true}
			/>

			<h1>SpecialReportAlt Comment</h1>
			<BlockquoteBlockComponent
				html={blockquoteHtml}
				palette={decidePalette({
					design: ArticleDesign.Comment,
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.SpecialReportAlt,
				})}
				quoted={true}
			/>
		</div>
	);
};
Quoted.storyName = 'Quoted';
