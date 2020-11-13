import React from 'react';
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
    adTargeting?: AdTargeting;
    isMainMedia?: boolean;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
    origin?: string;
};

const expiredOverlayStyles = (overrideImage: string) => css`
    height: 0px;
    position: relative;
    background-image: url(${overrideImage});
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
    role,
    adTargeting,
    isMainMedia,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
    origin,
}: Props) => {
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
                    className={
                        element.overrideImage &&
                        expiredOverlayStyles(element.overrideImage)
                    }
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
        <div data-chromatic="ignore">
            <YoutubeAtom
                videoMeta={element}
                overlayImage={overlayImage}
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
