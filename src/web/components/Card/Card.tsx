import React from 'react';

import { palette } from '@guardian/src-foundations';

import { CardHeadline } from '@frontend/web/components/CardHeadline';
import { GuardianLines } from '@frontend/web/components/GuardianLines';
import { Avatar } from '@frontend/web/components/Avatar';
import { Flex } from '@frontend/web/components/Flex';
import { Hide } from '@frontend/web/components/Hide';

import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { CardLayout } from './components/CardLayout';
import { ImageWrapper } from './components/ImageWrapper';
import { AvatarContainer } from './components/AvatarContainer';
import { StandfirstWrapper } from './components/StandfirstWrapper';
import { LinesWrapper } from './components/LinesWrapper';
import { CardFooter } from './components/CardFooter';
import { TopBar } from './components/TopBar';
import { CardLink } from './components/CardLink';
import { CardAge } from './components/CardAge';
import { MediaMeta } from './components/MediaMeta';

type CoveragesType = {
    image: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
        jumbo: CardPercentageType;
    };
    content: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
        jumbo: CardPercentageType;
    };
};

const coverages: CoveragesType = {
    // coverages is how we set the image size relative to the space given
    // to the headline. These percentages are passed to flex-basis inside the
    // wrapper components
    image: {
        small: '25%',
        medium: '50%',
        large: '67%',
        jumbo: '75%',
    },
    content: {
        small: '75%',
        medium: '50%',
        large: '33%',
        jumbo: '25%',
    },
};

export const Card = ({
    linkTo,
    pillar,
    designType,
    headlineText,
    headlineSize,
    showQuotes,
    byline,
    webPublicationDate,
    imageUrl,
    imagePosition,
    imageSize,
    standfirst,
    avatar,
    showClock,
    mediaType,
    mediaDuration,
    kickerText,
    showPulsingDot,
    showSlash,
}: CardType) => {
    // Decide how we position the image on the card
    let imageCoverage: CardPercentageType | undefined;
    let contentCoverage: CardPercentageType | undefined;
    if (imageSize && imagePosition !== 'top') {
        // We only specifiy an explicit width for the image when
        // we're positioning left or right, not top. Top positioned
        // images flow naturally
        imageCoverage = coverages.image[imageSize];
        contentCoverage = coverages.content[imageSize];
    }

    return (
        <CardLink linkTo={linkTo} designType={designType}>
            <TopBar topBarColour={palette[pillar].main}>
                <CardLayout imagePosition={imagePosition}>
                    <>
                        {imageUrl && (
                            <ImageWrapper percentage={imageCoverage}>
                                <img
                                    src={imageUrl}
                                    alt=""
                                    role="presentation"
                                />
                            </ImageWrapper>
                        )}
                        <ContentWrapper percentage={contentCoverage}>
                            <Flex>
                                <HeadlineWrapper>
                                    <CardHeadline
                                        headlineText={headlineText}
                                        designType={designType}
                                        pillar={pillar}
                                        size={headlineSize}
                                        showQuotes={showQuotes}
                                        kickerText={kickerText}
                                        showPulsingDot={showPulsingDot}
                                        showSlash={showSlash}
                                        byline={byline}
                                    />
                                </HeadlineWrapper>
                                <>
                                    {avatar && (
                                        <Hide when="above" breakpoint="tablet">
                                            <AvatarContainer>
                                                <Avatar
                                                    imageSrc={avatar.src}
                                                    imageAlt={avatar.alt}
                                                    pillar={pillar}
                                                />
                                            </AvatarContainer>
                                        </Hide>
                                    )}
                                </>
                            </Flex>
                            <div>
                                {standfirst && (
                                    <StandfirstWrapper>
                                        {standfirst}
                                    </StandfirstWrapper>
                                )}
                                {avatar && (
                                    <Hide when="below" breakpoint="tablet">
                                        <AvatarContainer>
                                            <Avatar
                                                imageSrc={avatar.src}
                                                imageAlt={avatar.alt}
                                                pillar={pillar}
                                            />
                                        </AvatarContainer>
                                    </Hide>
                                )}
                                <CardFooter designType={designType}>
                                    <>
                                        {webPublicationDate && (
                                            <CardAge
                                                designType={designType}
                                                webPublicationDate={
                                                    webPublicationDate
                                                }
                                                showClock={showClock}
                                            />
                                        )}
                                        {designType === 'Comment' && (
                                            <LinesWrapper>
                                                <GuardianLines pillar="opinion" />
                                            </LinesWrapper>
                                        )}
                                        {designType === 'Media' && mediaType && (
                                            <>
                                                <MediaMeta
                                                    pillar={pillar}
                                                    mediaType={mediaType}
                                                    mediaDuration={
                                                        mediaDuration
                                                    }
                                                />
                                            </>
                                        )}
                                    </>
                                </CardFooter>
                            </div>
                        </ContentWrapper>
                    </>
                </CardLayout>
            </TopBar>
        </CardLink>
    );
};
