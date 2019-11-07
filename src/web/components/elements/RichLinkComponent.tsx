import React from 'react';
import { css, cx } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import ArrowInCircle from '@frontend/static/icons/arrow-in-circle.svg';
import Quote from '@frontend/static/icons/quote.svg';
import { palette } from '@guardian/src-foundations';
import { StarRating } from '@root/src/web/components/StarRating';
import {
    headline,
    textSans,
} from '@guardian/src-foundations/__experimental__typography';
import { from, until, between } from '@guardian/src-foundations/mq';
import { useApi } from '@frontend/web/components/lib/api';

type colour = string;

type CardStyle =
    | 'special-report'
    | 'live'
    | 'dead'
    | 'feature'
    | 'editorial'
    | 'comment'
    | 'podcast'
    | 'media'
    | 'analysis'
    | 'review'
    | 'letters'
    | 'external'
    | 'news';

interface RichLink {
    cardStyle: CardStyle;
    thumbnailUrl: string;
    headline: string;
    contentType: ContentType;
    url: string;
    starRating?: number;
    pillar: Pillar;
    tags: TagType[];
    sponsorName: string;
    contributorImage?: string;
}

const richLinkPillarColour: (pillar: Pillar) => colour = pillar => {
    if (pillar) {
        return pillarPalette[pillar].main;
    }
    return pillarPalette.news.main;
};

const richLinkContainer = css`
    ${until.wide} {
        width: 140px;
    }
    float: left;
    margin-right: 20px;
    margin-bottom: 5px;
    margin-left: 0px;
    ${between.leftCol.and.wide} {
        margin-left: -160px;
    }
    ${from.wide} {
        margin-left: -240px;
        width: 220px;
    }
`;

const richLinkTopBorder: (pillar: Pillar) => colour = pillar => {
    return css`
        border-top: 1px;
        border-top-style: solid;
        border-top-color: ${richLinkPillarColour(pillar)};
    `;
};

const richLinkLink = css`
    text-decoration: none;
`;

const richLinkElements = css`
    padding: 4px 5px 5px 7px;
`;

const quote: (pillar: Pillar) => colour = pillar => {
    return css`
        fill: ${richLinkPillarColour(pillar)};
        float: left;
        padding-right: 2px;
    `;
};

const richLinkTitle = css`
    ${headline.tiny()};
    font-size: 14px;
    padding-top: 1px;
    padding-bottom: 1px;
    font-weight: 400;
    ${from.wide} {
        ${headline.xxsmall()};
        padding-bottom: 5px;
    }
`;

const richLinkReadMore: (pillar: Pillar) => colour = pillar => {
    return css`
        fill: ${richLinkPillarColour(pillar)};
        color: ${richLinkPillarColour(pillar)};
        padding-top: 2px;
    `;
};

const readMoreTextStyle = css`
    ${headline.tiny()};
    font-size: 14px;
    ${from.wide} {
        ${headline.tiny()}
    }
    display: inline-block;
    height: 30px;
    line-height: 26px;
    padding-left: 4px;
    vertical-align: top;
    font-weight: 500;
    text-decoration: none;
`;

const byline = css`
    ${headline.tiny()};
    font-size: 14px;
    font-style: italic;
    ${from.wide} {
        ${headline.xxsmall()};
    }
`;

// !important is used here to override the default inline body image styling
const contributorImage = css`
    border-radius: 100%;
    object-fit: cover;
    width: 100%;
    height: 100% !important ;
`;

const contributorImageWrapper = css`
    width: 5rem;
    height: 5rem;
    margin-left: auto;
    margin-right: 0.3rem;
    ${from.wide} {
        width: 8.5rem;
        height: 8.5rem;
    }
`;

const neutralBackground = css`
    background-color: ${palette.neutral[97]};
    a {
        color: inherit;
    }
    :hover {
        background-color: ${palette.neutral[93]};
    }
`;

const pillarBackground: (pillar: Pillar) => colour = pillar => {
    return css`
        background-color: ${richLinkPillarColour(pillar)};
    `;
};

