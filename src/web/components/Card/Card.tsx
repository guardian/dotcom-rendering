import React from 'react';

import { palette } from '@guardian/src-foundations';

import { SmallHeadline } from '@frontend/web/components/SmallHeadline';
import { Standfirst } from '@frontend/web/components/Standfirst';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';
import { GuardianLines } from '@frontend/web/components/GuardianLines';
import { Avatar } from '@frontend/web/components/Avatar';

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
    headline,
    webPublicationDate,
    trailImage,
    standfirst,
    avatar,
}: CardType) => {
    // If there was no image given or image size was not set, percentage is null and
    // no flex-basis property is set in the wrappers, so content flows normally
    const imageCoverage =
        (trailImage && trailImage.size && coverages.image[trailImage.size]) ||
        coverages.image.medium;
    const contentCoverage =
        (trailImage && trailImage.size && coverages.content[trailImage.size]) ||
        coverages.content.medium;

    const isOpinion = pillar === 'opinion';

    return (
        <CardLink
            linkTo={linkTo}
            backgroundColour={
                isOpinion ? palette.opinion.faded : palette.neutral[97]
            }
            backgroundOnHover={
                // TODO: This colour is hard coded here because it does not yet
                //       exist in src-foundation. Once it's been added, please
                //       remove this. @siadcock is aware.
                isOpinion ? '#FDF0E8' : palette.neutral[93]
            }
        >
            <TopBar topBarColour={palette[pillar].main}>
                <CardLayout imagePosition={trailImage && trailImage.position}>
                    <>
                        {trailImage && (
                            <ImageWrapper percentage={imageCoverage}>
                                <ImageComponent
                                    element={trailImage.element}
                                    pillar={pillar}
                                    hideCaption={true}
                                />
                            </ImageWrapper>
                        )}
                        <ContentWrapper percentage={contentCoverage}>
                            <HeadlineWrapper>
                                <SmallHeadline {...headline} />
                            </HeadlineWrapper>
                            <div>
                                {standfirst && (
                                    <StandfirstWrapper>
                                        <Standfirst
                                            pillar={pillar}
                                            standfirst={standfirst}
                                        />
                                    </StandfirstWrapper>
                                )}
                                {avatar && (
                                    <AvatarContainer>
                                        <Avatar
                                            imageSrc={avatar.src}
                                            imageAlt={avatar.alt}
                                            pillar={pillar}
                                        />
                                    </AvatarContainer>
                                )}
                                <CardFooter>
                                    <>
                                        {webPublicationDate && (
                                            <CardAge
                                                webPublicationDate={
                                                    webPublicationDate
                                                }
                                            />
                                        )}
                                        {isOpinion && (
                                            <LinesWrapper>
                                                <GuardianLines pillar="opinion" />
                                            </LinesWrapper>
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
