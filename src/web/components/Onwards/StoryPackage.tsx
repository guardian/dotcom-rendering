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
                        designType: content[0].designType,
                        headlineText: content[0].linkText,
                        headlineSize: 'medium',
                        webPublicationDate: content[0].webPublicationDate,
                        isLiveBlog: content[0].isLiveBlog,
                        kickerText: content[0].kickerText,
                        showPulsingDot: content[0].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                        imageUrl: content[0].image,
                        mediaType: content[0].mediaType,
                        mediaDuration: content[0].mediaDuration,
                    }}
                />
            </LI>
            <LI
                padSides={true}
                showDivider={true}
                showTopMarginWhenStacked={true}
                percentage="25%"
            >
                <Card
                    {...{
                        linkTo: content[1].url,
                        pillar: content[1].pillar,
                        designType: content[1].designType,
                        headlineText: content[1].linkText,
                        headlineSize: 'medium',
                        webPublicationDate: content[1].webPublicationDate,
                        isLiveBlog: content[1].isLiveBlog,
                        kickerText: content[1].kickerText,
                        showPulsingDot: content[1].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                        imageUrl: content[1].image,
                        mediaType: content[1].mediaType,
                        mediaDuration: content[1].mediaDuration,
                    }}
                />
            </LI>
            <LI
                padSides={true}
                showDivider={true}
                showTopMarginWhenStacked={true}
                percentage="25%"
            >
                <Card
                    {...{
                        linkTo: content[2].url,
                        pillar: content[2].pillar,
                        designType: content[2].designType,
                        headlineText: content[2].linkText,
                        headlineSize: 'medium',
                        webPublicationDate: content[2].webPublicationDate,
                        isLiveBlog: content[2].isLiveBlog,
                        kickerText: content[2].kickerText,
                        showPulsingDot: content[2].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                        imageUrl: content[2].image,
                        mediaType: content[2].mediaType,
                        mediaDuration: content[2].mediaDuration,
                    }}
                />
            </LI>
            <LI
                padSides={true}
                showDivider={true}
                showTopMarginWhenStacked={true}
                percentage="25%"
            >
                <Card
                    {...{
                        linkTo: content[3].url,
                        pillar: content[3].pillar,
                        designType: content[3].designType,
                        headlineText: content[3].linkText,
                        headlineSize: 'medium',
                        webPublicationDate: content[3].webPublicationDate,
                        isLiveBlog: content[3].isLiveBlog,
                        kickerText: content[3].kickerText,
                        showPulsingDot: content[3].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                        imageUrl: content[3].image,
                        mediaType: content[3].mediaType,
                        mediaDuration: content[3].mediaDuration,
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
                        designType: content[4].designType,
                        headlineText: content[4].linkText,
                        headlineSize: 'small',
                        webPublicationDate: content[4].webPublicationDate,
                        isLiveBlog: content[4].isLiveBlog,
                        kickerText: content[4].kickerText,
                        showPulsingDot: content[4].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                    }}
                />
            </LI>
            <LI
                padSides={true}
                showDivider={true}
                showTopMarginWhenStacked={true}
                percentage="25%"
            >
                <Card
                    {...{
                        linkTo: content[5].url,
                        pillar: content[5].pillar,
                        designType: content[5].designType,
                        headlineText: content[5].linkText,
                        headlineSize: 'small',
                        webPublicationDate: content[5].webPublicationDate,
                        isLiveBlog: content[5].isLiveBlog,
                        kickerText: content[5].kickerText,
                        showPulsingDot: content[5].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                    }}
                />
            </LI>
            <LI
                padSides={true}
                showDivider={true}
                showTopMarginWhenStacked={true}
                percentage="25%"
            >
                <Card
                    {...{
                        linkTo: content[6].url,
                        pillar: content[6].pillar,
                        designType: content[6].designType,
                        headlineText: content[6].linkText,
                        headlineSize: 'small',
                        webPublicationDate: content[6].webPublicationDate,
                        isLiveBlog: content[6].isLiveBlog,
                        kickerText: content[6].kickerText,
                        showPulsingDot: content[6].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                    }}
                />
            </LI>
            <LI
                padSides={true}
                showDivider={true}
                showTopMarginWhenStacked={true}
                percentage="25%"
            >
                <Card
                    {...{
                        linkTo: content[7].url,
                        pillar: content[7].pillar,
                        designType: content[7].designType,
                        headlineText: content[7].linkText,
                        headlineSize: 'small',
                        webPublicationDate: content[7].webPublicationDate,
                        isLiveBlog: content[7].isLiveBlog,
                        kickerText: content[7].kickerText,
                        showPulsingDot: content[7].isLiveBlog,
                        showSlash: true,
                        showClock: false,
                    }}
                />
            </LI>
        </UL>
    </>
);
