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
            <LI padSides={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[0].url,
                        designType: content[0].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[0].designType,
                            headlineText: content[0].linkText,
                            size: 'xxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[0].webPublicationDate,
                        trailImage: {
                            url: content[0].image,
                        },
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[1].url,
                        designType: content[1].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[1].designType,
                            headlineText: content[1].linkText,
                            size: 'xxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[1].webPublicationDate,
                        trailImage: {
                            url: content[1].image,
                        },
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[2].url,
                        designType: content[2].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[2].designType,
                            headlineText: content[2].linkText,
                            size: 'xxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[2].webPublicationDate,
                        trailImage: {
                            url: content[2].image,
                        },
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[3].url,
                        designType: content[3].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[3].designType,
                            headlineText: content[3].linkText,
                            size: 'xxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[3].webPublicationDate,
                        trailImage: {
                            url: content[3].image,
                        },
                    }}
                />
            </LI>
        </UL>
        <UL direction="row">
            <LI padSides={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[4].url,
                        designType: content[4].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[4].designType,
                            headlineText: content[4].linkText,
                            size: 'xxxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[4].webPublicationDate,
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[5].url,
                        designType: content[5].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[5].designType,
                            headlineText: content[5].linkText,
                            size: 'xxxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[5].webPublicationDate,
                    }}
                />
            </LI>
            <LI padSides={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[6].url,
                        designType: content[6].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[6].designType,
                            headlineText: content[6].linkText,
                            size: 'xxxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[6].webPublicationDate,
                    }}
                />
            </LI>
            <LI padSides={true} showDivider={true} percentage="33%">
                <Card
                    {...{
                        linkTo: content[7].url,
                        designType: content[7].designType,
                        pillar: 'news',
                        headline: {
                            designType: content[7].designType,
                            headlineText: content[7].linkText,
                            size: 'xxxsmall',
                            pillar: 'news',
                        },
                        webPublicationDate: content[7].webPublicationDate,
                    }}
                />
            </LI>
        </UL>
    </>
);
