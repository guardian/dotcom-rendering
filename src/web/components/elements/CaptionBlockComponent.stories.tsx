import React from 'react';
import { css } from 'emotion';

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
        designType: DesignType;
        captionText?: string;
        pillar: Pillar;
        padCaption?: boolean;
        credit?: string;
        displayCredit?: boolean;
        shouldLimitWidth?: boolean;
        isOverlayed?: boolean;
    };
 */

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
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
                display="standard"
                designType="Article"
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
                display="immersive"
                designType="PhotoEssay"
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

export const Padded = () => {
    return (
        <Container>
            <CaptionBlockComponent
                display="standard"
                designType="Analysis"
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
                display="standard"
                designType="Review"
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
                display="standard"
                designType="MatchReport"
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
                display="showcase"
                designType="Comment"
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
