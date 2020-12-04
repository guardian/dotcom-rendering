import React from 'react';
import { css } from 'emotion';

import { breakpoints } from '@guardian/src-foundations/mq';

type Props = {
    imageSources: ImageSource[];
    role: RoleType;
    alt: string;
    height: string;
    width: string;
    isMainMedia?: boolean;
    isLazy?: boolean;
};

const getClosestSetForWidth = (
    desiredWidth: number,
    inlineSrcSets: SrcSetItem[],
): SrcSetItem => {
    // For a desired width, find the SrcSetItem which is the closest match
    const sorted = inlineSrcSets.sort((a, b) => b.width - a.width);
    return sorted.reduce((best, current) => {
        if (current.width < best.width && current.width >= desiredWidth) {
            return current;
        }
        return best;
    });
};

const getFallbackSrc = (srcSets: SrcSetItem[]): string => {
    // The assumption here is readers on devices that do not support srcset are likely to be on poor
    // network connections so we're going to fallback to a small image
    return getClosestSetForWidth(300, srcSets).src;
};

const getSrcSetsForRole = (
    role: RoleType,
    imageSources: ImageSource[],
): SrcSetItem[] => {
    return imageSources.filter(
        ({ weighting }) =>
            // Use toLowerCase to handle cases where we have halfWidth comparing to halfwidth
            weighting.toLowerCase() === role.toLowerCase(),
    )[0].srcSet;
};

const buildSourcesString = (srcSets: SrcSetItem[]): string => {
    return srcSets.map((srcSet) => `${srcSet.src} ${srcSet.width}w`).join(',');
};

const buildSizesString = (role: RoleType, isMainMedia: boolean): string => {
    switch (role) {
        case 'inline':
            return `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;
        case 'halfWidth':
            return `(min-width: ${breakpoints.phablet}px) 300px, 50vw`;
        case 'thumbnail':
            return '140px';
        case 'immersive':
            return isMainMedia
                ? '100vw'
                : `(min-width: ${breakpoints.wide}px) 1300px, 100vw`;
        case 'supporting':
            return `(min-width: ${breakpoints.wide}px) 380px, 300px`;
        case 'showcase':
            return isMainMedia
                ? `(min-width: ${breakpoints.wide}px) 1020px, (min-width: ${breakpoints.leftCol}px) 940px, (min-width: ${breakpoints.tablet}px) 700px, (min-width: ${breakpoints.phablet}px) 660px, 100vw`
                : `(min-width: ${breakpoints.wide}px) 860px, (min-width: ${breakpoints.leftCol}px) 780px, (min-width: ${breakpoints.phablet}px) 620px, 100vw`;
    }
};

export const Img = ({
    imageSources,
    role,
    alt,
    height,
    width,
    isMainMedia = false,
    isLazy = true,
}: Props) => {
    const srcSetForRole = getSrcSetsForRole(role, imageSources);
    const src = getFallbackSrc(srcSetForRole);
    const sources = buildSourcesString(srcSetForRole);
    const sizes = buildSizesString(role, isMainMedia);

    return (
        <img
            itemProp="contentUrl"
            alt={alt}
            src={src}
            srcSet={sources}
            sizes={sizes}
            height={height}
            width={width}
            loading={isLazy && !Img.disableLazyLoading ? 'lazy' : undefined}
            // https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
            // why did we add the css `vertical-align: middle;` to the img tag
            className={css`
                vertical-align: middle;
            `}
        />
    );
};

// We use disableLazyLoading to decide if we want to turn off lazy loading of images site wide. We use this
// to prevent false negatives on Chromatic snapshots (see /.storybook/config)
Img.disableLazyLoading = false;
