import React from 'react';

import { Card } from '@frontend/web/components/Card/Card';
import { UL } from '@frontend/web/components/Card/components/UL';
import { LI } from '@frontend/web/components/Card/components/LI';

type Props = {
    content: TrailType[];
};

export const StoryPackage = ({ content }: Props) => (
    <>
        <UL direction="row" bottomMargin={true}>
            <LI padSides={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[0].url,
                        pillar: content[0].pillar,
                        headline: {
                            designType: content[0].designType,
                            headlineText: content[0].linkText,
                            size: 'xxsmall',
                            pillar: content[0].pillar,
                        },
                        webPublicationDate: content[0].webPublicationDate,
                        showClock: false,
                        trailImage: {
                            url: content[0].image,
                        },
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[1].url,
                        pillar: content[1].pillar,
                        headline: {
                            designType: content[1].designType,
                            headlineText: content[1].linkText,
                            size: 'xxsmall',
                            pillar: content[1].pillar,
                        },
                        webPublicationDate: content[1].webPublicationDate,
                        showClock: false,
                        trailImage: {
                            url: content[1].image,
                        },
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[2].url,
                        pillar: content[2].pillar,
                        headline: {
                            designType: content[2].designType,
                            headlineText: content[2].linkText,
                            size: 'xxsmall',
                            pillar: content[2].pillar,
                        },
                        webPublicationDate: content[2].webPublicationDate,
                        showClock: false,
                        trailImage: {
                            url: content[2].image,
                        },
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[3].url,
                        pillar: content[3].pillar,
                        headline: {
                            designType: content[3].designType,
                            headlineText: content[3].linkText,
                            size: 'xxsmall',
                            pillar: content[3].pillar,
                        },
                        webPublicationDate: content[3].webPublicationDate,
                        showClock: false,
                        trailImage: {
                            url: content[3].image,
                        },
                    }}
                />
            </LI>
        </UL>
        <UL direction="row">
            <LI padSides={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[4].url,
                        pillar: content[4].pillar,
                        headline: {
                            designType: content[4].designType,
                            headlineText: content[4].linkText,
                            size: 'xxxsmall',
                            pillar: content[4].pillar,
                        },
                        webPublicationDate: content[4].webPublicationDate,
                        showClock: false,
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[5].url,
                        pillar: content[5].pillar,
                        headline: {
                            designType: content[5].designType,
                            headlineText: content[5].linkText,
                            size: 'xxxsmall',
                            pillar: content[5].pillar,
                        },
                        webPublicationDate: content[5].webPublicationDate,
                        showClock: false,
                    }}
                />
            </LI>
            <LI padSides={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[6].url,
                        pillar: content[6].pillar,
                        headline: {
                            designType: content[6].designType,
                            headlineText: content[6].linkText,
                            size: 'xxxsmall',
                            pillar: content[6].pillar,
                        },
                        webPublicationDate: content[6].webPublicationDate,
                        showClock: false,
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="25%">
                <Card
                    {...{
                        linkTo: content[7].url,
                        pillar: content[7].pillar,
                        headline: {
                            designType: content[7].designType,
                            headlineText: content[7].linkText,
                            size: 'xxxsmall',
                            pillar: content[7].pillar,
                        },
                        webPublicationDate: content[7].webPublicationDate,
                        showClock: false,
                    }}
                />
            </LI>
        </UL>
    </>
);
