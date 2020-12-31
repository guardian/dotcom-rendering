import React from 'react';

import { Display } from '@guardian/types/Format';
import { Section } from './Section';

import { Standfirst } from './Standfirst';

export default {
    component: Standfirst,
    title: 'Components/Standfirst',
};

export const Article = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Article"
                standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Article.story = { name: 'Article' };

export const Comment = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Comment"
                standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Comment.story = { name: 'Comment' };

export const Feature = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Feature"
                standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Feature.story = { name: 'Feature' };

export const Immersive = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Immersive}
                designType="Article"
                standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Immersive.story = { name: 'Immersive' };

export const Review = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Review"
                standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Review.story = { name: 'Review' };

export const Live = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Live"
                standfirst="This is how Live standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Live.story = { name: 'Live' };

export const Interview = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Interview"
                standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Interview.story = { name: 'Interview' };

export const Analysis = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Analysis"
                standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Analysis.story = { name: 'Analysis' };

export const Media = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Media"
                standfirst="This is how Media standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Media.story = { name: 'Media' };

export const Recipe = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Recipe"
                standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Recipe.story = { name: 'Recipe' };

export const MatchReport = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="MatchReport"
                standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
MatchReport.story = { name: 'MatchReport' };

export const Quiz = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Quiz"
                standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
Quiz.story = { name: 'Quiz' };

export const SpecialReport = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="Article"
                standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
SpecialReport.story = { name: 'SpecialReport' };

export const GuardianView = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="GuardianView"
                standfirst="This is how GuardianView standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
GuardianView.story = { name: 'GuardianView' };

export const GuardianLabs = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="GuardianLabs"
                standfirst="This is how GuardianLabs standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
GuardianLabs.story = { name: 'GuardianLabs' };

export const AdvertisementFeature = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="AdvertisementFeature"
                standfirst="This is how AdvertisementFeature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
AdvertisementFeature.story = { name: 'AdvertisementFeature' };

export const PhotoEssay = () => {
    return (
        <Section>
            <Standfirst
                display={Display.Standard}
                designType="PhotoEssay"
                standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
            />
        </Section>
    );
};
PhotoEssay.story = { name: 'PhotoEssay' };
