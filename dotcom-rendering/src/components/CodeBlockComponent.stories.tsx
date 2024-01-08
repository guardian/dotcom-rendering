import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { CodeBlockComponent } from './CodeBlockComponent';
import { Section } from './Section';

export default {
	component: CodeBlockComponent,
	title: 'Components/CodeBlockComponent',
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const CodeStory = () => {
	const code = `
wget https://github.com/buger/goreplay/releases/download/v0.16.0.2/gor_0.16.0_x64.tar.gz

tar -xzf gor_0.16.0_x64.tar.gz gor

sudo gor --input-raw :80 --output-http http://apiv2.code.co.uk
    `;
	return (
		<Section showTopBorder={false} showSideBorders={false}>
			<CodeBlockComponent code={code} language="text" />
		</Section>
	);
};
CodeStory.storyName = 'default';
CodeStory.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];
