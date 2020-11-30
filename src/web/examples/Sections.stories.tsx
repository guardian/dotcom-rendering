/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { css } from 'emotion';

import { PageSection } from '@frontend/web/components/PageSection';
import { Section } from '@frontend/web/components/Section';
import { Header } from '@frontend/web/components/Header';
import { Footer } from '@frontend/web/components/Footer';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { Nav } from '@root/src/web/components/Nav/Nav';

import { Display } from '@root/src/lib/display';

import {
    brandBorder,
    brandBackground,
    brandLine,
    background,
    brandAltBackground,
    neutral,
} from '@guardian/src-foundations/palette';

import { NAV, pageFooter } from './Example.mocks';

const Grey = ({
    heightInPixels = 400,
    padded = true,
}: {
    heightInPixels?: number;
    padded?: boolean;
}) => (
    <div
        className={css`
            background-color: ${neutral[93]};
            width: 100%;
            height: ${heightInPixels}px;
            margin: ${padded && '10px'};
        `}
    />
);

export default {
    title: 'Examples/Sections',
    parameters: {
        viewport: {
            // This has the effect of turning off the viewports addon by default
            defaultViewport: 'doesNotExist',
        },
        chromatic: {
            disable: true,
        },
    },
};

export const Sections = () => (
    <>
        <Section
            showTopBorder={false}
            showSideBorders={true}
            borderColour={brandLine.primary}
            padded={false}
            backgroundColour={brandBackground.primary}
        >
            <Header edition="UK" />
        </Section>
        <Section
            showSideBorders={true}
            borderColour={brandLine.primary}
            showTopBorder={false}
            padded={false}
            backgroundColour={brandBackground.primary}
        >
            <Nav
                pillar="news"
                nav={NAV}
                display={Display.Standard}
                subscribeUrl=""
                edition="UK"
            />
        </Section>
        <Section
            backgroundColour={background.primary}
            padded={false}
            showTopBorder={false}
            showSideBorders={true}
        >
            <GuardianLines count={4} pillar="news" />
        </Section>
        <PageSection
            showTopBorder={false}
            title="Page Title"
            sideBorders={true}
        />
        <PageSection
            title="Section Title"
            description="Description"
            centralBorder="full"
            sideBorders={true}
            showTopBorder={true}
        >
            <Grey />
        </PageSection>
        <PageSection
            title="World"
            description="Decription"
            centralBorder="full"
            sideBorders={true}
            showTopBorder={true}
        >
            <Grey />
        </PageSection>
        <PageSection
            title="Video"
            fontColour="white"
            backgroundColour={brandAltBackground.ctaPrimary}
            sideBorders={false}
            showTopBorder={false}
        >
            <Grey />
        </PageSection>
        <PageSection
            centralBorder="full"
            title="Title"
            description="Decription"
            sideBorders={true}
        >
            <Grey />
        </PageSection>
        <Section
            backgroundColour={background.primary}
            padded={false}
            showTopBorder={false}
        >
            <GuardianLines count={4} pillar="news" />
        </Section>
        <Section
            padded={false}
            backgroundColour={brandBackground.primary}
            borderColour={brandBorder.primary}
            showSideBorders={false}
        >
            <Footer
                pageFooter={pageFooter}
                pillar="news"
                pillars={NAV.pillars}
            />
        </Section>
    </>
);
Sections.story = { name: 'Example using different sections' };
