import React from 'react';
import { css } from 'emotion';

import { Display, Design } from '@guardian/types/Format';
import { Section } from '../Section';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';

import { CaptionBlockComponent } from './CaptionBlockComponent';

export default {
	component: CaptionBlockComponent,
	title: 'Components/CaptionBlockComponent',
};

/*
    type Props = {
        display: Display;
        design: Design;
        captionText?: string;
        pillar: CAPIPillar;
        padCaption?: boolean;
        credit?: string;
        displayCredit?: boolean;
        shouldLimitWidth?: boolean;
        isOverlayed?: boolean;
    };
 */

const Container = ({ children }: { children: React.ReactNode }) => (
	<Section showTopBorder={false}>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<div
				className={css`
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

export const StandardArticle = () => {
	return (
		<Container>
			<CaptionBlockComponent
				display={Display.Standard}
				design={Design.Article}
				captionText="Caption text"
				pillar="news"
			/>
		</Container>
	);
};
StandardArticle.story = {
	name: 'with defaults',
};

export const PhotoEssay = () => {
	return (
		<Container>
			<CaptionBlockComponent
				display={Display.Immersive}
				design={Design.PhotoEssay}
				captionText="Caption text"
				pillar="lifestyle"
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlayed={false}
			/>
		</Container>
	);
};
PhotoEssay.story = {
	name: 'PhotoEssay',
};

export const PhotoEssayHTML = () => {
	return (
		<Container>
			<CaptionBlockComponent
				display={Display.Immersive}
				design={Design.PhotoEssay}
				captionText="<ul><li>Line 1 text</li><li>Line 2 text</li><li>Line 3 text</li></ul>"
				pillar="sport"
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlayed={false}
			/>
		</Container>
	);
};
PhotoEssayHTML.story = {
	name: 'PhotoEssay using html',
};

export const Padded = () => {
	return (
		<Container>
			<CaptionBlockComponent
				display={Display.Standard}
				design={Design.Analysis}
				captionText="Caption text"
				pillar="culture"
				padCaption={true}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlayed={false}
			/>
		</Container>
	);
};
Padded.story = {
	name: 'when padded',
};

export const WidthLimited = () => {
	return (
		<Container>
			<CaptionBlockComponent
				display={Display.Standard}
				design={Design.Review}
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				pillar="culture"
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={true}
				isOverlayed={false}
			/>
		</Container>
	);
};
WidthLimited.story = {
	name: 'with width limited',
};

export const Credited = () => {
	return (
		<Container>
			<CaptionBlockComponent
				display={Display.Standard}
				design={Design.MatchReport}
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				pillar="culture"
				padCaption={false}
				credit="Credit text"
				displayCredit={true}
				shouldLimitWidth={false}
				isOverlayed={false}
			/>
		</Container>
	);
};
Credited.story = {
	name: 'with credit',
};

export const Overlayed = () => {
	return (
		<Container>
			<CaptionBlockComponent
				display={Display.Showcase}
				design={Design.Comment}
				captionText="Caption textQuas repellat sapiente nobis vel. Expedita veniam ut officiis. Omnis tempore natus est distinctio sapiente aliquid dolores soluta. Vel facere vitae velit et non. Eveniet omnis impedit mollitia voluptas omnis sit"
				pillar="sport"
				padCaption={false}
				credit="Credit text"
				displayCredit={false}
				shouldLimitWidth={false}
				isOverlayed={true}
			/>
		</Container>
	);
};
Overlayed.story = {
	name: 'when overlayed',
};
