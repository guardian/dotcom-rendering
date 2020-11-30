import React from 'react';
import { css, cx } from 'emotion';

import { Section } from '@root/src/web/components/Section';
import { LeftColumn } from '@root/src/web/components/LeftColumn';
import { ContainerTitle } from '@root/src/web/components/ContainerTitle';
import { Hide } from '@root/src/web/components/Hide';
import { Flex } from '@root/src/web/components/Flex';

import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

type Props = {
    title?: string;
    fontColour?: string;
    description?: string;
    url?: string;
    sectionId?: string;
    sideBorders?: boolean;
    centralBorder?: 'partial' | 'full';
    showTopBorder?: boolean;
    padSides?: boolean;
    padContent?: boolean;
    backgroundColour?: string;
    borderColour?: string;
    children?: React.ReactNode;
};

const Container = ({
    children,
    padded,
}: {
    children: React.ReactNode;
    padded: boolean;
}) => {
    const containerStyles = css`
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        width: 100%;
        margin-top: ${space[2]}px;
        margin-bottom: ${space[12]}px;
        ${from.wide} {
            margin-right: 68px;
        }
    `;

    const padding = css`
        padding: 0 10px;

        ${from.mobileLandscape} {
            padding: 0 20px;
        }
    `;
    return (
        <div className={cx(containerStyles, padded && padding)}>{children}</div>
    );
};

export const ContainerLayout = ({
    title,
    fontColour,
    description,
    url,
    sectionId,
    sideBorders = false,
    centralBorder,
    showTopBorder = false,
    padSides = true,
    padContent = true,
    borderColour,
    backgroundColour,
    children,
}: Props) => (
    <Section
        sectionId={sectionId}
        showSideBorders={sideBorders}
        showTopBorder={showTopBorder}
        padded={padSides}
        borderColour={borderColour}
        backgroundColour={backgroundColour}
    >
        <Flex>
            <LeftColumn
                showRightBorder={centralBorder === 'full'}
                borderColour={borderColour}
                showPartialRightBorder={centralBorder === 'partial'}
            >
                <ContainerTitle
                    title={title}
                    fontColour={fontColour}
                    description={description}
                    url={url}
                />
            </LeftColumn>
            <Container padded={padContent}>
                <Hide when="above" breakpoint="leftCol">
                    <ContainerTitle
                        title={title}
                        fontColour={fontColour}
                        description={description}
                        url={url}
                    />
                </Hide>
                {children}
            </Container>
        </Flex>
    </Section>
);
