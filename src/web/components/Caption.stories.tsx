import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { Caption } from '@frontend/web/components/Caption';
import { Display } from '@guardian/types/Format';

export default {
    component: Caption,
    title: 'Components/Caption',
};

/**
    display: Display;
    designType: DesignType;
    captionText?: string;
    pillar: Pillar;
    padCaption?: boolean;
    credit?: string;
    displayCredit?: boolean;
    shouldLimitWidth?: boolean;
    isOverlayed?: boolean; // Not tested here as this option only works in the context of the ImageComponent
 */

export const Article = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Caption
            display={Display.Standard}
            designType="Article"
            captionText="This is how an Article caption looks"
            pillar="news"
        />
    </Section>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Caption
            display={Display.Standard}
            designType="Analysis"
            captionText="This is how an Analysis caption looks"
            pillar="news"
        />
    </Section>
);
Analysis.story = { name: 'Analysis' };

export const PhotoEssay = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Caption
            display={Display.Immersive}
            designType="PhotoEssay"
            captionText="<ul><li>This is how a PhotoEssay caption looks</li></ul>"
            pillar="news"
        />
    </Section>
);
PhotoEssay.story = { name: 'PhotoEssay' };

export const PhotoEssayLimitedWidth = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Caption
            display={Display.Immersive}
            designType="PhotoEssay"
            captionText="<ul><li>This is how a PhotoEssay caption looks when width is limited</li></ul>"
            pillar="news"
            shouldLimitWidth={true}
        />
    </Section>
);
PhotoEssayLimitedWidth.story = { name: 'PhotoEssay with width limited' };

export const Credit = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Caption
            display={Display.Standard}
            designType="Feature"
            captionText="This is how a Feature caption looks with credit showing"
            pillar="news"
            credit="Credited to Able Jones"
            displayCredit={true}
        />
    </Section>
);
Credit.story = { name: 'with credit' };

export const WidthLimited = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Caption
            display={Display.Standard}
            designType="Article"
            captionText="This is how a caption looks with width limited"
            pillar="news"
            shouldLimitWidth={true}
        />
    </Section>
);
WidthLimited.story = { name: 'with width limited' };

export const Padded = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Caption
            display={Display.Standard}
            designType="Article"
            captionText="This is how a caption looks when padded"
            pillar="news"
            padCaption={true}
        />
    </Section>
);
Padded.story = { name: 'when padded' };