const textColour: (pillar: Pillar) => colour = pillar => {
    return css`
        color: ${richLinkPillarColour(pillar)};
    `;
};

const paidForBranding = css`
    ${textSans.xsmall()};
    font-weight: bold;
    color: ${palette.neutral[46]};
`;

const readMoreText: (contentType: string) => string = contentType => {
    switch (contentType) {
        case 'audio':
            return 'Listen';
        case 'gallery':
            return 'View Gallery';
        case 'video':
            return 'Watch';
        default:
            return 'Read more';
    }
};

const getMainContributor: (tags: TagType[]) => string = tags => {
    const contributorTags = tags.filter(t => t.type === 'Contributor');
    return contributorTags.length > 0 ? contributorTags[0].title : '';
};

const RichLinkBody: React.FC<{ richLink: RichLink }> = ({ richLink }) => {
    const linkText =
        richLink.cardStyle === 'letters'
            ? `${richLink.headline} | Letters `
            : richLink.headline;

    const imageCardStyles = ['news', 'letters', 'media', 'feature'];
    const showImage =
        richLink.thumbnailUrl &&
        imageCardStyles.indexOf(richLink.cardStyle) >= 0;
    const isPaidContent = richLink.tags
        ? richLink.tags.filter(t => t.id === 'tone/advertisement-features')
              .length > 0
        : false;
    const isOpinion = richLink.cardStyle === 'comment';
    const mainContributor = getMainContributor(richLink.tags);
    return (
        <a className={cx(richLinkLink)} href={richLink.url}>
            <div className={richLinkTopBorder(richLink.pillar)} />
            {showImage && (
                <div>
                    <img
                        src={richLink.thumbnailUrl}
                        alt="link thumbnail image"
                    />
                </div>
            )}
            <div className={richLinkElements}>
                <div className={richLinkTitle}>
                    {isOpinion && (
                        <div className={quote(richLink.pillar)}>
                            <Quote />
                        </div>
                    )}
                    {linkText}
                </div>
                {isOpinion && (
                    <div className={cx(byline, textColour(richLink.pillar))}>
                        {mainContributor}
                    </div>
                )}
                {richLink.starRating && richLink.starRating > 0 && (
                    <StarRating rating={richLink.starRating} size={'small'} />
                )}
                {isPaidContent && richLink.sponsorName && (
                    <div className={paidForBranding}>
                        Paid for by {richLink.sponsorName}
                    </div>
                )}
                {isOpinion && richLink.contributorImage && (
                    <div className={contributorImageWrapper}>
                        <img
                            src={richLink.contributorImage}
                            alt={mainContributor}
                            className={cx(
                                pillarBackground(richLink.pillar),
                                contributorImage,
                            )}
                        />
                    </div>
                )}
                <div className={richLinkReadMore(richLink.pillar)}>
                    <ArrowInCircle />
                    <div className={readMoreTextStyle}>
                        {readMoreText(richLink.contentType)}
                    </div>
                </div>
            </div>
        </a>
    );
};

export const RichLinkComponent: React.FC<{
    element: RichLinkBlockElement;
    pillar: Pillar;
    ajaxEndpoint: string;
}> = ({ element, pillar, ajaxEndpoint }) => {
    const url = buildUrl(element, ajaxEndpoint);
    const { data, loading, error } = useApi<RichLink>(url);

    if (error) {
        // Send the error to Sentry and then prevent the element from rendering
        window.guardian.modules.sentry.reportError(error, 'rich-link');

        return null;
    }

    if (loading) {
        // Only render once data is available
        return null;
    }
    return (
        <div data-link-name={'rich-link'} className={pillarBackground(pillar)}>
            <div className={cx(richLinkContainer, neutralBackground)}>
                {data && <RichLinkBody richLink={data} />}
            </div>
        </div>
    );
};

const buildUrl: (element: RichLinkBlockElement, ajaxUrl: string) => string = (
    element,
    ajaxUrl,
) => {
    const path = new URL(element.url).pathname;
    return `${ajaxUrl}/embed/card${path}.json?dcr=true`;
};
