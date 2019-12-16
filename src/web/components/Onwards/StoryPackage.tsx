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
                        byline: content[0].byline,
                        showByline: content[0].showByline,
                        showQuotes: content[0].designType === 'Comment',
                        webPublicationDate: content[0].webPublicationDate,
                        showClock: false,
                        imageUrl: content[0].image,
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
                        byline: content[1].byline,
                        showByline: content[1].showByline,
                        showQuotes: content[1].designType === 'Comment',
                        webPublicationDate: content[1].webPublicationDate,
                        showClock: false,
                        imageUrl: content[1].image,
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
                        byline: content[2].byline,
                        showByline: content[2].showByline,
                        showQuotes: content[2].designType === 'Comment',
                        webPublicationDate: content[2].webPublicationDate,
                        showClock: false,
                        imageUrl: content[2].image,
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
                        byline: content[3].byline,
                        showByline: content[3].showByline,
                        showQuotes: content[3].designType === 'Comment',
                        webPublicationDate: content[3].webPublicationDate,
                        showClock: false,
                        imageUrl: content[3].image,
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
                        byline: content[4].byline,
                        showByline: content[4].showByline,
                        showQuotes: content[4].designType === 'Comment',
                        webPublicationDate: content[4].webPublicationDate,
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
                        byline: content[5].byline,
                        showByline: content[5].showByline,
                        showQuotes: content[5].designType === 'Comment',
                        webPublicationDate: content[5].webPublicationDate,
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
                        byline: content[6].byline,
                        showByline: content[6].showByline,
                        showQuotes: content[6].designType === 'Comment',
                        webPublicationDate: content[6].webPublicationDate,
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
                        byline: content[7].byline,
                        showByline: content[7].showByline,
                        showQuotes: content[7].designType === 'Comment',
                        webPublicationDate: content[7].webPublicationDate,
                        showClock: false,
                    }}
                />
            </LI>
        </UL>
    </>
);
