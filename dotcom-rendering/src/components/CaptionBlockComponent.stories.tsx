import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { CaptionBlockComponent } from './CaptionBlockComponent';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

export default {
	component: CaptionBlockComponent,
	title: 'Components/CaptionBlockComponent',
};

/*
    type Props = {
        display: Display;
        design: Design;
        captionText?: string;
        pillar: Theme;
        padCaption?: boolean;
        credit?: string;
        displayCredit?: boolean;
        shouldLimitWidth?: boolean;
        isOverlaid?: boolean;
    };
 */

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Section fullWidth={true} showTopBorder={false}>
		<Flex>
			<LeftColumn borderType="full">
				<></>
			</LeftColumn>
			<div
				css={css`
					width: 620px;
					padding: 20px;
					flex-grow: 1;
				`}
			>
				{children}
			</div>
			<RightColumn>
				<></>
			</RightColumn>
		</Flex>
	</Section>
);

const standardFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};
export const StandardArticle = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption text"
				format={standardFormat}
			/>
		</Wrapper>
	);
};
StandardArticle.storyName = 'with defaults';
StandardArticle.decorators = [splitTheme([standardFormat])];

const photoEssayFormat = {
	display: ArticleDisplay.Immersive,
	design: ArticleDesign.PhotoEssay,
	theme: Pillar.Lifestyle,
};
export const PhotoEssay = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption text"
				format={photoEssayFormat}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
PhotoEssay.storyName = 'PhotoEssay';
PhotoEssay.decorators = [splitTheme([photoEssayFormat])];

export const PhotoEssayHTML = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="<ul><li>Line 1 text</li><li>Line 2 text</li><li>Line 3 text</li></ul>"
				format={photoEssayFormat}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
PhotoEssayHTML.storyName = 'PhotoEssay using html';
PhotoEssayHTML.decorators = [splitTheme([photoEssayFormat])];

export const Padded = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption text"
				format={standardFormat}
				padCaption={true}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
Padded.storyName = 'when padded';
Padded.decorators = [splitTheme([standardFormat])];

export const WidthLimited = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				format={standardFormat}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={true}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
WidthLimited.storyName = 'with width limited';
WidthLimited.decorators = [splitTheme([standardFormat])];

export const Credited = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				format={standardFormat}
				padCaption={false}
				credit="Credit text"
				displayCredit={true}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
Credited.storyName = 'with credit';
Credited.decorators = [splitTheme([standardFormat])];

const showcaseFormat = {
	display: ArticleDisplay.Showcase,
	design: ArticleDesign.Comment,
	theme: Pillar.Sport,
};
export const Overlaid = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				format={showcaseFormat}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={true}
			/>
		</Wrapper>
	);
};
Overlaid.storyName = 'when overlaid';
Overlaid.decorators = [splitTheme([showcaseFormat])];
