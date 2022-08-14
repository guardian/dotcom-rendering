import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { CaptionBlockComponent } from './CaptionBlockComponent';
import { ContainerLayout } from './ContainerLayout';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';

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
	<ContainerLayout fullWidth={true} showTopBorder={false}>
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
	</ContainerLayout>
);

export const StandardArticle = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption text"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			/>
		</Wrapper>
	);
};
StandardArticle.story = {
	name: 'with defaults',
};

export const PhotoEssay = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption text"
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.PhotoEssay,
					theme: ArticlePillar.Lifestyle,
				}}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
PhotoEssay.story = {
	name: 'PhotoEssay',
};

export const PhotoEssayHTML = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="<ul><li>Line 1 text</li><li>Line 2 text</li><li>Line 3 text</li></ul>"
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.PhotoEssay,
					theme: ArticlePillar.Sport,
				}}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
PhotoEssayHTML.story = {
	name: 'PhotoEssay using html',
};

export const Padded = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption text"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Culture,
				}}
				padCaption={true}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
Padded.story = {
	name: 'when padded',
};

export const WidthLimited = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Review,
					theme: ArticlePillar.Culture,
				}}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={true}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
WidthLimited.story = {
	name: 'with width limited',
};

export const Credited = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.MatchReport,
					theme: ArticlePillar.Culture,
				}}
				padCaption={false}
				credit="Credit text"
				displayCredit={true}
				shouldLimitWidth={false}
				isOverlaid={false}
			/>
		</Wrapper>
	);
};
Credited.story = {
	name: 'with credit',
};

export const Overlaid = () => {
	return (
		<Wrapper>
			<CaptionBlockComponent
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				format={{
					display: ArticleDisplay.Showcase,
					design: ArticleDesign.Comment,
					theme: ArticlePillar.Sport,
				}}
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlaid={true}
			/>
		</Wrapper>
	);
};
Overlaid.story = {
	name: 'when overlaid',
};
