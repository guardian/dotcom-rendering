import React, { useRef, useState, useEffect } from 'react';
import { css } from 'emotion';

import { palette, space } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import { SvgAlertRound } from '@guardian/src-icons';

import { Caption } from '@root/src/web/components/Caption';
import { Display } from '@root/src/lib/display';
import { YoutubeAtom } from '@guardian/atoms-rendering';

type Props = {
    display: Display;
    designType: DesignType;
    element: YoutubeBlockElement;
    pillar: Pillar;
    role: RoleType;
    hideCaption?: boolean;
    overlayImage?: string;
    posterImage?: PosterImageType[];
    adTargeting?: AdTargeting;
    isMainMedia?: boolean;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
    origin?: string;
};

const expiredOverlayStyles = (overrideImage?: string) => css`
    height: 0px;
    position: relative;
    background-image: url(${overrideImage || ''});
    background-size: cover;
    background-position: 49% 49%;
    background-repeat: no-repeat;
    padding-bottom: 56%;
    color: ${palette.neutral[100]};
    background-color: ${palette.neutral[20]};
`;

const expiredTextWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-top: ${space[4]}px;
    padding-bottom: ${space[4]}px;
    padding-left: ${space[1]}px;
    padding-right: ${space[12]}px;
    color: ${palette.neutral[100]};
    background-color: ${palette.neutral[20]};
`;

const expiredSVGWrapperStyles = css`
    padding-right: ${space[1]}px;
    svg {
        width: ${space[12]}px;
        height: ${space[12]}px;
        fill: ${palette.neutral[100]};
    }
`;

export const YoutubeBlockComponent = ({
    display,
    designType,
    element,
    pillar,
    hideCaption,
    overlayImage,
    posterImage,
    role,
    adTargeting,
    isMainMedia,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
    origin,
}: Props) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [selectedPosterImage, setSelectedPosterImage] = useState<
        PosterImageType
    >();

    // We need to find the best candidate posterImage from array
    // we therefore need to find the candidate with the smallest
    // width, that is larger than the width of the wrapper
    useEffect(() => {
        const wrapperWidth = wrapperRef.current
            ? wrapperRef.current.clientWidth
            : 0;

        if (wrapperWidth && posterImage) {
            const bestFitPosterImage = posterImage.reduce(
                (
                    acc: PosterImageType,
                    cur: PosterImageType,
                ): PosterImageType => {
                    if (wrapperWidth < cur.width && cur.width < acc.width)
                        return cur;
                    return acc;
                },
                posterImage[0],
            );
            setSelectedPosterImage(bestFitPosterImage);
        }
    }, [wrapperRef, posterImage, setSelectedPosterImage]);

    const shouldLimitWidth =
        !isMainMedia &&
        (role === 'showcase' || role === 'supporting' || role === 'immersive');

    if (element.expired) {
        return (
            <figure
                className={css`
                    margin-top: 16px;
                    margin-bottom: 16px;
                `}
            >
                <div
                    className={expiredOverlayStyles(
                        (selectedPosterImage && selectedPosterImage.url) ||
                            element.overrideImage,
                    )}
                >
                    <div className={expiredTextWrapperStyles}>
                        <div className={expiredSVGWrapperStyles}>
                            <SvgAlertRound />
                        </div>
                        <p
                            className={css`
                                ${body.medium({
                                    lineHeight: 'tight',
                                })}
                            `}
                        >
                            This video has been removed. This could be because
                            it launched early, our rights have expired, there
                            was a legal issue, or for another reason.
                        </p>
                    </div>
                </div>
                {!hideCaption && (
                    <Caption
                        display={display}
                        designType={designType}
                        captionText={element.mediaTitle || ''}
                        pillar={pillar}
                        displayCredit={false}
                        shouldLimitWidth={shouldLimitWidth}
                    />
                )}
            </figure>
        );
    }

    return (
        <div ref={wrapperRef} data-chromatic="ignore">
            <YoutubeAtom
                videoMeta={element}
                overlayImage={
                    (selectedPosterImage && selectedPosterImage.url) ||
                    overlayImage
                }
                adTargeting={adTargeting}
                height={height}
                width={width}
                title={title}
                duration={duration}
                origin={origin}
            />
            {!hideCaption && (
                <Caption
                    display={display}
                    designType={designType}
                    captionText={element.mediaTitle || ''}
                    pillar={pillar}
                    displayCredit={false}
                    shouldLimitWidth={shouldLimitWidth}
                />
            )}
        </div>
    );
};
