import React from 'react';
import { css } from 'emotion';

import { breakpoints } from '@guardian/src-foundations/mq';
import {
    brandAltBackground,
    brandBackground,
    brandBorder,
} from '@guardian/src-foundations/palette';

import { PageSection } from './PageSection';

export default {
    component: PageSection,
    title: 'Components/PageSection',
    parameters: {
        viewport: {
            // This has the effect of turning off the viewports addon by default
            defaultViewport: 'doesNotExist',
        },
    },
};

const Grey = ({ heightInPixels = 400 }: { heightInPixels?: number }) => (
    <div
        className={css`
            background-color: lightgrey;
            width: 100%;
            height: ${heightInPixels}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            font-weight: 200;
        `}
    >
        Insert content here
    </div>
);

export const PageTitleStory = () => {
    return <PageSection title="No Children" />;
};
PageTitleStory.story = { name: 'with no children' };

export const ContainerStory = () => {
    return (
        <PageSection title="Default Container">
            <Grey />
        </PageSection>
    );
};
ContainerStory.story = { name: 'default container' };

export const NoTitleStory = () => {
    return (
        <PageSection>
            <Grey />
        </PageSection>
    );
};
NoTitleStory.story = { name: 'with no title' };

export const BordersStory = () => {
    return (
        <PageSection
            title="Borders"
            showTopBorder={true}
            sideBorders={true}
            centralBorder="full"
        >
            <Grey />
        </PageSection>
    );
};
BordersStory.story = { name: 'with all borders' };

export const BackgroundStory = () => {
    return (
        <PageSection
            title="Background Colour"
            description="About this content"
            fontColour={brandBackground.ctaPrimary}
            showTopBorder={true}
            sideBorders={true}
            centralBorder="full"
            backgroundColour={brandBackground.primary}
            borderColour={brandBorder.primary}
        >
            <Grey />
        </PageSection>
    );
};
BackgroundStory.story = { name: 'with a blue background' };

export const PartialStory = () => {
    return (
        <PageSection
            title="Borders"
            showTopBorder={false}
            sideBorders={true}
            centralBorder="partial"
        >
            <Grey />
        </PageSection>
    );
};
PartialStory.story = { name: 'with a partial border divider' };

export const SidesStory = () => {
    return (
        <PageSection
            title="NoSides"
            showTopBorder={false}
            sideBorders={true}
            centralBorder="full"
            padSides={false}
            padContent={false}
        >
            <Grey />
        </PageSection>
    );
};
SidesStory.story = { name: 'with a partial border divider' };

export const MultipleStory = () => {
    return (
        <>
            <PageSection
                title="Page Title"
                showTopBorder={false}
                sideBorders={true}
            />
            <PageSection
                title="Headlines"
                showTopBorder={true}
                sideBorders={true}
                centralBorder="partial"
            >
                <Grey />
            </PageSection>
            <PageSection
                title="Useful links"
                showTopBorder={true}
                sideBorders={true}
                centralBorder="partial"
            />
            <PageSection
                title="Around the World - I'm a link"
                url="https://www.theguardian.com/world"
                showTopBorder={true}
                sideBorders={true}
                centralBorder="partial"
            >
                <Grey />
            </PageSection>
            <PageSection
                showTopBorder={false}
                sideBorders={false}
                backgroundColour={brandAltBackground.primary}
            >
                <h2>Insert call to action here</h2>
            </PageSection>
            <PageSection
                title="Videos"
                fontColour="white"
                showTopBorder={false}
                backgroundColour="black"
            >
                <Grey />
            </PageSection>
            <PageSection
                title="Coronavirus"
                description="A collection of stories about Coronavirus"
                showTopBorder={true}
                sideBorders={true}
                centralBorder="partial"
            >
                <Grey />
            </PageSection>
        </>
    );
};
MultipleStory.story = {
    name: 'with multiple sections',
    parameters: {
        chromatic: {
            viewports: [
                breakpoints.mobile,
                breakpoints.mobileMedium,
                breakpoints.phablet,
                breakpoints.tablet,
                breakpoints.desktop,
                breakpoints.leftCol,
                breakpoints.wide,
            ],
        },
    },
};
